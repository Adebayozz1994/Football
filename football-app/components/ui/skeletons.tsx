import { Skeleton } from "@/components/ui/skeleton"
import { Card, CardContent, CardHeader } from "@/components/ui/card"

// Match Card Skeleton
export function MatchCardSkeleton() {
  return (
    <Card className="card-black-gold">
      <CardHeader>
        <div className="flex items-center justify-between mb-2">
          <div className="flex gap-2">
            <Skeleton className="h-6 w-20 bg-gray-700" />
          </div>
          <Skeleton className="h-4 w-24 bg-gray-700" />
        </div>
        <div className="flex flex-wrap gap-3 justify-center">
          <Skeleton className="h-7 w-24 bg-gray-700" />
          <Skeleton className="h-7 w-32 bg-gray-700" />
        </div>
      </CardHeader>
      <CardContent>
        <div className="text-center mb-6">
          <div className="flex items-center justify-between mb-6">
            <div className="text-center flex-1">
              <Skeleton className="w-16 h-16 mx-auto mb-3 rounded-full bg-gray-700" />
              <Skeleton className="h-5 w-20 mx-auto mb-1 bg-gray-700" />
              <Skeleton className="h-3 w-12 mx-auto bg-gray-700" />
            </div>
            <div className="text-center mx-6">
              <Skeleton className="h-12 w-16 mx-auto mb-2 bg-gray-700" />
              <Skeleton className="h-3 w-8 mx-auto bg-gray-700" />
            </div>
            <div className="text-center flex-1">
              <Skeleton className="w-16 h-16 mx-auto mb-3 rounded-full bg-gray-700" />
              <Skeleton className="h-5 w-20 mx-auto mb-1 bg-gray-700" />
              <Skeleton className="h-3 w-12 mx-auto bg-gray-700" />
            </div>
          </div>
        </div>
        <div className="space-y-3 mb-6">
          <Skeleton className="h-4 w-32 mx-auto bg-gray-700" />
          <Skeleton className="h-4 w-24 mx-auto bg-gray-700" />
        </div>
        <div className="flex gap-2">
          <Skeleton className="flex-1 h-10 bg-gray-700" />
          <Skeleton className="h-10 w-10 bg-gray-700" />
        </div>
      </CardContent>
    </Card>
  )
}

// News Card Skeleton
export function NewsCardSkeleton() {
  return (
    <Card className="card-black-gold group cursor-pointer">
      <div className="relative">
        <Skeleton className="w-full h-48 bg-gray-700" />
        <div className="absolute top-4 left-4 flex flex-wrap gap-2">
          <Skeleton className="h-6 w-16 bg-gray-600" />
          <Skeleton className="h-5 w-20 bg-gray-600" />
        </div>
      </div>
      <CardContent className="p-6">
        <Skeleton className="h-6 w-full mb-3 bg-gray-700" />
        <Skeleton className="h-4 w-3/4 mb-2 bg-gray-700" />
        <div className="flex flex-wrap items-center gap-4 text-sm mb-4">
          <Skeleton className="h-6 w-20 bg-gray-700" />
          <Skeleton className="h-6 w-24 bg-gray-700" />
        </div>
        <Skeleton className="h-16 w-full mb-4 bg-gray-700" />
        <Skeleton className="h-8 w-24 bg-gray-700" />
      </CardContent>
    </Card>
  )
}

// Filter Section Skeleton
export function FilterSkeleton() {
  return (
    <Card className="card-black-gold">
      <CardContent className="p-6">
        <div className="flex flex-col lg:flex-row gap-4">
          <Skeleton className="flex-1 h-10 bg-gray-700" />
          <Skeleton className="w-full lg:w-52 h-10 bg-gray-700" />
          <Skeleton className="w-full lg:w-52 h-10 bg-gray-700" />
          <Skeleton className="w-full lg:w-48 h-10 bg-gray-700" />
          <Skeleton className="w-24 h-10 bg-gray-700" />
        </div>
      </CardContent>
    </Card>
  )
}

// Page Header Skeleton
export function PageHeaderSkeleton() {
  return (
    <div className="text-center mb-16">
      <Skeleton className="h-12 w-64 mx-auto mb-6 bg-gray-700" />
      <Skeleton className="h-6 w-96 mx-auto bg-gray-700" />
    </div>
  )
}

// Tabs Skeleton
export function TabsSkeleton() {
  return (
    <div className="space-y-8">
      <div className="grid w-full grid-cols-4 gap-2">
        <Skeleton className="h-10 bg-gray-700" />
        <Skeleton className="h-10 bg-gray-700" />
        <Skeleton className="h-10 bg-gray-700" />
        <Skeleton className="h-10 bg-gray-700" />
      </div>
    </div>
  )
}

// Admin Form Skeleton
export function AdminFormSkeleton() {
  return (
    <Card className="mb-8">
      <CardContent className="p-6">
        <div className="space-y-4">
          <Skeleton className="h-10 w-full bg-gray-700" />
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Skeleton className="h-10 bg-gray-700" />
            <Skeleton className="h-10 bg-gray-700" />
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <Skeleton className="h-10 bg-gray-700" />
            <Skeleton className="h-10 bg-gray-700" />
            <Skeleton className="h-10 bg-gray-700" />
          </div>
          <Skeleton className="h-24 w-full bg-gray-700" />
          <Skeleton className="h-10 w-32 bg-gray-700" />
        </div>
      </CardContent>
    </Card>
  )
}

// Admin Table Skeleton
export function AdminTableSkeleton() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {Array.from({ length: 6 }).map((_, i) => (
        <Card key={i} className="border rounded p-4">
          <div className="space-y-3">
            <div className="flex gap-2">
              <Skeleton className="h-5 w-16 bg-gray-700" />
              <Skeleton className="h-5 w-20 bg-gray-700" />
            </div>
            <Skeleton className="h-6 w-full bg-gray-700" />
            <Skeleton className="h-4 w-24 bg-gray-700" />
            <Skeleton className="h-16 w-full bg-gray-700" />
            <div className="flex gap-2">
              <Skeleton className="h-8 flex-1 bg-gray-700" />
              <Skeleton className="h-8 flex-1 bg-gray-700" />
            </div>
          </div>
        </Card>
      ))}
    </div>
  )
}
