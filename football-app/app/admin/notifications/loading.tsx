import { Card, CardContent, CardHeader } from "@/components/ui/card"
import { Skeleton } from "@/components/ui/skeleton"

export default function NotificationsLoading() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-black via-gray-900 to-black p-6">
      <div className="max-w-7xl mx-auto space-y-6">
        {/* Header Skeleton */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
          <div>
            <Skeleton className="h-8 w-64 bg-gray-800" />
            <Skeleton className="h-4 w-48 bg-gray-800 mt-2" />
          </div>
          <div className="flex gap-3">
            <Skeleton className="h-10 w-32 bg-gray-800" />
            <Skeleton className="h-10 w-40 bg-gray-800" />
          </div>
        </div>

        {/* Stats Cards Skeleton */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {[...Array(4)].map((_, i) => (
            <Card key={i} className="bg-gradient-to-br from-gray-900 to-black border-yellow-500/20">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div className="space-y-2">
                    <Skeleton className="h-4 w-16 bg-gray-800" />
                    <Skeleton className="h-8 w-20 bg-gray-800" />
                  </div>
                  <Skeleton className="h-12 w-12 rounded-lg bg-gray-800" />
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Filters Skeleton */}
        <Card className="bg-gradient-to-br from-gray-900 to-black border-yellow-500/20">
          <CardContent className="p-6">
            <div className="flex flex-col sm:flex-row gap-4">
              <Skeleton className="h-10 flex-1 bg-gray-800" />
              <Skeleton className="h-10 w-full sm:w-[180px] bg-gray-800" />
              <Skeleton className="h-10 w-full sm:w-[180px] bg-gray-800" />
            </div>
          </CardContent>
        </Card>

        {/* Notifications List Skeleton */}
        <Card className="bg-gradient-to-br from-gray-900 to-black border-yellow-500/20">
          <CardHeader>
            <Skeleton className="h-6 w-48 bg-gray-800" />
          </CardHeader>
          <CardContent className="p-0">
            <div className="space-y-0">
              {[...Array(5)].map((_, i) => (
                <div key={i} className="p-6 border-b border-gray-800">
                  <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
                    <div className="flex-1 space-y-3">
                      <div className="flex items-center gap-3">
                        <Skeleton className="h-6 w-64 bg-gray-800" />
                        <Skeleton className="h-6 w-16 bg-gray-800" />
                        <Skeleton className="h-6 w-16 bg-gray-800" />
                      </div>
                      <Skeleton className="h-4 w-96 bg-gray-800" />
                      <div className="flex items-center gap-4">
                        <Skeleton className="h-4 w-24 bg-gray-800" />
                        <Skeleton className="h-4 w-24 bg-gray-800" />
                      </div>
                    </div>
                    <div className="flex gap-2">
                      <Skeleton className="h-8 w-8 bg-gray-800" />
                      <Skeleton className="h-8 w-8 bg-gray-800" />
                      <Skeleton className="h-8 w-8 bg-gray-800" />
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
