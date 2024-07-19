// components
import EmptyState from "./empty-state";
import ArticleListItem from "./list-item";

const ArticlesList = () => {
  return (
    <div className="pt-5 pb-40">
      <div className="container">
        <EmptyState />
        <div className="mx-auto max-w-[852px] flex flex-col gap-5">
          <ArticleListItem />
          <ArticleListItem />
        </div>
      </div>
    </div>
  )
}

export default ArticlesList;