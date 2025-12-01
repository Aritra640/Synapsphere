export default function Page() {
  return (
    <div className="min-h-screen bg-gray-950 text-white flex items-center justify-center p-10">
      <div className="relative w-full max-w-4xl h-[600px] border border-gray-800 rounded-2xl bg-gray-900/40 backdrop-blur-xl">

        {/* Center Node */}
        <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 
                        p-4 rounded-xl bg-purple-700/40 border border-purple-500/40">
          <h2 className="font-semibold text-lg">BuildFlow</h2>
          <p className="text-sm text-gray-300">Decentralized Manufacturing</p>
        </div>

        {/* Supplier */}
        <div className="absolute left-[15%] top-[20%] p-3 rounded-xl bg-purple-800/30 border border-purple-600/40">
          <h3 className="font-semibold">Suppliers</h3>
        </div>

        {/* Manufacturing */}
        <div className="absolute left-[15%] top-[65%] p-3 rounded-xl bg-indigo-800/30 border border-indigo-600/40">
          <h3 className="font-semibold">Manufacturing</h3>
        </div>

        {/* Payments */}
        <div className="absolute right-[15%] top-[20%] p-3 rounded-xl bg-green-800/30 border border-green-600/40">
          <h3 className="font-semibold">Payments</h3>
        </div>

        {/* Logistics */}
        <div className="absolute right-[15%] top-[68%] p-3 rounded-xl bg-yellow-800/30 border border-yellow-600/40">
          <h3 className="font-semibold">Logistics</h3>
        </div>

        {/* SVG Lines */}
        <svg className="absolute inset-0 w-full h-full pointer-events-none">
          {/* Center → Supplier */}
          <line x1="50%" y1="50%" x2="22%" y2="28%" stroke="#a855f7" strokeWidth="2" />

          {/* Center → Manufacturing */}
          <line x1="50%" y1="50%" x2="22%" y2="72%" stroke="#818cf8" strokeWidth="2" />

          {/* Center → Payments */}
          <line x1="50%" y1="50%" x2="78%" y2="28%" stroke="#4ade80" strokeWidth="2" />

          {/* Center → Logistics */}
          <line x1="50%" y1="50%" x2="78%" y2="72%" stroke="#facc15" strokeWidth="2" />
        </svg>

      </div>
    </div>
  );
}

