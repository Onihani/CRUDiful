// react
import { FC } from "react";

// components
import EmptyState from "./empty-state";
import DraftListItem from "./draft-list-item";
import ArticleListItem from "./article-list-item";

// ui components
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

// types
import { Article, DraftArticle } from "@/common/types";
type ArticlesListProps = {
  error: boolean;
  loading: boolean;
  articles: Article[];
  drafts: DraftArticle[];
};

const ArticlesList: FC<ArticlesListProps> = ({
  error,
  loading,
  articles,
  drafts,
}) => {
  const hasArticles =
    !loading && !error && (articles.length > 0 || drafts.length > 0);

  if (loading) {
    return (
      <div className="pt-5 pb-40">
        <div className="container">
          <div className="mx-auto max-w-[852px] flex justify-center items-center">
            <p className="text-[#666666] text-2xl">Loading...</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="pt-5 pb-40">
      <div className="container">
        {!hasArticles ? (
          <EmptyState />
        ) : (
          <div className="mx-auto max-w-[852px]">
            <Tabs defaultValue="articles">
              <TabsList>
                <TabsTrigger value="articles">Articles</TabsTrigger>
                <TabsTrigger value="drafts">Drafts</TabsTrigger>
              </TabsList>
              <TabsContent value="articles">
                <div className="flex flex-col gap-5">
                  {articles.map((article) => (
                    <ArticleListItem key={article.id} article={article} />
                  ))}
                </div>
              </TabsContent>
              <TabsContent value="drafts">
                <div className="flex flex-col gap-5">
                  {drafts.map((draft) => (
                    <DraftListItem key={draft.id} draft={draft} />
                  ))}
                </div>
              </TabsContent>
            </Tabs>
          </div>
        )}
      </div>
    </div>
  );
};

export default ArticlesList;
