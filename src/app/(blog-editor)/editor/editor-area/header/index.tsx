"use client";

// react
import { FC, useState } from "react";
// next
import Link from "next/link";
import { useRouter } from "next/navigation";
// imports
import { toast } from "sonner";
import { ChevronLeft, Loader } from "lucide-react";

// ui components
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

// config
import { axios } from "@/common/config";

// hooks
import {
  useEditorForm,
  useSaveArticle,
  useUpdateArticle,
} from "@/common/hooks";

// schema
import { draftSchema, articleSchema } from "@/common/schemas";

// types
type HeaderProps = {
  articleId?: string;
  articleType?: "draft" | "published";
};

const EditorHeader: FC<HeaderProps> = ({ articleId, articleType }) => {
  // router
  const router = useRouter();

  // hooks
  const form = useEditorForm();
  const { mutateAsync: newArticle } = useSaveArticle();
  const { mutateAsync: updateArticle } = useUpdateArticle();

  // state
  const [publishing, setPublishing] = useState(false);
  const [savingDraft, setSavingDraft] = useState(false);
  const [publishedModalOpen, setPublishedModalOpen] = useState(false);
  const [draftSavedModalOpen, setDraftSavedModalOpen] = useState(false);
  const [newArticleData, setNewArticleData] = useState<{
    id: string;
    type: "draft" | "published";
  }>();

  // handlers
  const handleSaveDraft = async () => {
    setSavingDraft(true);

    try {
      const data = form.getValues();

      // validate data
      const validationResult = draftSchema.safeParse(data);

      if (!validationResult.success) {
        console.log(validationResult.error.errors);
        validationResult.error.errors.forEach((error) => {
          toast.error(error.message);
        });
        return;
      }

      // check if article as a file image and upload it before saving
      let imageUrl: string | undefined;
      if (data.image?.url instanceof File) {
        const formData = new FormData();
        formData.append("file", data.image.url);

        const response = await axios.post("/upload/draft", formData);
        imageUrl = response.data.url as string;
      } else {
        imageUrl = data.image?.url;
      }

      // prepare data for saving
      const draftData = {
        title: data.title,
        image: data.image?.url
          ? {
              alt: data.image.alt,
              url: imageUrl!,
            }
          : undefined,
        content: JSON.stringify(data.content),
      };

      if (articleId && articleType === "draft") {
        // update draft
        await updateArticle({
          data: draftData,
          type: "draft",
          id: articleId,
        });
      } else {
        // save draft
        const result = (await newArticle({
          data: draftData,
          type: "draft",
        })) as { draftId: string };

        // set new article data
        setNewArticleData({
          id: result.draftId!,
          type: "draft",
        });
      }

      // show draft saved modal
      setDraftSavedModalOpen(true);
    } catch (error) {
      console.log(error);
      toast.error("Failed to save draft. Please try again.");
    } finally {
      setSavingDraft(false);
    }
  };

  const handlePublish = async () => {
    setPublishing(true);

    try {
      const data = form.getValues();

      // validate data
      const validationResult = articleSchema.safeParse(data);

      if (!validationResult.success) {
        console.log(validationResult.error.errors);
        validationResult.error.errors.forEach((error) => {
          toast.error(error.message);
        });
        return;
      }

      // check if article as a file image and upload it before saving
      let imageUrl: string | undefined;
      if (data.image?.url instanceof File) {
        const formData = new FormData();
        formData.append("file", data.image.url);

        const response = await axios.post("/upload/article", formData);
        imageUrl = response.data.url as string;
      } else {
        imageUrl = data.image?.url;
      }

      // prepare data for saving
      const articleData = {
        title: data.title,
        image: data.image?.url
          ? {
              alt: data.image.alt,
              url: imageUrl!,
            }
          : undefined,
        content: JSON.stringify(data.content),
      };

      if (articleId && articleType === "published") {
        // update article
        await updateArticle({
          data: articleData,
          type: "article",
          id: articleId,
        });
      } else {
        // save article
        const result = (await newArticle({
          data: articleData,
          type: "article",
        })) as { articleId: string };

        // set new article data
        setNewArticleData({
          id: result.articleId!,
          type: "published",
        });
      }

      // show published modal
      setPublishedModalOpen(true);
    } catch (error) {
      console.log(error);
      toast.error("Failed to publish article. Please try again.");
    } finally {
      setPublishing(false);
    }
  };

  return (
    <>
      {/* header */}
      <header className="bg-[#F4F4F4]">
        <div className="p-8 flex flex-col md:flex-row md:items-center md:justify-between gap-8">
          {/* back link */}
          <Link
            href="/"
            className="text-lg font-medium flex items-center gap-2"
          >
            <ChevronLeft size={24} />
            <span>Blog Editor</span>
          </Link>
          {/* cta buttons */}
          <div className="flex flex-col md:flex-row md:items-center gap-3">
            <Button
              disabled={savingDraft || publishing}
              onClick={handleSaveDraft}
              className="bg-white hover:bg-white hover:brightness-75 !py-[9px] !px-[29px] !h-auto text-[#333333] !text-base font-medium! shadow"
            >
              {savingDraft && <Loader size={20} className="spin mr-2" />}
              <span>{savingDraft ? "Saving Draft" : "Save as Draft"}</span>
            </Button>
            <Button
              disabled={savingDraft || publishing}
              onClick={handlePublish}
              className="bg-[#86005E] hover:bg-[#86005E] hover:brightness-75 !py-[9px] !px-[29px] !h-auto text-white !text-base font-medium! shadow"
            >
              {publishing && <Loader size={20} className="spin mr-2" />}
              <span>{publishing ? "Publishing Blog" : "Publish Blog"}</span>
            </Button>
          </div>
        </div>
      </header>
      {/* draft saved modal */}
      <Dialog open={draftSavedModalOpen} onOpenChange={setDraftSavedModalOpen}>
        <DialogContent className="bg-white p-6 flex flex-col gap-6">
          <DialogHeader className="flex flex-col gap-1">
            <DialogTitle className="text-xl font-semibold">
              Draft Saved Successfully
            </DialogTitle>
            <DialogDescription className="text-[#737373] text-base">
              Draft has been saved successfully. You can continue editing it or
              publish later.
            </DialogDescription>
          </DialogHeader>
          <div className="flex flex-col gap-3">
            <Button
              onClick={() => {
                if (newArticleData) {
                  router.replace(
                    `/editor/${newArticleData.type}/${newArticleData.id}`,
                  );
                }
                setDraftSavedModalOpen(false);
              }}
              className="bg-[#86005E] hover:bg-[#86005E] hover:brightness-75 !py-[9px] !px-[29px] !h-auto text-white !text-base font-medium! shadow"
            >
              Continue Editing
            </Button>
            <Button
              asChild
              className="bg-white hover:bg-white hover:brightness-75 !py-[9px] !px-[29px] !h-auto text-[#333333] !text-base font-medium! border shadow"
            >
              <Link href="/">Go to Dashboard</Link>
            </Button>
          </div>
        </DialogContent>
      </Dialog>
      {/* article saved modal */}
      <Dialog open={publishedModalOpen} onOpenChange={setPublishedModalOpen}>
        <DialogContent className="bg-white p-6 flex flex-col gap-6">
          <DialogHeader className="flex flex-col gap-1">
            <DialogTitle className="text-xl font-semibold">
              Article Published Successfully
            </DialogTitle>
            <DialogDescription className="text-[#737373] text-base">
              Article has been published successfully. You can view it on your
              {"blog's"} dashboard area or continue editing it.
            </DialogDescription>
          </DialogHeader>
          <div className="flex flex-col gap-3">
            <Button
              onClick={() => {
                if (newArticleData) {
                  router.replace(
                    `/editor/${newArticleData.type}/${newArticleData.id}`,
                  );
                }
                setPublishedModalOpen(false);
              }}
              className="bg-[#86005E] hover:bg-[#86005E] hover:brightness-75 !py-[9px] !px-[29px] !h-auto text-white !text-base font-medium! shadow"
            >
              Continue Editing
            </Button>
            <Button
              asChild
              className="bg-white hover:bg-white hover:brightness-75 !py-[9px] !px-[29px] !h-auto text-[#333333] !text-base font-medium! border shadow"
            >
              <Link href="/">Go to Dashboard</Link>
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default EditorHeader;
