import React, { useState } from "react";
import { Box, IconButton } from "@mui/material";
import ArrowBackIosNewIcon from "@mui/icons-material/ArrowBackIosNew";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";

const Slideshow = ({ images }) => {
  const [activeIndex, setActiveIndex] = useState(0);

  const handleNext = () => {
    setActiveIndex((prevIndex) => (prevIndex + 1) % images.length);
  };

  const handlePrev = () => {
    setActiveIndex((prevIndex) =>
      prevIndex === 0 ? images.length - 1 : prevIndex - 1
    );
  };

  const handleThumbnailClick = (index) => {
    setActiveIndex(index);
  };

  return (
    <Box sx={{ display: "flex", alignItems: "center", gap: 3 }}>
      {/* Main Slideshow with Border */}
      <Box
        sx={{
          position: "relative",
          flex: 1,
          height: 500,
          border: "3px solid #808080", // Added border
          borderRadius: "12px", // Rounded corners
          overflow: "hidden", // Ensures image doesn't overflow the border
          boxShadow: "0 4px 12px rgba(0, 0, 0, 0.2)", // Subtle shadow for depth
        }}
      >
        <img
          src={images[activeIndex]}
          alt={`Slide ${activeIndex + 1}`}
          style={{
            width: "100%",
            height: "100%",
            objectFit: "contain", // Ensures the image fits without cutting off
          }}
        />
        {/* Navigation Buttons */}
        <IconButton
          onClick={handlePrev}
          sx={{
            position: "absolute",
            top: "50%",
            left: "10px",
            transform: "translateY(-50%)",
            color: "#808080",
            zIndex: 1,
          }}
        >
          <ArrowBackIosNewIcon />
        </IconButton>
        <IconButton
          onClick={handleNext}
          sx={{
            position: "absolute",
            top: "50%",
            right: "10px",
            transform: "translateY(-50%)",
            color: "#808080",
            zIndex: 1,
          }}
        >
          <ArrowForwardIosIcon />
        </IconButton>
      </Box>

      {/* Vertical Thumbnail Gallery */}
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          gap: 2,
          maxHeight: 500,
          overflowY: "auto",
        }}
      >
        {images.map((image, index) => (
          <Box
            key={index}
            component="img"
            src={image}
            alt={`Thumbnail ${index + 1}`}
            onClick={() => handleThumbnailClick(index)}
            sx={{
              width: 250, // Increased the width of the thumbnails
              height: 150, // Increased the height of the thumbnails
              borderRadius: 6,
              cursor: "pointer",
              border: activeIndex === index ? "3px solid #ff9800" : "1px solid #ccc",
              objectFit: "cover",
              boxShadow: 3,
            }}
          />
        ))}
      </Box>
    </Box>
  );
};

export default Slideshow;
