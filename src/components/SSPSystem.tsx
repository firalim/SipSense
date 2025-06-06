import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";

interface SSPSystemProps {
  currentSSP: number;
  level: number;
  nextLevelSSP: number;
}

const SSPSystem = ({ currentSSP, level, nextLevelSSP }: SSPSystemProps) => {
  const progress = (currentSSP / nextLevelSSP) * 100;

  return (
    <Card className="shadow-lg">
      <CardHeader>
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <span className="text-2xl">🏆</span>
            <CardTitle className="text-xl text-burgundy">SipSmart Points (SSP)</CardTitle>
          </div>
          <Badge className="bg-gold text-white">Level {level}</Badge>
        </div>
        <p className="text-sm text-gray-600">Earn points for mindful drinking habits</p>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="space-y-2">
          <div className="flex justify-between text-sm">
            <span className="text-gray-600">Progress to Level {level + 1}</span>
            <span className="font-medium text-burgundy">{currentSSP} / {nextLevelSSP} SSP</span>
          </div>
          <Progress value={progress} className="h-2" />
        </div>

        <div className="grid grid-cols-2 gap-3">
          <div className="p-3 bg-mint/10 rounded-lg text-center">
            <p className="text-sm font-medium text-burgundy">+10 SSP</p>
            <p className="text-xs text-gray-600">Per Drink Logged</p>
          </div>
          <div className="p-3 bg-mint/10 rounded-lg text-center">
            <p className="text-sm font-medium text-burgundy">+5 SSP</p>
            <p className="text-xs text-gray-600">Per Water Intake</p>
          </div>
        </div>

        <div className="text-center">
          <p className="text-sm text-gray-600">Next Reward: <span className="font-medium text-burgundy">Custom Avatar</span> at Level {level + 1}</p>
        </div>
      </CardContent>
    </Card>
  );
};

export default SSPSystem;