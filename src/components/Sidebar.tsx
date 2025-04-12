import React, { useState } from 'react';
import { useLocation, Link } from 'react-router-dom';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import { ScrollArea } from '@/components/ui/scroll-area';
import { ThemeToggle } from './ThemeToggle';
import { 
  FileText, 
  Youtube, 
  Book, 
  Folder, 
  Lightbulb, 
  MessageSquare, 
  ChevronLeft, 
  ChevronRight 
} from 'lucide-react';

const NavItem = ({ 
  icon: Icon, 
  title, 
  to, 
  isActive, 
  isCollapsed 
}: { 
  icon: React.ElementType, 
  title: string, 
  to: string, 
  isActive: boolean, 
  isCollapsed: boolean 
}) => {
  return (
    <Link to={to}>
      <Button
        variant={isActive ? "secondary" : "ghost"}
        className={cn(
          "w-full justify-start gap-2 mb-1",
          isActive && "bg-sidebar-accent text-sidebar-accent-foreground"
        )}
      >
        <Icon className="h-5 w-5" />
        {!isCollapsed && <span>{title}</span>}
      </Button>
    </Link>
  );
};

export const Sidebar = () => {
  const [isCollapsed, setIsCollapsed] = useState(false);
  const location = useLocation();
  const currentPath = location.pathname;
  
  const toggleSidebar = () => {
    setIsCollapsed(!isCollapsed);
  };

  return (
    <div
      className={cn(
        "flex flex-col h-screen bg-sidebar border-r border-sidebar-border transition-all duration-300",
        isCollapsed ? "w-16" : "w-64"
      )}
    >
      <div className="flex items-center justify-between p-4">
        {!isCollapsed && <h2 className="text-xl font-bold">GapFinder</h2>}
        <Button
          variant="ghost"
          size="icon"
          onClick={toggleSidebar}
          className="ml-auto"
          aria-label={isCollapsed ? "Expand sidebar" : "Collapse sidebar"}
        >
          {isCollapsed ? <ChevronRight className="h-5 w-5" /> : <ChevronLeft className="h-5 w-5" />}
        </Button>
      </div>
      
      <ScrollArea className="flex-1 px-3">
        <div className="space-y-4 py-4">
          <div className="py-2">
            <NavItem
              icon={FileText}
              title="Knowledge Gap Analysis"
              to="/results"
              isActive={currentPath === "/results"}
              isCollapsed={isCollapsed}
            />
            <NavItem
              icon={Youtube}
              title="Resources"
              to="/results/resources"
              isActive={currentPath === "/results/resources"}
              isCollapsed={isCollapsed}
            />
            <NavItem
              icon={Folder}
              title="Projects"
              to="/results/projects"
              isActive={currentPath === "/results/projects"}
              isCollapsed={isCollapsed}
            />
            <NavItem
              icon={Lightbulb}
              title="AI Resources"
              to="/results/ai-resources"
              isActive={currentPath === "/results/ai-resources"}
              isCollapsed={isCollapsed}
            />
            <NavItem
              icon={MessageSquare}
              title="Interview Questions"
              to="/results/interview-questions"
              isActive={currentPath === "/results/interview-questions"}
              isCollapsed={isCollapsed}
            />
          </div>
        </div>
      </ScrollArea>
      
      <div className={cn(
        "p-4 border-t border-sidebar-border flex",
        isCollapsed ? "justify-center" : "justify-between items-center"
      )}>
        {!isCollapsed && <span className="text-sm text-sidebar-foreground">Theme</span>}
        <ThemeToggle />
      </div>
    </div>
  );
};