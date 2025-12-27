import ArticleGeneratorForm from "@/components/features/tools/article-generator-form";

export default function ArticleGeneratorPage() {
  return (
    <div>
      <h1 className="my-6 text-2xl font-semibold text-gray-700 dark:text-gray-200">
        AI Article Generator
      </h1>
      <ArticleGeneratorForm />
    </div>
  );
}