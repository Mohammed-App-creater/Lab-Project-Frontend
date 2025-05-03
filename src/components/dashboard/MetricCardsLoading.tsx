export default function MetricCardsLoading() {
  const SkeletonCard = () => (
    <div className="relative flex flex-col justify-between rounded-xl border bg-white p-6 shadow-sm overflow-hidden">
      {/* Shimmer effect */}
      <div className="absolute inset-0 -translate-x-full animate-shimmer bg-gradient-to-r from-transparent via-gray-200 to-transparent"></div>

      {/* Top Row: Icon + Title */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <div className="h-6 w-6 rounded-full bg-gray-300"></div> {/* Icon */}
          <div className="h-4 w-20 rounded bg-gray-300"></div> {/* Title */}
        </div>
      </div>

      {/* Number */}
      <div className="flex items-center justify-between">
        <div className="mt-6 h-8 w-20 rounded bg-gray-300"></div>
        <div className="h-4 w-12 rounded bg-gray-300"></div> {/* Badge */}
      </div>

      {/* Updated Date */}
      <div className="mt-6 border-t pt-2">
        <div className="h-2 w-24 rounded bg-gray-300"></div>
      </div>
    </div>
  );

  return (
    <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
      {[1, 2, 3, 4].map((i) => (
        <SkeletonCard key={i} />
      ))}
    </div>
  );
}
