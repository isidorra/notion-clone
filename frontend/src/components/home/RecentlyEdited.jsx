import clock from "../../assets/clock.svg";
import { usePageContext } from "../../context/PageContext";
import PageCard from "../page/PageCard";

const RecentlyEdited = () => {
  const {pages} = usePageContext();
  const sortedPages = pages.slice().sort((a, b) => new Date(b.updatedAt) - new Date(a.updatedAt));
  return (
    <div>
      <div className="flex items-center gap-2 text-sm mt-5 sm:mt-10 opacity-60">
        <img src={clock} />
        <h2>Recently edited</h2>
      </div>

      <p>{pages && pages.length === 0 && <p className="text-sm opacity-60 mt-2">No pages.</p>}</p>

      <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-5 gap-5 mt-3">
        {sortedPages.map((page) => 
          <PageCard page={page} key={page.id}/>
        )}
      </div>
    </div>
  );
};

export default RecentlyEdited;
