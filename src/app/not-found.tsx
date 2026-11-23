import Link from "next/link";
import { Button } from "@/components/common/Button";

export default function NotFound() {
  return (
    <div className="min-h-screen bg-[#FCFAF6] flex items-center justify-center px-4">
      <div className="text-center max-w-lg">
        <div className="font-playfair text-8xl font-bold text-[#E0B45C] mb-4">404</div>
        <h1 className="font-playfair text-3xl font-bold text-[#072A32] mb-4">
          Page Not Found
        </h1>
        <p className="text-[#566970] mb-8 leading-relaxed">
          The page you are looking for does not exist. Perhaps you were looking
          for our rooms, gallery or contact information?
        </p>
        <div className="flex flex-wrap justify-center gap-4">
          <Button href="/" variant="primary" size="lg">
            Return Home
          </Button>
          <Button href="/contact" variant="outline" size="lg">
            Contact Us
          </Button>
        </div>
      </div>
    </div>
  );
}
