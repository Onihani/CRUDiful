"use client";

// react
import { FC, FormEventHandler } from "react";
// next
import Image from "next/image";

// static assets
import heroImage from "public/images/hero.png";
import uploadSvg from "public/images/upload.svg";
import captionSvg from "public/images/caption.svg";

// types
type HeroImageProps = {
  image?: {
    url: string;
    alt?: string;
  };
};

const HeroImage: FC<HeroImageProps> = ({ image }) => {
  // handlers
  const handleInput: FormEventHandler<HTMLElement> = (event) => {
    console.log(event.currentTarget.textContent);
  };

  return (
    <div className="mb-10">
      {image ? (
        <figure className="flex flex-col gap-5">
          <Image
            src={heroImage}
            alt="test"
            className="mx-auto object-contain"
          />
          <figcaption
            contentEditable
            onInput={handleInput}
            data-placeholder="Write a caption here.."
            className="figcaption"
          >
            An image of a test
          </figcaption>
        </figure>
      ) : (
        <div className="flex flex-col gap-5">
          {/* upload area */}
          <div className="w-full h-[350px] py-[80px] px-2 flex flex-col gap-6 border-2 border-dashed border-black/30 rounded-xl">
            <Image
              src={uploadSvg}
              alt="upload icon"
              className="mx-auto"
            />
            <div className="flex flex-col gap-3">
              <h4 className="text-2xl text-center font-medium">
                Upload a Hero Image
              </h4>
              <p className="text-sm text-[#666666] text-center">
                You can upload PNG or JPEG Image. Minimum dimensions must be
                500px X 500px
              </p>
            </div>
          </div>
          {/* caption */}
          <div className="flex items-center justify-end">
            <button className="bg-[#f4f4f4] py-2 px-3 text-[#666666] text-[17px] flex items-center justify-center gap-2 rounded">
              <Image src={captionSvg} alt="caption icon" />
              <span>Add an Image caption</span>
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default HeroImage;
