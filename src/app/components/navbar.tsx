import { SignInButton, SignedIn, SignedOut, UserButton } from "@clerk/nextjs";
import React from "react";
import { BookA } from "lucide-react";
import MenuBtn from "./menu-btn";

export default function Navbar() {
  return (
    <header className="sticky inset-x-0 top-0 z-30 w-full transition-all bg-white/20 backdrop-blur-sm">
      {" "}
      <div className="w-full max-w-screen-xl px-2 5 lg:px-20 relative mx-auto border-b">
        <div className="flex h-14 items-center justify-between">
          <BookA className="w-7 h-7 text-amber-900" />
          <SignedOut>
            <SignInButton>
              <button className="bg-amber-900 text-white px-2 py-2 rounded-md">
                Sign In
              </button>
            </SignInButton>
          </SignedOut>
          <SignedIn>
            <div className="flex">
              <MenuBtn />
              <UserButton />
            </div>
          </SignedIn>
        </div>
      </div>
    </header>
  );
}
