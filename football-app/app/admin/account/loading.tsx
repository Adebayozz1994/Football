import { Skeleton } from "@/components/ui/skeleton"
import { Card, CardContent, CardHeader } from "@/components/ui/card"

export default function AdminAccountLoading() {
  return (
    <div className="flex-1 p-8 bg-black text-yellow-400 min-h-screen">
      <div className="max-w-4xl mx-auto">
        <Skeleton className="h-10 w-64 mb-6 bg-gray-800" />
        <Skeleton className="h-6 w-96 mb-8 bg-gray-800" />

        {/* Change Password Section */}
        <Card className="card-black-gold mb-8">
          <CardHeader>
            <Skeleton className="h-6 w-48 mb-2 bg-gray-800" />
            <Skeleton className="h-4 w-64 bg-gray-800" />
          </CardHeader>
          <CardContent className="space-y-4">
            {Array.from({ length: 3 }).map((_, i) => (
              <div key={i} className="space-y-2">
                <Skeleton className="h-4 w-24 bg-gray-800" />
                <Skeleton className="h-10 w-full bg-gray-700" />
              </div>
            ))}
            <Skeleton className="h-10 w-40 bg-gray-700" />
          </CardContent>
        </Card>

        {/* Two-Factor Authentication Section */}
        <Card className="card-black-gold mb-8">
          <CardHeader>
            <Skeleton className="h-6 w-48 mb-2 bg-gray-800" />
            <Skeleton className="h-4 w-64 bg-gray-800" />
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center justify-between">
              <Skeleton className="h-4 w-32 bg-gray-800" />
              <Skeleton className="h-6 w-12 rounded-full bg-gray-700" />
            </div>
            <Skeleton className="h-4 w-full bg-gray-800" />
            <Skeleton className="h-10 w-32 bg-gray-700" />
          </CardContent>
        </Card>

        {/* Session Management Section */}
        <Card className="card-black-gold mb-8">
          <CardHeader>
            <Skeleton className="h-6 w-48 mb-2 bg-gray-800" />
            <Skeleton className="h-4 w-64 bg-gray-800" />
          </CardHeader>
          <CardContent className="space-y-4">
            {Array.from({ length: 2 }).map((_, i) => (
              <div
                key={i}
                className="flex items-center justify-between p-3 bg-gray-900 rounded-md border border-yellow-400/10"
              >
                <div className="flex items-center gap-3">
                  <Skeleton className="h-5 w-5 rounded-full bg-gray-700" />
                  <div className="flex flex-col">
                    <Skeleton className="h-4 w-32 bg-gray-800" />
                    <Skeleton className="h-3 w-48 bg-gray-800" />
                    <Skeleton className="h-3 w-40 bg-gray-800" />
                  </div>
                </div>
                <Skeleton className="h-8 w-20 bg-gray-700" />
              </div>
            ))}
          </CardContent>
        </Card>

        {/* Notification Preferences Section */}
        <Card className="card-black-gold mb-8">
          <CardHeader>
            <Skeleton className="h-6 w-48 mb-2 bg-gray-800" />
            <Skeleton className="h-4 w-64 bg-gray-800" />
          </CardHeader>
          <CardContent className="space-y-4">
            {Array.from({ length: 4 }).map((_, i) => (
              <div key={i} className="flex items-center justify-between">
                <Skeleton className="h-4 w-48 bg-gray-800" />
                <Skeleton className="h-6 w-12 rounded-full bg-gray-700" />
              </div>
            ))}
          </CardContent>
        </Card>

        {/* Display Preferences Section */}
        <Card className="card-black-gold mb-8">
          <CardHeader>
            <Skeleton className="h-6 w-48 mb-2 bg-gray-800" />
            <Skeleton className="h-4 w-64 bg-gray-800" />
          </CardHeader>
          <CardContent className="space-y-4">
            {Array.from({ length: 3 }).map((_, i) => (
              <div key={i} className="space-y-2">
                <Skeleton className="h-4 w-24 bg-gray-800" />
                <Skeleton className="h-10 w-full bg-gray-700" />
              </div>
            ))}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Skeleton className="h-4 w-24 bg-gray-800" />
                <Skeleton className="h-10 w-full bg-gray-700" />
              </div>
              <div className="space-y-2">
                <Skeleton className="h-4 w-24 bg-gray-800" />
                <Skeleton className="h-10 w-full bg-gray-700" />
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Privacy Controls Section */}
        <Card className="card-black-gold mb-8">
          <CardHeader>
            <Skeleton className="h-6 w-48 mb-2 bg-gray-800" />
            <Skeleton className="h-4 w-64 bg-gray-800" />
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Skeleton className="h-4 w-24 bg-gray-800" />
              <Skeleton className="h-10 w-full bg-gray-700" />
            </div>
            {Array.from({ length: 2 }).map((_, i) => (
              <div key={i} className="flex items-center justify-between">
                <Skeleton className="h-4 w-48 bg-gray-800" />
                <Skeleton className="h-6 w-12 rounded-full bg-gray-700" />
              </div>
            ))}
          </CardContent>
        </Card>

        <div className="mt-8 flex justify-end">
          <Skeleton className="h-10 w-40 bg-gray-700" />
        </div>
      </div>
    </div>
  )
}
