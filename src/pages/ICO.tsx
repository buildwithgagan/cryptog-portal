
import { Card } from "@/components/ui/card";
import { Globe, CreditCard, DollarSign, Users } from "lucide-react";
import {
  ComposableMap,
  Geographies,
  Geography,
  Marker
} from "react-simple-maps";
import PageTitle from "@/components/shared/PageTitle";
import SectionHeading from "@/components/shared/SectionHeading";
import StatCard from "@/components/shared/StatCard";

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

const ICO = () => {
  return (
    <div className="space-y-6 animate-enter">
      <PageTitle 
        title="ICO Management" 
        subtitle="Track and manage token sales and investor analytics."
      />

      {/* Stats Section */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5">
        <StatCard
          title="Tokens Sold"
          value="185.2M"
          icon={CreditCard}
          trend={{ value: 8.3, isPositive: true }}
        />
        <StatCard
          title="Total Investors"
          value="4,218"
          icon={Users}
          trend={{ value: 12.7, isPositive: true }}
        />
        <StatCard
          title="Total Raised"
          value="$5.4M"
          icon={DollarSign}
          trend={{ value: 7.2, isPositive: true }}
        />
        <StatCard
          title="Current Token Price"
          value="$0.029"
          icon={CreditCard}
          trend={{ value: 2.5, isPositive: true }}
        />
      </div>

      {/* Token Details */}
      <Card className="p-5">
        <SectionHeading 
          title="Token Details" 
          description="Key information about the Cryptog token"
        />
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5">
          <div className="p-4 border rounded-lg">
            <div className="text-sm text-muted-foreground mb-1">Token Name</div>
            <div className="text-lg font-medium">Cryptog (CTOG)</div>
          </div>
          
          <div className="p-4 border rounded-lg">
            <div className="text-sm text-muted-foreground mb-1">Decimals</div>
            <div className="text-lg font-medium">18</div>
          </div>
          
          <div className="p-4 border rounded-lg">
            <div className="text-sm text-muted-foreground mb-1">Total Supply</div>
            <div className="text-lg font-medium">1,000,000,000</div>
          </div>
          
          <div className="p-4 border rounded-lg">
            <div className="text-sm text-muted-foreground mb-1">Contract Address</div>
            <div className="text-lg font-medium truncate" title="0x742d35Cc6634C0532925a3b844Bc454e4438f44e">
              0x742d35Cc6...38f44e
            </div>
          </div>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-5 mt-5">
          <div className="p-4 border rounded-lg">
            <div className="text-sm text-muted-foreground mb-1">Pre-Sale Progress</div>
            <div className="flex items-end gap-2">
              <div className="text-2xl font-semibold">185.2M</div>
              <div className="text-sm text-muted-foreground mb-1">/ 250M tokens</div>
            </div>
            <div className="w-full bg-secondary h-2 rounded-full mt-2">
              <div 
                className="h-full bg-primary rounded-full" 
                style={{ width: '74%' }}
              ></div>
            </div>
            <div className="flex justify-between mt-2 text-xs text-muted-foreground">
              <span>74.1% Complete</span>
              <span>Ends in 18 days</span>
            </div>
          </div>
          
          <div className="p-4 border rounded-lg">
            <div className="text-sm text-muted-foreground mb-1">Price History</div>
            <div className="mt-2 space-y-2">
              <div className="flex justify-between">
                <span className="text-sm">Seed Round:</span>
                <span className="font-medium">$0.012</span>
              </div>
              <div className="flex justify-between">
                <span className="text-sm">Private Sale:</span>
                <span className="font-medium">$0.018</span>
              </div>
              <div className="flex justify-between">
                <span className="text-sm">Pre-Sale:</span>
                <span className="font-medium">$0.025</span>
              </div>
              <div className="flex justify-between">
                <span className="text-sm">Current:</span>
                <span className="font-medium text-green-600">$0.029</span>
              </div>
            </div>
          </div>
          
          <div className="p-4 border rounded-lg">
            <div className="text-sm text-muted-foreground mb-1">Distribution Schedule</div>
            <div className="mt-2 space-y-2">
              <div className="flex justify-between">
                <span className="text-sm">Team & Advisors:</span>
                <span className="font-medium">15%</span>
              </div>
              <div className="flex justify-between">
                <span className="text-sm">Ecosystem Growth:</span>
                <span className="font-medium">25%</span>
              </div>
              <div className="flex justify-between">
                <span className="text-sm">Public Sale:</span>
                <span className="font-medium">40%</span>
              </div>
              <div className="flex justify-between">
                <span className="text-sm">Reserve:</span>
                <span className="font-medium">20%</span>
              </div>
            </div>
          </div>
        </div>
      </Card>

      {/* Location-Based Analytics */}
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
    </div>
  );
};

export default ICO;
