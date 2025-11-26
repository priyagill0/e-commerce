import React, { useState } from "react";

const ImageCarousel = ({ images }) => {
  const [currentIndex, setCurrentIndex] = useState(0);

  const prevSlide = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === 0 ? images.length - 1 : prevIndex - 1
    );
  };

  const nextSlide = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === images.length - 1 ? 0 : prevIndex + 1
    );
  };

  if (!images || images.length === 0) return <p>No images available</p>;

  return (
    <div style={styles.carouselContainer}>
      <button onClick={prevSlide} style={styles.arrowLeft}>
        &#10094;
      </button>

      <img src={images[currentIndex]} style={styles.image} />

      <button onClick={nextSlide} style={styles.arrowRight}>
        &#10095;
      </button>

       <div style={styles.dotsContainer}>
        {images.map((_, index) => (
          <span
            key={index}
            style={{
              ...styles.dot,
              opacity: currentIndex === index ? 1 : 0.3,
            }}
          >
            ●
          </span>
        ))}
      </div>
    </div>
  );
};

const styles = {
  carouselContainer: {
    position: "relative",
    width: "700px",
    height: "500px",
    margin: "0 auto",
    overflow: "hidden",
    borderRadius: "8px",
  },
  image: {
    width: "100%",
    height: "100%",
    
    objectFit: "contain",
    transition: "transform 0.5s ease-in-out",
  },
  arrowLeft: {
    position: "absolute",
    top: "50%",
    left: "10px",
    transform: "translateY(-50%)",
    fontSize: "2rem",
    color: "#1976d2",  // or grey
    border: "none",
    borderRadius: "50%",
    cursor: "pointer",
    padding: "0.5rem",
    zIndex: 1,
  },
  arrowRight: {
    position: "absolute",
    top: "50%",
    right: "10px",
    transform: "translateY(-50%)",
    fontSize: "2rem",
    color: "#1976d2", // or grey
    border: "none",
    borderRadius: "50%",
    cursor: "pointer",
    padding: "0.5rem",
    zIndex: 1,
  }, 

   dotsContainer: {
    position: "absolute",
    bottom: "10px",
    width: "100%",
    display: "flex",
    justifyContent: "center",
    gap: "8px",
  },
  dot: {
    fontSize: "12px",
    cursor: "pointer",
    userSelect: "none",
  },
};

export default ImageCarousel;
