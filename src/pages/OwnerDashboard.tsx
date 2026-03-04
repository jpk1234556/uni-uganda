import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Plus, Home, Users, Settings } from "lucide-react";

const MOCK_PROPERTIES = [
  { id: "1", name: "City Gateway Hostel", status: "Approved", rooms: 15, available: 3 },
  { id: "2", name: "New Annex Hostel", status: "Pending", rooms: 10, available: 10 },
];

const MOCK_BOOKINGS = [
  { id: "b1", student: "Samuel K.", property: "City Gateway Hostel", roomType: "Single", status: "Pending" },
  { id: "b2", student: "Martha A.", property: "City Gateway Hostel", roomType: "Double", status: "Approved" },
];

export default function OwnerDashboard() {
  return (
    <div className="container mx-auto px-4 py-8 max-w-7xl">
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Owner Dashboard</h1>
          <p className="text-muted-foreground">Manage your properties and booking requests.</p>
        </div>
        <Button className="gap-2">
          <Plus className="h-4 w-4" /> Add Property
        </Button>
      </div>

      <Tabs defaultValue="properties" className="space-y-4">
        <TabsList>
          <TabsTrigger value="properties" className="gap-2"><Home className="h-4 w-4" /> Properties</TabsTrigger>
          <TabsTrigger value="bookings" className="gap-2"><Users className="h-4 w-4" /> Bookings</TabsTrigger>
          <TabsTrigger value="settings" className="gap-2"><Settings className="h-4 w-4" /> Settings</TabsTrigger>
        </TabsList>

        <TabsContent value="properties">
          <Card>
            <CardHeader>
              <CardTitle>My Properties</CardTitle>
              <CardDescription>View and manage all your hostel listings.</CardDescription>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Property Name</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Total Rooms</TableHead>
                    <TableHead>Available</TableHead>
                    <TableHead className="text-right">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {MOCK_PROPERTIES.map((property) => (
                    <TableRow key={property.id}>
                      <TableCell className="font-medium">{property.name}</TableCell>
                      <TableCell>
                        <Badge variant={property.status === "Approved" ? "default" : "secondary"}>
                          {property.status}
                        </Badge>
                      </TableCell>
                      <TableCell>{property.rooms}</TableCell>
                      <TableCell>{property.available}</TableCell>
                      <TableCell className="text-right">
                        <Button variant="ghost" size="sm">Edit</Button>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="bookings">
          <Card>
            <CardHeader>
              <CardTitle>Booking Requests</CardTitle>
              <CardDescription>Approve or reject student booking applications.</CardDescription>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Student</TableHead>
                    <TableHead>Property</TableHead>
                    <TableHead>Room Type</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead className="text-right">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {MOCK_BOOKINGS.map((booking) => (
                    <TableRow key={booking.id}>
                      <TableCell className="font-medium">{booking.student}</TableCell>
                      <TableCell>{booking.property}</TableCell>
                      <TableCell>{booking.roomType}</TableCell>
                      <TableCell>
                        <Badge variant={booking.status === "Approved" ? "default" : booking.status === "Pending" ? "outline" : "destructive"}>
                          {booking.status}
                        </Badge>
                      </TableCell>
                      <TableCell className="text-right">
                        {booking.status === "Pending" && (
                          <div className="flex justify-end gap-2">
                            <Button variant="outline" size="sm" className="text-green-600">Approve</Button>
                            <Button variant="outline" size="sm" className="text-red-600">Reject</Button>
                          </div>
                        )}
                        {booking.status !== "Pending" && (
                           <Button variant="ghost" size="sm">View Details</Button>
                        )}
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="settings">
          <Card>
            <CardHeader>
              <CardTitle>Account Settings</CardTitle>
              <CardDescription>Manage your owner profile and payout settings.</CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground">Settings configuration goes here.</p>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
