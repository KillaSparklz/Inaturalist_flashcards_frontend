import React, { useState, useEffect} from 'react';
import { MapContainer, TileLayer} from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import  axios from 'axios';
import './App.css';
import FilterPopup from "./components/filterPopup";
import Flashcard from "./components/flashcard"
import DraggableMarker from "./components/draggableMarker"

function App() {
  const [species, setSpecies] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const [currentIndex, setCurrentIndex] = useState(0); // current index for observation carousel

  const [position, setPosition] = useState({lat: 44.571651, lng: -123.277702})

  const [showFilters, setShowFilters] = useState(false);
  const [filters, setFilters] = useState({ qualityGrade: "any", selectedTaxa: [] });


  //This hook makes API calls to Inaturalist. It looks to see i position is changed to make a new call
  useEffect(() => {
    if (!position) return; // Don't fetch if position is not set yet
    const fetchData = async () => {
      try {
        const response = await axios.get('https://5agg1j6nqa.execute-api.us-west-1.amazonaws.com/dev/api/observations', {
          params: {
            nelat: position['lat'] + 0.1,
            nelng: position['lng'] + 0.1,
            swlat: position['lat'] - 0.1,
            swlng: position['lng'] - 0.1,
            qualityGrade: filters['qualityGrade'] == "any" ? null : filters['qualityGrade'],
            iconic_taxa: filters["selectedTaxa"]
          }
        });
        setSpecies(response.data);
      } catch(error) {
        setError("Error fetching data");
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [position, filters]);

  if(loading) {
    return <div>Loading observation data ya bum..</div>
  }

  if(error) {
    return <div>{error}</div>
  }

  const handlePrev = () => {
    setCurrentIndex((prevIndex) => (prevIndex === 0 ? species.length - 1 : prevIndex - 1));
  };

  const handleNext = () => {
    setCurrentIndex((prevIndex) => (prevIndex === species.length - 1 ? 0 : prevIndex + 1));
  };

  return (
    <div className="App">
      {/* Filter Button */}
      <div className="header-container">
        <button onClick={() => setShowFilters(true)}>Filters</button>
      </div>

      {/* Show Popup When Filters Are Clicked */}
      {showFilters && (
        <FilterPopup
          currentFilters={filters}
          onClose={() => setShowFilters(false)}
          onApply={(newFilters) => setFilters(newFilters)}
        />
      )}

      {/* Flashcards Carousel */}
      <div className="carousel-container">
        <button className="prev-button" onClick={handlePrev}>
          &lt; Prev
        </button>

        {species.length > 0 && <Flashcard species={species[currentIndex]} />}

        <button className="next-button" onClick={handleNext}>
          Next &gt;
        </button>
      </div>

      {/* Map Container */}
      <div className="map-container">
      <MapContainer center={position} zoom={13} scrollWheelZoom={false}>
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        <DraggableMarker position = {position} setPosition = {setPosition}/>
      </MapContainer>
      </div>

    </div>
  );
}



export default App;
