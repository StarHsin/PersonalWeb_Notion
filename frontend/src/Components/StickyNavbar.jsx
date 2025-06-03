import React, { useState } from "react";
import { FaUser, AiOutlineMenu } from "./icon";
import SideBar from "./SideBar";
import CustomBreadcrumb from "./CustomBreadcrumb";

export default function StickyNavbar() {
  const [isOpen, setIsOpen] = useState(false);

  const toggleDrawer = () => {
    setIsOpen(!isOpen);
    console.log("isOpen", isOpen);
  };

  return (
    <nav className="fixed w-full top-0 start-0 border-b-2 border-gray-500 z-50">
      <div className="flex bg-slate-800 items-center justify-between p-4">
        <button
          onClick={toggleDrawer}
          className="flex items-center justify-center text-white bg-transparent hover:bg-gray-500 rounded-lg w-10 h-10 border-2 border-gray-500 "
        >
          <AiOutlineMenu className="w-8 h-8" />
        </button>
        <CustomBreadcrumb />
        <button className="w-10 h-10 flex items-center justify-center overflow-hidden bg-white rounded-full">
          <FaUser className="w-10 h-10 text-gray-500 relative top-1" />
        </button>
      </div>
      <SideBar isOpen={isOpen} toggleDrawer={toggleDrawer} />
    </nav>
  );
}
