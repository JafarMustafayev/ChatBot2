import { useState, useEffect, useCallback } from "react";
import { RiDownload2Line } from "react-icons/ri";
import { IoChatbubbleOutline, IoClose } from "react-icons/io5";

const ImagesPage = () => {
  const images = [
    {
      id: 1,
      url: "/src/assets/tempImages/3b4832dd-38f7-4bcf-a0eb-e45d2ff454e6.jpg",
      name: "Mountain Sunset",
      chatId: 1,
    },
    {
      id: 2,
      url: "/src/assets/tempImages/688af05d-7647-473b-9b7d-d651044263f1.JPG",
      name: "Forest Path",
    },

    {
      id: 3,
      url: "/src/assets/tempImages/64678860-f151-4c68-95d2-113566272c44.jpg",
      name: "Nature Trail",
    },
    {
      id: 4,
      url: "/src/assets/tempImages/a599453e-f115-41d6-b8e8-3bbc70fdea93.jpg",
      name: "Foggy Lake",
    },
    {
      id: 5,
      url: "/src/assets/tempImages/ayyappa-vardhan-h1Gzq-MJk74-unsplash.jpg",
      name: "Flower Field",
    },
    {
      id: 6,
      url: "/src/assets/tempImages/benjamin-voros-U-Kty6HjxcQc-unsplash.jpg",
      name: "Desert Landscape",
    },
    {
      id: 7,
      url: "/src/assets/tempImages/bf79e3d7-a58e-4361-ba2a-b9a32f32cd60.jpg",
      name: "City Skyline",
    },
    {
      id: 8,
      url: "/src/assets/tempImages/felipe-simo-73k-11L0nVs-unsplash.jpg",
      name: "Snowy Mountains",
    },
    {
      id: 9,
      url: "/src/assets/tempImages/jake-hills-z0gDv24X3uQ-unsplash.jpg",
      name: "Ocean View",
    },
    {
      id: 10,
      url: "/src/assets/tempImages/lucas-andrade-emVglyWb9Y0-unsplash.jpg",
      name: "Moon and Stars",
    },
    {
      id: 11,
      url: "/src/assets/tempImages/nat-riddle-fKheTfYikP0-unsplash.jpg",
      name: "Moon",
    },
    {
      id: 12,
      url: "/src/assets/tempImages/silkwaywest.jpg",
      name: "silk way west",
    },
  ];

  const [selectedImage, setSelectedImage] = useState<null | number>(null);

  const handleClose = () => setSelectedImage(null);

  // === Scroll və klaviatura ilə şəkil dəyişmə funksiyası ===
  const handleNextImage = useCallback(() => {
    setSelectedImage((prev) => {
      if (prev === null) return null;
      return prev < images.length ? prev + 1 : images.length;
    });
  }, [images.length]);

  const handlePrevImage = useCallback(() => {
    setSelectedImage((prev) => {
      if (prev === null) return null;
      return prev > 1 ? prev - 1 : 1;
    });
  }, [images.length]);

  // Keyboard arrow listener
  useEffect(() => {
    if (selectedImage === null) return;

    const handleKey = (e: KeyboardEvent) => {
      if (e.key === "ArrowUp") handlePrevImage();
      if (e.key === "ArrowDown") handleNextImage();
      if (e.key === "Escape") handleClose(); // ESC ilə bağlamaq
    };

    window.addEventListener("keydown", handleKey);
    return () => window.removeEventListener("keydown", handleKey);
  }, [selectedImage, handleNextImage, handlePrevImage]);

  // Scroll listener
  useEffect(() => {
    if (selectedImage === null) return;

    let scrollTimeout: number | null = null;

    const handleScroll = (e: WheelEvent) => {
      e.preventDefault(); // səhifə sürüşməsin
      if (scrollTimeout) clearTimeout(scrollTimeout);

      scrollTimeout = setTimeout(() => {
        if (e.deltaY > 0) handleNextImage();
        else if (e.deltaY < 0) handlePrevImage();
      }, 50); // sürətli scroll-larda çox keçid olmasın
    };

    window.addEventListener("wheel", handleScroll, { passive: false });
    return () => window.removeEventListener("wheel", handleScroll);
  }, [selectedImage, handleNextImage, handlePrevImage]);

  const downloadImage = (url: string, name: string) => {
    const link = document.createElement("a");
    link.href = url;
    link.download = name;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className="h-full w-full flex flex-col overflow-y-auto overflow-x-hidden">
      <div className="p-4 w-full border-b border-gray-300 text-2xl font-semibold">
        Library
      </div>

      {/* Şəkil qrid hissəsi */}
      <div className="grid min-h-60 w-full grid-cols-2 gap-1 sm:grid-cols-3 md:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-7 overflow-x-hidden overflow-y-auto scrollbar-hide p-2">
        {images.map((img) => (
          <img
            key={img.id}
            src={img.url}
            alt={img.name}
            onClick={() => setSelectedImage(img.id)}
            className="w-64 h-64 object-cover rounded-sm cursor-pointer hover:opacity-80 transition"
          />
        ))}
      </div>

      {/* Modal (tam ekran şəkil baxış pəncərəsi) */}
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
              <span className="font-medium text-lg">
                {images.find((img) => img.id === selectedImage)?.name}
              </span>
            </div>

            <div className="flex items-center gap-3">
              <button
                className="p-2 hover:bg-white/20 rounded-lg transition"
                onClick={() =>
                  downloadImage(
                    images.find((img) => img.id === selectedImage)!.url,
                    images.find((img) => img.id === selectedImage)!.name
                  )
                }
              >
                <RiDownload2Line size={21} />
              </button>
              <button className="p-2 hover:bg-white/20 rounded-lg transition">
                <IoChatbubbleOutline size={21} />
              </button>
            </div>
          </div>

          {/* Content */}
          <div className="flex flex-1 overflow-hidden">
            {/* Əsas şəkil */}
            <div className="flex-1 flex items-center justify-center">
              <img
                src={images.find((img) => img.id === selectedImage)?.url}
                alt="Selected"
                className="max-h-[85vh] max-w-[90%] object-contain rounded-lg shadow-lg transition-all duration-300"
              />
            </div>

            {/* Sağdakı kiçik şəkillər */}
            <div className="w-24  flex flex-col justify-center gap-2 overflow-y-auto scrollbar-hide  ">
              {images.map((img) => (
                <img
                  key={img.id}
                  src={img.url}
                  alt={img.name}
                  onClick={() => setSelectedImage(img.id)}
                  className={`w-full h-24 object-cover rounded-lg cursor-pointer transition border ${
                    img.id === selectedImage
                      ? "border-message-bubble border-3 justify-center-safe"
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
