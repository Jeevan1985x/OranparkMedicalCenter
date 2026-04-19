"use client";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import { Session } from "next-auth";
import { signOut, useSession } from "next-auth/react";

interface ClientAvatarProps {
  session: Session;
}

export default function ClientAvatar({
  session: initialSession,
}: ClientAvatarProps) {
  let { data: session } = useSession();

  const handleSignOut = async () => {
    try {
      await signOut({ callbackUrl: "/" });
    } catch {
      window.location.href = "/api/auth/signout?callbackUrl=%2F";
    }
  };

  session = session || initialSession;

  const { name, image, email, role } = session.user;
  const userName = name ?? "User";
  const firstInitial = userName.charAt(0).toUpperCase();
  //const imageTest = "";

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          variant="ghost"
          className="relative w-8 h-8 rounded-full cursor-pointer bg-gray-300 dark:bg-gray-600"
        >
          {image ? (
            <Image
              src={image}
              alt={userName}
              fill
              className="object-cover rounded-full"
              unoptimized
            />
          ) : (
            firstInitial
          )}
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-56" align="end">
        <DropdownMenuLabel>
          <div className="flex flex-col space-y-1">
            <p className="text-sm font-medium leading-none">{userName}</p>
            <p className="text-xs leading-none text-muted-foreground">
              {email}
            </p>
          </div>
        </DropdownMenuLabel>
        <DropdownMenuSeparator />
        {role === "PATIENT" && (
          <DropdownMenuItem asChild>
            <Link className="cursor-pointer w-full" href="/user/profile">
              User Profile
            </Link>
          </DropdownMenuItem>
        )}
        {role === "ADMIN" && (
          <DropdownMenuItem asChild>
            <Link className="cursor-pointer w-full" href="/admin/dashboard">
              Admin Dashboard
            </Link>
          </DropdownMenuItem>
        )}
        <DropdownMenuSeparator />
        <DropdownMenuItem onClick={handleSignOut} className="cursor-pointer">
          <Button variant="ghost" type="button" className="w-full justify-start p-0">
            Sign out
          </Button>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
