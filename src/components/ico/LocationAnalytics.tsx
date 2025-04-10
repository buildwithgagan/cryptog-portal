
import { Card } from "@/components/ui/card";
import { Globe } from "lucide-react";
import {
  ComposableMap,
  Geographies,
  Geography,
  Marker
} from "react-simple-maps";
import SectionHeading from "@/components/shared/SectionHeading";

// Dummy data for token sales by location
const geoUrl = "https://raw.githubusercontent.com/deldersveld/topojson/master/world-countries.json";

const topCountries = [
  { name: "United States", value: 35, coordinates: [-95, 38] },
  { name: "India", value: 18, coordinates: [77, 20] },
  { name: "United Kingdom", value: 12, coordinates: [0, 52] },
  { name: "Germany", value: 8, coordinates: [10, 51] },
  { name: "Japan", value: 6, coordinates: [138, 36] },
  { name: "Australia", value: 5, coordinates: [133, -25] },
  { name: "Brazil", value: 4, coordinates: [-55, -10] },
  { name: "Canada", value: 4, coordinates: [-95, 56] },
  { name: "France", value: 3, coordinates: [2, 46] },
  { name: "South Korea", value: 3, coordinates: [127, 36] },
];

const LocationAnalytics = () => {
  return (
    <Card className="p-5">
      <SectionHeading 
        title="Location-Based Analytics" 
        description="Geographical distribution of token holders"
      />
      
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 h-[400px] border rounded-lg overflow-hidden">
          <ComposableMap
            projectionConfig={{
              scale: 140,
            }}
          >
            <Geographies geography={geoUrl}>
              {({ geographies }) =>
                geographies.map((geo) => (
                  <Geography
                    key={geo.rsmKey}
                    geography={geo}
                    fill="#eaeaec"
                    stroke="#D6D6DA"
                    style={{
                      default: { outline: "none" },
                      hover: { outline: "none", fill: "#d1d1d6" },
                      pressed: { outline: "none" },
                    }}
                  />
                ))
              }
            </Geographies>
            {topCountries.map(({ name, coordinates, value }) => (
              <Marker key={name} coordinates={coordinates}>
                <circle
                  r={Math.max(value / 2, 3)}
                  fill="hsl(var(--primary))"
                  opacity={0.7}
                  stroke="#fff"
                  strokeWidth={0.5}
                />
              </Marker>
            ))}
          </ComposableMap>
        </div>
        
        <div className="overflow-auto h-[400px] border rounded-lg p-4">
          <h3 className="font-medium mb-3 sticky top-0 bg-card pt-1 pb-2 border-b flex items-center">
            <Globe size={16} className="mr-2 text-primary" />
            Top Countries
          </h3>
          
          <ul className="space-y-3">
            {topCountries.map((country) => (
              <li key={country.name} className="flex justify-between items-center">
                <span>{country.name}</span>
                <div className="flex items-center">
                  <span className="font-medium mr-2">{country.value}%</span>
                  <div className="w-16 bg-secondary h-2 rounded-full">
                    <div 
                      className="h-full bg-primary rounded-full" 
                      style={{ width: `${country.value * 2.5}%` }}
                    ></div>
                  </div>
                </div>
              </li>
            ))}
          </ul>
          
          <div className="mt-4 pt-4 border-t">
            <h4 className="font-medium mb-2 text-sm">Recent Investor Locations</h4>
            <ul className="space-y-2">
              <li className="flex justify-between text-sm">
                <span>Berlin, Germany</span>
                <span className="text-muted-foreground">4 min ago</span>
              </li>
              <li className="flex justify-between text-sm">
                <span>Singapore</span>
                <span className="text-muted-foreground">12 min ago</span>
              </li>
              <li className="flex justify-between text-sm">
                <span>London, UK</span>
                <span className="text-muted-foreground">25 min ago</span>
              </li>
              <li className="flex justify-between text-sm">
                <span>New York, USA</span>
                <span className="text-muted-foreground">38 min ago</span>
              </li>
              <li className="flex justify-between text-sm">
                <span>Mumbai, India</span>
                <span className="text-muted-foreground">52 min ago</span>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </Card>
  );
};

export default LocationAnalytics;
