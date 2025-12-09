import { Link } from "wouter";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

export default function Footer() {
  return (
    <footer className="bg-background py-12 border-t border-border mt-auto">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-12">
          <div className="col-span-1 md:col-span-1">
            <Link href="/" className="text-2xl font-bold font-heading tracking-tight flex items-center gap-2 mb-4">
                Drive<span className="text-primary">Ease</span>
            </Link>
            <p className="text-muted-foreground text-sm leading-relaxed">
              Premium vehicle rental service providing luxury and comfort for your journeys.
            </p>
          </div>
          <div>
            <h4 className="font-bold mb-4">Company</h4>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li><a href="#" className="hover:text-primary transition-colors">About Us</a></li>
              <li><a href="#" className="hover:text-primary transition-colors">Careers</a></li>
              <li><a href="#" className="hover:text-primary transition-colors">Blog</a></li>
              <li><a href="#" className="hover:text-primary transition-colors">Press</a></li>
            </ul>
          </div>
          <div>
            <h4 className="font-bold mb-4">Support</h4>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li><a href="#" className="hover:text-primary transition-colors">Help Center</a></li>
              <li><a href="#" className="hover:text-primary transition-colors">Terms of Service</a></li>
              <li><a href="#" className="hover:text-primary transition-colors">Privacy Policy</a></li>
              <li><a href="#" className="hover:text-primary transition-colors">Contact Us</a></li>
            </ul>
          </div>
          <div>
              <h4 className="font-bold mb-4">Subscribe</h4>
              <p className="text-sm text-muted-foreground mb-4">
                Get the latest news and offers.
              </p>
              <div className="flex gap-2">
                <Input placeholder="Email address" className="bg-white" />
                <Button>Join</Button>
              </div>
          </div>
        </div>
        <div className="pt-8 border-t border-border text-center text-sm text-muted-foreground">
          © 2024 DriveEase. All rights reserved.
        </div>
      </div>
    </footer>
  );
}
