import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

const StreaksChallenges = () => {
  const streakDays = 5; // Example streak value

  return (
    <Card className="shadow-lg">
      <CardHeader>
        <CardTitle className="text-lg text-burgundy">Streaks & Challenges</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <p className="text-gray-600">Current Streak</p>
            <Badge className="bg-gold text-white">🔥 {streakDays} days</Badge>
          </div>
          <p className="text-gray-600">Complete challenges to earn more points!</p>
        </div>
      </CardContent>
    </Card>
  );
};

export default StreaksChallenges;