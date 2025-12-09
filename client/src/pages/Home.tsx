import Navbar from "@/components/layout/Navbar";
import VehicleCard from "@/components/vehicle/VehicleCard";
import { vehicles } from "@/lib/mockData";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Calendar as CalendarIcon, MapPin, Search, ArrowRight, ShieldCheck, Clock, Headphones } from "lucide-react";
import heroImage from "@assets/generated_images/modern_suv_on_coastal_highway_at_sunset.png";
import { Link } from "wouter";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Calendar } from "@/components/ui/calendar";
import { useState } from "react";
import { format } from "date-fns";
import { cn } from "@/lib/utils";
import Footer from "@/components/layout/Footer";

export default function Home() {
  const [date, setDate] = useState<Date>();

  return (
    <div className="min-h-screen bg-background flex flex-col">
      <Navbar />
      
      {/* Hero Section */}
      <section className="relative h-screen min-h-[600px] flex items-center justify-center overflow-hidden">
        {/* Background */}
        <div className="absolute inset-0 z-0">
          <img 
            src={heroImage} 
            alt="Hero Background" 
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-background via-background/20 to-black/40" />
        </div>

        {/* Content */}
        <div className="container mx-auto px-4 relative z-10 pt-20">
          <div className="max-w-3xl mx-auto text-center mb-12">
            <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold font-heading text-white mb-6 drop-shadow-xl animate-in fade-in slide-in-from-bottom-8 duration-700">
              Find your drive.
            </h1>
            <p className="text-lg md:text-xl text-white/90 mb-8 max-w-xl mx-auto drop-shadow-md animate-in fade-in slide-in-from-bottom-8 duration-700 delay-100">
              Premium vehicle rentals for every journey. From city streets to coastal roads, experience the freedom of the open road.
            </p>
          </div>

          {/* Search Widget */}
          <div className="max-w-4xl mx-auto bg-white/10 backdrop-blur-md border border-white/20 p-4 rounded-3xl shadow-2xl animate-in fade-in slide-in-from-bottom-8 duration-700 delay-200">
            <div className="grid grid-cols-1 md:grid-cols-12 gap-4">
              {/* Location */}
              <div className="md:col-span-4 relative group">
                <div className="absolute left-4 top-1/2 -translate-y-1/2 text-white/70 group-focus-within:text-primary transition-colors">
                  <MapPin className="h-5 w-5" />
                </div>
                <Input 
                  placeholder="Pick-up Location" 
                  className="h-14 pl-12 bg-white/90 border-transparent focus:bg-white text-foreground rounded-2xl transition-all"
                />
              </div>

              {/* Date */}
              <div className="md:col-span-4">
                <Popover>
                  <PopoverTrigger asChild>
                    <Button
                      variant={"outline"}
                      className={cn(
                        "w-full h-14 justify-start text-left font-normal bg-white/90 border-transparent hover:bg-white text-foreground rounded-2xl pl-4",
                        !date && "text-muted-foreground"
                      )}
                    >
                      <CalendarIcon className="mr-2 h-5 w-5 opacity-70" />
                      {date ? format(date, "PPP") : <span>Pick-up Date</span>}
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent className="w-auto p-0 rounded-2xl" align="start">
                    <Calendar
                      mode="single"
                      selected={date}
                      onSelect={setDate}
                      initialFocus
                    />
                  </PopoverContent>
                </Popover>
              </div>

              {/* Search Button */}
              <div className="md:col-span-4">
                <Link href="/search">
                  <Button className="w-full h-14 rounded-2xl text-lg font-semibold shadow-lg shadow-primary/25 hover:shadow-primary/40 transition-all">
                    Search Vehicles
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Vehicles */}
      <section className="py-20 md:py-32">
        <div className="container mx-auto px-4">
          <div className="flex justify-between items-end mb-12">
            <div>
              <h2 className="text-3xl md:text-4xl font-bold font-heading mb-4 text-foreground">Featured Vehicles</h2>
              <p className="text-muted-foreground text-lg max-w-lg">
                Hand-picked for performance and comfort. Choose from our premium selection.
              </p>
            </div>
            <Link href="/search">
              <Button variant="ghost" className="hidden md:flex group text-primary hover:text-primary hover:bg-primary/5">
                View All Vehicles
                <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
              </Button>
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {vehicles.slice(0, 3).map((vehicle) => (
              <VehicleCard key={vehicle.id} vehicle={vehicle} />
            ))}
          </div>

          <div className="mt-8 text-center md:hidden">
            <Link href="/search">
              <Button variant="outline" className="w-full">View All Vehicles</Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Value Props */}
      <section className="py-20 bg-muted/30 border-y border-border/50">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
            <div className="bg-background p-8 rounded-3xl border border-border/50 shadow-sm hover:shadow-md transition-shadow">
              <div className="w-14 h-14 bg-primary/10 rounded-2xl flex items-center justify-center mb-6 text-primary">
                <ShieldCheck className="h-7 w-7" />
              </div>
              <h3 className="text-xl font-bold font-heading mb-3">Fully Insured</h3>
              <p className="text-muted-foreground leading-relaxed">
                Every booking includes comprehensive insurance coverage for your peace of mind. Drive with confidence.
              </p>
            </div>
            <div className="bg-background p-8 rounded-3xl border border-border/50 shadow-sm hover:shadow-md transition-shadow">
              <div className="w-14 h-14 bg-primary/10 rounded-2xl flex items-center justify-center mb-6 text-primary">
                <Clock className="h-7 w-7" />
              </div>
              <h3 className="text-xl font-bold font-heading mb-3">Flexible Booking</h3>
              <p className="text-muted-foreground leading-relaxed">
                Plans change. That's why we offer free cancellation up to 24 hours before your trip starts.
              </p>
            </div>
            <div className="bg-background p-8 rounded-3xl border border-border/50 shadow-sm hover:shadow-md transition-shadow">
              <div className="w-14 h-14 bg-primary/10 rounded-2xl flex items-center justify-center mb-6 text-primary">
                <Headphones className="h-7 w-7" />
              </div>
              <h3 className="text-xl font-bold font-heading mb-3">24/7 Support</h3>
              <p className="text-muted-foreground leading-relaxed">
                Our dedicated support team is available around the clock to assist you with any questions.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="py-20 md:py-32">
        <div className="container mx-auto px-4">
          <div className="bg-secondary rounded-[2.5rem] p-8 md:p-16 relative overflow-hidden text-center md:text-left">
             <div className="absolute top-0 right-0 w-1/2 h-full bg-gradient-to-l from-primary/20 to-transparent hidden md:block" />
             
             <div className="relative z-10 max-w-2xl">
               <h2 className="text-3xl md:text-5xl font-bold font-heading text-white mb-6">
                 Ready to start your journey?
               </h2>
               <p className="text-secondary-foreground/80 text-lg mb-8 max-w-lg">
                 Join thousands of satisfied customers who have found their perfect ride with DriveEase.
               </p>
               <div className="flex flex-col sm:flex-row gap-4">
                 <Button size="lg" className="rounded-xl h-14 px-8 text-lg font-semibold bg-primary text-primary-foreground hover:bg-primary/90">
                   Get Started
                 </Button>
                 <Button size="lg" variant="outline" className="rounded-xl h-14 px-8 text-lg font-semibold border-white/20 text-white hover:bg-white/10 hover:text-white">
                   Download App
                 </Button>
               </div>
             </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
