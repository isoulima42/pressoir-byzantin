export default function Loading() {
  return (
    <div className="pointer-events-none fixed inset-x-0 top-0 z-[90]">
      <div className="h-1 w-full overflow-hidden bg-brand-cream/5">
        <div className="h-full w-1/3 animate-[loading-bar_1.2s_ease-in-out_infinite] bg-gradient-to-r from-transparent via-brand-orange to-transparent" />
      </div>
      <style>{`
        @keyframes loading-bar {
          0% { transform: translateX(-120%); }
          100% { transform: translateX(320%); }
        }
      `}</style>
    </div>
  );
}
