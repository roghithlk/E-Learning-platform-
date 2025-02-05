"use client"

import { useState, useEffect } from "react"
import { Progress } from "@/components/ui/progress"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"

const initialEnrolledCourses = [
  { id: 1, title: "Introduction to React", progress: 0, completed: false, quizScore: 0 },
  { id: 2, title: "Advanced JavaScript", progress: 0, completed: false, quizScore: 0 },
  { id: 3, title: "CSS Flexbox and Grid", progress: 0, completed: false, quizScore: 0 },
  { id: 4, title: "Node.js Fundamentals", progress: 0, completed: false, quizScore: 0 },
  { id: 5, title: "Python for Data Science", progress: 0, completed: false, quizScore: 0 },
  { id: 6, title: "Machine Learning Basics", progress: 0, completed: false, quizScore: 0 },
  { id: 7, title: "Android App Development", progress: 0, completed: false, quizScore: 0 },
  { id: 8, title: "iOS App Development", progress: 0, completed: false, quizScore: 0 },
  { id: 9, title: " Cloud Computing Fundamentals", progress: 0, completed: false, quizScore: 0 },
  { id: 10, title: "Cybersecurity Essentials", progress: 0, completed: false, quizScore: 0 },
]

export default function Dashboard() {
  const [enrolledCourses, setEnrolledCourses] = useState(initialEnrolledCourses)

  useEffect(() => {
    // In a real application, you would fetch this data from an API
    // For now, we'll simulate progress updates
    const interval = setInterval(() => {
      setEnrolledCourses((courses) =>
        courses.map((course) => ({
          ...course,
          progress: Math.min(course.progress + 5, 100),
          completed: course.progress + 5 >= 100,
          quizScore: course.progress + 5 >= 100 ? Math.floor(Math.random() * 5) + 6 : 0, // Random score between 6 and 10
        })),
      )
    }, 5000) // Update every 5 seconds

    return () => clearInterval(interval)
  }, [])

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <h1 className="text-3xl font-bold text-gray-900 mb-6">Your Progress</h1>
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {enrolledCourses.map((course) => (
          <Card key={course.id}>
            <CardHeader>
              <CardTitle>{course.title}</CardTitle>
            </CardHeader>
            <CardContent>
              <Progress value={course.progress} className="w-full mb-2" />
              <p className="text-sm text-gray-600">{course.progress}% complete</p>
              {course.completed && (
                <Badge variant="success" className="mt-2">
                  Completed
                </Badge>
              )}
              {course.quizScore > 0 && <p className="mt-2 text-sm text-gray-600">Quiz Score: {course.quizScore}/10</p>}
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  )
}

