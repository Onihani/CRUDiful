// react
import { FC } from "react";
// imports
import { ChevronDown } from "lucide-react";

// ui components
import { Button } from "@/components/ui/button";

// helpers
import { calcTimeAgo } from "@/common/helpers";

// types
import { Article } from "@/common/types";
type ArticleListItemProps = {
  article: Article;
};

const ArticleListItem: FC<ArticleListItemProps> = ({ article }) => {
  return (
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
      <div className="md:col-span-9 flex flex-col gap-5">
        <div className="flex flex-col gap-2">
          <h3 className="text-2xl font-semibold">{article.title}</h3>
          <span className="text-[#333333] text-sm">
            Published {calcTimeAgo(new Date(article.createdAt))} {"\u2022"} 5
            minute read
          </span>
          <p className="text-[#666666] text-[17px]">
            {article.content}
          </p>
        </div>
        <div className="flex flex-col md:flex-row md:items-center md:justify-end gap-3.5">
          <Button
            variant="outline"
            className=" hover:brightness-90 !text-[#222222]"
          >
            Open Blog
          </Button>
          <Button
            variant="outline"
            className=" hover:brightness-90 !text-[#222222]"
          >
            <span>Manage</span>
            <ChevronDown size={16} className="ml-2" />
          </Button>
        </div>
      </div>
    </div>
  );
};

export default ArticleListItem;
