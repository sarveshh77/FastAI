import BlogTitleGeneratorForm from "@/components/features/tools/blog-title-generator-form";

export default function BlogTitleGeneratorPage() {
  return (
    <div>
      <h1 className="my-6 text-2xl font-semibold text-gray-700 dark:text-gray-200">
        AI Blog Title Generator
      </h1>
      <BlogTitleGeneratorForm />
    </div>
  );
}