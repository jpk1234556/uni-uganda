import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Home, ClipboardList, UserCircle } from "lucide-react";
import { Link } from "react-router-dom";

const MOCK_APPLICATIONS = [
  { id: "app1", hostel: "City Gateway Hostel", room: "Single Room", status: "Pending", date: "Oct 12, 2026" },
  { id: "app2", hostel: "Sunrise Student Home", room: "Double Room", status: "Rejected", date: "Sep 28, 2026" },
];

export default function StudentDashboard() {
  return (
    <div className="container mx-auto px-4 py-8 max-w-5xl">
      <div className="mb-8">
        <h1 className="text-3xl font-bold tracking-tight">My Dashboard</h1>
        <p className="text-muted-foreground">Manage your booking applications and profile.</p>
      </div>

      <Tabs defaultValue="applications" className="space-y-4">
        <TabsList>
          <TabsTrigger value="applications" className="gap-2"><ClipboardList className="h-4 w-4" /> My Applications</TabsTrigger>
          <TabsTrigger value="profile" className="gap-2"><UserCircle className="h-4 w-4" /> Profile Details</TabsTrigger>
        </TabsList>

        <TabsContent value="applications">
          <Card>
            <CardHeader>
              <CardTitle>Recent Booking Requests</CardTitle>
              <CardDescription>Keep track of your hostel applications.</CardDescription>
            </CardHeader>
            <CardContent>
              {MOCK_APPLICATIONS.length === 0 ? (
                <div className="text-center py-10 bg-muted/50 rounded-lg">
                  <Home className="h-10 w-10 text-muted-foreground mx-auto mb-3" />
                  <p className="text-muted-foreground font-medium mb-4">You haven't applied to any hostels yet.</p>
                  <Link to="/search">
                    <Button>Find a Hostel</Button>
                  </Link>
                </div>
              ) : (
                <div className="space-y-4">
                  {MOCK_APPLICATIONS.map((app) => (
                    <div key={app.id} className="flex justify-between items-center p-4 border rounded-lg hover:bg-muted/50 transition-colors">
                      <div>
                        <h4 className="font-semibold">{app.hostel}</h4>
                        <p className="text-sm text-muted-foreground">{app.room} • {app.date}</p>
                      </div>
                      <div className="flex items-center gap-4">
                        <Badge variant={app.status === "Approved" ? "default" : app.status === "Pending" ? "outline" : "destructive"}>
                          {app.status}
                        </Badge>
                        <Button variant="ghost" size="sm">View</Button>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="profile">
          <Card>
            <CardHeader>
              <CardTitle>Extended Profile</CardTitle>
              <CardDescription>Your tenant detail information required for bookings.</CardDescription>
            </CardHeader>
            <CardContent>
               <p className="text-sm text-muted-foreground mb-4">To speed up your hostel applications, please complete your profile details (Next of Kin, Medical History, etc.)</p>
               <Button variant="outline">Edit Profile</Button>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
