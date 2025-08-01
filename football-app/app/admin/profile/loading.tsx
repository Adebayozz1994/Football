import { Skeleton } from "@/components/ui/skeleton"
import { Card, CardContent, CardHeader } from "@/components/ui/card"

export default function AdminProfileLoading() {
  return (
    <div className="flex-1 p-8 bg-black text-yellow-400 min-h-screen">
      <div className="max-w-4xl mx-auto">
        <div className="flex items-center justify-between mb-6">
          <Skeleton className="h-10 w-64 bg-gray-800" />
          <Skeleton className="h-10 w-24 bg-gray-800" />
        </div>
        <Skeleton className="h-6 w-96 mb-8 bg-gray-800" />

        <Card className="card-black-gold">
          <CardHeader className="flex flex-col items-center">
            <Skeleton className="h-24 w-24 rounded-full mb-4 bg-gray-700" />
            <Skeleton className="h-8 w-48 mb-2 bg-gray-800" />
            <Skeleton className="h-5 w-32 bg-gray-800" />
            <div className="flex gap-2 mt-2">
              <Skeleton className="h-6 w-20 bg-gray-700" />
              <Skeleton className="h-6 w-20 bg-gray-700" />
            </div>
          </CardHeader>
          <CardContent className="space-y-6">
            <Skeleton className="h-6 w-full bg-gray-800" /> {/* Separator */}
            <Skeleton className="h-6 w-48 bg-gray-800" /> {/* Section title */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {Array.from({ length: 4 }).map((_, i) => (
                <div key={i} className="space-y-2">
                  <Skeleton className="h-4 w-24 bg-gray-800" />
                  <Skeleton className="h-10 w-full bg-gray-700" />
                </div>
              ))}
            </div>
            <div className="space-y-2">
              <Skeleton className="h-4 w-24 bg-gray-800" />
              <Skeleton className="h-24 w-full bg-gray-700" />
            </div>
            <div className="space-y-2">
              <Skeleton className="h-4 w-24 bg-gray-800" />
              <Skeleton className="h-10 w-full bg-gray-700" />
            </div>
            <Skeleton className="h-6 w-full bg-gray-800" /> {/* Separator */}
            <Skeleton className="h-6 w-48 bg-gray-800" /> {/* Section title */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {Array.from({ length: 3 }).map((_, i) => (
                <Card key={i} className="bg-gray-900 border-yellow-400/20 text-white p-4">
                  <Skeleton className="h-5 w-32 mb-2 bg-gray-700" />
                  <Skeleton className="h-6 w-24 bg-gray-800" />
                </Card>
              ))}
            </div>
            <Skeleton className="h-6 w-full bg-gray-800" /> {/* Separator */}
            <Skeleton className="h-6 w-48 bg-gray-800" /> {/* Section title */}
            <div className="space-y-2">
              <Skeleton className="h-6 w-full bg-gray-700" />
              <Skeleton className="h-6 w-full bg-gray-700" />
            </div>
            <Skeleton className="h-6 w-full bg-gray-800" /> {/* Separator */}
            <Skeleton className="h-6 w-48 bg-gray-800" /> {/* Section title */}
            <div className="space-y-4">
              {Array.from({ length: 3 }).map((_, i) => (
                <div key={i} className="flex items-center gap-2">
                  <Skeleton className="h-6 w-6 rounded-full bg-gray-700" />
                  <Skeleton className="h-4 w-48 bg-gray-800" />
                  <Skeleton className="h-4 w-24 ml-auto bg-gray-800" />
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
