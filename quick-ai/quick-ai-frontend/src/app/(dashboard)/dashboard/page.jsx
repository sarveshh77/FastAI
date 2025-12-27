import PlanStatus from "@/components/features/dashboard/plan-status";
import ToolCard from "@/components/features/dashboard/tool-card";
import { PenSquare, Image, FileText, ScanText, Trash2, MicVocal } from "lucide-react";

export default function DashboardPage() {
  // This data comes from your SRS 2.2
  const tools = [
    { id: "article-generator", title: "Article Generator", icon: PenSquare, desc: "Create full-length articles from a topic.", premium: false },
    { id: "blog-title-generator", title: "Blog Title Generator", icon: MicVocal, desc: "Generate catchy titles for your blog.", premium: false },
    { id: "image-generator", title: "Image Generator", icon: Image, desc: "Turn your text prompts into stunning AI images.", premium: true },
    { id: "background-remover", title: "Background Remover", icon: Trash2, desc: "Effortlessly remove image backgrounds.", premium: true },
    { id: "object-remover", title: "Object Remover", icon: ScanText, desc: "Remove unwanted objects from your photos.", premium: true },
    { id: "resume-analyzer", title: "Résumé Analyzer", icon: FileText, desc: "Get an expert analysis of your résumé.", premium: true },
  ];

  // For the demo, we'll pretend we are a free user
  const isPremiumUser = false;

  return (
    <>
      <h1 className="my-6 text-2xl font-semibold text-gray-700 dark:text-gray-200">
        Dashboard
      </h1>

      {/* FR-4.2: Plan Status Display */}
      <PlanStatus isPremium={isPremiumUser} />

      <div className="grid gap-6 mb-8 md:grid-cols-2 xl:grid-cols-3">
        {tools.map((tool) => (
          <ToolCard
            key={tool.id}
            id={tool.id}
            title={tool.title}
            Icon={tool.icon}
            description={tool.desc}
            isPremium={tool.premium}
            isLocked={tool.premium && !isPremiumUser}
          />
        ))}
      </div>
    </>
  );
}