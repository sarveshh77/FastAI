import ResumeAnalyzerForm from "@/components/features/tools/resume-analyzer-form";

export default function ResumeAnalyzerPage() {
  return (
    <div>
      <h1 className="my-6 text-2xl font-semibold text-gray-700 dark:text-gray-200">
        AI Resume Analyzer
      </h1>
      <ResumeAnalyzerForm />
    </div>
  );
}