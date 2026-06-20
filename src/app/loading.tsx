import Layout from "@/components/Layout";

function SkeletonCard() {
  return (
    <div className="py-5">
      <div className="overflow-hidden rounded-3xl animate-pulse">
        <div className="h-64 xl:h-96 bg-gray-200 dark:bg-gray-700 rounded-3xl" />
      </div>
    </div>
  );
}

export default function Loading() {
  return (
    <Layout>
      <div className="py-5">
        <div className="h-8 w-40 bg-gray-200 dark:bg-gray-700 rounded animate-pulse mb-4" />
        <div className="grid space-x-2 lg:grid-cols-2">
          {Array.from({ length: 6 }).map((_, i) => (
            <SkeletonCard key={i} />
          ))}
        </div>
      </div>
    </Layout>
  );
}
