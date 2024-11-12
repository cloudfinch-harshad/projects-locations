###Excel Data Mapping with Google Maps
This project reads data from a CSV file containing information about power plants (wind and solar) and plots the corresponding locations on a Google Map. The locations are filtered based on the type of power plant selected (Wind or Solar) and displayed as markers on the map. Clicking a marker shows detailed information about the plant.

##Features
Load CSV data and parse it using Papa Parse.
Display the power plant locations on a Google Map.
Filter locations by power plant type (Wind or Solar).
Show detailed information in an InfoWindow when a marker is clicked.
Responsive design for viewing on different screen sizes.
Technologies Used
React: Frontend library for building the user interface.
TypeScript: Superset of JavaScript for type safety.
Papa Parse: JavaScript library for parsing CSV data.
@react-google-maps/api: React wrapper for Google Maps.
Tailwind CSS: Utility-first CSS framework for styling.
Getting Started
To get a local copy up and running, follow these steps:

#Prerequisites
Node.js and npm installed on your system.
Installation
Clone the repository:

#bash
Copy code
git clone https://github.com/your-username/excel-data-mapping.git
cd excel-data-mapping
Install dependencies:

#bash
Copy code
npm install
Create a .env file in the root directory and add your Google Maps API key:

#bash
Copy code
REACT_APP_GOOGLE_MAPS_API_KEY=your-google-maps-api-key
Start the development server:

#bash
Copy code
npm start
Open your browser and visit http://localhost:3000 to view the app.

#Features & Usage
CSV Data: The app loads the CSV file plants.csv located in the public/excels folder.
Filtering: You can filter the displayed locations by selecting either "Wind" or "Solar" from the dropdown. By default, all locations are displayed.
Google Map: Locations are plotted on a Google Map, with markers indicating each power plant's location.
InfoWindow: Clicking on a marker will show an InfoWindow with details about the power plant, such as its business unit, location, and capacity.
Code Structure
src/: Contains all source code files.
components/: Contains React components.
ExcelReader.tsx: The main component responsible for loading and displaying the map and CSV data.
assets/: Contains image assets used for markers.
public/: Contains the plants.csv file and other static assets.
Contributions
Feel free to fork the repository and submit pull requests. Any improvements or bug fixes are welcome.

##License
This project is licensed under the MIT License - see the LICENSE file for details.