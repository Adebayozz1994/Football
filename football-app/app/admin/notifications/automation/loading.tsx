import { Card, CardContent, CardHeader } from "@/components/ui/card"
import { Skeleton } from "@/components/ui/skeleton"

export default function AutomationLoading() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-black via-gray-900 to-black p-6">
      <div className="max-w-7xl mx-auto space-y-6">
        {/* Header Skeleton */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
          <div>
            <Skeleton className="h-8 w-80 bg-gray-800" />
            <Skeleton className="h-4 w-96 bg-gray-800 mt-2" />
          </div>
          <div className="flex gap-3">
            <Skeleton className="h-10 w-32 bg-gray-800" />
            <Skeleton className="h-10 w-40 bg-gray-800" />
          </div>
        </div>

        {/* Stats Cards Skeleton */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {Array.from({ length: 4 }).map((_, i) => (
            <Card key={i} className="bg-gradient-to-br from-gray-900 to-black border-yellow-500/20">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div className="space-y-2">
                    <Skeleton className="h-4 w-20 bg-gray-800" />
                    <Skeleton className="h-8 w-16 bg-gray-800" />
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
              <Skeleton className="h-10 w-full sm:w-[200px] bg-gray-800" />
            </div>
          </CardContent>
        </Card>

        {/* Automation Rules List Skeleton */}
        <Card className="bg-gradient-to-br from-gray-900 to-black border-yellow-500/20">
          <CardHeader>
            <Skeleton className="h-6 w-48 bg-gray-800" />
          </CardHeader>
          <CardContent className="p-0">
            <div className="space-y-0">
              {Array.from({ length: 5 }).map((_, i) => (
                <div key={i} className="p-6 border-b border-gray-800">
                  <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
                    <div className="flex-1 space-y-3">
                      <div className="flex items-center gap-3 flex-wrap">
                        <Skeleton className="h-6 w-48 bg-gray-800" />
                        <Skeleton className="h-6 w-16 bg-gray-800" />
                        <Skeleton className="h-6 w-20 bg-gray-800" />
                        <Skeleton className="h-6 w-12 bg-gray-800 ml-auto lg:ml-0" />
                      </div>
                      <Skeleton className="h-4 w-full max-w-md bg-gray-800" />
                      <div className="flex items-center gap-6">
                        <Skeleton className="h-4 w-32 bg-gray-800" />
                        <Skeleton className="h-4 w-36 bg-gray-800" />
                        <Skeleton className="h-4 w-24 bg-gray-800" />
                      </div>
                    </div>
                    <div className="flex flex-col lg:flex-row items-start lg:items-center gap-4">
                      <div className="grid grid-cols-3 gap-4">
                        {Array.from({ length: 3 }).map((_, j) => (
                          <div key={j} className="text-center">
                            <Skeleton className="h-4 w-16 bg-gray-800 mx-auto" />
                            <Skeleton className="h-5 w-12 bg-gray-800 mx-auto mt-1" />
                          </div>
                        ))}
                      </div>
                      <div className="flex gap-2">
                        <Skeleton className="h-8 w-8 bg-gray-800" />
                        <Skeleton className="h-8 w-8 bg-gray-800" />
                        <Skeleton className="h-8 w-8 bg-gray-800" />
                      </div>
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
