
const SkeletonLoader = ({ type = "product" }: { type?: "product" | "brand" | "banner" }) => {
  if (type === "product") {
    return (
      <div className="bg-white rounded-2xl shadow-sm overflow-hidden animate-pulse">
        <div className="w-full h-48 bg-gray-200" />
        <div className="p-4 space-y-3">
          <div className="flex justify-between">
            <div className="h-3 bg-gray-200 rounded w-16" />
            <div className="h-3 bg-gray-200 rounded w-12" />
          </div>
          <div className="h-4 bg-gray-200 rounded w-full" />
          <div className="h-4 bg-gray-200 rounded w-3/4" />
          <div className="flex gap-2">
            <div className="h-5 bg-gray-200 rounded w-16" />
            <div className="h-5 bg-gray-200 rounded w-12" />
          </div>
        </div>
      </div>
    );
  }

  if (type === "brand") {
    return (
      <div className="bg-white rounded-2xl p-4 shadow-sm animate-pulse">
        <div className="flex flex-col items-center space-y-3">
          <div className="w-16 h-16 bg-gray-200 rounded-full" />
          <div className="h-4 bg-gray-200 rounded w-20" />
          <div className="h-3 bg-gray-200 rounded w-16" />
        </div>
      </div>
    );
  }

  return (
    <div className="w-full h-40 bg-gray-200 rounded-2xl animate-pulse" />
  );
};

export default SkeletonLoader;
