import { usePageContext } from "../../context/PageContext";
import useGetPages from "../../hooks/page/useGetPages";
import AddPage from "./AddPage";
import SiderbarPage from "./SiderbarPage";

const SiderbarPages = () => {
  const { pages } = usePageContext();
  const { loading } = useGetPages();

  return (
    <div className="mt-5 sm:mt-16 px-2">
      <div className="flex items-center justify-between">
        <h2 className="text-xs opacity-70">Pages</h2>
        <AddPage parentPageId={""} />
      </div>

      {loading && <span className="light-loader"></span>}
      {!loading && pages.length === 0 && (
        <p className="mt-2 text-sm opacity-70">No pages inside.</p>
      )}
      {!loading &&
        pages
          .filter((page) => page.parentPageId === "") //root pages
          .map((page) => <SiderbarPage page={page} key={page.id} />)}
    </div>
  );
};

export default SiderbarPages;
