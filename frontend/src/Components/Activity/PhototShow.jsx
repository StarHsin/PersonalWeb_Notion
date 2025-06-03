import React, { useEffect, useState } from "react";
import { LazyLoadImage } from "react-lazy-load-image-component";
import "react-lazy-load-image-component/src/effects/blur.css";
import { ref, listAll, getDownloadURL } from "firebase/storage";
import { storage } from "../../../firebaseConfig";
import Lightbox from "./Lightbox";
import { Progress } from "@/Components/ui/progress"; // 確保路徑正確

const PARENT_FOLDER_PATH = "images/Activity Img";

export default function PhotoShow({ folderName }) {
  const [portraitImages, setPortraitImages] = useState([]);
  const [landscapeImages, setLandscapeImages] = useState([]);
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [currentLightboxIndex, setCurrentLightboxIndex] = useState(0);
  const [currentLightboxType, setCurrentLightboxType] = useState("");
  const [loading, setLoading] = useState(true); // 加入 loading 狀態
  const [error, setError] = useState(null);
  const [progressValue, setProgressValue] = useState(0); // 可選：追蹤載入進度

  useEffect(() => {
    setPortraitImages([]);
    setLandscapeImages([]);
    setLoading(true); // 開始載入時設定為 true
    setError(null);
    setProgressValue(0); // 重置進度
    const folderPath = `${PARENT_FOLDER_PATH}/${folderName}`;
    const listRef = ref(storage, folderPath);

    listAll(listRef)
      .then((res) => {
        const totalImages = res.items.length;
        let loadedImages = 0;

        const imagePromises = res.items.map(async (itemRef) => {
          const url = await getDownloadURL(itemRef);
          return new Promise((resolve) => {
            const img = new Image();
            img.onload = () => {
              loadedImages++;
              setProgressValue((loadedImages / totalImages) * 100); // 更新進度
              resolve({
                url,
                width: img.naturalWidth,
                height: img.naturalHeight,
              });
            };
            img.onerror = () => {
              loadedImages++;
              setProgressValue((loadedImages / totalImages) * 100); // 即使載入失敗也更新進度
              resolve({ url, width: 0, height: 0 });
            };
            img.src = url;
          });
        });
        return Promise.all(imagePromises);
      })
      .then((imagesWithDimensions) => {
        const portraits = [];
        const landscapes = [];
        imagesWithDimensions.forEach((img) => {
          if (img.width > 0 && img.height > 0) {
            if (img.height >= img.width) {
              portraits.push(img.url);
            } else {
              landscapes.push(img.url);
            }
          }
        });
        setPortraitImages(portraits);
        setLandscapeImages(landscapes);
      })
      .catch((error) => {
        console.error("Error fetching images:", error);
        setError(error);
      })
      .finally(() => {
        setLoading(false); // 載入完成後設定為 false
      });
  }, [folderName]); // 僅在 folderName 改變時重新載入

  const openLightbox = (index, type) => {
    setCurrentLightboxIndex(index);
    setCurrentLightboxType(type);
    setLightboxOpen(true);
  };

  const closeLightbox = () => {
    setLightboxOpen(false);
  };

  const getCurrentImageList = () => {
    return currentLightboxType === "portrait"
      ? portraitImages
      : landscapeImages;
  };

  if (loading) {
    return (
      <div className="w-full max-w-5xl mx-auto p-4 flex flex-col items-center justify-center">
        <Progress value={progressValue} className="w-full" />
        <div className="text-gray-500 text-sm">
          載入圖片中... ({Math.round(progressValue)}%)
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-5xl mx-auto p-4">
      {landscapeImages.length > 0 &&
        portraitImages.length <= landscapeImages.length && (
          <div className="mb-6">
            <div className="grid grid-cols-5 gap-4">
              {landscapeImages.map((src, index) => (
                <LazyLoadImage
                  key={index}
                  className="w-full h-auto rounded-lg cursor-pointer"
                  src={src}
                  alt=""
                  effect="blur"
                  onClick={() => openLightbox(index, "landscape")}
                />
              ))}
            </div>
          </div>
        )}

      {portraitImages.length > 0 && (
        <div className="mb-6">
          <div className="grid grid-cols-5 gap-4">
            {portraitImages.map((src, index) => (
              <LazyLoadImage
                key={index}
                className="w-full h-auto rounded-lg cursor-pointer"
                src={src}
                alt=""
                effect="blur"
                onClick={() => openLightbox(index, "portrait")}
              />
            ))}
          </div>
        </div>
      )}

      {landscapeImages.length > 0 &&
        portraitImages.length > landscapeImages.length && (
          <div className="mb-6">
            <div className="grid grid-cols-5 gap-4">
              {landscapeImages.map((src, index) => (
                <LazyLoadImage
                  key={index}
                  className="w-full h-auto rounded-lg cursor-pointer"
                  src={src}
                  alt=""
                  effect="blur"
                  onClick={() => openLightbox(index, "landscape")}
                />
              ))}
            </div>
          </div>
        )}

      {lightboxOpen && (
        <Lightbox
          isOpen={lightboxOpen}
          images={getCurrentImageList()}
          onClose={closeLightbox}
          initialIndex={currentLightboxIndex}
          imageType={currentLightboxType}
        />
      )}
    </div>
  );
}
