"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Loader2, CheckCircle, XCircle } from "lucide-react";

export default function ResumeAnalyzerForm() {
  const [isLoading, setIsLoading] = useState(false);
  const [analysisResult, setAnalysisResult] = useState(null);
  const [fileName, setFileName] = useState("");

  const handleSubmit = async (event) => {
    event.preventDefault();
    setIsLoading(true);
    setAnalysisResult(null);

    const formData = new FormData(event.currentTarget);
    // 'formData' will automatically include the file from the input

    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/tools/resume-analyzer`, {
        method: "POST",
        body: formData, // No 'Content-Type' header needed, browser sets it
      });

      if (!response.ok) throw new Error("Failed to analyze résumé");

      const data = await response.json();
      setAnalysisResult(data.analysis_result);
    } catch (error) {
      console.error(error);
      setAnalysisResult({ error: "Error: Could not analyze résumé." });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Card>
      <form onSubmit={handleSubmit} encType="multipart/form-data">
        <CardHeader>
          <CardTitle>Resume Analyzer</CardTitle>
          <CardDescription>Upload your resume (PDF) to get an expert analysis.</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="resume">Resume File (PDF only)</Label>
            <Input
              id="resume"
              name="resume"
              type="file"
              accept=".pdf"
              required
              onChange={(e) => setFileName(e.target.files[0]?.name || "")}
            />
            {fileName && <p className="text-sm text-muted-foreground">Selected file: {fileName}</p>}
          </div>
          
          {/* Output Area */}
          {analysisResult && (
            <div className="space-y-4 rounded-md border p-4">
              <h4 className="font-semibold">Analysis Result</h4>
              {analysisResult.error && <p className="text-red-600">{analysisResult.error}</p>}
              
              {analysisResult.strengths && (
                <div className="space-y-2">
                  <h5 className="flex items-center font-medium text-green-600">
                    <CheckCircle className="mr-2 h-5 w-5" /> Strengths
                  </h5>
                  <ul className="list-disc pl-5 space-y-1">
                    {analysisResult.strengths.map((item, index) => (
                      <li key={index}>{item.point}</li>
                    ))}
                  </ul>
                </div>
              )}
              
              {analysisResult.weaknesses && (
                <div className="space-y-2">
                  <h5 className="flex items-center font-medium text-red-600">
                    <XCircle className="mr-2 h-5 w-5" /> Weaknesses
                  </h5>
                  <ul className="list-disc pl-5 space-y-1">
                    {analysisResult.weaknesses.map((item, index) => (
                      <li key={index}>{item.point}</li>
                    ))}
                  </ul>
                </div>
              )}

              {analysisResult.suggestions_for_improvement && (
                <div className="space-y-2">
                  <h5 className="font-medium">Suggestions for Improvement</h5>
                  <ul className="list-disc pl-5 space-y-1">
                    {analysisResult.suggestions_for_improvement.map((item, index) => (
                      <li key={index}>{item.suggestion}</li>
                    ))}
                  </ul>
                </div>
              )}
            </div>
          )}
        </CardContent>
        <CardFooter>
          <Button type="submit" disabled={isLoading}>
            {isLoading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
            {isLoading ? "Analyzing..." : "Analyze Resume"}
          </Button>
        </CardFooter>
      </form>
    </Card>
  );
}