export default function ScrollerLoader() {
  return (
    <div className="flex items-center justify-center h-full w-full gap-2">
      <div className="w-2 h-6 bg-purple-500 animate-bounce rounded-sm" style={{ animationDelay: "0ms" }}></div>
      <div className="w-2 h-6 bg-purple-500 animate-bounce rounded-sm" style={{ animationDelay: "150ms" }}></div>
      <div className="w-2 h-6 bg-purple-500 animate-bounce rounded-sm" style={{ animationDelay: "300ms" }}></div>
    </div>
  );
}

