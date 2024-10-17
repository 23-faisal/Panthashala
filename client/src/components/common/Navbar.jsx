import HomePage from "@/pages/HomePage";
import OffersPage from "@/pages/OffersPage";
import SignInPage from "@/pages/SignInPage";
import React, { useState } from "react";
import { Link, NavLink } from "react-router-dom";
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "../ui/sheet";
import { Button } from "../ui/button";
import { Logs } from "lucide-react";

const navLinks = [
  {
    path: "/",
    name: "Home",
    element: <HomePage />,
  },
  {
    path: "/offers",
    name: "Offers",
    element: <OffersPage />,
  },
  {
    path: "/Sign-in",
    name: "Sign In",
    element: <SignInPage />,
  },
];

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);

  const handleLinkClick = () => {
    setIsOpen(false);
  };
  return (
    <nav className="w-full bg-slate-50 border-b">
      <div className="flex items-center justify-between max-w-6xl mx-auto h-16 px-4">
        <div>
          <Link className="text-2xl font-extrabold text-teal-500 " to="/">
            Panthashala
          </Link>
        </div>
        <div className="hidden sm:flex sm:space-x-4">
          {navLinks.map((link, index) => (
            <NavLink
              key={index}
              to={link.path}
              className={({ isActive }) =>
                isActive
                  ? "text-teal-500  font-bold border-b-2 border-teal-500  "
                  : "text-gray-400 font-bold  "
              }
            >
              {link.name}
            </NavLink>
          ))}
        </div>

        {/* mobile menu */}
        <div className=" flex flex-col items-center  sm:hidden ">
          <Sheet open={isOpen} onOpenChange={setIsOpen}>
            <SheetTrigger asChild>
              <Button variant="outline" onClick={() => setIsOpen(true)}>
                <Logs className="h-5 w-5 text-teal-500 " />
              </Button>
            </SheetTrigger>
            <SheetContent className="sm:hidden" side="right">
              <SheetHeader>
                <SheetTitle>Menu</SheetTitle>
                <SheetDescription></SheetDescription>
              </SheetHeader>
              {/* we'll work on here */}

              <div className="flex flex-col items-center space-y-4 mt-4 sm:hidden">
                {navLinks.map((link, index) => (
                  <NavLink
                    key={index}
                    to={link.path}
                    onClick={handleLinkClick}
                    className={({ isActive }) =>
                      isActive
                        ? "text-teal-500 text-lg  font-bold border-b-2 border-teal-500  "
                        : "text-gray-400 text-lg font-bold  "
                    }
                  >
                    {link.name}
                  </NavLink>
                ))}
              </div>

              {/*  */}
              <SheetFooter>
                <SheetClose asChild></SheetClose>
              </SheetFooter>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;