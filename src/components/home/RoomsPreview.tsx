import { rooms } from "@/data/rooms";
import { SectionHeading } from "@/components/common/SectionHeading";
import { Button } from "@/components/common/Button";
import { FadeIn } from "@/components/animations/FadeIn";
import { RoomCard } from "@/components/home/RoomCard";

export function RoomsPreview() {
  const featured = rooms.filter((r) => r.featured).slice(0, 3);

  return (
    <section className="py-16 md:py-24 bg-[#072A32]" aria-labelledby="rooms-preview-heading">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <FadeIn>
          <SectionHeading
            id="rooms-preview-heading"
            eyebrow="Accommodation"
            title="Comfortable Rooms for Every Stay"
            subtitle="Explore our authentic resort rooms with air conditioning, comfortable bedding, LED TV, and serene coastal views."
            align="center"
            light
          />
        </FadeIn>

        {/* Responsive Grid: 1 col on mobile, 2 cols on md, 3 cols on lg */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-7 mt-10 md:mt-14">
          {featured.map((room, idx) => (
            <FadeIn key={room.id} delay={idx * 0.1} className="h-full">
              <RoomCard room={room} />
            </FadeIn>
          ))}
        </div>

        <div className="flex justify-center items-center mt-10 sm:mt-12 w-full">
          <Button href="/rooms" variant="accent" size="lg" className="min-w-[200px]">
            View All Rooms & Packages
          </Button>
        </div>
      </div>
    </section>
  );
}
