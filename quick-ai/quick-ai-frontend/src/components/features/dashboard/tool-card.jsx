import { Card, CardHeader, CardTitle } from "@/components/ui/card";
import { Lock } from "lucide-react";
import Link from "next/link";
import { Badge } from "@/components/ui/badge";

const ToolCard = ({ id, title, Icon, description, isPremium, isLocked }) => {
  // Locked premium tools won't link anywhere for now
  // Unlocked tools will link to their page
  const href = isLocked ? "#" : `/tools/${id}`;

  return (
    <Link href={href}>
      <Card className={`hover:shadow-lg transition-shadow duration-300 h-full flex flex-col ${isLocked ? 'opacity-60 bg-gray-100 dark:bg-gray-800 cursor-not-allowed' : ''}`}>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <div className="flex items-center space-x-3">
            <Icon className="h-6 w-6 text-purple-600" />
            <CardTitle className="text-lg font-medium">{title}</CardTitle>
          </div>
          {isLocked && <Lock className="h-5 w-5 text-yellow-500" />}
          {isPremium && !isLocked && <Badge>Premium</Badge>}
        </CardHeader>
        <div className="flex-1 p-6 pt-0">
          <p className="text-sm text-muted-foreground">{description}</p>
        </div>
      </Card>
    </Link>
  );
};

export default ToolCard;