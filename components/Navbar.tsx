interface NavbarProps {
  name: string;
}

export default function Navbar({ name }: NavbarProps) {
  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-white/80 backdrop-blur-lg border-b border-gray-100">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between h-16">
        <div className="flex items-center gap-2.5">
          {/* Orange checkbox with teal checkmark - matches Canva logo */}
          <svg width="28" height="28" viewBox="0 0 28 28" fill="none" xmlns="http://www.w3.org/2000/svg">
            <rect x="1.5" y="1.5" width="25" height="25" rx="4" stroke="#F97316" strokeWidth="2.5" fill="none" />
            <path d="M8 14.5L12 18.5L20 9.5" stroke="#0F766E" strokeWidth="2.8" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
          <span className="font-bold text-[#0F766E] text-[15px] tracking-tight">ContractorAPI</span>
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
          <a href="/docs" className="hidden sm:block text-sm text-gray-500 hover:text-gray-900 transition-colors">
            Docs
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
