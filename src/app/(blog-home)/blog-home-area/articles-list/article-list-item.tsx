"use client";

// react
import { FC, useState } from "react";
// imports
import { toast } from "sonner";
// next
import Link from "next/link";
import { ChevronDown, Loader } from "lucide-react";

// ui components
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

// hooks
import { useDeleteArticle } from "@/common/hooks";

// helpers
import { calcTimeAgo, getBlogSummary, isJsonString } from "@/common/helpers";

// types
import { Article, ArticleContent } from "@/common/types";
type ArticleListItemProps = {
  article: Article;
};

const ArticleListItem: FC<ArticleListItemProps> = ({ article }) => {
  // state
  const [deleting, setDeleting] = useState(false);
  const [previewModalOpen, setPreviewModalOpen] = useState(false);
  const [deleteArticleModalOpen, setDeleteArticleModalOpen] = useState(false);

  // hooks
  const { mutateAsync: deleteArticle } = useDeleteArticle();

  // handlers
  const handleDeleteArticle = async () => {
    setDeleting(true);

    try {
      await deleteArticle({
        id: article.id,
        type: "published",
      });
      setDeleteArticleModalOpen(false);

      // show toast
      toast.success("Article deleted successfully");
    } catch (error) {
      // show toast
      toast.error("Failed to delete article");
    } finally {
      setDeleting(false);
    }
  };

  return (
    <>
      {/* article */}
      <div className="bg-white p-6 grid md:grid-cols-12 gap-7 border border-black/10 rounded-xl shadow-sm">
        {/* image */}
        <div className="w-full md:col-span-3">
          <img
            src={article.image.url}
            alt={article?.image?.alt ?? "article image"}
            className="w-full rounded"
          />
        </div>
        {/* content */}
        <div className="md:col-span-9 flex flex-col gap-5.value.substring(0, 20).trim();">
          <div className="flex flex-col gap-2">
            <h3 className="text-2xl font-semibold">{article.title}</h3>
            <span className="text-[#333333] text-sm">
              Published {calcTimeAgo(new Date(article.createdAt))} {"\u2022"} 5
              minute read
            </span>
            <p className="text-[#666666] text-[17px]">
              {getBlogSummary(article.content || "")}
            </p>
          </div>
          <div className="flex flex-col md:flex-row md:items-center md:justify-end gap-3.5">
            <Button
              variant="outline"
              onClick={() => setPreviewModalOpen(true)}
              className=" hover:brightness-90 !text-[#222222]"
            >
              Open Blog
            </Button>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button
                  variant="outline"
                  className=" hover:brightness-90 !text-[#222222]"
                >
                  <span>Manage</span>
                  <ChevronDown size={14} className="ml-2" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent>
                <DropdownMenuLabel>Manage Article</DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem asChild>
                  <Link href={`/editor/published/${article.id}`}>Edit</Link>
                </DropdownMenuItem>
                <DropdownMenuItem
                  onClick={() => setDeleteArticleModalOpen(true)}
                >
                  Delete
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>
      </div>
      {/* delete draft modal */}
      <Dialog
        open={deleteArticleModalOpen}
        onOpenChange={setDeleteArticleModalOpen}
      >
        <DialogContent className="bg-white p-6 flex flex-col gap-6">
          <DialogHeader className="flex flex-col gap-1">
            <DialogTitle className="text-xl font-semibold">
              Delete Article
            </DialogTitle>
            <DialogDescription className="text-[#737373] text-base">
              Are you sure you want to delete this article? This action cannot
              be undone.
            </DialogDescription>
          </DialogHeader>
          <div className="flex flex-col gap-3">
            <Button
              disabled={deleting}
              onClick={handleDeleteArticle}
              className="bg-[#86005E] hover:bg-[#86005E] hover:brightness-75 !py-[9px] !px-[29px] !h-auto text-white !text-base font-medium! shadow"
            >
              {deleting && <Loader size={20} className="spin mr-2" />}
              <span>
                {deleting ? "Deleting Article" : "Yes Delete Article"}
              </span>
            </Button>
            <Button
              disabled={deleting}
              onClick={() => setDeleteArticleModalOpen(false)}
              className="bg-white hover:bg-white hover:brightness-75 !py-[9px] !px-[29px] !h-auto text-[#333333] !text-base font-medium! border shadow"
            >
              Cancel
            </Button>
          </div>
        </DialogContent>
      </Dialog>
      {/* preview dialog */}
      <Dialog open={previewModalOpen} onOpenChange={setPreviewModalOpen}>
        <DialogContent className="bg-white p-6 !max-h-[calc(100vh_-_20%)] !max-w-4xl !w-full overflow-hidden grid-rows-[auto_1fr]">
          <DialogHeader>
            <DialogTitle className="text-xl font-semibold">
              Article Preview
            </DialogTitle>
          </DialogHeader>
          <div className="flex flex-col gap-3 overflow-y-scroll">
            <div className="max-w-4xl mx-auto py-5">
              <h2 className="heading">{article.title}</h2>
              <div className="mb-10">
                <figure className="flex flex-col gap-5">
                  <img
                    src={article.image.url}
                    alt={article?.image?.alt ?? "N/A"}
                    className="mx-auto object-contain"
                  />

                  <figcaption>{article.image?.alt ?? "N/A"}</figcaption>
                </figure>
              </div>
              <hr className="border-black/20 mb-8" />
              {typeof article?.content === "string" &&
              isJsonString(article.content) &&
              Array.isArray(JSON.parse(article.content)) ? (
                (JSON.parse(article.content) as ArticleContent[]).map(
                  (contentItem) => {
                    switch (contentItem.type) {
                      case "sub-heading":
                        return (
                          <h3 key={contentItem.itemID} className="sub-heading">
                            {contentItem.value}
                          </h3>
                        );
                      case "paragraph":
                        return (
                          <p key={contentItem.itemID} className="paragraph">
                            {contentItem.value}
                          </p>
                        );
                      case "divider":
                        return (
                          <hr key={contentItem.itemID} className="divider" />
                        );
                      default:
                        return null;
                    }
                  }
                )
              ) : (
                <p>N/A</p>
              )}
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default ArticleListItem;
