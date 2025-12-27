"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Switch } from "@/components/ui/switch";
import Image from "next/image";

// A simple loader component placeholder
const Loader = () => (
  <div className="flex flex-col items-center justify-center space-y-2">
    <div className="w-8 h-8 border-4 border-purple-600 border-t-transparent rounded-full animate-spin"></div>
    <p className="text-muted-foreground">Generating...</p>
  </div>
);

export default function ImageGeneratorForm() {
  const [isLoading, setIsLoading] = useState(false);
  const [generatedImage, setGeneratedImage] = useState(null);

  const handleSubmit = async (event) => {
    event.preventDefault();
    setIsLoading(true);
    setGeneratedImage(null);

    const formData = new FormData(event.currentTarget);
    const prompt = formData.get('prompt');
    const style = formData.get('style');
    const isPublic = formData.get('isPublic') === 'on';

    try {
      // This is where we call our backend
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/tools/image-generator`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ prompt, style, isPublic }),
      });

      if (!response.ok) {
        throw new Error(`Error: ${response.statusText}`);
      }

      const data = await response.json();
      setGeneratedImage(data.imageUrl);

    } catch (error) {
      console.error("Failed to generate image:", error);
      // You would show an error message to the user here
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Card>
      <form onSubmit={handleSubmit}>
        <CardHeader>
          <CardTitle>Image Generator</CardTitle>
          <CardDescription>Describe the image you want to create.</CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="space-y-2">
            <Label htmlFor="prompt">Prompt</Label>
            <Input id="prompt" name="prompt" placeholder="A futuristic city with flying cars, in a photorealistic style" required />
          </div>
          <div className="space-y-2">
            <Label htmlFor="style">Artistic Style</Label>
            <Select name="style" defaultValue="realistic">
              <SelectTrigger>
                <SelectValue placeholder="Select a style" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="realistic">Realistic</SelectItem>
                <SelectItem value="3d">3D Render</SelectItem>
                <SelectItem value="anime">Anime</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {/* FR-3.3.1: Image Privacy Control */}
          <div className="flex items-center space-x-2">
            <Switch id="is-public" name="isPublic" defaultChecked />
            <Label htmlFor="is-public">Make image public in Community Gallery?</Label>
          </div>

          {/* Output Area */}
          <div className="rounded-lg border bg-card text-card-foreground shadow-sm min-h-[300px] flex items-center justify-center p-4">
            {isLoading && <Loader />}
            {!isLoading && generatedImage && (
              <Image src={generatedImage} alt="Generated AI Image" width={512} height={512} className="rounded-md" />
            )}
            {!isLoading && !generatedImage && (
              <p className="text-muted-foreground">Your generated image will appear here.</p>
            )}
          </div>
        </CardContent>
        <CardFooter>
          <Button type="submit" disabled={isLoading}>
            {isLoading ? "Generating..." : "Generate Image"}
          </Button>
        </CardFooter>
      </form>
    </Card>
  );
}