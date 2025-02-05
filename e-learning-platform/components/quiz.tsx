"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Label } from "@/components/ui/label"

interface Question {
  question: string
  options: string[]
  correctAnswer: number
}

interface QuizProps {
  questions: Question[]
  onComplete: (score: number) => void
}

export function Quiz({ questions, onComplete }: QuizProps) {
  const [currentQuestion, setCurrentQuestion] = useState(0)
  const [answers, setAnswers] = useState<number[]>([])

  const handleAnswer = (answer: number) => {
    const newAnswers = [...answers]
    newAnswers[currentQuestion] = answer
    setAnswers(newAnswers)
  }

  const handleNext = () => {
    if (currentQuestion < questions.length - 1) {
      setCurrentQuestion(currentQuestion + 1)
    } else {
      const score = answers.reduce((total, answer, index) => {
        return total + (answer === questions[index].correctAnswer ? 1 : 0)
      }, 0)
      onComplete(score)
    }
  }

  const question = questions[currentQuestion]

  return (
    <div className="mt-6 p-6 bg-white rounded-lg shadow-md">
      <h2 className="text-xl font-semibold mb-4">
        Question {currentQuestion + 1} of {questions.length}
      </h2>
      <p className="mb-4">{question.question}</p>
      <RadioGroup onValueChange={(value) => handleAnswer(Number.parseInt(value))}>
        {question.options.map((option, index) => (
          <div key={index} className="flex items-center space-x-2 mb-2">
            <RadioGroupItem value={index.toString()} id={`option-${index}`} />
            <Label htmlFor={`option-${index}`}>{option}</Label>
          </div>
        ))}
      </RadioGroup>
      <Button onClick={handleNext} className="mt-4">
        {currentQuestion < questions.length - 1 ? "Next" : "Finish"}
      </Button>
    </div>
  )
}

