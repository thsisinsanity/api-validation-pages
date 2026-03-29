interface NavbarProps {
  name: string;
}

export default function Navbar({ name }: NavbarProps) {
  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-white/80 backdrop-blur-lg border-b border-gray-100">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between h-16">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-lg bg-gray-900 flex items-center justify-center">
            <svg className="w-4 h-4 text-white" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2.5}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M17.25 6.75 22.5 12l-5.25 5.25m-10.5 0L1.5 12l5.25-5.25m7.5-3-4.5 16.5" />
            </svg>
          </div>
          <span className="font-semibold text-gray-900 text-sm tracking-tight">{name}</span>
        </div>
        <div className="flex items-center gap-6">
          <a href="#features" className="hidden sm:block text-sm text-gray-500 hover:text-gray-900 transition-colors">
            Features
          </a>
          <a href="#pricing" className="hidden sm:block text-sm text-gray-500 hover:text-gray-900 transition-colors">
            Pricing
          </a>
          <a href="#demo" className="hidden sm:block text-sm text-gray-500 hover:text-gray-900 transition-colors">
            API
          </a>
          <a
            href="#waitlist"
            className="text-sm font-medium bg-gray-900 text-white px-4 py-2 rounded-full hover:bg-gray-800 transition-colors"
          >
            Get early access
          </a>
        </div>
      </div>
    </nav>
  );
}
