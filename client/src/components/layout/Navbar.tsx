import { Link, useLocation } from "wouter";
import { Search, Menu, X, User, ShoppingBag } from "lucide-react";
import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { cn } from "@/lib/utils";

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [location] = useLocation();
  const isHome = location === "/";

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <nav
      className={cn(
        "fixed top-0 left-0 right-0 z-50 transition-all duration-300",
        isScrolled || !isHome
          ? "bg-background/80 backdrop-blur-md border-b border-border py-4"
          : "bg-transparent py-6"
      )}
    >
      <div className="container mx-auto px-4 flex items-center justify-between">
        {/* Logo */}
        <Link href="/" className={cn("text-2xl font-bold font-heading tracking-tight flex items-center gap-2", 
            isHome && !isScrolled ? "text-white" : "text-foreground"
          )}>
            Drive<span className="text-primary">Ease</span>
        </Link>

        {/* Desktop Links */}
        <div className="hidden md:flex items-center gap-8">
          {[
            { label: "Vehicles", href: "/search" },
            { label: "How it works", href: "/#how-it-works" },
            { label: "Business", href: "/business" },
          ].map((link) => (
            <Link key={link.label} href={link.href} className={cn(
                "text-sm font-medium transition-colors hover:text-primary",
                isHome && !isScrolled ? "text-white/90 hover:text-white" : "text-muted-foreground"
              )}>
                {link.label}
            </Link>
          ))}
        </div>

        {/* Actions */}
        <div className="hidden md:flex items-center gap-4">
          <Button variant="ghost" size="icon" className={isHome && !isScrolled ? "text-white hover:bg-white/10" : ""}>
            <Search className="h-5 w-5" />
          </Button>
          <div className={cn("h-6 w-px", isHome && !isScrolled ? "bg-white/20" : "bg-border")} />
          <Button variant="ghost" className={isHome && !isScrolled ? "text-white hover:bg-white/10 hover:text-white" : ""}>
            Sign In
          </Button>
          <Button className="font-semibold shadow-lg shadow-primary/20">
            Sign Up
          </Button>
        </div>

        {/* Mobile Menu */}
        <div className="md:hidden">
          <Sheet>
            <SheetTrigger asChild>
              <Button variant="ghost" size="icon" className={isHome && !isScrolled ? "text-white hover:bg-white/10" : ""}>
                <Menu className="h-6 w-6" />
              </Button>
            </SheetTrigger>
            <SheetContent side="right" className="w-[300px] sm:w-[400px]">
              <div className="flex flex-col gap-6 mt-8">
                <Link href="/search" className="text-lg font-semibold hover:text-primary">Vehicles</Link>
                <Link href="/#how-it-works" className="text-lg font-semibold hover:text-primary">How it works</Link>
                <Link href="/business" className="text-lg font-semibold hover:text-primary">Business Solutions</Link>
                <hr className="border-border" />
                <Button className="w-full justify-start" variant="outline">
                  <User className="mr-2 h-4 w-4" /> Sign In
                </Button>
                <Button className="w-full justify-start">
                  Sign Up
                </Button>
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </nav>
  );
}
