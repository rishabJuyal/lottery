import {
    Home,
    FileEdit,
    Dice3,
    Ticket,
    HandCoins,
    BarChart3,
    ShieldAlert,
    HelpCircle,
    Settings,
  } from "lucide-react";
  
  export const sidebarLinks = [
    { label: "HOME", icon: Home, path: "/" },
    { label: "CREATE DIGITAL SLIP", icon: FileEdit, path: "/create-digital-slip", rightArrow: true },
    { label: "DRAW GAMES", icon: Dice3, path: "/draw-games" },
    { label: "SCRATCH TICKETS", icon: Ticket, path: "/scratch-tickets" },
    { label: "CLAIMING YOUR PRIZE", icon: HandCoins, path: "/claim-prize" },
    { label: "WHERE THE MONEY GOES", icon: BarChart3, path: "/money-goes" },
    { label: "RESPONSIBLE GAMBLING", icon: ShieldAlert, path: "/responsible-gambling" },
    { label: "FAQS", icon: HelpCircle, path: "/faqs" },
    { label: "SETTINGS", icon: Settings, path: "/settings", rightArrow: true },
  ];
  