import { useState } from 'react';

function Flashcard({ species }) {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [imageLoaded, setImageLoaded] = useState(false);
  const [flipped, setFlipped] = useState(false); // Track flip state

  const handleImageLoad = () => {
    setImageLoaded(true);
  };

  const handleNext = () => {
    setCurrentImageIndex((prevIndex) =>
      prevIndex === species.images.length - 1 ? 0 : prevIndex + 1
    );
  };

  const handlePrev = () => {
    setCurrentImageIndex((prevIndex) =>
      prevIndex === 0 ? species.images.length - 1 : prevIndex - 1
    );
  };

  const toggleFlip = () => {
    setFlipped(!flipped); // Toggle flip state on click
  };

  return (
    <div className="flashcard" >
      <div className={`flashcard-inner`} onClick={toggleFlip}>
        {/* Front of the card */}
        <div className="flashcard-front">
          <div className="flashcard-image-container">
            <img
              src={species.images[currentImageIndex]}
              alt={species.name}
              className="flashcard-image"
              onLoad={handleImageLoad}
            />
            {!imageLoaded && <div className="loading-spinner"><img src="../zerotwogif.gif" alt="loading" /></div>}
          </div>
        </div>

        {/* Back of the card */}
        <div className="flashcard-back">
          {flipped && <p className="species-name">{species.name}</p>}
        </div>
      </div>

      {/* Carousel buttons */}
      {species.images.length > 1 && (
        <div className="carousel-controls">
          <button className="carousel-button prev" onClick={handlePrev}>&lt;</button>
          <button className="carousel-button next" onClick={handleNext}>&gt;</button>
        </div>
      )}
    </div>
  );
}

export default Flashcard;