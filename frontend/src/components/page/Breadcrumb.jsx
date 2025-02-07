import { useEffect, useState } from "react";
import { usePageContext } from "../../context/PageContext";
import { Link } from "react-router-dom";

const Breadcrumb = ({ pageId }) => {
  const { pages } = usePageContext();
  const [breadcrumbs, setBreadcrumbs] = useState([]);

  useEffect(() => {
    const findPageById = (id) => {
      return pages.find((page) => page.id === id);
    };
    const getBreadcrumbs = (id) => {
      const page = findPageById(id);

      if (!page) {
        console.error(`Page with id ${id} not found`);
        return [];
      }

      const currentBreadcrumbs = [page];

      if (page.parentPageId) {
        const parentBreadcrumbs = getBreadcrumbs(page.parentPageId);
        return [...parentBreadcrumbs, ...currentBreadcrumbs];
      }

      return currentBreadcrumbs;
    };
    const trail = getBreadcrumbs(pageId);
    setBreadcrumbs(trail);
  }, [pageId, pages]);

  return (
    <div className="py-10 px-4 sm:p-5">
      <div className="grid grid-cols-4 lg:grid-cols-9 gap-1">
        {breadcrumbs.length > 0 ? (
          breadcrumbs.map((breadcrumb, index) => (
            <div key={breadcrumb.id} className="flex items-center justify-evenly">
              <Link to={"/page/" + breadcrumb.id} key={breadcrumb.id} className="text-xs opacity-70 p-2 hover:opacity-100 hover:bg-neutral-600 rounded-md duration-200">
                {breadcrumb.icon ? breadcrumb.icon : <span>📄</span>}
                {breadcrumb.title}
              </Link>
              <span className="text-xs opacity-50">{index < breadcrumbs.length - 1 && <span>/</span>}</span>
            </div>
          ))
        ) : (
          <span></span>
        )}
      </div>
    </div>
  );
};

export default Breadcrumb;
