import { useState } from "react";
import AddPage from "./AddPage";
import arrowDown from "../../assets/arrow-down.svg";
import arrowUp from "../../assets/arrow-up.svg";
import { usePageContext } from "../../context/PageContext";
import DeletePage from "./DeletePage";
import { Link } from "react-router-dom";

const SiderbarPage = ({ page }) => {
  const [hover, setHover] = useState(false);
  const [showNested, setShowNested] = useState(false);
  const { pages } = usePageContext();

  const hasParent = page.parentPageId === "" ? false : true;

  return (
    <div className={`${hasParent ? "ml-4" : "pl-1"}`}>
      <div
        className={`flex items-center justify-between gap-5 my-2 hover:bg-neutral-600 rounded-md`}
      >
        <div className="flex items-center gap-1">
          {hover && (
            <button
              onClick={() => setShowNested(!showNested)}
              onMouseLeave={() => setHover(false)}
            >
              <img src={showNested ? arrowUp : arrowDown} />
            </button>
          )}
          {!hover && (
            <span onMouseOver={() => setHover(true)}>
              {page.icon ? page.icon : <span>📄</span>}
            </span>
          )}
          <Link to={"/page/" + page.id} className="text-nowrap">{page.title}</Link>
        </div>

        <div className="flex items-center">
          <DeletePage deleteId={page.id}/>
          <AddPage parentPageId={page.id} />
        </div>
      </div>

      {showNested &&
        pages
          .filter((childPage) => childPage.parentPageId === page.id) //children
          .map((childPage) => (
            <SiderbarPage key={childPage.id} page={childPage} />
          ))}
    </div>
  );
};

export default SiderbarPage;
