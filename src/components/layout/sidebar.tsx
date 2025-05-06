
"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  BarChart,
  Droplet,
  HelpCircle,
  Home,
  Leaf,
  Settings,
  Waves, // Using Waves for Impact
} from "lucide-react";
import {
  Sidebar,
  SidebarHeader,
  SidebarContent,
  SidebarFooter,
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
  SidebarTrigger,
  useSidebar,
} from "@/components/ui/sidebar";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

const navItems = [
  { href: "/", label: "Dashboard", icon: Home },
  { href: "/fields", label: "Gestión Campos", icon: BarChart },
  { href: "/settings", label: "Configuración Riego", icon: Settings },
  { href: "/help", label: "Capacitación y Ayuda", icon: HelpCircle },
  { href: "/impact", label: "Impacto Ambiental", icon: Waves }, // Using Waves icon
];

export function AppSidebar() {
  const pathname = usePathname();
  const { isMobile } = useSidebar();


  return (
    <Sidebar>
       <SidebarHeader className="p-4">
         <div className="flex items-center gap-2">
            <Leaf className="h-8 w-8 text-primary-foreground" />
            <h2 className="text-xl font-semibold text-primary-foreground group-data-[collapsible=icon]:hidden">
                AguaInteligente
            </h2>
            {isMobile && <SidebarTrigger className="ml-auto" />}
         </div>

       </SidebarHeader>

       <SidebarContent className="p-2">
         <SidebarMenu>
           {navItems.map((item) => (
             <SidebarMenuItem key={item.href}>
               <SidebarMenuButton
                 asChild
                 isActive={pathname === item.href}
                 size="lg"
                 tooltip={item.label}
                 className="text-base justify-start" // Ensure text aligns left
               >
                 <Link href={item.href} className="flex items-center gap-3">
                   <item.icon className="h-6 w-6" /> {/* Larger icons */}
                   <span className="group-data-[collapsible=icon]:hidden">{item.label}</span>
                 </Link>
               </SidebarMenuButton>
             </SidebarMenuItem>
           ))}
         </SidebarMenu>
       </SidebarContent>

       <SidebarFooter className="p-4 group-data-[collapsible=icon]:hidden">
         {/* Optional: Add footer content like version number or quick links */}
         <p className="text-xs text-sidebar-foreground/70">
            © {new Date().getFullYear()} AguaInteligente
         </p>
       </SidebarFooter>
    </Sidebar>
  );
}
