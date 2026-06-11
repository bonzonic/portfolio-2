export default function Loading() {
  return (
    <div className="flex-1 px-8 py-8 max-w-180 mx-auto w-full">
      <div className="mb-6">
        <div className="h-6 w-32 rounded-md bg-white/5 animate-pulse" />
        <div className="h-4 w-48 rounded-md bg-white/5 animate-pulse mt-2" />
      </div>
      <div className="flex flex-col gap-4">
        {Array.from({ length: 4 }).map((_, i) => (
          <div
            key={i}
            className="bg-surface border border-border rounded-xl p-5 h-28 animate-pulse"
          />
        ))}
      </div>
    </div>
  );
}
