"use client";
import React from "react";
import { Badge } from "@/components/ui/badge";
import { type VariantProps } from "class-variance-authority";
import { badgeVariants } from "@/components/ui/badge";

type AppointmentStatus =
  | "BOOKING_CONFIRMED"
  | "COMPLETED"
  | "CANCELLED"
  | "NO_SHOW"
  | "PAYMENT_PENDING"
  | "CASH";
 
// Props definition for the component
interface AppointmentStatusBadgeProps {
  status?: AppointmentStatus | string | null;
}
 
export default function AppointmentStatusBadge({
  status,
}: AppointmentStatusBadgeProps) {
  //fallback
  if (!status) {
    return <Badge variant="secondary">Unknown</Badge>;
  }
 
  let statusText: string;
  let badgeVariant: VariantProps<typeof badgeVariants>["variant"] = "secondary";
 
  // Determine the badge variant based on the status
  switch (status) {
    case "BOOKING_CONFIRMED":
      badgeVariant = "warning";
      statusText = "Upcoming";
      break;
    case "COMPLETED":
      badgeVariant = "success";
      statusText = "Completed";
      break;
    case "CANCELLED":
      badgeVariant = "destructive";
      statusText = "Cancelled";
      break;
    case "NO_SHOW":
      badgeVariant = "destructive";
      statusText = "No Show";
      break;
    case "PAYMENT_PENDING":
      badgeVariant = "warning";
      statusText = "Pending Payment";
      break;
    case "CASH":
      badgeVariant = "secondary";
      statusText = "Pay at Counter";
      break;
    default:
      // This default case will handle any unexpected status values gracefully
      badgeVariant = "secondary";
      statusText = "Undefined";
      break;
  }
 
  // Render the Shadcn Badge component with the determined variant and text
  return <Badge variant={badgeVariant}>{statusText}</Badge>;
}