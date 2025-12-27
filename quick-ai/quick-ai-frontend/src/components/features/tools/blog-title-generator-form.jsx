"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
// We are no longer using Textarea for the output
import { Loader2, List } from "lucide-react";

export default function BlogTitleGeneratorForm() {
  const [isLoading, setIsLoading] = useState(false);
  // This state will now hold the array of titles
  const [generatedTitles, setGeneratedTitles] = useState([]);
  const [error, setError] = useState(null);

  const handleSubmit = async (event) => {
    event.preventDefault();
    setIsLoading(true);
    setGeneratedTitles([]);
    setError(null);

    const formData = new FormData(event.currentTarget);
    const keyword = formData.get("keyword");
    const category = formData.get("category");

    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/tools/blog-title-generator`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ keyword, category }),
      });

      if (!response.ok) throw new Error("Failed to generate titles");

      const data = await response.json();
      setGeneratedTitles(data.generated_output.titles); // Get the 'titles' array from the JSON
    } catch (error) {
      console.error(error);
      setError("Error: Could not generate titles. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Card>
      <form onSubmit={handleSubmit}>
        <CardHeader>
          <CardTitle>Blog Title Generator</CardTitle>
          <CardDescription>Get 10 catchy blog titles based on your keyword.</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="keyword">Main Keyword</Label>
            <Input id="keyword" name="keyword" placeholder="e.g., SaaS Marketing" required />
          </div>
          <div className="space-y-2">
            <Label htmlFor="category">Category / Niche</Label>
            <Input id="category" name="category" placeholder="e.g., Marketing, Technology" required />
          </div>
          
          {/* --- THIS IS THE NEW OUTPUT --- */}
          <div className="space-y-2">
            <Label>Generated Titles</Label>
            <div className="rounded-md border p-4 min-h-[12rem] bg-muted/30">
              {isLoading && (
                <div className="flex justify-center items-center h-full">
                  <Loader2 className="h-6 w-6 animate-spin text-muted-foreground" />
                </div>
              )}
              {error && (
                <p className="text-red-600">{error}</p>
              )}
              {!isLoading && !error && generatedTitles.length === 0 && (
                <p className="text-muted-foreground">Your 10 titles will appear here...</p>
              )}
              {!isLoading && !error && generatedTitles.length > 0 && (
                <ul className="space-y-2">
                  {generatedTitles.map((title, index) => (
                    <li key={index} className="flex items-start">
                      <List className="h-4 w-4 mr-2 mt-1 flex-shrink-0" />
                      <span>{title}</span>
                    </li>
                  ))}
                </ul>
              )}
            </div>
          </div>
          {/* --- END NEW OUTPUT --- */}

        </CardContent>
        <CardFooter>
          <Button type="submit" disabled={isLoading}>
            {isLoading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
            {isLoading ? "Generating..." : "Generate Titles"}
          </Button>
        </CardFooter>
      </form>
    </Card>
  );
}