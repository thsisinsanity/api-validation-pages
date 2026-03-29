import {
  ClockIcon,
  CurrencyDollarIcon,
  PuzzlePieceIcon,
  BuildingOffice2Icon,
  BoltIcon,
  MapPinIcon,
  MagnifyingGlassIcon,
  ShieldCheckIcon,
} from "@heroicons/react/24/outline";

const iconMap: Record<string, React.ComponentType<React.SVGProps<SVGSVGElement>>> = {
  clock: ClockIcon,
  dollar: CurrencyDollarIcon,
  puzzle: PuzzlePieceIcon,
  building: BuildingOffice2Icon,
  zap: BoltIcon,
  map: MapPinIcon,
  search: MagnifyingGlassIcon,
  shield: ShieldCheckIcon,
  gavel: ShieldCheckIcon,
};

interface FeaturesProps {
  benefits: { icon: string; title: string; description: string }[];
  useCases: { industry: string; description: string; icon: string }[];
}

export default function Features({ benefits, useCases }: FeaturesProps) {
  return (
    <>
      {/* Pain points */}
      <section id="features" className="py-24 px-4 sm:px-6 lg:px-8 bg-surface">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <p className="text-sm font-semibold tracking-widest text-brand-600 uppercase mb-4">
              Why this API
            </p>
            <h2 className="font-display text-3xl sm:text-4xl lg:text-5xl font-bold text-gray-900 tracking-normal leading-tight">
              Everything you need, nothing you don&apos;t
            </h2>
          </div>

          <div className="grid md:grid-cols-3 gap-6">
            {benefits.map((point) => {
              const Icon = iconMap[point.icon] || ShieldCheckIcon;
              return (
                <div
                  key={point.title}
                  className="group bg-white rounded-2xl p-8 border border-gray-200 shadow-sm hover:border-gray-300 hover:shadow-lg hover:shadow-gray-200/50 transition-all duration-300"
                >
                  <div className="w-12 h-12 rounded-xl bg-brand-50 text-brand-600 flex items-center justify-center mb-6 group-hover:bg-brand-100 transition-colors">
                    <Icon className="w-6 h-6" />
                  </div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-3">
                    {point.title}
                  </h3>
                  <p className="text-gray-500 text-[15px] leading-relaxed">
                    {point.description}
                  </p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Use cases */}
      <section className="py-24 px-4 sm:px-6 lg:px-8">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <p className="text-sm font-semibold tracking-widest text-brand-600 uppercase mb-4">
              Built for
            </p>
            <h2 className="font-display text-3xl sm:text-4xl lg:text-5xl font-bold text-gray-900 tracking-normal leading-tight">
              Built for your industry
            </h2>
            <p className="mt-4 text-gray-500 text-lg max-w-2xl mx-auto">
              What takes 3 minutes per lookup on a state website takes one API call through us.
            </p>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {useCases.map((useCase) => {
              const Icon = iconMap[useCase.icon] || ShieldCheckIcon;
              return (
                <div
                  key={useCase.industry}
                  className="group p-6 rounded-2xl border border-gray-100 bg-white hover:border-gray-200 hover:shadow-lg hover:shadow-gray-100/50 hover:-translate-y-0.5 transition-all duration-300"
                >
                  <div className="w-12 h-12 rounded-xl bg-brand-50 text-brand-600 flex items-center justify-center mb-5 group-hover:bg-brand-100 transition-colors">
                    <Icon className="w-6 h-6" />
                  </div>
                  <h3 className="font-semibold text-gray-900 text-base">
                    {useCase.industry}
                  </h3>
                  <p className="text-gray-500 text-sm mt-1.5 leading-relaxed">
                    {useCase.description}
                  </p>
                </div>
              );
            })}
          </div>
        </div>
      </section>
    </>
  );
}
