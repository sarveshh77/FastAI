import ImageGeneratorForm from "@/components/features/tools/image-generator-form";

export default function ImageGeneratorPage() {
  return (
    <div>
      <h1 className="my-6 text-2xl font-semibold text-gray-700 dark:text-gray-200">
        AI Image Generator
      </h1>
      <ImageGeneratorForm />
    </div>
  );
}