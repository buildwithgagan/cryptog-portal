import {
  AreaChart,
  Banknote,
  Bell,
  Briefcase,
  ChevronDown,
  CircleDollarSign,
  CreditCard,
  Grid3X3,
  Home,
  LogOut,
  Puzzle,
  Settings,
  ShieldCheck,
  Users,
  Trophy
} from "lucide-react";
import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { Button } from "../ui/button";
import { cn } from "@/lib/utils";
import LogoutButton from "../auth/LogoutButton";

type MenuItemType = {
  title: string;
  path: string;
  icon: React.ReactNode;
  submenu?: { title: string; path: string }[];
};

const menuItems: MenuItemType[] = [
  {
    title: "Dashboard",
    path: "/",
    icon: <Home size={20} />
  },
  {
    title: "All Users",
    path: "/users",
    icon: <Users size={20} />
  },
  {
    title: "CRYPTOG",
    path: "/cryptog",
    icon: <Puzzle size={20} />,
    submenu: [
      { title: "Manage Assets", path: "/cryptog/assets" },
      { title: "Manage Team", path: "/cryptog/team" },
      { title: "Manage Contest", path: "/cryptog/contest" }
    ]
  },
  {
    title: "Stock Fantasy",
    path: "/stock-fantasy",
    icon: <AreaChart size={20} />,
    submenu: [
      { title: "Manage Assets", path: "/stock-fantasy/manage-asset" },
      { title: "Manage Teams", path: "/stock-fantasy/manage-team" },
      { title: "Manage Contests", path: "/stock-fantasy/manage-contest" }
    ]
  },
  {
    title: "ICO",
    path: "/ico",
    icon: <CreditCard size={20} />,
    submenu: [
      { title: "Investors", path: "/ico/investors" },
      { title: "Manage Token", path: "/ico/token" }
    ]
  },
  {
    title: "Subscribers",
    path: "/subscribers",
    icon: <Briefcase size={20} />
  },
  {
    title: "Notifications",
    path: "/notifications",
    icon: <Bell size={20} />
  },
  {
    title: "Settings",
    path: "/settings",
    icon: <Settings size={20} />
  }
];

const Sidebar = () => {
  const [openMenus, setOpenMenus] = useState<Record<string, boolean>>({});
  const location = useLocation();

  const toggleMenu = (title: string) => {
    setOpenMenus((prev) => ({
      ...prev,
      [title]: !prev[title]
    }));
  };

  const isActiveRoute = (path: string) => {
    if (path === "/" && location.pathname === "/") return true;
    if (path !== "/" && location.pathname.startsWith(path)) return true;
    return false;
  };

  return (
    <aside className="w-64 h-screen flex flex-col bg-background border-r border-border">
      <div className="p-5 border-b border-border flex items-center gap-2">
        <div className="h-7 w-7 rounded-md bg-primary flex items-center justify-center">
          <ShieldCheck size={16} className="text-white" />
        </div>
        <h1 className="font-semibold text-lg text-foreground">Cryptog Admin</h1>
      </div>
      
      <nav className="flex-1 overflow-y-auto py-5 px-3">
        <ul className="space-y-1.5">
          {menuItems.map((item) => (
            <li key={item.title}>
              {item.submenu ? (
                <div className="mb-1">
                  <button
                    onClick={() => toggleMenu(item.title)}
                    className={cn(
                      "w-full flex items-center justify-between px-3 py-2 rounded-md text-sm transition-colors",
                      isActiveRoute(item.path)
                        ? "bg-accent text-accent-foreground font-medium"
                        : "text-foreground/80 hover:bg-secondary"
                    )}
                  >
                    <div className="flex items-center gap-3">
                      {item.icon}
                      <span>{item.title}</span>
                    </div>
                    <ChevronDown
                      size={16}
                      className={cn(
                        "transition-transform",
                        openMenus[item.title] ? "rotate-180" : ""
                      )}
                    />
                  </button>
                  {openMenus[item.title] && (
                    <ul className="mt-1 ml-8 space-y-1 animate-fade-in">
                      {item.submenu.map((subItem) => (
                        <li key={subItem.path}>
                          <Link
                            to={subItem.path}
                            className={cn(
                              "block px-3 py-2 rounded-md text-sm transition-colors",
                              location.pathname === subItem.path
                                ? "bg-accent/50 text-accent-foreground font-medium"
                                : "text-foreground/70 hover:bg-secondary"
                            )}
                          >
                            {subItem.title}
                          </Link>
                        </li>
                      ))}
                    </ul>
                  )}
                </div>
              ) : (
                <Link
                  to={item.path}
                  className={cn(
                    "flex items-center gap-3 px-3 py-2 rounded-md text-sm transition-colors",
                    isActiveRoute(item.path)
                      ? "bg-accent text-accent-foreground font-medium"
                      : "text-foreground/80 hover:bg-secondary"
                  )}
                >
                  {item.icon}
                  <span>{item.title}</span>
                </Link>
              )}
            </li>
          ))}
        </ul>
      </nav>
      
      <div className="p-4 border-t border-border">
        <LogoutButton />
      </div>
    </aside>
  );
};

export default Sidebar;
