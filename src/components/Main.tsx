import React, { useState, useEffect } from 'react';
import Papa from 'papaparse';
import { GoogleMap, LoadScript, Marker, InfoWindow } from '@react-google-maps/api';
import windmaill from '../assets/images/PhWindmillFill.png';
import solarimg from '../assets/images/BiLightningFill.png';

const ExcelReader: React.FC = () => {
  const [csvData, setCsvData] = useState<any[]>([]);
  const [coordinates, setCoordinates] = useState<{ lat: number; lng: number; details: any }[]>([]);
  const [filteredCoordinates, setFilteredCoordinates] = useState<{ lat: number; lng: number; details: any }[]>([]);
  const [selectedMarker, setSelectedMarker] = useState<{ lat: number; lng: number; details: any } | null>(null);

  const [filter, setFilter] = useState<string | null>(null); // Default filter set to null

  const loadCSV = async () => {
    const csvPath = process.env.PUBLIC_URL + "/excels/plants.csv";
    const response = await fetch(csvPath);
    const csvText = await response.text();

    Papa.parse(csvText, {
      header: true,
      skipEmptyLines: true,
      complete: (result) => {
        setCsvData(result.data);

        const coords = result.data.map((row: any) => {
          const coordinate = row['Co-ordinate'] || '';
          const regex = /([+-]?\d+(\.\d+)?)/g;
          const matches = coordinate.match(regex);

          if (matches && matches.length === 2) {
            const lat = parseFloat(matches[0]);
            const lng = parseFloat(matches[1]);
            return { lat, lng, details: row };
          }

          return { lat: 0, lng: 0, details: row };
        });

        setCoordinates(coords);
        setFilteredCoordinates(coords);
      },
    });
  };

  const applyFilter = () => {
    const filtered = coordinates.filter((coord) => {
      if (filter === null) return true; // If filter is null, show all coordinates
      const type = coord.details['Type']?.toLowerCase().trim() || '';
      return type === filter.toLowerCase().trim();
    });

    setFilteredCoordinates(filtered);
  };

  useEffect(() => {
    loadCSV();
  }, []);

  useEffect(() => {
    applyFilter();
  }, [filter]);

  const handleFilterChange = (value: string) => {
    setFilter(value || null); // Set filter to null if no value is selected
  };

  return (
    <div className="">
      <div className="flex justify-between filter mb-2 bg-blue-500 py-4 shadow-lg px-2">
        <div className="text-xl font-semibold cursor-pointer text-white">
          🌍 Maping-Location
        </div>
        <select value={filter || ''} onChange={(e) => handleFilterChange(e.target.value)}>
          <option value="">All</option> {/* Option for no filter */}
          <option value="Wind">Wind</option>
          <option value="Solar">Solar</option>
        </select>
      </div>

      <LoadScript googleMapsApiKey="AIzaSyCGtG1N2FTedhkHVe_yv6gNjIEA2WuasNQ">
        <GoogleMap
          mapContainerStyle={{
            height: '500px',
            width: '100%',
          }}
          center={{ lat: 20.5937, lng: 78.9629 }}
          zoom={5}
        >
          {filteredCoordinates.map((coord, index) => (
            <Marker
              key={index}
              position={{ lat: coord.lat, lng: coord.lng }}
              icon={{
                url: coord.details.Type.includes('WIND') ? windmaill : solarimg,
                scaledSize: new window.google.maps.Size(10, 20),
              }}
              onClick={() => setSelectedMarker(coord)}
            />
          ))}

          {selectedMarker && (
            <InfoWindow
              position={{ lat: selectedMarker.lat, lng: selectedMarker.lng }}
              onCloseClick={() => setSelectedMarker(null)}
            >
              <div className="pb-6 px-6">
                <div className="flex font-bold text-blue-900 mb-2">
                  {!selectedMarker.details['Business Unit']
                    .toString()
                    .includes('-')
                    ? `${selectedMarker.details['Business Unit']} - ${selectedMarker.details['Location Name']}`
                    : selectedMarker.details['Location Name']}
                </div>
                <div className="flex">
                  <strong>Capacity (kW):</strong> {selectedMarker.details['Capacity (kW)']}
                </div>
                <div className="flex flex-row">
                  <strong>{selectedMarker.details['Type']}</strong>
                </div>
              </div>
            </InfoWindow>
          )}
        </GoogleMap>
      </LoadScript>
    </div>
  );
};

export default ExcelReader;
