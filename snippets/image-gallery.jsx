// /snippets/image-gallery.jsx
export const ImageGallery = ({ images }) => {
  const [selectedImage, setSelectedImage] = useState(0);

  return (
    <div className="space-y-0">
      {/* Main image display */}
      <Frame>
        <img
          src={images[selectedImage].src}
          alt={images[selectedImage].alt}
          className="w-full rounded-lg transition-opacity duration-300 ease-in-out"
        />
      </Frame>

      {/* Thumbnail carousel */}
      <div className="flex space-x-2 overflow-x-auto">
        {images.map((image, index) => (
          <img
            key={index}
            src={image.thumbnail || image.src}
            alt={image.alt}
            className={`w-20 h-20 object-cover cursor-pointer rounded ${
              selectedImage === index ? 'border-2 border-primary' : 'border-white'
            }`}
            onClick={() => setSelectedImage(index)}
            noZoom
          />
        ))}
      </div>
    </div>
  );
};
