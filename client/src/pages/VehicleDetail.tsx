import Navbar from "@/components/layout/Navbar";
import { vehicles } from "@/lib/mockData";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { Calendar } from "@/components/ui/calendar";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Users, Fuel, Gauge, Star, MapPin, Check, ShieldCheck, Calendar as CalendarIcon } from "lucide-react";
import { useRoute, Link } from "wouter";
import { useState } from "react";
import { addDays, format, differenceInDays } from "date-fns";
import { DateRange } from "react-day-picker";
import { cn } from "@/lib/utils";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import NotFound from "@/pages/not-found";
import Footer from "@/components/layout/Footer";

export default function VehicleDetail() {
  const [match, params] = useRoute("/vehicle/:id");
  const vehicle = vehicles.find(v => v.id === parseInt(params?.id || "0"));
  
  const [date, setDate] = useState<DateRange | undefined>({
    from: new Date(),
    to: addDays(new Date(), 3),
  });

  if (!vehicle) return <NotFound />;

  const days = date?.from && date?.to ? differenceInDays(date.to, date.from) + 1 : 0;
  const total = days * vehicle.price_per_day;
  const insurance = 25 * days;
  const serviceFee = 40;
  const grandTotal = total + insurance + serviceFee;

  return (
    <div className="min-h-screen bg-background flex flex-col pt-24">
      <Navbar />
      
      <div className="container mx-auto px-4 flex-grow mb-12">
        {/* Breadcrumb / Back */}
        <div className="mb-6">
          <Link href="/search" className="text-sm text-muted-foreground hover:text-primary transition-colors flex items-center gap-1">
              ← Back to Search
          </Link>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 md:gap-12">
          
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-8">
            {/* Image Gallery */}
            <div className="rounded-3xl overflow-hidden aspect-video shadow-lg bg-gray-100 relative group">
              <img 
                src={vehicle.image} 
                alt={`${vehicle.brand} ${vehicle.model}`}
                className="w-full h-full object-cover" 
              />
              <div className="absolute bottom-4 right-4 flex gap-2">
                 <Button variant="secondary" size="sm" className="backdrop-blur-md bg-white/80">View Gallery</Button>
              </div>
            </div>

            {/* Title & Key Info */}
            <div className="flex flex-col md:flex-row md:items-start justify-between gap-4">
              <div>
                <div className="flex items-center gap-2 mb-2">
                  <Badge variant="outline" className="border-primary text-primary px-3 py-1 text-xs uppercase tracking-wider bg-primary/5">
                    {vehicle.category}
                  </Badge>
                  <div className="flex items-center gap-1 text-sm font-medium">
                    <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                    <span>{vehicle.rating}</span>
                    <span className="text-muted-foreground">({vehicle.reviews} reviews)</span>
                  </div>
                </div>
                <h1 className="text-3xl md:text-4xl font-heading font-bold mb-2">{vehicle.brand} {vehicle.model}</h1>
                <div className="flex items-center gap-2 text-muted-foreground">
                  <MapPin className="w-4 h-4" />
                  <span>San Francisco, CA</span>
                </div>
              </div>
            </div>

            <Separator />

            {/* Features Grid */}
            <div>
              <h3 className="text-xl font-heading font-semibold mb-6">Vehicle Features</h3>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                <div className="bg-muted/30 p-4 rounded-xl border border-border/50 flex flex-col items-center text-center gap-2">
                   <Users className="w-6 h-6 text-primary" />
                   <span className="text-sm font-medium">{vehicle.seats} Seats</span>
                </div>
                <div className="bg-muted/30 p-4 rounded-xl border border-border/50 flex flex-col items-center text-center gap-2">
                   <Gauge className="w-6 h-6 text-primary" />
                   <span className="text-sm font-medium">{vehicle.transmission}</span>
                </div>
                <div className="bg-muted/30 p-4 rounded-xl border border-border/50 flex flex-col items-center text-center gap-2">
                   <Fuel className="w-6 h-6 text-primary" />
                   <span className="text-sm font-medium">{vehicle.fuel}</span>
                </div>
                 <div className="bg-muted/30 p-4 rounded-xl border border-border/50 flex flex-col items-center text-center gap-2">
                   <ShieldCheck className="w-6 h-6 text-primary" />
                   <span className="text-sm font-medium">Insured</span>
                </div>
              </div>
            </div>

             <Separator />
            
            {/* Description */}
            <div>
              <h3 className="text-xl font-heading font-semibold mb-4">Description</h3>
              <p className="text-muted-foreground leading-relaxed">
                Experience the thrill of driving the {vehicle.brand} {vehicle.model}. 
                This vehicle combines performance, luxury, and comfort in one perfect package. 
                Whether you're cruising down the coast or navigating city streets, the {vehicle.model} delivers an unforgettable ride.
                Equipped with {vehicle.features.join(", ")} and more.
              </p>
            </div>

            <Separator />

             {/* Features List */}
            <div>
              <h3 className="text-xl font-heading font-semibold mb-4">Included Features</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                {vehicle.features.map((feature) => (
                   <div key={feature} className="flex items-center gap-3">
                      <div className="w-5 h-5 rounded-full bg-primary/10 flex items-center justify-center text-primary">
                        <Check className="w-3 h-3" />
                      </div>
                      <span>{feature}</span>
                   </div>
                ))}
                <div className="flex items-center gap-3">
                   <div className="w-5 h-5 rounded-full bg-primary/10 flex items-center justify-center text-primary">
                     <Check className="w-3 h-3" />
                   </div>
                   <span>Free Cancellation (24h)</span>
                </div>
                <div className="flex items-center gap-3">
                   <div className="w-5 h-5 rounded-full bg-primary/10 flex items-center justify-center text-primary">
                     <Check className="w-3 h-3" />
                   </div>
                   <span>24/7 Roadside Assist</span>
                </div>
              </div>
            </div>

            <Separator />

            {/* Reviews Preview */}
            <div>
              <h3 className="text-xl font-heading font-semibold mb-6">Reviews</h3>
              <div className="space-y-6">
                {[1, 2].map((i) => (
                  <div key={i} className="bg-card p-6 rounded-2xl border border-border/50 shadow-sm">
                    <div className="flex items-center justify-between mb-4">
                      <div className="flex items-center gap-3">
                        <Avatar>
                          <AvatarImage src={`https://i.pravatar.cc/150?u=${i}`} />
                          <AvatarFallback>U{i}</AvatarFallback>
                        </Avatar>
                        <div>
                          <p className="font-semibold">Alex Johnson</p>
                          <p className="text-xs text-muted-foreground">Dec 12, 2024</p>
                        </div>
                      </div>
                      <div className="flex text-yellow-400">
                        {[1,2,3,4,5].map(s => <Star key={s} className="w-4 h-4 fill-current" />)}
                      </div>
                    </div>
                    <p className="text-muted-foreground text-sm">
                      "Absolutely amazing car! The condition was pristine and it was a joy to drive. 
                      The booking process was smooth and the host was very communicative."
                    </p>
                  </div>
                ))}
                <Button variant="outline" className="w-full">Read all {vehicle.reviews} reviews</Button>
              </div>
            </div>

          </div>

          {/* Booking Sidebar */}
          <div className="lg:col-span-1">
            <div className="sticky top-28 bg-card border border-border rounded-3xl p-6 shadow-xl shadow-black/5">
              <div className="flex items-end gap-2 mb-6">
                <span className="text-3xl font-heading font-bold text-primary">${vehicle.price_per_day}</span>
                <span className="text-muted-foreground mb-1">/ day</span>
              </div>

              <div className="space-y-4 mb-6">
                <div className="space-y-2">
                   <label className="text-sm font-medium">Trip Dates</label>
                   <Popover>
                    <PopoverTrigger asChild>
                      <Button
                        id="date"
                        variant={"outline"}
                        className={cn(
                          "w-full justify-start text-left font-normal h-12 rounded-xl",
                          !date && "text-muted-foreground"
                        )}
                      >
                        <CalendarIcon className="mr-2 h-4 w-4" />
                        {date?.from ? (
                          date.to ? (
                            <>
                              {format(date.from, "LLL dd, y")} -{" "}
                              {format(date.to, "LLL dd, y")}
                            </>
                          ) : (
                            format(date.from, "LLL dd, y")
                          )
                        ) : (
                          <span>Pick a date</span>
                        )}
                      </Button>
                    </PopoverTrigger>
                    <PopoverContent className="w-auto p-0" align="end">
                      <Calendar
                        initialFocus
                        mode="range"
                        defaultMonth={date?.from}
                        selected={date}
                        onSelect={setDate}
                        numberOfMonths={2}
                      />
                    </PopoverContent>
                  </Popover>
                </div>
              </div>

              <div className="space-y-3 mb-6 bg-muted/30 p-4 rounded-xl">
                 <div className="flex justify-between text-sm">
                   <span>${vehicle.price_per_day} x {days} days</span>
                   <span>${total}</span>
                 </div>
                 <div className="flex justify-between text-sm">
                   <span>Insurance Coverage</span>
                   <span>${insurance}</span>
                 </div>
                 <div className="flex justify-between text-sm">
                   <span>Service Fee</span>
                   <span>${serviceFee}</span>
                 </div>
                 <Separator className="bg-border/50" />
                 <div className="flex justify-between font-bold text-lg">
                   <span>Total</span>
                   <span>${grandTotal}</span>
                 </div>
              </div>

              <Button className="w-full h-14 text-lg font-semibold rounded-xl shadow-lg shadow-primary/20">
                Book this Car
              </Button>
              <p className="text-center text-xs text-muted-foreground mt-4">
                You won't be charged yet.
              </p>
            </div>
          </div>

        </div>
      </div>
      
      <Footer />
    </div>
  );
}
