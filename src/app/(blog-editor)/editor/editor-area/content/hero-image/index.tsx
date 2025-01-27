"use client";

// react
import { FC, useCallback, useState } from "react";
// next
import NextImage from "next/image";
// imports
import { toast } from "sonner";
import { DropEvent, FileRejection, useDropzone } from "react-dropzone";

// components
import CaptionButton from "./caption-button";
import FigureCaption from "../figure-caption";

// static assets
import uploadSvg from "public/images/upload.svg";

// types
type HeroImageProps = {
  image?: {
    url: string | File;
    alt?: string;
  };
  onImageChange: (file: File) => void;
  onCaptionChange: (caption: string) => void;
};

const HeroImage: FC<HeroImageProps> = ({
  image,
  onCaptionChange,
  onImageChange,
}) => {
  const [uploadedImage, setUploadedImage] = useState<File>();
  const [captionEnabled, setCaptionEnabled] = useState(false);

  // drop handlers
  const onDrop = useCallback(
    (
      acceptedFiles: File[],
      rejectedFiles: FileRejection[],
      event: DropEvent
    ) => {
      if (rejectedFiles.length) {
        toast.error("Invalid file type. Please upload a valid image file.");
        return;
      }

      const file = acceptedFiles[0];
      const image = new Image();

      image.onload = () => {
        // check if image is less than 500px
        if (image.width < 500 || image.height < 500) {
          toast.error("Minimum dimensions must be 500px X 500px");
          return;
        }

        setUploadedImage(file);
        onImageChange(file);
      };

      image.src = URL.createObjectURL(file);
    },
    []
  );

  // dropzone
  const { isDragActive, isDragAccept, getRootProps, getInputProps } =
    useDropzone({
      accept: {
        "image/*": [],
      },
      multiple: false,
      maxFiles: 1,
      onDrop,
    });

  // handlers
  const handleCaptionInput = (text: string) => {
    onCaptionChange(text);
  };

  const handleEnableCaption = () => {
    // check if image or uploaded image exists
    if (!image && !uploadedImage) {
      toast.error("Please upload an image to an caption.");
      return;
    }

    setCaptionEnabled(true);
  };

  return (
    <div className="mb-10">
      {image?.url || uploadedImage ? (
        <figure className="flex flex-col gap-5">
          <img
            src={
              Boolean(uploadedImage instanceof File)
                ? URL.createObjectURL(uploadedImage!)
                : image?.url as string
            }
            alt="test"
            className="mx-auto object-contain"
          />
          {captionEnabled || image?.alt ? (
            <FigureCaption value={image?.alt} onChange={handleCaptionInput} />
          ) : (
            <CaptionButton onClick={handleEnableCaption} />
          )}
        </figure>
      ) : (
        <div className="flex flex-col gap-5">
          {/* upload area */}
          <div
            {...getRootProps()}
            className="w-full h-[350px] py-[80px] px-2 flex flex-col gap-6 border-2 border-dashed border-black/30 rounded-xl cursor-pointer"
          >
            <input {...getInputProps()} />
            <NextImage src={uploadSvg} alt="upload icon" className="mx-auto" />
            <div className="flex flex-col gap-3">
              <h4 className="text-2xl text-center font-medium">
                {isDragActive ? "Drop Hero Image here" : "Upload a Hero Image"}
              </h4>
              <p className="text-sm text-[#666666] text-center">
                You can upload PNG or JPEG Image. Minimum dimensions must be
                500px X 500px
              </p>
            </div>
          </div>
          {/* caption */}
          <CaptionButton onClick={handleEnableCaption} />
        </div>
      )}
    </div>
  );
};

export default HeroImage;
