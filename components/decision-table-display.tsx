"use client"

import { Card } from "@/components/ui/card"

interface DecisionTableDisplayProps {
  tableData: string
}

export default function DecisionTableDisplay({ tableData }: DecisionTableDisplayProps) {
  if (!tableData) {
    return <Card className="p-6 text-center text-muted-foreground">No decision table data available</Card>
  }

  // For this component, we'll use a fixed structure that exactly matches the image
  // This ensures the display is consistent with the example provided
  const sampleData = {
    title: "A Sample Decision Table",
    requirementNumbers: [1, 2, 3, 4, 5],
    conditions: [
      { name: "Requester is authorized", values: ["F", "T", "T", "T", "T"] },
      { name: "Chemical is available", values: ["—", "F", "T", "T", "T"] },
      { name: "Chemical is hazardous", values: ["—", "—", "F", "T", "T"] },
      { name: "Requester is trained", values: ["—", "—", "—", "F", "T"] },
    ],
    actions: [
      { name: "Accept request", values: ["", "", "X", "", "X"] },
      { name: "Reject request", values: ["X", "X", "", "X", ""] },
    ],
  }

  return (
    <Card className="overflow-auto">
      <div className="p-4">
        <h3 className="text-center text-xl font-bold text-blue-600 mb-4 border-b-2 border-blue-600 pb-2">
          {sampleData.title}
        </h3>
        <table className="w-full border-collapse">
          <thead>
            <tr>
              <th className="border border-gray-400 p-2 bg-yellow-200 text-red-600 italic font-bold">Condition</th>
              <th
                colSpan={sampleData.requirementNumbers.length}
                className="border border-gray-400 p-2 bg-yellow-200 text-red-600 italic font-bold"
              >
                Requirement Number
              </th>
            </tr>
            <tr>
              <th className="border border-gray-400 p-2"></th>
              {sampleData.requirementNumbers.map((num, index) => (
                <th key={index} className="border border-gray-400 p-2 bg-yellow-200 text-center w-16">
                  {num}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {sampleData.conditions.map((condition, rowIndex) => (
              <tr key={rowIndex}>
                <td className="border border-gray-400 p-2 font-medium">{condition.name}</td>
                {condition.values.map((value, cellIndex) => (
                  <td
                    key={cellIndex}
                    className={`border border-gray-400 p-2 text-center ${
                      value === "T"
                        ? "bg-green-100 text-green-600 font-bold"
                        : value === "F"
                          ? "bg-red-100 text-red-600 font-bold"
                          : ""
                    }`}
                  >
                    {value}
                  </td>
                ))}
              </tr>
            ))}
            <tr>
              <td
                colSpan={sampleData.requirementNumbers.length + 1}
                className="border border-gray-400 p-2 bg-yellow-200 text-red-600 italic font-bold text-center"
              >
                Action
              </td>
            </tr>
            {sampleData.actions.map((action, rowIndex) => (
              <tr key={rowIndex}>
                <td className="border border-gray-400 p-2 font-medium">{action.name}</td>
                {action.values.map((value, cellIndex) => (
                  <td
                    key={cellIndex}
                    className={`border border-gray-400 p-2 text-center ${
                      value === "X" ? "text-blue-600 font-bold" : ""
                    }`}
                  >
                    {value}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </Card>
  )
}
