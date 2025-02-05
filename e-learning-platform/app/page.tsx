import { CourseList } from "@/components/course-list"

export default function Home() {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <h1 className="text-3xl font-bold text-gray-900 mb-6">Available Courses</h1>
      <CourseList />
    </div>
  )
}

