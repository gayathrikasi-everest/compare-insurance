import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Link } from "react-router-dom";
import { Phone, Mail } from "lucide-react";
import UnderstandingYou from "./pages/UnderstandingYou";
import RecommendedPlans from "./pages/RecommendedPlans";
import AskQuestions from "./pages/AskQuestions";
import NotFound from "./pages/NotFound";
import Index from "./pages/Index";
const queryClient = new QueryClient();
const Header = () => <header className="header">
    <div className="flex items-center space-x-2">
      <div className="text-lg font-bold text-cc-blue">🤑</div>
    </div>
    <nav className="hidden md:flex items-center space-x-8">
      <Link to="/" className="nav-link font-medium">Insurance</Link>
      <Link to="/" className="nav-link font-medium">Energy</Link>
      <Link to="/" className="nav-link font-medium">Internet</Link>
      <Link to="/" className="nav-link font-medium">Home Loans</Link>
    </nav>
    <div className="flex items-center space-x-4">
      <a href="tel:1300-268-882" className="hidden md:flex items-center space-x-1 nav-link">
        <Phone size={16} />
        <span>1300 268 882</span>
      </a>
      <a href="mailto:support@compareclub.com.au" className="nav-link">
        <Mail size={18} />
      </a>
    </div>
  </header>;
const App = () => <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <div className="flex flex-col min-h-screen">
          <Header />
          <main className="flex-1">
            <Routes>
              <Route path="/" element={<Index />} />
              <Route path="/understanding-you" element={<UnderstandingYou />} />
              <Route path="/recommended-plans" element={<RecommendedPlans />} />
              <Route path="/ask-questions" element={<AskQuestions />} />
              <Route path="*" element={<NotFound />} />
            </Routes>
          </main>
        </div>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>;
export default App;