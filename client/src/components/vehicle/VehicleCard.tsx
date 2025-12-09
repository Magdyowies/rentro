import { Link } from "wouter";
import { Vehicle } from "@/lib/mockData";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Users, Fuel, Gauge, Star, ArrowRight } from "lucide-react";
import { Badge } from "@/components/ui/badge";

export default function VehicleCard({ vehicle }: { vehicle: Vehicle }) {
  return (
    <Card className="group overflow-hidden border-border/50 bg-card/50 backdrop-blur-sm hover:shadow-xl hover:shadow-primary/5 hover:border-primary/20 transition-all duration-300">
      <Link href={`/vehicle/${vehicle.id}`}>
        <div className="relative aspect-[4/3] overflow-hidden cursor-pointer">
          <img
            src={vehicle.image}
            alt={`${vehicle.brand} ${vehicle.model}`}
            className="object-cover w-full h-full transition-transform duration-500 group-hover:scale-105"
          />
          <div className="absolute top-3 left-3">
            <Badge variant="secondary" className="backdrop-blur-md bg-white/90 text-foreground font-medium shadow-sm">
              {vehicle.category}
            </Badge>
          </div>
          <div className="absolute bottom-3 right-3">
             <div className="flex items-center gap-1 px-2 py-1 rounded-full bg-black/50 backdrop-blur-md text-white text-xs font-medium">
                <Star className="w-3 h-3 fill-yellow-400 text-yellow-400" />
                {vehicle.rating}
             </div>
          </div>
        </div>
      </Link>
      
      <CardContent className="p-5">
        <div className="flex justify-between items-start mb-2">
          <div>
            <h3 className="font-heading font-semibold text-lg leading-tight group-hover:text-primary transition-colors">
              {vehicle.brand} {vehicle.model}
            </h3>
            <p className="text-muted-foreground text-sm">{vehicle.year}</p>
          </div>
          <div className="text-right">
            <p className="font-heading font-bold text-lg text-primary">${vehicle.price_per_day}</p>
            <p className="text-xs text-muted-foreground">/day</p>
          </div>
        </div>

        <div className="flex items-center gap-4 mt-4 text-sm text-muted-foreground">
          <div className="flex items-center gap-1.5" title="Seats">
            <Users className="w-4 h-4" />
            <span>{vehicle.seats}</span>
          </div>
          <div className="flex items-center gap-1.5" title="Transmission">
            <Gauge className="w-4 h-4" />
            <span>{vehicle.transmission}</span>
          </div>
          <div className="flex items-center gap-1.5" title="Fuel Type">
            <Fuel className="w-4 h-4" />
            <span>{vehicle.fuel}</span>
          </div>
        </div>
      </CardContent>
      
      <CardFooter className="p-5 pt-0">
        <Link href={`/vehicle/${vehicle.id}`} className="w-full">
            <Button className="w-full group-hover:bg-primary group-hover:text-primary-foreground transition-colors" variant="outline">
            View Details
            <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
            </Button>
        </Link>
      </CardFooter>
    </Card>
  );
}
