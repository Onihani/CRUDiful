type ArticleHero = {
  url: string;
  alt?: string;
};

export type Article = {
  id: string;
  title: string;
  image: ArticleHero;
  content: string;
  createdAt: Date | number;
  updatedAt: Date | number;
};

export type DraftArticle = Article & {
  publishedArticleId?: string;
};

export type Blog = {
  cover?: string;
  articles: Article[];
  drafts: DraftArticle[];
};

export type BlogContent = {
  type: "sub-heading" | "paragraph" | "divider";
  itemID: string;
  value?: string | undefined;
};


export type ArticleContent = {
  id?: string;
  itemID: string;
  type: "sub-heading" | "paragraph" | "divider";
  value?: string;
}