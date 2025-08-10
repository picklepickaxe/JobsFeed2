import { Moon, Sun } from "lucide-react";
import { Button } from "@/components/ui/button";
// Removed dropdown menu imports
import { useTheme } from "@/components/theme-provider";

  const { theme, setTheme } = useTheme();

  // Toggle between light and dark
  const toggleTheme = () => {
    setTheme(theme === "dark" ? "light" : "dark");
  };

  return (
    <Button
      variant="ghost"
      size="sm"
      className="relative overflow-hidden"
      onClick={toggleTheme}
    >
      <Sun
        className="h-[1.5rem] w-[1.5rem] transition-transform transition-opacity duration-500 ease-in-out
          text-yellow-400 dark:text-gray-400
          rotate-0 scale-100 opacity-100
          dark:-rotate-90 dark:scale-0 dark:opacity-0"
      />
      <Moon
        className="h-[1.5rem] w-[1.5rem] absolute left-0 top-0 transition-transform transition-opacity duration-500 ease-in-out
          text-gray-700 dark:text-yellow-300
          rotate-90 scale-0 opacity-0
          dark:rotate-0 dark:scale-100 dark:opacity-100"
      />
      <span className="sr-only">Toggle theme</span>
    </Button>
  );
}
