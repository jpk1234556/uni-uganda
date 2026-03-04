import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Toaster } from "@/components/ui/sonner";
import Home from "@/pages/Home";
import Search from "@/pages/Search";
import Roommates from "@/pages/Roommates";
import HostelDetail from "@/pages/HostelDetail";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";

function App() {
  return (
    <Router>
      <div className="min-h-screen flex flex-col bg-background text-foreground animate-in fade-in duration-500">
        <Navbar />
        <main className="flex-1">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/search" element={<Search />} />
            <Route path="/roommates" element={<Roommates />} />
            <Route path="/hostel/:id" element={<HostelDetail />} />
          </Routes>
        </main>
        <Footer />
      </div>
      <Toaster />
    </Router>
  );
}

export default App;
