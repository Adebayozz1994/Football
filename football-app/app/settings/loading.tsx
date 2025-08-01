import { Skeleton } from "@/components/ui/skeleton"
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Card, CardContent, CardHeader } from "@/components/ui/card"

export default function AdminSettingsLoading() {
  return (
    <div className="flex-1 p-8 bg-black text-yellow-400 min-h-screen">
      <div className="max-w-4xl mx-auto">
        <Skeleton className="h-10 w-64 mb-6 bg-gray-800" />
        <Skeleton className="h-6 w-96 mb-8 bg-gray-800" />

        <Tabs value="general" className="w-full">
          <TabsList className="grid w-full grid-cols-3 md:grid-cols-5 bg-gray-900 border border-yellow-400/20">
            {Array.from({ length: 5 }).map((_, i) => (
              <TabsTrigger key={i} value={`tab-${i}`} disabled className="text-yellow-400">
                <Skeleton className="h-5 w-20 bg-gray-700" />
              </TabsTrigger>
            ))}
          </TabsList>

          <div className="mt-6">
            <Card className="card-black-gold">
              <CardHeader>
                <Skeleton className="h-6 w-48 mb-2 bg-gray-800" />
                <Skeleton className="h-4 w-64 bg-gray-800" />
              </CardHeader>
              <CardContent className="space-y-6">
                {Array.from({ length: 5 }).map((_, i) => (
                  <div key={i} className="space-y-2">
                    <Skeleton className="h-4 w-32 bg-gray-800" />
                    <Skeleton className="h-10 w-full bg-gray-700" />
                  </div>
                ))}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Skeleton className="h-4 w-32 bg-gray-800" />
                    <Skeleton className="h-10 w-full bg-gray-700" />
                  </div>
                  <div className="space-y-2">
                    <Skeleton className="h-4 w-32 bg-gray-800" />
                    <Skeleton className="h-10 w-full bg-gray-700" />
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </Tabs>

        <div className="mt-8 flex justify-end">
          <Skeleton className="h-10 w-32 bg-gray-700" />
        </div>
      </div>
    </div>
  )
}
