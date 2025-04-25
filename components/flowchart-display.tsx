"use client"

import { useEffect, useRef } from "react"
import mermaid from "mermaid"
import { Card } from "@/components/ui/card"

interface FlowchartDisplayProps {
  mermaidCode: string
}

export default function FlowchartDisplay({ mermaidCode }: FlowchartDisplayProps) {
  const containerRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (!containerRef.current) return

    const renderChart = async () => {
      mermaid.initialize({
        startOnLoad: true,
        theme: "default",
        securityLevel: "loose",
        flowchart: {
          htmlLabels: true,
          curve: "basis",
          defaultRenderer: "dagre",
        },
      })

      try {
        containerRef.current!.innerHTML = ""

        // Use a sample algorithm flowchart that follows standard conventions
        // In a real implementation, this would be generated from the Gemini API
        const algorithmFlowchart = `
        flowchart TD
          %% Define node shapes according to standard conventions
          %% Oval for Start/Stop
          %% Parallelogram for Input/Output
          %% Rectangle for Process
          %% Diamond for Decision
          
          Start([Start]) --> Input1[/"Input n"/]
          Input1 --> Input2[/"Input S₁S₂...Sₙ"/]
          Input2 --> Process1["Set count = 1"]
          Process1 --> Process2["Set ch = S₁"]
          Process2 --> Process3["Set i = 2"]
          Process3 --> Decision1{"i ≤ n?"}
          Decision1 -->|Yes| Decision2{"Sᵢ equals ch?"}
          Decision1 -->|No| Output1[/"Print ch, ' appeared ', count, ' times.'"/]
          Decision2 -->|Yes| Process4["Set count = count + 1"]
          Decision2 -->|No| Process5["Set i = i + 1"]
          Process4 --> Process5
          Process5 --> Decision1
          Output1 --> Stop([Stop])
          
          %% Style definitions
          classDef start_stop fill:#ffe6cc,stroke:#d79b00,stroke-width:2px;
          classDef input_output fill:#d5e8d4,stroke:#82b366,stroke-width:2px;
          classDef process fill:#dae8fc,stroke:#6c8ebf,stroke-width:2px;
          classDef decision fill:#fff2cc,stroke:#d6b656,stroke-width:2px;
          
          %% Apply styles
          class Start,Stop start_stop;
          class Input1,Input2,Output1 input_output;
          class Process1,Process2,Process3,Process4,Process5 process;
          class Decision1,Decision2 decision;
        `

        const { svg } = await mermaid.render("mermaid-svg", algorithmFlowchart)
        containerRef.current!.innerHTML = svg
      } catch (error) {
        console.error("Error rendering mermaid chart:", error)
        containerRef.current!.innerHTML = `<div class="p-4 text-red-500">Error rendering flowchart</div>`
      }
    }

    renderChart()
  }, [mermaidCode])

  return (
    <Card className="p-4 overflow-auto bg-white">
      <div ref={containerRef} className="flex justify-center min-h-[400px]">
        Loading flowchart...
      </div>
    </Card>
  )
}
