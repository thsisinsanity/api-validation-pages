interface FooterProps {
  name: string;
}

export default function Footer({ name }: FooterProps) {
  return (
    <footer className="py-12 px-4 sm:px-6 lg:px-8 border-t border-gray-100">
      <div className="max-w-6xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-6">
        <div className="flex items-center gap-2">
          <div className="w-6 h-6 rounded-md bg-gray-900 flex items-center justify-center">
            <svg className="w-3 h-3 text-white" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2.5}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M17.25 6.75 22.5 12l-5.25 5.25m-10.5 0L1.5 12l5.25-5.25m7.5-3-4.5 16.5" />
            </svg>
          </div>
          <span className="text-sm font-medium text-gray-900">{name}</span>
        </div>
        <div className="flex items-center gap-6 text-sm text-gray-400">
          <a href="mailto:hello@contractorapi.dev" className="hover:text-gray-600 transition-colors">
            Contact
          </a>
          <span className="text-gray-200">|</span>
          <a href="/privacy" className="hover:text-gray-600 transition-colors">
            Privacy
          </a>
          <span className="text-gray-200">|</span>
          <a href="/terms" className="hover:text-gray-600 transition-colors">
            Terms
          </a>
        </div>
        <p className="text-sm text-gray-400">
          &copy; {new Date().getFullYear()} All rights reserved.
        </p>
      </div>
    </footer>
  );
}
