import { Link } from "react-router-dom";
import menuIcon from "../../assets/menu.svg";
import closeIcon from "../../assets/close.svg";
import lightLogo from "../../assets/light-logo.svg";
import { useState } from "react";
import UserProfile from "./UserProfile";
import SidebarLink from "./SidebarLink";
import searchIcon from "../../assets/search.svg";
import homeIcon from "../../assets/home.svg";
import SiderbarPages from "./SiderbarPages";
import Logout from "../auth/Logout";
const MobileNavigation = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <div className="md:hidden absolute top-0 py-3 px-5 w-full bg-[#202020] z-50">
      <div className="flex items-center justify-between">
        <Link to={"/"}>
          <img src={lightLogo} />
        </Link>
        <button onClick={() => setIsMenuOpen(!isMenuOpen)}>
          <img src={isMenuOpen ? closeIcon : menuIcon} />
        </button>
      </div>
      {isMenuOpen &&
        <div className="py-5">
          <UserProfile/>
          <SidebarLink label="Search" link={"/search"} icon={searchIcon} />
          <SidebarLink label="Home" link={"/"} icon={homeIcon} />

          <SiderbarPages/>

          
          <div className="mt-5">
            <Logout />
          </div>
    
        </div>
      }
    </div>
  );
};

export default MobileNavigation;
