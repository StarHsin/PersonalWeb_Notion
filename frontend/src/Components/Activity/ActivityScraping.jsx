import { LazyLoadImage } from "react-lazy-load-image-component";
import "react-lazy-load-image-component/src/effects/blur.css";
import React from "react";

export default function ActivityScraping({ folders, onFolderClick }) {
  return (
    <div className="max-w-5xl mx-auto p-4">
      {folders.map((folder, index) => {
        const displayedFolderName = folder.name.startsWith("00")
          ? folder.name.slice(2)
          : folder.name;

        return (
          <button
            key={index}
            className="mb-6 w-full text-left flex flex-col justify-center items-center"
            onClick={() => onFolderClick(folder.name)}
          >
            <div className="text-[2rem] font-bold text-white mb-2">
              {displayedFolderName}
            </div>
            <div className="grid grid-cols-4 gap-4">
              {folder.images.map((src, idx) => (
                <LazyLoadImage
                  key={idx}
                  className="w-full h-auto rounded-lg mb-4"
                  src={src}
                  alt=""
                  effect="blur"
                />
              ))}
            </div>
          </button>
        );
      })}
    </div>
  );
}
