
import React, { useEffect, useRef } from "react";
import { Outlet, useLocation, useNavigate } from "react-router-dom";
import barba from "@barba/core";
import gsap from "gsap";
import { Brain } from "lucide-react";
import { ThemeToggle } from "@/components/ThemeToggle";
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";

const AppLayout = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const containerRef = useRef<HTMLDivElement>(null);
  const isHomePage = location.pathname === "/";

  useEffect(() => {
    // Initialize Barba
    barba.init({
      transitions: [
        {
          name: "default-transition",
          leave(data) {
            return gsap.to(data.current.container, {
              opacity: 0,
              y: -50,
              duration: 0.5
            });
          },
          enter(data) {
            return gsap.from(data.next.container, {
              opacity: 0,
              y: 50,
              duration: 0.5
            });
          }
        }
      ],
      views: [
        {
          namespace: "home",
          beforeEnter() {
            // Any specific logic for home page
          }
        },
        {
          namespace: "topic-input",
          beforeEnter() {
            // Any specific logic for topic input page
          }
        },
        {
          namespace: "analysis-results",
          beforeEnter() {
            // Any specific logic for results page
          }
        }
      ]
    });

    // Intercept all link clicks to use navigate instead of direct href
    document.addEventListener("click", (e) => {
      const target = e.target as HTMLElement;
      const link = target.closest("a");
      
      if (link && link.href && link.href.startsWith(window.location.origin) && !link.dataset.barbaPrevent) {
        e.preventDefault();
        const path = link.href.replace(window.location.origin, "");
        navigate(path);
      }
    });

    return () => {
      barba.destroy();
    };
  }, [navigate]);

  return (
    <div className="min-h-screen flex flex-col" ref={containerRef}>
      <header className="w-full py-4 px-6 flex justify-between items-center border-b">
        <div className="flex items-center gap-2">
          <Brain className="h-6 w-6 text-gapfinder-600" />
          <h1 className="text-xl font-bold text-gapfinder-800 dark:text-gapfinder-200">GapFinder</h1>
        </div>
        <div className="flex items-center gap-2">
          <ThemeToggle />
          {!isHomePage && (
            <Button 
              variant="outline" 
              onClick={() => navigate("/")}
              className="flex items-center gap-2"
            >
              <ArrowLeft className="h-4 w-4" />
              Back home
            </Button>
          )}
        </div>
      </header>

      <main 
        className="flex-1 flex flex-col items-center justify-center p-6 md:p-10"
        data-barba="container"
        data-barba-namespace={location.pathname === "/" ? "home" : location.pathname.substring(1)}
      >
        <Outlet />
      </main>

      <footer className="w-full py-6 px-4 border-t text-center text-muted-foreground">
        <p className="text-sm">© 2025 GapFinder. All rights reserved.</p>
      </footer>
    </div>
  );
};

export default AppLayout;
