export default async function preview() {
  return (
    <main className="min-h-screen flex items-center justify-center bg-gradient-to-br from-[#080013] via-[#110226] to-black text-white px-6 py-12">
      <div className="max-w-6xl w-full bg-[#151522]/80 backdrop-blur-xl border border-white/10 rounded-2xl shadow-[0_0_60px_rgba(136,56,255,0.15)] p-10 relative overflow-hidden">
        
        {/* Ambient Glows */}
        <div className="pointer-events-none absolute -left-20 top-10 h-60 w-60 rounded-full bg-purple-700/20 blur-[120px]" />
        <div className="pointer-events-none absolute -right-10 bottom-10 h-72 w-72 rounded-full bg-indigo-500/20 blur-[120px]" />

        {/* Header */}
        <div className="mb-8 text-center">
          <h1 className="text-3xl font-bold bg-gradient-to-r from-purple-400 to-indigo-500 bg-clip-text text-transparent">
            SynapSphere Knowledge Graph (Preview)
          </h1>
          <p className="text-gray-400 text-sm max-w-xl mx-auto mt-2">
            A visual map of how your thoughts, notes, media, concepts, research, and insights connect.
            Soon, this graph will be intelligent, interactive, and AI-powered.
          </p>
        </div>

        {/* Graph Container */}
        <div className="relative w-full h-[500px] rounded-xl border border-white/10 bg-[#12041a]/60 overflow-hidden shadow-inner">

          {/* SVG Graph */}
          <svg viewBox="0 0 800 450" className="w-full h-full relative z-10">

            {/* Edges with glow */}
            <defs>
              <filter id="glow">
                <feDropShadow dx="0" dy="0" stdDeviation="4" floodColor="#9b87f5" />
              </filter>
            </defs>

            <g stroke="#9b87f5" strokeOpacity="0.35" strokeWidth="2" filter="url(#glow)">
              <line x1="400" y1="220" x2="270" y2="130" />
              <line x1="400" y1="220" x2="520" y2="130" />
              <line x1="400" y1="220" x2="250" y2="300" />
              <line x1="400" y1="220" x2="550" y2="300" />
              <line x1="270" y1="130" x2="150" y2="200" />
              <line x1="520" y1="130" x2="650" y2="200" />
            </g>

            {/* Central Node */}
            <Node x={400} y={220} label="Core Concept" large glow />

            {/* Other Nodes */}
            <Node x={270} y={130} label="Article" />
            <Node x={150} y={200} label="AI Summary" />
            <Node x={520} y={130} label="YouTube Video" />
            <Node x={650} y={200} label="Tweet Thread" />
            <Node x={250} y={300} label="Research Notes" />
            <Node x={550} y={300} label="PDF Paper" />
          </svg>

          {/* Interactive Coming Soon Notice */}
          <div className="absolute bottom-4 right-4 bg-black/40 backdrop-blur-md border border-white/10 text-xs px-4 py-2 rounded-full text-purple-200 shadow-lg">
            🔮 Coming Soon — Interactive AI Knowledge Map
          </div>
        </div>
      </div>
    </main>
  );
}

function Node({
  x,
  y,
  label,
  large,
  glow,
}: {
  x: number;
  y: number;
  label: string;
  large?: boolean;
  glow?: boolean;
}) {
  return (
    <g className="transition-all duration-300 cursor-pointer hover:scale-110">
      <circle
        cx={x}
        cy={y}
        r={large ? 38 : 26}
        fill={large ? "#9b87f5" : "#5b5bff"}
        filter={glow ? "url(#glow)" : ""}
      />
      <circle
        cx={x}
        cy={y}
        r={large ? 52 : 42}
        fill="none"
        stroke="#9b87f5"
        strokeOpacity="0.3"
        strokeDasharray="6 6"
      />
      <text
        x={x}
        y={y + (large ? 65 : 55)}
        textAnchor="middle"
        fontSize={large ? "14" : "12"}
        fill="#e5e7eb"
      >
        {label}
      </text>
    </g>
  );
}

