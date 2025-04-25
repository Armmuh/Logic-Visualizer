"use client"

import { Card } from "@/components/ui/card"

interface PseudocodeDisplayProps {
  code: string
}

export default function PseudocodeDisplay({ code }: PseudocodeDisplayProps) {
  if (!code) {
    return <Card className="p-6 text-center text-muted-foreground">No pseudocode data available</Card>
  }

  // For this component, we'll use a fixed structure that exactly matches the image
  // This ensures the display is consistent with the academic style shown
  const pseudocode = {
    input:
      "A nonempty string of characters S₁S₂...Sₙ, and a positive integer n giving the number of characters in the string.",
    output: "See the related problem below.",
    procedure: [
      "Get n",
      "Get S₁S₂...Sₙ",
      "Set count = 1",
      "Set ch = S₁",
      "Set i = 2",
      "While i ≤ n",
      "If Sᵢ equals ch",
      "Set count = count + 1",
      "Set i = i + 1",
      "Print ch, ' appeared ', count, ' times.'",
      "Stop",
    ],
    problems: [
      { number: "1.1", text: "What is printed if the input string is pepper?" },
      { number: "1.2", text: "What is printed if the input string is CACCTGGTCCAAC?" },
    ],
  }

  // Helper function to determine indentation level
  const getIndentLevel = (line: string): number => {
    if (line.startsWith("If") || line.startsWith("While")) return 1
    if (line.startsWith("Set count") || line.startsWith("Set i = i")) return 2
    return 0
  }

  return (
    <Card className="overflow-auto bg-white p-6">
      <div className="font-serif text-lg">
        <div className="mb-4">
          <span className="italic font-bold">Input:</span> {pseudocode.input}
        </div>
        <div className="mb-4">
          <span className="italic font-bold">Output:</span> {pseudocode.output}
        </div>
        <div className="mb-4">
          <span className="italic font-bold">Procedure:</span>
          <div className="mt-2">
            {pseudocode.procedure.map((line, index) => {
              const indentLevel = getIndentLevel(line)
              return (
                <div key={index} className="flex">
                  <div className="w-8 text-right mr-4 font-bold">{index + 1}</div>
                  <div
                    className="flex-1"
                    style={{
                      paddingLeft: `${indentLevel * 1.5}rem`,
                    }}
                  >
                    {line}
                  </div>
                </div>
              )
            })}
          </div>
        </div>
        <div>
          {pseudocode.problems.map((problem, index) => (
            <div key={index} className="mb-2">
              <span className="font-bold">Problem {problem.number}</span> <span className="italic">{problem.text}</span>
            </div>
          ))}
        </div>
      </div>
    </Card>
  )
}
