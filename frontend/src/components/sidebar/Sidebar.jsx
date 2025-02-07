import { useRef } from "react";
import Logout from "../auth/Logout";
import UserProfile from "./UserProfile";
import searchIcon from "../../assets/search.svg";
import homeIcon from "../../assets/home.svg";
import SidebarLink from "./SidebarLink";
import SiderbarPages from "./SiderbarPages";

const Sidebar = ({ onWidthChange }) => {
  const isResizing = useRef(false);

  const handleMouseMove = (ev) => {
    if (!isResizing.current) return;
    let width = ev.clientX;
    if (width < 200) width = 200;
    if (width > 400) width = 400;

    onWidthChange(width);
  };

  const handleMouseUp = () => {
    isResizing.current = false;
    document.removeEventListener("mousemove", handleMouseMove);
    document.removeEventListener("mouseup", handleMouseUp);
  };

  const handleMouseDown = (ev) => {
    ev.preventDefault();
    ev.stopPropagation();

    isResizing.current = true;
    document.addEventListener("mousemove", handleMouseMove);
    document.addEventListener("mouseup", handleMouseUp);
  };
  return (
    <div className="relative bg-[#202020] h-full w-full p-3">
      <div className="flex flex-col justify-between h-full overflow-x-scroll">
        <div>
          <div>
            <UserProfile />
            <SidebarLink label="Search" link={"/search"} icon={searchIcon} />
            <SidebarLink label="Home" link={"/"} icon={homeIcon} />
          </div>

          <SiderbarPages/>

        </div>

        

        <div className="mx-auto">
          <Logout />
        </div>
      </div>

      <div
        onMouseDown={handleMouseDown}
        className="absolute top-0 right-0 w-[1px] hover:w-1 h-full bg-[#454545] cursor-ew-resize"
      />
    </div>
  );
};

export default Sidebar;
