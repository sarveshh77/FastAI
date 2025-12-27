"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Loader2 } from "lucide-react";

export default function ArticleGeneratorForm() {
  const [isLoading, setIsLoading] = useState(false);
  const [generatedArticle, setGeneratedArticle] = useState(null); // Default is null

  const handleSubmit = async (event) => {
    // ... (Your handleSubmit function stays exactly the same)
    event.preventDefault();
    setIsLoading(true);
    setGeneratedArticle(null);

    const formData = new FormData(event.currentTarget);
    const topic = formData.get("topic");
    const length = formData.get("length");

    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/tools/article-generator`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ topic, length }),
      });

      if (!response.ok) throw new Error("Failed to generate article");

      const data = await response.json();
      setGeneratedArticle(data.generated_output); 
    } catch (error) {
      console.error(error);
      setGeneratedArticle({ title: "Error", sections: [{ type: "paragraph", content: "Could not generate article. Please try again." }] });
    } finally {
      setIsLoading(false);
    }
  };

  // This function decides which HTML tag to use
  const renderSection = (section, index) => {
    switch (section.type) {
      case "heading":
        return <h2 key={index} className="text-xl font-semibold mt-4 mb-2">{section.content}</h2>;
      case "paragraph":
        return <p key={index} className="mb-4">{section.content}</p>;
      default:
        return <p key={index}>{section.content}</p>;
    }
  };

  return (
    <Card>
      <form onSubmit={handleSubmit}>
        <CardHeader>
          <CardTitle>Article Generator</CardTitle>
          <CardDescription>Enter a topic and let AI write the article for you.</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          {/* ... (Your input and select components stay the same) ... */}
          <div className="space-y-2">
            <Label htmlFor="topic">Topic</Label>
            <Input id="topic" name="topic" placeholder="e.g., The Future of Renewable Energy" required />
          </div>
          <div className="space-y-2">
            <Label htmlFor="length">Article Length</Label>
            <Select name="length" defaultValue="medium">
              <SelectTrigger>
                <SelectValue placeholder="Select a length" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="short">Short (approx. 300 words)</SelectItem>
                <SelectItem value="medium">Medium (approx. 600 words)</SelectItem>
                <SelectItem value="long">Long (approx. 1000 words)</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {/* --- THIS IS THE FIX --- */}
          <div className="space-y-2">
            <Label>Generated Article</Label>
            <div className="rounded-md border p-4 h-96 overflow-y-auto bg-muted/30">
              {!generatedArticle && (
                <p className="text-muted-foreground">Your generated article will appear here...</p>
              )}
              {generatedArticle && (
                <div>
                  <h1 className="text-2xl font-bold mb-4">{generatedArticle.title}</h1>
                  {/* We check if 'generatedArticle.sections' exists.
                    If it does, we map it.
                    If it doesn't, we use an empty array [] to prevent the .map() crash.
                  */}
                  {(generatedArticle.sections || []).map(renderSection)}
                </div>
              )}
            </div>
          </div>
          {/* --- END FIX --- */}
          
        </CardContent>
        <CardFooter>
          <Button type="submit" disabled={isLoading}>
            {isLoading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
            {isLoading ? "Generating..." : "Generate"}
          </Button>
        </CardFooter>
      </form>
    </Card>
  );
}