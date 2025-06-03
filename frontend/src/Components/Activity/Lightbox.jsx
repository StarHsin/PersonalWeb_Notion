// Lightbox.js
import React, { useState, useEffect } from "react";
import { LazyLoadImage } from "react-lazy-load-image-component";
import "react-lazy-load-image-component/src/effects/blur.css";
import { FaChevronRight, FaChevronLeft, AiOutlineClose } from "../icon";

export default function Lightbox({
  isOpen,
  images,
  onClose,
  initialIndex,
  imageType,
}) {
  const [currentImageIndex, setCurrentImageIndex] = useState(initialIndex || 0);
  const [currentImageType, setCurrentImageType] = useState(imageType || "");

  useEffect(() => {
    setCurrentImageIndex(initialIndex || 0);
    setCurrentImageType(imageType || "");
  }, [initialIndex, imageType, isOpen]);

  if (!isOpen) {
    return null;
  }

  const prevImage = () => {
    setCurrentImageIndex((prevIndex) =>
      prevIndex === 0 ? images.length - 1 : prevIndex - 1
    );
  };

  const nextImage = () => {
    setCurrentImageIndex((prevIndex) =>
      prevIndex === images.length - 1 ? 0 : prevIndex + 1
    );
  };

  const currentImageSrc = images[currentImageIndex];

  return (
    <div className="fixed inset-0 bg-black bg-opacity-80 flex items-center justify-center z-50">
      <button
        className="absolute top-5 right-5 text-white text-3xl font-bold"
        onClick={onClose}
      >
        <AiOutlineClose />
      </button>
      <button
        className="absolute left-5 text-white text-5xl"
        onClick={prevImage}
      >
        <FaChevronLeft />
      </button>
      <LazyLoadImage
        src={currentImageSrc}
        alt=""
        className="max-w-full max-h-[80vh] rounded-lg shadow-lg"
        effect="blur"
      />
      <button
        className="absolute right-5 text-white text-5xl"
        onClick={nextImage}
      >
        <FaChevronRight />
      </button>
    </div>
  );
}
