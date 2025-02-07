import { Outlet } from "react-router-dom";
import Sidebar from "../sidebar/Sidebar";
import {  useState } from "react";
import MobileNavigation from "../sidebar/MobileNavigation";

const ProtectedLayout = () => {
    const [siderbarWidth, setSidebarWidth] = useState(300);

    const onWidthChange = (width) => {
        setSidebarWidth(width);
    }
  return (
    <div className="flex min-h-screen w-full bg-[#191919] text-[#d4d4d4]">
      <div className="md:block hidden" style={{width: `${siderbarWidth}px`}}>
        <Sidebar onWidthChange={onWidthChange} />
      </div>
      <div className="block md:hidden">
        <MobileNavigation/>
      </div>
      <div className="flex-1 h-full w-full">
      <Outlet />
      </div>
    </div>
  );
};

export default ProtectedLayout;
