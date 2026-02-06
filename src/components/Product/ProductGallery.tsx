import React, { useState, useEffect } from "react";
import { ChevronLeft, ChevronRight, X } from "lucide-react";

interface ProductGalleryProps {
  images: string[];
  productName: string;
}

export const ProductGallery: React.FC<ProductGalleryProps> = ({
  images,
  productName,
}) => {
  const [selectedImage, setSelectedImage] = useState<string>("");
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [isGalleryOpen, setIsGalleryOpen] = useState(false);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const [isHovering, setIsHovering] = useState(false);

  useEffect(() => {
    if (images.length > 0) {
      setSelectedImage(images[0]);
      setCurrentImageIndex(0);
    }
  }, [images]);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const { left, top, width, height } =
      e.currentTarget.getBoundingClientRect();
    const x = ((e.clientX - left) / width) * 100;
    const y = ((e.clientY - top) / height) * 100;
    setMousePos({ x, y });
  };

  const handlePrevImage = () => {
    if (images.length === 0) return;

    const newIndex =
      currentImageIndex === 0 ? images.length - 1 : currentImageIndex - 1;
    setCurrentImageIndex(newIndex);
    setSelectedImage(images[newIndex]);
  };

  const handleNextImage = () => {
    if (images.length === 0) return;
    const newIndex =
      currentImageIndex === images.length - 1 ? 0 : currentImageIndex + 1;
    setCurrentImageIndex(newIndex);
    setSelectedImage(images[newIndex]);
  };

  if (images.length === 0) return null;

  const displayedThumbnails = images.slice(0, 5);

  return (
    <div className="lg:w-7/12">
      <div
        className="bg-[#E2E3FF] rounded-lg h-[400px] md:h-[550px] lg:h-[600px] w-full flex items-center justify-center mb-4 relative overflow-hidden group cursor-crosshair"
        onMouseMove={handleMouseMove}
        onMouseEnter={() => setIsHovering(true)}
        onMouseLeave={() => setIsHovering(false)}
        onClick={() => setIsGalleryOpen(true)}
      >
        <img
          src={selectedImage}
          alt={productName}
          className="w-full h-full object-cover mix-blend-multiply transition-transform duration-200"
          style={{
            transformOrigin: `${mousePos.x}% ${mousePos.y}%`,
            transform: isHovering ? "scale(2)" : "scale(1)",
          }}
        />
        <button
          onClick={(e) => {
            e.stopPropagation();
            handlePrevImage();
          }}
          aria-label="Imagem Anterior"
          className="hidden absolute left-0 top-1/2 -translate-y-1/2 p-4 text-gray-800 hover:text-primary transition-colors z-10"
        >
          <ChevronLeft className="w-8 h-8" />
        </button>
        <button
          onClick={(e) => {
            e.stopPropagation();
            handleNextImage();
          }}
          aria-label="Próxima Imagem"
          className="hidden absolute right-0 top-1/2 -translate-y-1/2 p-4 text-gray-800 hover:text-primary transition-colors z-10"
        >
          <ChevronRight className="w-8 h-8" />
        </button>
      </div>

      <div className="grid grid-cols-5 gap-4 mt-4">
        {displayedThumbnails.map((img, idx) => {
          const isLast = idx === 4;
          const remainingCount = images.length - 5;

          return (
            <button
              key={idx}
              type="button"
              aria-label={`Ver imagem ${idx + 1}`}
              className={`aspect-square bg-white rounded-lg flex items-center justify-center cursor-pointer border overflow-hidden relative ${currentImageIndex === idx ? "border-2 border-[#C92071]" : "border-gray-200"}`}
              onClick={() => {
                if (isLast && remainingCount > 0) {
                  setIsGalleryOpen(true);
                } else {
                  setSelectedImage(img);
                  setCurrentImageIndex(idx);
                  setIsGalleryOpen(true);
                }
              }}
            >
              <img src={img} alt="" className="w-full h-full object-cover" />
              {isLast && remainingCount > 0 && (
                <div className="absolute inset-0 bg-gray-800/60 flex items-center justify-center text-white font-bold text-xl md:text-2xl">
                  +{remainingCount}
                </div>
              )}
            </button>
          );
        })}
      </div>

      {isGalleryOpen && (
        <div className="fixed inset-0 z-50 bg-black/90 flex items-center justify-center p-4 backdrop-blur-sm animate-fade-in">
          <button
            onClick={() => setIsGalleryOpen(false)}
            aria-label="Fechar galeria"
            className="absolute top-4 right-4 text-white hover:text-gray-300 transition-colors p-2"
          >
            <X className="w-8 h-8" />
          </button>

          <button
            onClick={handlePrevImage}
            aria-label="Imagem Anterior"
            className="absolute left-4 top-1/2 -translate-y-1/2 text-white hover:text-gray-300 p-2"
          >
            <ChevronLeft className="w-10 h-10" />
          </button>

          <div className="max-w-6xl w-full h-full flex items-center justify-center">
            <img
              src={selectedImage}
              alt={productName}
              className="w-full h-full object-contain"
            />
          </div>

          <button
            onClick={handleNextImage}
            aria-label="Próxima Imagem"
            className="absolute right-4 top-1/2 -translate-y-1/2 text-white hover:text-gray-300 p-2"
          >
            <ChevronRight className="w-10 h-10" />
          </button>

          <div className="absolute bottom-4 left-0 right-0 flex justify-center gap-2 overflow-x-auto px-4 py-2">
            {images.map((img, idx) => (
              <button
                key={idx}
                aria-label={`Ver imagem ${idx + 1}`}
                onClick={() => {
                  setSelectedImage(img);
                  setCurrentImageIndex(idx);
                }}
                className={`w-16 h-16 rounded overflow-hidden border flex-shrink-0 bg-white ${currentImageIndex === idx ? "border-2 border-[#C92071]" : "border-gray-300 opacity-70 hover:opacity-100"}`}
              >
                <img src={img} alt="" className="w-full h-full object-cover" />
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};
