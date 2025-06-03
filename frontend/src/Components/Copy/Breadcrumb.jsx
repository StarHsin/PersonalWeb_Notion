import { MdHome, FaChevronRight } from "./icon";
import { useNavigate, useLocation } from "react-router-dom";

export default function Breadcrumb() {
  const navigate = useNavigate();
  const location = useLocation();
  let pathnames = location.pathname.split("/").filter((x) => x);

  // ✅ 確保 Photos 前面一定有 Activity
  if (pathnames.includes("Photos") && !pathnames.includes("Activity")) {
    pathnames = ["Activity", "Photos"];
  }

  return (
    <div className="flex">
      <ol className="inline-flex items-center space-x-1 md:space-x-2 rtl:space-x-reverse">
        {/* 首頁按鈕 */}
        <li className="inline-flex items-center">
          <button
            onClick={() => navigate("/")}
            className="inline-flex items-center text-sm font-medium text-white hover:text-blue-600"
          >
            <MdHome className="w-5 h-5" />
            <span className="ms-1">首頁</span>
          </button>
        </li>

        {/* 動態麵包屑 */}
        {pathnames.map((name, index) => {
          const routeTo = "/" + pathnames.slice(0, index + 1).join("/");
          const isLast = index === pathnames.length - 1;

          return (
            <li key={index} className="flex items-center">
              <FaChevronRight className="w-4 h-4 text-white mx-1" />
              {isLast ? (
                <span className="text-sm font-medium text-white">
                  {convertBreadcrumbName(name)}
                </span>
              ) : (
                <button
                  onClick={() => navigate(routeTo)}
                  className="text-sm font-medium text-white hover:text-blue-600"
                >
                  {convertBreadcrumbName(name)}
                </button>
              )}
            </li>
          );
        })}
      </ol>
    </div>
  );
}

/**
 * 📌 轉換路徑名稱，讓麵包屑顯示更友善
 */
function convertBreadcrumbName(name) {
  const nameMap = {
    Activity: "活動總覽",
    Photos: "活動相簿",
    awards: "獎項",
  };
  return nameMap[name] || name; // 預設回傳原名稱
}
