import React, { useState } from "react";
import { AiOutlineClose } from "react-icons/ai";
import { GrCertificate } from "react-icons/gr";
import { PiNotePencilBold } from "react-icons/pi";
import { FaChevronDown, FaRegFileAlt } from "react-icons/fa";
import { FiActivity } from "react-icons/fi";
import { useNavigate } from "react-router-dom";

export default function SideBar({ isOpen, toggleDrawer }) {
  const [dropDown, setDropDown] = useState(false);
  const navigate = useNavigate();

  const toggleDropDown = () => {
    setDropDown(!dropDown);
  };

  const handleNavigateToAwards = () => {
    navigate("/awards");
  };

  const handleActivity = () => {
    navigate("/Activity");
  };

  const handleWeb = () => {
    navigate("/Web");
  };

  return (
    <div>
      <div
        className={`fixed top-0 left-0 z-40 h-screen p-4 overflow-y-auto transition-transform ${
          isOpen ? "translate-x-0" : "-translate-x-full"
        } bg-white w-64`}
        tabIndex="-1"
        aria-labelledby="drawer-navigation-label"
      >
        <h5 className="text-base font-semibold text-gray-500 uppercase">
          Menu
        </h5>
        <button
          onClick={toggleDrawer}
          className="text-gray-500 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg w-8 h-8 absolute top-2.5 right-2.5 inline-flex items-center justify-center"
        >
          <AiOutlineClose className="w-5 h-5" />
        </button>
        <div className="py-4 overflow-y-auto">
          <ul className="space-y-2 font-medium">
            <li>
              <button
                onClick={handleNavigateToAwards}
                className="flex items-center w-full p-2 text-gray-500 hover:text-gray-900 rounded-lg hover:bg-gray-100"
              >
                <GrCertificate className="w-5 h-5" />
                <span className="ms-3 font-bold">獲獎紀錄</span>
              </button>
            </li>
            <li>
              <button
                className="flex items-center w-full p-2 text-gray-500 hover:text-gray-900 rounded-lg hover:bg-gray-100"
                onClick={toggleDropDown}
              >
                <PiNotePencilBold className="w-5 h-5" />
                <span className="flex-1 font-bold ms-3 text-left rtl:text-right whitespace-nowrap">
                  筆記
                </span>
                <FaChevronDown />
              </button>
              <ul className={`py-2 space-y-2 ${dropDown ? "block" : "hidden"}`}>
                <li>
                  <button
                    onClick={handleWeb}
                    className="flex items-center w-full p-2 text-gray-900 transition duration-75 rounded-lg pl-11 group hover:bg-gray-100"
                  >
                    Web
                  </button>
                </li>
                <li>
                  <div className="flex items-center w-full p-2 text-gray-900 transition duration-75 rounded-lg pl-11 group hover:bg-gray-100">
                    微積分
                  </div>
                </li>
                <li>
                  <div className="flex items-center w-full p-2 text-gray-900 transition duration-75 rounded-lg pl-11 group hover:bg-gray-100 dark:text-white dark:hover:bg-gray-700">
                    工程數學
                  </div>
                </li>
                <li>
                  <div className="flex items-center w-full p-2 text-gray-900 transition duration-75 rounded-lg pl-11 group hover:bg-gray-100 dark:text-white dark:hover:bg-gray-700">
                    電路學
                  </div>
                </li>
              </ul>
            </li>
            <li>
              <button className="flex items-center w-full p-2 text-gray-500 hover:text-gray-900 rounded-lg hover:bg-gray-100">
                <FaRegFileAlt className="w-5 h-5" />
                <span className="ms-3 font-bold">作品集</span>
              </button>
            </li>
            <li>
              <button
                onClick={handleActivity}
                className="flex items-center w-full p-2 text-gray-500 hover:text-gray-900 rounded-lg hover:bg-gray-100"
              >
                <FiActivity className="w-5 h-5" />
                <span className="ms-3 font-bold">活動</span>
              </button>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
}
