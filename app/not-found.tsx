import Link from 'next/link';

export default function NotFound() {
  return (
    <div className="w-full bg-[#F7F5EE] border-4 border-[#2A2E38] p-12 text-center shadow-[8px_8px_0px_0px_#2A2E38] space-y-4 my-12 font-sans">
      <div className="text-4xl font-black font-display text-[#C43B3B]">404</div>
      <h2 className="text-xl font-bold uppercase text-[#15181F]">Page Not Found</h2>
      <p className="text-sm font-mono text-[#5A5E6B] max-w-md mx-auto">
        The requested resource or inspection target could not be found.
      </p>
      <div className="pt-2">
        <Link
          href="/"
          className="inline-block px-4 py-2 bg-[#2A2E38] text-[#F7F5EE] font-mono font-bold text-xs uppercase hover:bg-[#15181F] transition-colors"
        >
          Return to Overview
        </Link>
      </div>
    </div>
  );
}
