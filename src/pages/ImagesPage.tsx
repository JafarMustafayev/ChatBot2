import { useState, useEffect, useCallback } from "react";
import { RiDownload2Line } from "react-icons/ri";
import { IoChatbubbleOutline, IoClose } from "react-icons/io5";
import { Link } from "react-router-dom";

interface ImageType {
  id: number;
  url: string;
  name: string;
  conversationId: string;
  messageId: string;
}

const ImagesPage: React.FC = () => {
  const images: ImageType[] = [
    {
      id: 1,
      url: "/src/assets/tempImages/3b4832dd-38f7-4bcf-a0eb-e45d2ff454e6.jpg",
      name: "Mountain Sunset",
      conversationId: "1",
      messageId: "1",
    },
    {
      id: 2,
      url: "/src/assets/tempImages/688af05d-7647-473b-9b7d-d651044263f1.JPG",
      name: "Forest Path",
      conversationId: "2",
      messageId: "2",
    },
  ];

  const [selectedImageIndex, setSelectedImageIndex] = useState<number | null>(
    null
  );

  const selectedImage =
    selectedImageIndex !== null ? images[selectedImageIndex] : null;

  const handleClose = () => setSelectedImageIndex(null);

  // Növbəti şəkilə keçid
  const handleNextImage = useCallback(() => {
    setSelectedImageIndex((prev) => {
      if (prev === null) return null;
      return prev < images.length - 1 ? prev + 1 : prev;
    });
  }, [images.length]);

  // Əvvəlki şəkilə keçid
  const handlePrevImage = useCallback(() => {
    setSelectedImageIndex((prev) => {
      if (prev === null) return null;
      return prev > 0 ? prev - 1 : prev;
    });
  }, []);

  // Klaviatura ilə idarəetmə
  useEffect(() => {
    if (selectedImageIndex === null) return;

    const handleKey = (e: KeyboardEvent) => {
      if (e.key === "ArrowUp") handlePrevImage();
      if (e.key === "ArrowDown") handleNextImage();
      if (e.key === "Escape") handleClose();
    };

    window.addEventListener("keydown", handleKey);
    return () => window.removeEventListener("keydown", handleKey);
  }, [selectedImageIndex, handleNextImage, handlePrevImage]);

  // Scroll ilə idarəetmə
  useEffect(() => {
    if (selectedImageIndex === null) return;

    let scrollTimeout: ReturnType<typeof setTimeout> | null = null;

    const handleScroll = (e: WheelEvent) => {
      e.preventDefault();
      if (scrollTimeout) clearTimeout(scrollTimeout);

      scrollTimeout = setTimeout(() => {
        if (e.deltaY > 0) handleNextImage();
        else if (e.deltaY < 0) handlePrevImage();
      }, 80);
    };

    window.addEventListener("wheel", handleScroll, { passive: false });
    return () => window.removeEventListener("wheel", handleScroll);
  }, [selectedImageIndex, handleNextImage, handlePrevImage]);

  // Şəkil yükləmə funksiyası
  const downloadImage = (image: ImageType) => {
    const link = document.createElement("a");
    link.href = image.url;
    link.download = image.name;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className="h-full w-full flex flex-col overflow-y-auto overflow-x-hidden">
      <div className="p-4 w-full border-b text-white border-gray-300 text-2xl font-semibold">
        Library
      </div>

      {/* Şəkil grid hissəsi */}
      <div className="grid min-h-60 w-full grid-cols-2 gap-1 sm:grid-cols-3 md:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-7 overflow-x-hidden overflow-y-auto scrollbar-hide p-2">
        {images.map((img, index) => (
          <img
            key={img.id}
            src={img.url}
            alt={img.name}
            onClick={() => setSelectedImageIndex(index)}
            className="w-64 h-64 object-cover rounded-sm cursor-pointer hover:opacity-80 transition"
          />
        ))}
      </div>

      {/* Modal (tam ekran baxış) */}
      {selectedImage && (
        <div className="fixed inset-0 bg-black/90 flex flex-col z-50">
          {/* Header */}
          <div className="flex justify-between items-center p-4 text-white border-b border-gray-700">
            <div className="flex items-center gap-3">
              <button
                onClick={handleClose}
                className="p-2 hover:bg-white/20 rounded-lg transition"
              >
                <IoClose size={21} />
              </button>
              <span className="font-medium text-lg">{selectedImage.name}</span>
            </div>

            <div className="flex items-center gap-3">
              <button
                className="p-2 hover:bg-white/20 rounded-lg transition"
                onClick={() => downloadImage(selectedImage)}
              >
                <RiDownload2Line size={21} />
              </button>
              <Link
                to={`chat/${selectedImage.conversationId}`}
                className="p-2 hover:bg-white/20 rounded-lg transition"
              >
                <IoChatbubbleOutline size={21} />
              </Link>
            </div>
          </div>

          {/* Content */}
          <div className="flex flex-1 overflow-hidden">
            {/* Əsas şəkil */}
            <div className="flex-1 flex items-center justify-center">
              <img
                src={selectedImage.url}
                alt={selectedImage.name}
                className="max-h-[85vh] max-w-[90%] object-contain rounded-lg shadow-lg transition-all duration-300"
              />
            </div>

            {/* Sağdakı thumbnail-lər */}
            <div className="w-24 flex flex-col justify-center gap-2 overflow-y-auto scrollbar-hide">
              {images.map((img, index) => (
                <img
                  key={img.id}
                  src={img.url}
                  alt={img.name}
                  onClick={() => setSelectedImageIndex(index)}
                  className={`w-full h-24 object-cover rounded-lg cursor-pointer transition border ${
                    index === selectedImageIndex
                      ? "border-message-bubble border-3"
                      : "border-transparent border-2 hover:border-message-bubble/50 hover:opacity-80"
                  }`}
                />
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ImagesPage;
