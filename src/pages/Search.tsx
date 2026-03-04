import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { Slider } from "@/components/ui/slider";
import { MapPin, Wifi, Shield, Zap, Droplets } from "lucide-react";
import { Link } from "react-router-dom";

// Temporary dummy data
const MOCK_HOSTELS = [
  {
    id: "1",
    name: "City Gateway Hostel",
    distance: "0.5km from Makerere",
    price: "UGX 500,000",
    rating: 4.8,
    reviews: 124,
    image: "https://images.unsplash.com/photo-1555854877-bab0e564b8d5?auto=format&fit=crop&q=80&w=800",
    amenities: ["wifi", "security", "water"],
    featured: true,
  },
  {
    id: "2",
    name: "Olympic Standard Apartments",
    distance: "1.2km from MUBS",
    price: "UGX 800,000",
    rating: 4.5,
    reviews: 89,
    image: "https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?auto=format&fit=crop&q=80&w=800",
    amenities: ["wifi", "security", "power", "water"],
    featured: false,
  },
  {
    id: "3",
    name: "Sunrise Student Home",
    distance: "0.8km from Kyambogo",
    price: "UGX 450,000",
    rating: 4.2,
    reviews: 56,
    image: "https://images.unsplash.com/photo-1502672260266-1c1ea52309f4?auto=format&fit=crop&q=80&w=800",
    amenities: ["water", "security"],
    featured: false,
  }
];

export default function Search() {
  return (
    <div className="container mx-auto px-4 py-8 max-w-7xl">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4">
        <div>
          <h1 className="text-3xl font-extrabold tracking-tight">Find Hostels</h1>
          <p className="text-muted-foreground mt-1">Showing 12 hostels near your selected university.</p>
        </div>
        
        {/* Mock Map Toggle for MVP */}
        <Button variant="outline" className="hidden md:flex gap-2 rounded-full">
          <MapPin className="h-4 w-4" />
          Show Map
        </Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
        
        {/* Filters Sidebar */}
        <aside className="col-span-1 border rounded-xl p-6 bg-card/50 backdrop-blur-sm h-fit sticky top-24">
          <div className="flex items-center justify-between mb-6">
            <h2 className="font-semibold text-lg">Filters</h2>
            <Button variant="ghost" size="sm" className="h-8 text-xs">Reset</Button>
          </div>
          
          <div className="space-y-6">
            <div>
              <h3 className="text-sm font-medium mb-3">University</h3>
              <select className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50">
                <option>Makerere University</option>
                <option>Kyambogo University</option>
                <option>MUBS</option>
                <option>KIU</option>
              </select>
            </div>

            <Separator />

            <div>
              <h3 className="text-sm font-medium mb-3">Price Range (Per Semester)</h3>
              <Slider defaultValue={[50]} max={100} step={1} className="mb-2" />
              <div className="flex justify-between text-xs text-muted-foreground">
                <span>UGX 300k</span>
                <span>UGX 2M+</span>
              </div>
            </div>

            <Separator />

            <div>
              <h3 className="text-sm font-medium mb-3">Amenities</h3>
              <div className="space-y-3">
                {['Free WiFi', 'Backup Generator', 'Running Water', '24/7 Security'].map((item) => (
                  <div key={item} className="flex items-center space-x-2">
                    <Checkbox id={`filter-${item}`} />
                    <Label htmlFor={`filter-${item}`} className="text-sm font-normal cursor-pointer">{item}</Label>
                  </div>
                ))}
              </div>
            </div>
            
            <Separator />
            
            <div>
              <h3 className="text-sm font-medium mb-3">Room Type</h3>
              <div className="space-y-3">
                {['Single Room', 'Double Room', 'Self Contained'].map((item) => (
                  <div key={item} className="flex items-center space-x-2">
                    <Checkbox id={`room-${item}`} />
                    <Label htmlFor={`room-${item}`} className="text-sm font-normal cursor-pointer">{item}</Label>
                  </div>
                ))}
              </div>
            </div>
          </div>
          
          <Button className="w-full mt-8">Apply Filters</Button>
        </aside>

        {/* Results Grid */}
        <div className="col-span-1 md:col-span-3">
          <div className="space-y-6">
            {MOCK_HOSTELS.map((hostel) => (
              <Card key={hostel.id} className="overflow-hidden hover:shadow-lg transition-all duration-300 border-border/50">
                <div className="flex flex-col md:flex-row h-full">
                  <div className="md:w-2/5 h-64 md:h-auto relative">
                    <img 
                      src={hostel.image} 
                      alt={hostel.name}
                      className="absolute inset-0 w-full h-full object-cover"
                    />
                    {hostel.featured && (
                      <Badge className="absolute top-4 left-4 bg-primary text-primary-foreground">
                        Featured
                      </Badge>
                    )}
                  </div>
                  <div className="md:w-3/5 p-6 flex flex-col justify-between">
                    <div>
                      <div className="flex justify-between items-start mb-2">
                        <h3 className="text-xl font-bold">{hostel.name}</h3>
                        <div className="flex items-center gap-1 bg-secondary px-2 py-1 rounded-md text-sm font-medium">
                          <span className="text-yellow-500">★</span> {hostel.rating}
                        </div>
                      </div>
                      
                      <div className="flex items-center text-muted-foreground text-sm mb-4 gap-1">
                        <MapPin className="h-3 w-3" />
                        {hostel.distance}
                      </div>

                      <div className="flex flex-wrap gap-2 mb-4">
                        {hostel.amenities.includes('wifi') && <Badge variant="secondary" className="gap-1"><Wifi className="h-3 w-3"/> WiFi</Badge>}
                        {hostel.amenities.includes('security') && <Badge variant="secondary" className="gap-1"><Shield className="h-3 w-3"/> Security</Badge>}
                        {hostel.amenities.includes('power') && <Badge variant="secondary" className="gap-1"><Zap className="h-3 w-3"/> Power</Badge>}
                        {hostel.amenities.includes('water') && <Badge variant="secondary" className="gap-1"><Droplets className="h-3 w-3"/> Water</Badge>}
                      </div>
                    </div>

                    <div className="flex items-center justify-between mt-4 pt-4 border-t">
                      <div>
                        <p className="text-sm text-muted-foreground">Starting from</p>
                        <p className="text-lg font-bold text-primary">{hostel.price}</p>
                      </div>
                      <Link to={`/hostel/${hostel.id}`}>
                        <Button>View Details</Button>
                      </Link>
                    </div>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        </div>
        
      </div>
    </div>
  );
}
