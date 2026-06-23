import {
  ArrowUpDown,
  Car,
  Share2,
  ShieldCheck,
  Bus,
  Building2,
  Microwave,
  WashingMachine,
} from "lucide-react"
import { Reveal } from "@/components/reveal"

const amenities = [
  { icon: Building2, title: "High Ceilings & Big Windows", body: "Over 10-foot ceilings and large, expansive windows in every home." },
  { icon: WashingMachine, title: "Laundry Every Floor", body: "On-site laundry facilities on every floor of the building." },
  { icon: Microwave, title: "Equipped Kitchens", body: "Built-in microwave and garbage disposal in every unit." },
  { icon: ArrowUpDown, title: "Elevator", body: "Elevator service to every floor." },
  { icon: ShieldCheck, title: "Secured Lobby", body: "A secured lobby and controlled building entry." },
  { icon: Car, title: "Covered Parking", body: "Limited covered parking stalls available to rent." },
  { icon: Share2, title: "Car Share & Bike Racks", body: "On-site car share plus bike racks for easy car-free trips." },
  { icon: Bus, title: "Steps from Transit", body: "TheBus routes and Ala Moana Center just outside your door." },
]

export function Amenities() {
  return (
    <section
      id="amenities"
      className="border-t border-border bg-secondary/30 py-24 lg:py-32"
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
