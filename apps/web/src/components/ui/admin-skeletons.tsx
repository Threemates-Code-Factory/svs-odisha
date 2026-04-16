import { Skeleton } from "@/components/ui/skeleton"

function AdminSkeletonHeader() {
  return (
    <div className="flex items-center justify-between gap-4">
      <Skeleton className="h-8 w-48" />
      <Skeleton className="h-9 w-28" />
    </div>
  )
}

function AdminSkeletonCardGrid() {
  return (
    <div className="grid grid-cols-1 gap-4 md:grid-cols-2 xl:grid-cols-4">
      {Array.from({ length: 4 }).map((_, index) => (
        <div key={index} className="space-y-3 rounded-lg border p-4">
          <Skeleton className="h-4 w-28" />
          <Skeleton className="h-8 w-20" />
          <Skeleton className="h-3 w-full" />
        </div>
      ))}
    </div>
  )
}

function AdminSkeletonTable({ rows = 8 }: { rows?: number }) {
  return (
    <div className="rounded-lg border">
      <div className="border-b p-4">
        <Skeleton className="h-5 w-56" />
      </div>
      <div className="space-y-3 p-4">
        {Array.from({ length: rows }).map((_, index) => (
          <div key={index} className="grid grid-cols-12 items-center gap-3">
            <Skeleton className="col-span-4 h-4" />
            <Skeleton className="col-span-3 h-4" />
            <Skeleton className="col-span-3 h-4" />
            <Skeleton className="col-span-2 h-8" />
          </div>
        ))}
      </div>
    </div>
  )
}

export { AdminSkeletonCardGrid, AdminSkeletonHeader, AdminSkeletonTable }
