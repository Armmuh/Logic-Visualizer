"use client"

import type React from "react"

import { useState } from "react"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Checkbox } from "@/components/ui/checkbox"
import { Separator } from "@/components/ui/separator"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import {
  ArrowDownToLine,
  BrainCircuit,
  Code,
  FileImage,
  FileLineChartIcon as FlowChart,
  Info,
  Loader2,
  Table,
} from "lucide-react"
import FlowchartDisplay from "@/components/flowchart-display"
import PseudocodeDisplay from "@/components/pseudocode-display"
import DecisionTableDisplay from "@/components/decision-table-display"
import ApiKeyInput from "@/components/api-key-input"

export default function LogicVisualizer() {
  const [logicDescription, setLogicDescription] = useState("")
  const [isProcessing, setIsProcessing] = useState(false)
  const [activeTab, setActiveTab] = useState("flowchart")
  const [apiKey, setApiKey] = useState("")
  const [hasApiKey, setHasApiKey] = useState(false)
  const [outputs, setOutputs] = useState({
    flowchart: "",
    pseudocode: "",
    decisionTable: "",
  })
  const [selectedOutputs, setSelectedOutputs] = useState({
    flowchart: true,
    pseudocode: true,
    decisionTable: true,
  })
  const [imageFile, setImageFile] = useState<File | null>(null)
  const [imagePreview, setImagePreview] = useState<string | null>(null)

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0]
      setImageFile(file)

      const reader = new FileReader()
      reader.onload = (e) => {
        if (e.target?.result) {
          setImagePreview(e.target.result as string)
        }
      }
      reader.readAsDataURL(file)
    }
  }

  const handleApiKeySubmit = (key: string) => {
    setApiKey(key)
    setHasApiKey(true)
  }

  const handleGenerateLogic = async () => {
    if (!hasApiKey) {
      alert("Please enter your Gemini API key first")
      return
    }

    if (!logicDescription && !imageFile) {
      alert("Please enter a logic description or upload an image")
      return
    }

    setIsProcessing(true)

    try {
      // In a real implementation, this would call the Gemini API
      // For this demo, we'll simulate the API call with a timeout
      await new Promise((resolve) => setTimeout(resolve, 2000))

      // Prepare the outputs based on selected output types
      const generatedOutputs: Record<string, string> = {}

      if (selectedOutputs.flowchart) {
        // For flowchart, we'll just use a placeholder string
        // The component will use its internal structure
        generatedOutputs.flowchart = "flowchart-placeholder"
      }

      if (selectedOutputs.pseudocode) {
        // For pseudocode, we'll just use a placeholder string
        // The component will use its internal structure
        generatedOutputs.pseudocode = "pseudocode-placeholder"
      }

      if (selectedOutputs.decisionTable) {
        // For decision table, we'll just use a placeholder string
        // The component will use its internal structure
        generatedOutputs.decisionTable = "decision-table-placeholder"
      }

      setOutputs(generatedOutputs)

      // Set the active tab to the first available output
      if (selectedOutputs.flowchart) {
        setActiveTab("flowchart")
      } else if (selectedOutputs.pseudocode) {
        setActiveTab("pseudocode")
      } else if (selectedOutputs.decisionTable) {
        setActiveTab("decisionTable")
      }

      setIsProcessing(false)
    } catch (error) {
      console.error("Error generating logic:", error)
      setIsProcessing(false)
      alert("An error occurred while generating the logic. Please try again.")
    }
  }

  const handleClearAll = () => {
    setLogicDescription("")
    setImageFile(null)
    setImagePreview(null)
    setOutputs({
      flowchart: "",
      pseudocode: "",
      decisionTable: "",
    })
  }

  const handleDownload = (type: string) => {
    let content = ""
    let filename = ""
    let dataType = ""

    switch (type) {
      case "flowchart":
        // Create a formatted mermaid code for the flowchart
        content = `flowchart TD
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
  class Decision1,Decision2 decision;`
        filename = "flowchart.md"
        dataType = "text/markdown"
        break
      case "pseudocode":
        // Create a formatted text version of the pseudocode
        content = `Input: A nonempty string of characters S₁S₂...Sₙ, and a positive integer n giving the number of characters in the string.

Output: See the related problem below.

Procedure:
1 Get n
2 Get S₁S₂...Sₙ
3 Set count = 1
4 Set ch = S₁
5 Set i = 2
6 While i ≤ n
7   If Sᵢ equals ch
8     Set count = count + 1
9   Set i = i + 1
10 Print ch, ' appeared ', count, ' times.'
11 Stop

Problem 1.1 What is printed if the input string is pepper?
Problem 1.2 What is printed if the input string is CACCTGGTCCAAC?`
        filename = "pseudocode.txt"
        dataType = "text/plain"
        break
      case "decisionTable":
        // Create a formatted markdown version of the decision table
        content = `# A Sample Decision Table

| Condition | 1 | 2 | 3 | 4 | 5 |
|-----------|---|---|---|---|---|
| Requester is authorized | F | T | T | T | T |
| Chemical is available | — | F | T | T | T |
| Chemical is hazardous | — | — | F | T | T |
| Requester is trained | — | — | — | F | T |
| **Action** |   |   |   |   |   |
| Accept request |   |   | X |   | X |
| Reject request | X | X |   | X |   |`
        filename = "decision-table.md"
        dataType = "text/markdown"
        break
    }

    const blob = new Blob([content], { type: dataType })
    const url = URL.createObjectURL(blob)
    const a = document.createElement("a")
    a.href = url
    a.download = filename
    document.body.appendChild(a)
    a.click()
    document.body.removeChild(a)
    URL.revokeObjectURL(url)
  }

  const hasOutput = outputs.flowchart || outputs.pseudocode || outputs.decisionTable

  return (
    <div className="flex min-h-screen flex-col">
      <header className="sticky top-0 z-10 border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="container flex h-16 items-center">
          <div className="flex items-center gap-2 font-bold text-xl">
            <BrainCircuit className="h-6 w-6 text-primary" />
            <span>Logic Visualizer</span>
          </div>
          <div className="ml-auto flex items-center gap-2">
            {!hasApiKey && <ApiKeyInput onSubmit={handleApiKeySubmit} />}
          </div>
        </div>
      </header>

      <main className="flex-1 container py-6">
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          <Card className="lg:col-span-1">
            <CardHeader>
              <CardTitle>Input</CardTitle>
              <CardDescription>Describe your logic or upload an image</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="logic-description">Logic Description</Label>
                <Textarea
                  id="logic-description"
                  placeholder="Describe how your process or algorithm works..."
                  className="min-h-[200px] resize-y"
                  value={logicDescription}
                  onChange={(e) => setLogicDescription(e.target.value)}
                />
              </div>

              <Separator className="my-4" />

              <div className="space-y-2">
                <Label htmlFor="image-upload">Or Upload an Image</Label>
                <div
                  className="border-2 border-dashed rounded-md p-6 text-center cursor-pointer hover:bg-muted/50 transition-colors"
                  onClick={() => document.getElementById("image-upload")?.click()}
                >
                  <Input
                    id="image-upload"
                    type="file"
                    accept="image/*"
                    className="hidden"
                    onChange={handleImageUpload}
                  />
                  {imagePreview ? (
                    <div className="space-y-2">
                      <img
                        src={imagePreview || "/placeholder.svg"}
                        alt="Uploaded logic"
                        className="max-h-[200px] mx-auto rounded-md"
                      />
                      <p className="text-sm text-muted-foreground">Click to change image</p>
                    </div>
                  ) : (
                    <div className="flex flex-col items-center gap-2">
                      <FileImage className="h-10 w-10 text-muted-foreground" />
                      <p className="text-sm text-muted-foreground">Drag and drop or click to upload</p>
                    </div>
                  )}
                </div>
              </div>

              <div className="space-y-2 pt-4">
                <Label>Output Types</Label>
                <div className="flex flex-wrap gap-4">
                  <div className="flex items-center space-x-2">
                    <Checkbox
                      id="flowchart"
                      checked={selectedOutputs.flowchart}
                      onCheckedChange={(checked) =>
                        setSelectedOutputs({ ...selectedOutputs, flowchart: checked === true })
                      }
                    />
                    <label
                      htmlFor="flowchart"
                      className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                    >
                      Flowchart
                    </label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Checkbox
                      id="pseudocode"
                      checked={selectedOutputs.pseudocode}
                      onCheckedChange={(checked) =>
                        setSelectedOutputs({ ...selectedOutputs, pseudocode: checked === true })
                      }
                    />
                    <label
                      htmlFor="pseudocode"
                      className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                    >
                      Pseudocode
                    </label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Checkbox
                      id="decision-table"
                      checked={selectedOutputs.decisionTable}
                      onCheckedChange={(checked) =>
                        setSelectedOutputs({ ...selectedOutputs, decisionTable: checked === true })
                      }
                    />
                    <label
                      htmlFor="decision-table"
                      className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                    >
                      Decision Table
                    </label>
                  </div>
                </div>
              </div>
            </CardContent>
            <CardFooter className="flex justify-between">
              <Button variant="outline" onClick={handleClearAll}>
                Clear All
              </Button>
              <Button
                onClick={handleGenerateLogic}
                disabled={isProcessing || (!logicDescription && !imageFile) || !hasApiKey}
              >
                {isProcessing ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Processing...
                  </>
                ) : (
                  <>Generate Logic</>
                )}
              </Button>
            </CardFooter>
          </Card>

          <Card className="lg:col-span-2">
            <CardHeader>
              <CardTitle>Output</CardTitle>
              <CardDescription>Visualize your logic in different formats</CardDescription>
            </CardHeader>
            <CardContent>
              {!hasOutput ? (
                <div className="flex flex-col items-center justify-center min-h-[300px] text-center p-6">
                  <Info className="h-12 w-12 text-muted-foreground mb-4" />
                  <h3 className="text-lg font-medium mb-2">No output generated yet</h3>
                  <p className="text-muted-foreground max-w-md">
                    Enter your logic description or upload an image, then click "Generate Logic" to see the results.
                  </p>
                </div>
              ) : (
                <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
                  <TabsList className="grid w-full grid-cols-3">
                    <TabsTrigger value="flowchart" disabled={!outputs.flowchart} className="flex items-center gap-2">
                      <FlowChart className="h-4 w-4" />
                      <span className="hidden sm:inline">Flowchart</span>
                    </TabsTrigger>
                    <TabsTrigger value="pseudocode" disabled={!outputs.pseudocode} className="flex items-center gap-2">
                      <Code className="h-4 w-4" />
                      <span className="hidden sm:inline">Pseudocode</span>
                    </TabsTrigger>
                    <TabsTrigger
                      value="decisionTable"
                      disabled={!outputs.decisionTable}
                      className="flex items-center gap-2"
                    >
                      <Table className="h-4 w-4" />
                      <span className="hidden sm:inline">Decision Table</span>
                    </TabsTrigger>
                  </TabsList>
                  <TabsContent value="flowchart" className="min-h-[400px]">
                    <div className="flex justify-end mb-2">
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => handleDownload("flowchart")}
                        className="flex items-center gap-1"
                      >
                        <ArrowDownToLine className="h-4 w-4" />
                        Download
                      </Button>
                    </div>
                    <FlowchartDisplay mermaidCode={outputs.flowchart} />
                  </TabsContent>
                  <TabsContent value="pseudocode" className="min-h-[400px]">
                    <div className="flex justify-end mb-2">
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => handleDownload("pseudocode")}
                        className="flex items-center gap-1"
                      >
                        <ArrowDownToLine className="h-4 w-4" />
                        Download
                      </Button>
                    </div>
                    <PseudocodeDisplay code={outputs.pseudocode} />
                  </TabsContent>
                  <TabsContent value="decisionTable" className="min-h-[400px]">
                    <div className="flex justify-end mb-2">
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => handleDownload("decisionTable")}
                        className="flex items-center gap-1"
                      >
                        <ArrowDownToLine className="h-4 w-4" />
                        Download
                      </Button>
                    </div>
                    <DecisionTableDisplay tableData={outputs.decisionTable} />
                  </TabsContent>
                </Tabs>
              )}
            </CardContent>
          </Card>
        </div>

        <Alert className="mt-8">
          <Info className="h-4 w-4" />
          <AlertTitle>How it works</AlertTitle>
          <AlertDescription>
            This application uses the Gemini API to transform your logic descriptions into visual flowcharts,
            pseudocode, and decision tables. Enter your API key, describe your logic or upload an image, and click
            "Generate Logic" to see the results.
          </AlertDescription>
        </Alert>
      </main>

      <footer className="border-t py-4">
        <div className="container flex flex-col sm:flex-row justify-between items-center">
          <p className="text-sm text-muted-foreground">Logic Visualizer - Powered by Gemini API</p>
          <p className="text-sm text-muted-foreground">© {new Date().getFullYear()} Logic Visualizer</p>
        </div>
      </footer>
    </div>
  )
}
