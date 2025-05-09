
import React from "react";
import { Outlet, useLocation } from "react-router-dom";
import { Brain } from "lucide-react";
import { ThemeToggle } from "@/components/ThemeToggle";

const AppLayout = () => {
  const location = useLocation();

  return (
    <div className="min-h-screen flex flex-col">
      <header className="w-full py-4 px-6 flex justify-between items-center border-b">
        <div className="flex items-center gap-2">
          <Brain className="h-6 w-6 text-gapfinder-600" />
          <h1 className="text-xl font-bold text-gapfinder-800 dark:text-gapfinder-200">GapFinder</h1>
        </div>
        <div className="flex items-center gap-2">
          <ThemeToggle />
        </div>
      </header>

      <main className="flex-1 flex flex-col items-center justify-center p-6 md:p-10">
        <Outlet />
      </main>

      <footer className="w-full py-6 px-4 border-t text-center text-muted-foreground">
        <p className="text-sm">© 2025 GapFinder. All rights reserved.</p>
      </footer>
    </div>
  );
};

export default AppLayout;
