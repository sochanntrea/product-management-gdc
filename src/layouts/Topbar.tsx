import { useLocation } from "react-router-dom";
import { Bell, LogOut, User } from "lucide-react";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";

import { Avatar, AvatarFallback } from "@/components/ui/avatar";

function formatTitle(segment: string) {
  return segment.replace(/-/g, " ").replace(/\b\w/g, (c) => c.toUpperCase());
}

export default function Topbar() {
  const { pathname } = useLocation();
  const segments = pathname.split("/").filter(Boolean);

  let titleSegment = segments[segments.length - 1];
  if (titleSegment && !isNaN(Number(titleSegment))) {
    titleSegment = segments[segments.length - 2];
  }

  const title = formatTitle(titleSegment || "Dashboard");

  const onLogout = () => {
    alert("Logout clicked");
  };

  return (
    <header className="h-16 bg-white border-b flex items-center justify-between px-6">
      <h1 className="text-lg font-semibold">{title}</h1>
      <div className="flex items-center gap-4">
        <select className="border rounded-md px-3 py-1 text-sm">
          <option>Nika Shop</option>
          <option>Backie Deal</option>
          <option>Sokly Shop</option>
        </select>

        <Popover>
          <PopoverTrigger asChild>
            <button className="relative">
              <Bell className="h-5 w-5 text-muted-foreground" />
              <span className="absolute -top-1 -right-1 h-4 w-4 text-[10px] rounded-full bg-red-500 text-white flex items-center justify-center">
                4
              </span>
            </button>
          </PopoverTrigger>

          <PopoverContent align="end" className="w-64 p-2">
            <div className="text-sm font-medium mb-2">Notifications</div>

            <div className="space-y-2 text-sm">
              <div className="rounded-md p-2 hover:bg-muted cursor-pointer">
                New order received
              </div>
              <div className="rounded-md p-2 hover:bg-muted cursor-pointer">
                Product stock low
              </div>
              <div className="rounded-md p-2 hover:bg-muted cursor-pointer">
                Payment confirmed
              </div>
            </div>
          </PopoverContent>
        </Popover>

        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <button>
              <Avatar className="h-8 w-8">
                <AvatarFallback className="bg-blue-600 text-white">
                  A
                </AvatarFallback>
              </Avatar>
            </button>
          </DropdownMenuTrigger>

          <DropdownMenuContent align="end" className="w-40">
            <DropdownMenuItem className="gap-2">
              <User size={14} /> Profile
            </DropdownMenuItem>

            <DropdownMenuItem
              className="gap-2 text-destructive"
              onClick={onLogout}
            >
              <LogOut size={14} /> Logout
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </header>
  );
}
