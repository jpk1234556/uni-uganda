import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Search, Filter, MessageSquare, GraduationCap } from "lucide-react";

// Mock data for roommates MVP
const MOCK_ROOMMATES = [
  {
    id: "1",
    name: "Samuel K.",
    course: "Computer Science, Year 2",
    university: "Makerere University",
    budget: "UGX 400,000 - 600,000",
    habits: ["Early Bird", "Non-Smoker", "Study Focused"],
    lookingFor: "A quiet roommate to share a double room in Kikoni.",
    avatar: "https://i.pravatar.cc/150?u=samuel"
  },
  {
    id: "2",
    name: "Martha A.",
    course: "Business Admin, Year 3",
    university: "MUBS",
    budget: "UGX 600,000+",
    habits: ["Social", "Clean Freak", "Cooks Often"],
    lookingFor: "Looking for a female roommate to share a 2-bedroom apartment.",
    avatar: "https://i.pravatar.cc/150?u=martha"
  },
  {
    id: "3",
    name: "Julius P.",
    course: "Engineering, Year 1",
    university: "Kyambogo University",
    budget: "UGX 300,000 - 450,000",
    habits: ["Night Owl", "Gamer", "Easy Going"],
    lookingFor: "Need one person to join me in a spacious room near the campus gate.",
    avatar: "https://i.pravatar.cc/150?u=julius"
  }
];

export default function Roommates() {
  return (
    <div className="container mx-auto px-4 py-8 max-w-7xl">
      {/* Header section */}
      <div className="mb-10 text-center max-w-3xl mx-auto">
        <h1 className="text-4xl font-extrabold tracking-tight mb-4">Find Your Perfect Roommate</h1>
        <p className="text-xl text-muted-foreground">
          Don't want to live alone? Match with students from your university based on habits, budget, and lifestyle.
        </p>
      </div>

      {/* Search and Filter */}
      <div className="flex flex-col md:flex-row gap-4 mb-8 justify-center">
        <div className="relative w-full md:w-96">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <input 
            type="text" 
            placeholder="Search by university, course, or habits..." 
            className="flex h-10 w-full rounded-full border border-input bg-background px-10 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
          />
        </div>
        <Button variant="outline" className="rounded-full gap-2">
          <Filter className="h-4 w-4" /> Filters
        </Button>
        <Button className="rounded-full">Create My Profile</Button>
      </div>

      {/* Grid of Roommates */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {MOCK_ROOMMATES.map(person => (
          <Card key={person.id} className="hover:shadow-md transition-shadow">
            <CardContent className="p-6">
              <div className="flex items-start gap-4 mb-4">
                <Avatar className="h-16 w-16 border-2 border-primary/20">
                  <AvatarImage src={person.avatar} />
                  <AvatarFallback>{person.name.charAt(0)}</AvatarFallback>
                </Avatar>
                <div>
                  <h3 className="font-bold text-lg">{person.name}</h3>
                  <div className="flex items-center text-sm text-muted-foreground gap-1">
                    <GraduationCap className="h-4 w-4" /> {person.university}
                  </div>
                  <p className="text-sm text-muted-foreground">{person.course}</p>
                </div>
              </div>

              <div className="space-y-4">
                <div>
                  <p className="text-sm font-semibold mb-1">Looking For:</p>
                  <p className="text-sm text-muted-foreground line-clamp-2">{person.lookingFor}</p>
                </div>

                <div>
                  <p className="text-sm font-semibold mb-2">My Habits:</p>
                  <div className="flex flex-wrap gap-2">
                    {person.habits.map(habit => (
                      <Badge key={habit} variant="secondary" className="font-normal">{habit}</Badge>
                    ))}
                  </div>
                </div>

                <div className="pt-4 border-t flex items-center justify-between">
                  <div>
                    <p className="text-xs text-muted-foreground">My Budget</p>
                    <p className="font-semibold text-primary">{person.budget}</p>
                  </div>
                  <Button size="sm" className="gap-2">
                    <MessageSquare className="h-4 w-4" /> Message
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
