import { useState, useEffect } from "react";

function FilterPopup({ currentFilters, onClose, onApply }) {
  const [qualityGrade, setQualityGrade] = useState(currentFilters.qualityGrade || "any");
  const [selectedTaxa, setSelectedTaxa] = useState(currentFilters.selectedTaxa || []);

  const iconicTaxa = [
    "Plantae", "Animalia", "Mollusca", "Reptilia", "Aves", "Amphibia",
    "Actinopterygii", "Mammalia", "Insecta", "Arachnida", "Fungi",
    "Protozoa", "Chromista", "unknown"
  ];

  // Ensure filters are populated when the component mounts
  useEffect(() => {
    setQualityGrade(currentFilters.qualityGrade || "any");
    setSelectedTaxa(currentFilters.selectedTaxa || []);
  }, [currentFilters]);

  const handleTaxaChange = (taxon) => {
    setSelectedTaxa((prev) =>
      prev.includes(taxon) ? prev.filter((t) => t !== taxon) : [...prev, taxon]
    );
  };

  const applyFilters = () => {
    onApply({ qualityGrade, selectedTaxa });
    onClose();
  };

  return (
    <div className="popup-overlay">
      <div className="popup">
        <h2 className="popup-title">Filters</h2>

        {/* Quality Grade Dropdown */}
        <div className="filter-group">
          <label>Quality Grade:</label>
          <select value={qualityGrade} onChange={(e) => setQualityGrade(e.target.value)}>
            <option value="any">Any</option>
            <option value="research">Research</option>
            <option value="casual">Casual</option>
          </select>
        </div>

        {/* Iconic Taxa Checkboxes */}
        <div className="filter-group">
          <label>Iconic Taxa:</label>
          <div className="checkbox-group">
            {iconicTaxa.map((taxon) => (
              <label key={taxon} className="checkbox-label">
                <input
                  type="checkbox"
                  value={taxon}
                  checked={selectedTaxa.includes(taxon)}
                  onChange={() => handleTaxaChange(taxon)}
                />
                {taxon}
              </label>
            ))}
          </div>
        </div>

        {/* Buttons */}
        <div className="popup-buttons">
          <button className="apply-button" onClick={applyFilters}>Apply</button>
          <button className="close-button" onClick={onClose}>Close</button>
        </div>
      </div>
    </div>
  );
}

export default FilterPopup;
