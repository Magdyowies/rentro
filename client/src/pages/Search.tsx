import Navbar from "@/components/layout/Navbar";
import VehicleCard from "@/components/vehicle/VehicleCard";
import { vehicles } from "@/lib/mockData";
import { Button } from "@/components/ui/button";
import { Slider } from "@/components/ui/slider";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Filter, ChevronDown } from "lucide-react";
import { useState } from "react";
import { cn } from "@/lib/utils";
import Footer from "@/components/layout/Footer";

export default function Search() {
  const [priceRange, setPriceRange] = useState([50, 500]);
  
  const FilterSection = ({ className }: { className?: string }) => (
    <div className={cn("space-y-8", className)}>
      <div>
        <h3 className="font-heading font-semibold mb-4">Price Range</h3>
        <Slider
          defaultValue={[50, 500]}
          max={1000}
          step={10}
          value={priceRange}
          onValueChange={setPriceRange}
          className="mb-4"
        />
        <div className="flex justify-between text-sm font-medium">
          <span>${priceRange[0]}</span>
          <span>${priceRange[1]}+</span>
        </div>
      </div>

      <Separator />

      <div>
        <h3 className="font-heading font-semibold mb-4">Category</h3>
        <div className="space-y-3">
          {["SUV", "Sedan", "Sports", "Coupe", "Luxury", "Electric"].map((category) => (
            <div key={category} className="flex items-center space-x-2">
              <Checkbox id={`cat-${category}`} />
              <Label htmlFor={`cat-${category}`} className="font-normal cursor-pointer">{category}</Label>
            </div>
          ))}
        </div>
      </div>

      <Separator />

      <div>
        <h3 className="font-heading font-semibold mb-4">Transmission</h3>
        <div className="space-y-3">
          {["Automatic", "Manual"].map((type) => (
            <div key={type} className="flex items-center space-x-2">
              <Checkbox id={`trans-${type}`} />
              <Label htmlFor={`trans-${type}`} className="font-normal cursor-pointer">{type}</Label>
            </div>
          ))}
        </div>
      </div>
      
       <Separator />

      <div>
        <h3 className="font-heading font-semibold mb-4">Features</h3>
        <div className="space-y-3">
          {["Bluetooth", "GPS", "Sunroof", "Heated Seats", "Apple CarPlay"].map((feature) => (
            <div key={feature} className="flex items-center space-x-2">
              <Checkbox id={`feat-${feature}`} />
              <Label htmlFor={`feat-${feature}`} className="font-normal cursor-pointer">{feature}</Label>
            </div>
          ))}
        </div>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-background flex flex-col pt-24">
      <Navbar />
      
      <div className="container mx-auto px-4 flex-grow mb-12">
        {/* Header */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4">
          <div>
            <h1 className="text-3xl font-heading font-bold mb-2">Find your perfect ride</h1>
            <p className="text-muted-foreground">{vehicles.length} vehicles available in San Francisco, CA</p>
          </div>
          
          <div className="flex items-center gap-2 w-full md:w-auto">
             <Sheet>
              <SheetTrigger asChild>
                <Button variant="outline" className="md:hidden w-full">
                  <Filter className="mr-2 h-4 w-4" /> Filters
                </Button>
              </SheetTrigger>
              <SheetContent side="left" className="w-[300px] sm:w-[400px] overflow-y-auto">
                <div className="py-6">
                  <h2 className="text-lg font-heading font-bold mb-6">Filters</h2>
                  <FilterSection />
                  <div className="mt-8 pt-4 border-t border-border sticky bottom-0 bg-background">
                    <Button className="w-full">Show Results</Button>
                  </div>
                </div>
              </SheetContent>
            </Sheet>
            
            <Button variant="outline" className="hidden md:flex">
              Sort by: Recommended <ChevronDown className="ml-2 h-4 w-4" />
            </Button>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Sidebar Filters - Desktop */}
          <div className="hidden md:block col-span-1">
            <div className="sticky top-28 border border-border/50 rounded-2xl p-6 bg-card shadow-sm">
               <FilterSection />
            </div>
          </div>

          {/* Results Grid */}
          <div className="col-span-1 md:col-span-3">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {vehicles.map((vehicle) => (
                <VehicleCard key={vehicle.id} vehicle={vehicle} />
              ))}
              {/* Duplicate for demo volume */}
              {vehicles.map((vehicle) => (
                <VehicleCard key={`dup-${vehicle.id}`} vehicle={{...vehicle, id: 99 + vehicle.id}} />
              ))}
            </div>
            
            <div className="mt-12 flex justify-center">
              <Button variant="outline" size="lg" className="rounded-xl">Load More Vehicles</Button>
            </div>
          </div>
        </div>
      </div>
      
      <Footer />
    </div>
  );
}
