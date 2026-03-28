import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"
import { LucideIcon,icons,HelpCircle } from "lucide-react"
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}
export function getIconComponent(iconName: string): LucideIcon {    
  if (!iconName) {
    console.warn("No icon name provided. Using default icon.");
    return HelpCircle; // Return a default icon if no name is provided
  }

  const IconComponent = icons[iconName as keyof typeof icons] ;
  if (IconComponent) {
    return IconComponent;
  } 
  console.warn(`Icon "${iconName}" not found. Using default icon.`);
  return HelpCircle; // Return a default icon if the specified one is not found

}