import {
  ArrowUpDown,
  Car,
  Bike,
  Share2,
  ShieldCheck,
  Footprints,
  Bus,
  Building2,
} from "lucide-react"
import { Reveal } from "@/components/reveal"

const amenities = [
  { icon: Footprints, title: "Walkable Neighborhood", body: "Shops, dining, and essentials within a short walk." },
  { icon: Bus, title: "Transit Access", body: "TheBus routes and nearby stops just outside your door." },
  { icon: Bike, title: "Bike Share", body: "Bike-share options for easy car-free trips around town." },
  { icon: Share2, title: "Car Share", body: "Car-share access for when you need a vehicle." },
  { icon: Car, title: "On-Site Parking", body: "Dedicated on-site parking for residents." },
  { icon: ShieldCheck, title: "Controlled Access", body: "Secure, controlled building entry for peace of mind." },
  { icon: ArrowUpDown, title: "Elevator Access", body: "Convenient elevator service throughout the building." },
  { icon: Building2, title: "Modern Systems", body: "Contemporary systems in a reimagined building." },
]

export function Amenities() {
  return (
    <section
      id="amenities"
      className="border-t border-border/40 bg-secondary/10 py-32 lg:py-48"
    >
      <div className="mx-auto max-w-7xl px-6 lg:px-10">
        <div className="max-w-2xl">
          <p className="mb-5 font-mono text-xs uppercase tracking-[0.3em] text-primary">
            Amenities
          </p>
          <h2 className="text-balance font-serif text-4xl leading-[1.05] text-foreground sm:text-5xl">
            Built for connected, convenient living.
          </h2>
        </div>

        <div className="mt-16 grid grid-cols-1 gap-x-10 gap-y-12 sm:grid-cols-2 lg:grid-cols-4">
          {amenities.map((a, i) => (
            <Reveal key={a.title} delay={(i % 4) * 0.06}>
              <div className="flex flex-col gap-4">
                <a.icon className="size-6 text-primary" aria-hidden="true" />
                <div>
                  <h3 className="font-medium text-foreground">{a.title}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                    {a.body}
                  </p>
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  )
}
