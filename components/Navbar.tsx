interface NavbarProps {
  name: string;
}

export default function Navbar({ name }: NavbarProps) {
  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-white/80 backdrop-blur-lg border-b border-gray-100">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between h-16">
        <div className="flex items-center gap-2.5">
          {/* Orange rounded square with </> code brackets */}
          <svg width="28" height="28" viewBox="0 0 28 28" fill="none" xmlns="http://www.w3.org/2000/svg">
            <rect x="1" y="1" width="26" height="26" rx="5" fill="#F97316" />
            <path d="M10.5 9L6.5 14L10.5 19" stroke="white" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" />
            <path d="M17.5 9L21.5 14L17.5 19" stroke="white" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" />
            <path d="M15.5 7.5L12.5 20.5" stroke="white" strokeWidth="1.8" strokeLinecap="round" />
          </svg>
          <span className="font-bold text-gray-900 text-[15px] tracking-tight">ContractorAPI</span>
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
