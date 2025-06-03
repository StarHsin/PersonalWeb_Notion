import { useEffect, useMemo, useState } from "react";
import DynamicBackgrounds from "./DynamicBackgrounds";
import StickyNavbar from "./StickyNavbar";

export default function HomePage() {
  const [height, setHeight] = useState(window.innerHeight);
  const [width, setWidth] = useState(window.innerWidth);

  useEffect(() => {
    const handleResize = () => {
      setHeight(window.innerHeight);
      setWidth(window.innerWidth);
    };

    // 註冊resize事件
    window.addEventListener("resize", handleResize);
    // 清理事件監聽器
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return (
    <div className="w-full overflow-hidden">
      <div
        className="flex items-center justify-center"
        style={{ height: `${height + 75}px` }}
      >
        <div className="flex flex-col justify-center items-center">
          <div className="text-[10rem] leading-none font-bold bg-gradient-to-b from-blue-700 via-blue-600 to-blue-50 bg-clip-text text-transparent">
            你好
          </div>
          <div className="text-[3.5rem] leading-none font-bold text-white">
            我是李慧芯
          </div>
          <div className="font-bold text-white">
            目前還在開發中造成不便請見諒。
          </div>
        </div>
        <DynamicBackgrounds height={height} />
      </div>

      <div className="h-[50px] bg-stone-200">
        <div
          className="relative overflow-hidden right-2 -rotate-2 origin-top-left"
          style={{ height: "50px", width: `${width}px` }}
        >
          <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-b from-slate-800 via-blue-600 to-stone-200 transform -rotate-1.5 origin-top-left" />
        </div>
      </div>

      {/*
            <div className="flex items-center justify-center bg-stone-200" style={{ height: `${height-75}px`}}>
              <Schedule />
            </div>
            */}

      <StickyNavbar />
    </div>
  );
}
