import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { MapPin, Wifi, Shield, Zap, Droplets, BedDouble, CheckCircle2 } from "lucide-react";
import { useParams } from "react-router-dom";

export default function HostelDetail() {
  const { id } = useParams();

  // Mock data for MVP visual design
  const hostel = {
    name: "City Gateway Hostel",
    distance: "0.5km from Makerere",
    address: "Kikoni, Makerere Hill Road",
    description: "Experience premium student living just a stone's throw away from Makerere University main gate. Our facilities are designed to give you the peace of mind you need to excel in your studies.",
    rating: 4.8,
    reviews: 124,
    images: [
      "https://images.unsplash.com/photo-1555854877-bab0e564b8d5?auto=format&fit=crop&q=80&w=1200",
      "https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?auto=format&fit=crop&q=80&w=600",
      "https://images.unsplash.com/photo-1502672260266-1c1ea52309f4?auto=format&fit=crop&q=80&w=600",
    ],
    amenities: ["Free High-speed WiFi", "24/7 Security Guards", "Backup Generator", "Constant Water Supply", "Study Area", "CCTV Surveillance"],
    rooms: [
      { id: 'r1', type: "Single Room (Self Contained)", price: "UGX 950,000", available: 2 },
      { id: 'r2', type: "Double Room (Shared)", price: "UGX 550,000", available: 8 },
      { id: 'r3', type: "Triple Room", price: "UGX 450,000", available: 0 },
    ]
  };

  return (
    <div className="container mx-auto px-4 py-8 max-w-6xl">
      {/* Header */}
      <div className="mb-6 flex flex-col md:flex-row justify-between items-start md:items-end gap-4">
        <div>
          <h1 className="text-4xl font-extrabold tracking-tight mb-2">{hostel.name}</h1>
          <div className="flex flex-wrap items-center text-sm font-medium text-muted-foreground gap-4">
            <span className="flex items-center gap-1 text-yellow-500 font-bold">
              ★ {hostel.rating} <span className="text-muted-foreground font-normal">({hostel.reviews} reviews)</span>
            </span>
            <span className="flex items-center gap-1"><MapPin className="h-4 w-4" /> {hostel.address}</span>
            <Badge variant="secondary" className="font-normal">{hostel.distance}</Badge>
          </div>
        </div>
        <div className="flex gap-2">
          <Button variant="outline">Share</Button>
          <Button variant="outline">Save</Button>
        </div>
      </div>

      {/* Image Gallery */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-10 h-[400px]">
        <div className="md:col-span-2 rounded-xl overflow-hidden relative">
          <img src={hostel.images[0]} alt="Main" className="absolute inset-0 w-full h-full object-cover hover:scale-105 transition-transform duration-500" />
        </div>
        <div className="flex flex-col gap-4">
          <div className="rounded-xl overflow-hidden relative h-1/2">
            <img src={hostel.images[1]} alt="Room" className="absolute inset-0 w-full h-full object-cover hover:scale-105 transition-transform duration-500" />
          </div>
          <div className="rounded-xl overflow-hidden relative h-1/2">
            <img src={hostel.images[2]} alt="Area" className="absolute inset-0 w-full h-full object-cover hover:scale-105 transition-transform duration-500" />
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
        
        {/* Main Details */}
        <div className="lg:col-span-2 space-y-8">
          <section>
            <h2 className="text-2xl font-semibold mb-4">About this Hostel</h2>
            <p className="text-muted-foreground leading-relaxed">{hostel.description}</p>
          </section>

          <Separator />

          <section>
            <h2 className="text-2xl font-semibold mb-4">What this place offers</h2>
            <div className="grid grid-cols-2 gap-y-4">
              {hostel.amenities.map(amenity => (
                <div key={amenity} className="flex items-center gap-2 text-muted-foreground">
                  <CheckCircle2 className="h-5 w-5 text-primary" />
                  <span>{amenity}</span>
                </div>
              ))}
            </div>
          </section>

          <Separator />

          <section>
            <h2 className="text-2xl font-semibold mb-4">Available Room Types</h2>
            <div className="space-y-4">
              {hostel.rooms.map(room => (
                <Card key={room.id} className={`overflow-hidden ${room.available === 0 ? 'opacity-60' : ''}`}>
                  <CardContent className="p-0 flex flex-col sm:flex-row">
                    <div className="bg-muted p-6 flex items-center justify-center sm:w-1/3">
                      <BedDouble className="h-10 w-10 text-muted-foreground" />
                    </div>
                    <div className="p-6 flex-1 flex flex-col justify-between">
                      <div>
                        <div className="flex justify-between items-start mb-2">
                          <h3 className="font-semibold text-lg">{room.type}</h3>
                          <span className="font-bold text-lg text-primary">{room.price}</span>
                        </div>
                        <p className="text-sm text-muted-foreground">Per Semester</p>
                      </div>
                      <div className="mt-4 flex justify-between items-center">
                        <span className={`text-sm font-medium ${room.available > 0 ? 'text-green-600' : 'text-destructive'}`}>
                          {room.available > 0 ? `${room.available} rooms left` : 'Sold Out'}
                        </span>
                        <Button disabled={room.available === 0}>
                          {room.available > 0 ? 'Select Room' : 'Waitlist'}
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </section>
        </div>

        {/* Sticky Booking Widget */}
        <div className="lg:col-span-1">
          <Card className="sticky top-24 shadow-xl border-primary/20 bg-card/50 backdrop-blur-md">
            <CardHeader>
              <CardTitle>Ready to Apply?</CardTitle>
              <CardDescription>Secure your room for the upcoming semester.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="bg-muted rounded-lg p-4">
                <p className="text-sm font-medium mb-1">Select a room type to continue</p>
                <p className="text-xs text-muted-foreground">No payment required until approved.</p>
              </div>
              <Button size="lg" className="w-full text-lg h-14" disabled>Login to Apply</Button>
            </CardContent>
          </Card>
        </div>

      </div>
    </div>
  );
}
