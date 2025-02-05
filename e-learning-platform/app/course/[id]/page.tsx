"use client"

import { useState } from "react"
import { notFound } from "next/navigation"
import { VideoPlayer } from "@/components/video-player"
import { Quiz } from "@/components/quiz"
import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"

const courses = [
  {
    id: 1,
    title: "Introduction to React",
    description: "Learn the basics of React",
    videoUrl: "https://www.youtube.com/watch?v=Tn6-PIqc4UM",
    quiz: [
      {
        question: "What is React?",
        options: ["A JavaScript library", "A programming language", "A database", "An operating system"],
        correctAnswer: 0,
      },
      {
        question: "What is JSX?",
        options: ["A JavaScript extension", "A React component", "A styling framework", "A build tool"],
        correctAnswer: 0,
      },
      {
        question: "What is a component in React?",
        options: ["A function or class that returns JSX", "A CSS file", "A database table", "A JavaScript variable"],
        correctAnswer: 0,
      },
      {
        question: "What is the virtual DOM?",
        options: [
          "A lightweight copy of the actual DOM",
          "A physical computer component",
          "A type of database",
          "A JavaScript function",
        ],
        correctAnswer: 0,
      },
      {
        question: "What is state in React?",
        options: ["An object that holds data", "A CSS property", "A type of component", "A build tool"],
        correctAnswer: 0,
      },
      {
        question: "What is a prop in React?",
        options: ["Data passed to a component", "A type of function", "A CSS framework", "A JavaScript library"],
        correctAnswer: 0,
      },
      {
        question: "What is the purpose of useEffect?",
        options: [
          "To perform side effects in components",
          "To style components",
          "To create new components",
          "To debug code",
        ],
        correctAnswer: 0,
      },
      {
        question: "What is React Router?",
        options: [
          "A library for handling routes in React",
          "A type of component",
          "A state management tool",
          "A testing framework",
        ],
        correctAnswer: 0,
      },
      {
        question: "What is the purpose of keys in React lists?",
        options: [
          "To help identify which items have changed",
          "To style list items",
          "To sort the list",
          "To filter the list",
        ],
        correctAnswer: 0,
      },
      {
        question: "What is the context API used for?",
        options: [
          "To pass data through the component tree without props",
          "To style components",
          "To handle routing",
          "To optimize performance",
        ],
        correctAnswer: 0,
      },
    ],
  },
  {
    id: 2,
    title: "Advanced JavaScript",
    description: "Master JavaScript concepts",
    videoUrl: "https://youtu.be/R9I85RhI7Cg",
    quiz: [],
  },
  {
    id: 3,
    title: "CSS Flexbox and Grid",
    description: "Modern layout techniques",
    videoUrl: "https://youtu.be/9zA8cB-54SA",
    quiz: [],
  },
  {
    id: 4,
    title: "Node.js Fundamentals",
    description: "Server-side JavaScript",
    videoUrl: "https://youtu.be/f2EqECiTBL8",
    quiz: [],
  },
  {
    id: 5,
    title: "Python for Data Science",
    description: "Data analysis with Python",
    videoUrl: "https://youtu.be/r-uOLxNrNk8",
    quiz: [],
  },
  {
    id: 6,
    title: "Machine Learning Basics",
    description: "Introduction to ML algorithms",
    videoUrl: "https://youtu.be/7eh4d6sabA0",
    quiz: [],
  },
  {
    id: 7,
    title: "iOS App Development",
    description: "Build iOS apps with Swift",
    videoUrl: "https://youtu.be/09TeUXjzpKs",
    quiz: [],
  },
  {
    id: 8,
    title: "Android App Development",
    description: "Create Android apps with Kotlin",
    videoUrl: "https://youtu.be/FjrKMcnKahY",
    quiz: [],
  },
  {
    id: 9,
    title: "Cloud Computing Fundamentals",
    description: "Learn cloud services and deployment",
    videoUrl: "https://youtu.be/RWgW-CgdIk0",
    quiz: [],
  },
  {
    id: 10,
    title: "Cybersecurity Essentials",
    description: "Understand basic security concepts",
    videoUrl: "https://youtu.be/YKW4ZgpqUho",
    quiz: [],
  },
]

export default function CoursePage({ params }: { params: { id: string } }) {
  const [videoCompleted, setVideoCompleted] = useState(false)
  const [quizStarted, setQuizStarted] = useState(false)
  const [quizCompleted, setQuizCompleted] = useState(false)
  const [quizScore, setQuizScore] = useState(0)

  const course = courses.find((c) => c.id === Number.parseInt(params.id))

  if (!course) {
    notFound()
  }

  const handleVideoComplete = () => {
    setVideoCompleted(true)
  }

  const handleQuizComplete = (score: number) => {
    setQuizCompleted(true)
    setQuizScore(score)
  }

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <h1 className="text-3xl font-bold text-gray-900 mb-6">{course.title}</h1>
      <p className="text-gray-600 mb-6">{course.description}</p>

      <div className="mb-6">
        <h2 className="text-xl font-semibold mb-2">Course Progress</h2>
        <Progress value={videoCompleted ? (quizCompleted ? 100 : 50) : 0} className="w-full" />
      </div>

      <VideoPlayer url={course.videoUrl} onComplete={handleVideoComplete} />

      {videoCompleted && !quizStarted && (
        <Button onClick={() => setQuizStarted(true)} className="mt-4">
          Start Quiz
        </Button>
      )}

      {quizStarted && !quizCompleted && <Quiz questions={course.quiz} onComplete={handleQuizComplete} />}

      {quizCompleted && (
        <div className="mt-6 p-4 bg-green-100 rounded-md">
          <h2 className="text-xl font-semibold mb-2">{quizScore >= 6 ? "Congratulations!" : "Quiz Completed"}</h2>
          <p>
            {quizScore >= 6
              ? `You passed the quiz with a score of ${quizScore}/10.`
              : `You scored ${quizScore}/10. You need 6 or more to pass. Try again!`}
          </p>
        </div>
      )}
    </div>
  )
}

