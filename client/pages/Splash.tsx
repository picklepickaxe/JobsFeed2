import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { ModeToggle } from "@/components/mode-toggle";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Menu, LogIn, UserPlus, Info, Mail } from "lucide-react";

export default function Splash() {
  const [loading, setLoading] = useState(true);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const navigate = useNavigate();

  useEffect(() => {
    // Show splash for 2.5 seconds, then show continue button
    const timer = setTimeout(() => {
      setLoading(false);
    }, 2500);

    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    // Track mouse movement for interactive background
    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
    };

    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  const handleContinue = () => {
    // Mark that user has seen splash screen
    localStorage.setItem("hasSeenSplash", "true");
    navigate("/home");
  };

  const handleLogin = () => {
    // Simulate login - in real app would navigate to login page
    localStorage.setItem("hasSeenSplash", "true");
    navigate("/home");
  };

  const handleSignUp = () => {
    // Simulate signup - in real app would navigate to signup page
    localStorage.setItem("hasSeenSplash", "true");
    navigate("/home");
  };

  return (
    <div className="min-h-screen w-full bg-[#0a0a0a] relative flex items-center justify-center overflow-hidden">
      {/* Cosmic Aurora */}
      <div
        className="absolute inset-0 z-0"
        style={{
          backgroundImage: `
            radial-gradient(ellipse at 20% 30%, rgba(56, 189, 248, 0.4) 0%, transparent 60%),
            radial-gradient(ellipse at 80% 70%, rgba(139, 92, 246, 0.3) 0%, transparent 70%),
            radial-gradient(ellipse at 60% 20%, rgba(236, 72, 153, 0.25) 0%, transparent 50%),
            radial-gradient(ellipse at 40% 80%, rgba(34, 197, 94, 0.2) 0%, transparent 65%)
          `,
        }}
      />
      {/* Top Menu Bar */}
      <div className="absolute top-4 left-4 right-4 z-20 flex justify-between items-center">
        {/* Settings Menu */}
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button
              variant="ghost"
              size="sm"
              className="text-white hover:bg-white/10"
            >
              <Menu className="h-4 w-4 mr-2" />
              Menu
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="start" className="w-56">
            <DropdownMenuItem onClick={handleLogin} className="cursor-pointer">
              <LogIn className="h-4 w-4 mr-2" />
              Log In
            </DropdownMenuItem>
            <DropdownMenuItem onClick={handleSignUp} className="cursor-pointer">
              <UserPlus className="h-4 w-4 mr-2" />
              Sign Up
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem className="cursor-pointer">
              <Info className="h-4 w-4 mr-2" />
              About JobsFeed
            </DropdownMenuItem>
            <DropdownMenuItem className="cursor-pointer">
              <Mail className="h-4 w-4 mr-2" />
              Contact Us
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>

        {/* Theme Toggle */}
        <ModeToggle />
      </div>

      {/* Interactive animated background elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div
          className="absolute w-32 h-32 bg-white/10 rounded-full animate-pulse transition-transform duration-1000"
          style={{
            top: "-16px",
            right: "-16px",
            transform: `translate(${mousePosition.x * 0.02}px, ${mousePosition.y * 0.02}px)`,
          }}
        ></div>
        <div
          className="absolute w-24 h-24 bg-white/5 rounded-full animate-bounce transition-transform duration-1000"
          style={{
            top: "25%",
            left: "-32px",
            transform: `translate(${mousePosition.x * 0.01}px, ${mousePosition.y * 0.01}px)`,
          }}
        ></div>
        <div
          className="absolute w-16 h-16 bg-white/10 rounded-full animate-ping transition-transform duration-1000"
          style={{
            bottom: "25%",
            right: "25%",
            transform: `translate(${mousePosition.x * 0.015}px, ${mousePosition.y * 0.015}px)`,
          }}
        ></div>

        {/* Additional floating elements */}
        <div
          className="absolute w-20 h-20 bg-gradient-to-r from-yellow-400/20 to-orange-400/20 rounded-full animate-pulse transition-transform duration-1500"
          style={{
            top: "60%",
            left: "10%",
            transform: `translate(${mousePosition.x * 0.008}px, ${mousePosition.y * 0.012}px)`,
          }}
        ></div>
        <div
          className="absolute w-14 h-14 bg-gradient-to-r from-green-400/20 to-blue-400/20 rounded-full animate-bounce transition-transform duration-1200"
          style={{
            top: "15%",
            right: "20%",
            transform: `translate(${mousePosition.x * 0.012}px, ${mousePosition.y * 0.008}px)`,
          }}
        ></div>
      </div>

      <div className="text-center z-10 max-w-lg mx-auto px-6">
        {/* Logo/Brand */}
        <div className="mb-8">
          <div
            className="w-24 h-24 mx-auto mb-6 bg-white rounded-full flex items-center justify-center shadow-2xl p-1 transition-transform duration-300 hover:scale-110 hover:rotate-3"
            style={{
              transform: `translateY(${Math.sin(Date.now() * 0.001) * 5}px)`,
            }}
          >
            <img
              src="/android-chrome-512x512.png"
              alt="JobsFeed Logo"
              className="w-full h-full rounded-full object-cover"
            />
          </div>
          <h1 className="text-5xl font-extrabold text-white mb-3 animate-pulse font-sans">
            JobsFeed
          </h1>
          <p className="text-blue-100 text-xl mb-6 font-medium font-sans">Find Your Dream Career</p>

          {/* Interactive Stats */}
          <div className="grid grid-cols-3 gap-4 mb-8">
            <div className="bg-white/10 backdrop-blur-sm rounded-lg p-3 hover:bg-white/20 transition-all duration-300 cursor-pointer">
              <div className="text-2xl font-bold text-white">1000+</div>
              <div className="text-blue-100 text-sm">Jobs Available</div>
            </div>
            <div className="bg-white/10 backdrop-blur-sm rounded-lg p-3 hover:bg-white/20 transition-all duration-300 cursor-pointer">
              <div className="text-2xl font-bold text-white">50+</div>
              <div className="text-blue-100 text-sm">Companies</div>
            </div>
            <div className="bg-white/10 backdrop-blur-sm rounded-lg p-3 hover:bg-white/20 transition-all duration-300 cursor-pointer">
              <div className="text-2xl font-bold text-white">24/7</div>
              <div className="text-blue-100 text-sm">Support</div>
            </div>
          </div>
        </div>

        {loading ? (
          <div className="space-y-6">
            <div className="relative">
              <div className="animate-spin w-12 h-12 border-4 border-white border-t-transparent rounded-full mx-auto"></div>
              <div className="absolute inset-0 w-12 h-12 border-4 border-blue-300 border-t-transparent rounded-full mx-auto animate-ping"></div>
            </div>
            <p className="text-white/80 text-lg">
              Loading your opportunities...
            </p>
            <div className="flex justify-center space-x-1">
              <div
                className="w-2 h-2 bg-white rounded-full animate-bounce"
                style={{ animationDelay: "0ms" }}
              ></div>
              <div
                className="w-2 h-2 bg-white rounded-full animate-bounce"
                style={{ animationDelay: "150ms" }}
              ></div>
              <div
                className="w-2 h-2 bg-white rounded-full animate-bounce"
                style={{ animationDelay: "300ms" }}
              ></div>
            </div>
          </div>
        ) : (
          <div className="space-y-6 animate-fade-in">
            <p className="text-white/90 text-lg leading-relaxed">
              Discover thousands of job opportunities tailored just for you.
              Your next career move starts here.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button
                onClick={handleContinue}
                size="lg"
                className="bg-white text-blue-600 hover:bg-blue-50 font-semibold px-8 py-3 rounded-xl shadow-lg hover:shadow-xl transition-all duration-200 hover:scale-105"
              >
                Explore Jobs
              </Button>
              <Button
                onClick={handleLogin}
                variant="outline"
                size="lg"
                className="border-white text-white hover:bg-white hover:text-blue-600 font-semibold px-8 py-3 rounded-xl shadow-lg hover:shadow-xl transition-all duration-200 hover:scale-105"
              >
                Quick Login
              </Button>
            </div>

            {/* Quick access features */}
            <div className="flex justify-center space-x-6 mt-8">
              <div className="text-center cursor-pointer hover:scale-110 transition-transform duration-200">
                <div className="w-12 h-12 bg-white/20 rounded-full flex items-center justify-center mb-2 mx-auto">
                  <Info className="h-6 w-6 text-white" />
                </div>
                <p className="text-white/80 text-sm">Learn More</p>
              </div>
              <div className="text-center cursor-pointer hover:scale-110 transition-transform duration-200">
                <div className="w-12 h-12 bg-white/20 rounded-full flex items-center justify-center mb-2 mx-auto">
                  <Mail className="h-6 w-6 text-white" />
                </div>
                <p className="text-white/80 text-sm">Contact</p>
              </div>
            </div>
          </div>
        )}
      </div>

  <style>{`
        @keyframes fade-in {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        .animate-fade-in {
          animation: fade-in 0.6s ease-out;
        }
      `}</style>
    </div>
  );
}
