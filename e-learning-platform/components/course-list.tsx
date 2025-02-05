"use client"

import { useState } from "react"
import Link from "next/link"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"

const courses = [
  {
    id: 1,
    title: "Introduction to React",
    description: "Learn the basics of React",
    duration: "4 weeks",
    domain: "Web Development",
  },
  {
    id: 2,
    title: "Advanced JavaScript",
    description: "Master JavaScript concepts",
    duration: "6 weeks",
    domain: "Web Development",
  },
  {
    id: 3,
    title: "CSS Flexbox and Grid",
    description: "Modern layout techniques",
    duration: "3 weeks",
    domain: "Web Development",
  },
  {
    id: 4,
    title: "Node.js Fundamentals",
    description: "Server-side JavaScript",
    duration: "5 weeks",
    domain: "Backend Development",
  },
  {
    id: 5,
    title: "Python for Data Science",
    description: "Data analysis with Python",
    duration: "8 weeks",
    domain: "Data Science",
  },
  {
    id: 6,
    title: "Machine Learning Basics",
    description: "Introduction to ML algorithms",
    duration: "10 weeks",
    domain: "Artificial Intelligence",
  },
  {
    id: 7,
    title: "iOS App Development",
    description: "Build iOS apps with Swift",
    duration: "12 weeks",
    domain: "Mobile Development",
  },
  {
    id: 8,
    title: "Android App Development",
    description: "Create Android apps with Kotlin",
    duration: "12 weeks",
    domain: "Mobile Development",
  },
  {
    id: 9,
    title: "Cloud Computing Fundamentals",
    description: "Learn cloud services and deployment",
    duration: "6 weeks",
    domain: "Cloud Computing",
  },
  {
    id: 10,
    title: "Cybersecurity Essentials",
    description: "Understand basic security concepts",
    duration: "8 weeks",
    domain: "Cybersecurity",
  },
]

export function CourseList() {
  const [searchTerm, setSearchTerm] = useState("")

  const filteredCourses = courses.filter(
    (course) =>
      course.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      course.domain.toLowerCase().includes(searchTerm.toLowerCase()),
  )

  return (
    <div>
      <Input
        type="search"
        placeholder="Search courses or domains..."
        className="mb-6"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
      />
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {filteredCourses.map((course) => (
          <Card key={course.id}>
            <CardHeader>
              <CardTitle>{course.title}</CardTitle>
              <Badge>{course.domain}</Badge>
            </CardHeader>
            <CardContent>
              <p>{course.description}</p>
            </CardContent>
            <CardFooter className="flex justify-between">
              <span>{course.duration}</span>
              <Link
                href={`/course/${course.id}`}
                className="bg-indigo-600 text-white px-4 py-2 rounded-md text-sm font-medium hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
              >
                View Course
              </Link>
            </CardFooter>
          </Card>
        ))}
      </div>
    </div>
  )
}

