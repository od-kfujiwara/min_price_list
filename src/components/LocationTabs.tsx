import React from 'react';

interface LocationTabsProps {
  locations: string[];
  selectedLocation: string;
  onLocationChange: (location: string) => void;
}

const LocationTabs: React.FC<LocationTabsProps> = ({ locations, selectedLocation, onLocationChange }) => {
  return (
    <div className="location-tabs">
      {locations.map(location => (
        <button
          key={location}
          className={`tab ${selectedLocation === location ? 'active' : ''}`}
          onClick={() => onLocationChange(location)}
        >
          {location}
        </button>
      ))}
    </div>
  );
};

export default LocationTabs;