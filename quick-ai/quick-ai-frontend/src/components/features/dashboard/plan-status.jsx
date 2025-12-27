import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { CheckCircle, Zap } from "lucide-react";

export default function PlanStatus({ isPremium }) {
  if (isPremium) {
    return (
      <Card className="mb-6 bg-gradient-to-r from-purple-600 to-indigo-600 text-white">
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <CheckCircle />
            <span>Premium Plan</span>
          </CardTitle>
          <CardDescription className="text-purple-100">
            You have unlimited access to all AI tools.
          </CardDescription>
        </CardHeader>
      </Card>
    );
  }

  return (
    <Card className="mb-6">
      <CardHeader>
        <CardTitle>You are on the Free Plan</CardTitle>
        <CardDescription>
          Upgrade to unlock all premium tools, including the Image Generator.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Button className="bg-purple-600 hover:bg-purple-700 text-white">
          <Zap className="mr-2 h-4 w-4" />
          Upgrade to Premium
        </Button>
      </CardContent>
    </Card>
  );
}