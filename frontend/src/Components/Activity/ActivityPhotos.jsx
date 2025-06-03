import PhotoShow from "./PhototShow";
import StickyNavbar from "../StickyNavbar";
import { useLocation } from "react-router-dom";

export default function ActivityPhotos() {
  const location = useLocation();
  const folderName = location.state?.folderName || "未選擇活動"; // 預設值

  const displayedFolderName = folderName.startsWith("00")
    ? folderName.slice(2) // 如果以 "00" 開頭，則移除前兩個字元
    : folderName; // 否則，保持原樣

  return (
    <nav className="absolute w-full min-h-screen pt-20 bg-slate-800">
      <StickyNavbar />
      <div className="flex flex-col justify-center items-center border-4 border-transparent rounded-lg bg-transparent">
        <div className="text-[2rem] leading-none font-bold text-white">
          {displayedFolderName}
        </div>
        <PhotoShow folderName={folderName} />
      </div>
    </nav>
  );
}
