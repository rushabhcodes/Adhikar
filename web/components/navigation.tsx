"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Menu, X } from "lucide-react";
import { LoginButton } from "./auth/login-button";

export function Navigation() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = (e: Event) => {
      e.preventDefault();
      const target = e.target as HTMLAnchorElement;
      const id = target.getAttribute("href")?.slice(1);
      if (id) {
        const element = document.getElementById(id);
        if (element) {
          element.scrollIntoView({
            behavior: "smooth",
          });
        }
      }
    };

    const links = document.querySelectorAll('a[href^="#"]');
    links.forEach((link) => {
      link.addEventListener("click", handleScroll);
    });

    return () => {
      links.forEach((link) => {
        link.removeEventListener("click", handleScroll);
      });
    };
  }, []);

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-background/80 backdrop-blur-sm border-b">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center">
            <Link href="/" className="text-2xl font-bold text-primary">
              Adhikar
            </Link>
          </div>
          <nav className="hidden md:flex space-x-4">
            <Link href="#features" className="text-sm hover:text-primary">
              Features
            </Link>
            <Link href="#users" className="text-sm hover:text-primary">
              Who It&apos;s For
            </Link>
            <Link href="#testimonials" className="text-sm hover:text-primary">
              Testimonials
            </Link>
            <Link href="#faq" className="text-sm hover:text-primary">
              FAQ
            </Link>
          </nav>
          <div className="hidden md:flex items-center space-x-4">
            <LoginButton mode="modal" asChild>
              <Button variant={"secondary"}>Sign In</Button>
            </LoginButton>
          </div>
          <div className="md:hidden">
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="text-gray-500 hover:text-gray-600"
            >
              {isMenuOpen ? (
                <X className="h-6 w-6" />
              ) : (
                <Menu className="h-6 w-6" />
              )}
            </button>
          </div>
        </div>
      </div>
      {isMenuOpen && (
        <div className="md:hidden">
          <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
            <Link
              href="#features"
              className="block px-3 py-2 text-base font-medium hover:text-primary"
            >
              Features
            </Link>
            <Link
              href="#users"
              className="block px-3 py-2 text-base font-medium hover:text-primary"
            >
              Who It&apos;s For
            </Link>
            <Link
              href="#testimonials"
              className="block px-3 py-2 text-base font-medium hover:text-primary"
            >
              Testimonials
            </Link>
            <Link
              href="#faq"
              className="block px-3 py-2 text-base font-medium hover:text-primary"
            >
              FAQ
            </Link>
            <Link
              href="#"
              className="block px-3 py-2 text-base font-medium hover:text-primary"
            >
              Sign in
            </Link>
            <div className="px-3 py-2">
              <Button className="w-full">Try for free</Button>
            </div>
          </div>
        </div>
      )}
    </header>
  );
}
