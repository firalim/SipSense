import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Switch } from "@/components/ui/switch";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { Droplets, Award, Cloud, Droplet } from "lucide-react";
import MemeBAC from "./MemeBAC";

interface ProfileTabProps {
  profile: any;
  drinks: any[];
  waterIntake: number;
  setWaterIntake: (value: number) => void;
  mindfulMode: boolean;
  setMindfulMode: (value: boolean) => void;
  streak: number;
  currentBAC: number;
}

const ProfileTab = ({ 
  profile, 
  drinks, 
  waterIntake, 
  setWaterIntake, 
  mindfulMode, 
  setMindfulMode, 
  streak, 
  currentBAC 
}: ProfileTabProps) => {
  
  const getHangoverRisk = () => {
    if (currentBAC <= 0.03) return { level: "low", emoji: "🟢", text: "No risk - you're golden!" };
    if (currentBAC <= 0.08) return { level: "mild", emoji: "🟡", text: "Mild risk - hydrate and slow down" };
    return { level: "high", emoji: "🔴", text: "High risk - time for water and food!" };
  };

  const hangoverRisk = getHangoverRisk();
  const waterGoal = drinks.length * 250;
  const waterProgress = waterGoal > 0 ? (waterIntake / waterGoal) * 100 : 0;

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      {/* Meme Mood BAC */}
      <MemeBAC currentBAC={currentBAC} />

      {/* Hangover Forecast */}
      <Card className="shadow-lg">
        <CardHeader>
          <div className="flex items-center space-x-2">
            <Cloud className="w-5 h-5 text-gray-600" />
            <CardTitle className="text-lg text-burgundy">Hangover Forecast</CardTitle>
          </div>
          <CardDescription className="text-gray-600">Tomorrow's weather outlook</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center justify-between">
            <span className="text-3xl">{hangoverRisk.emoji}</span>
            <Badge variant={hangoverRisk.level === "low" ? "default" : hangoverRisk.level === "mild" ? "secondary" : "destructive"}
              className={hangoverRisk.level === "low" ? "bg-mint text-white" : hangoverRisk.level === "mild" ? "bg-gold text-white" : "bg-burgundy text-white"}
            >
              {hangoverRisk.level.toUpperCase()} RISK
            </Badge>
          </div>
          <p className="text-sm text-gray-600">{hangoverRisk.text}</p>
        </CardContent>
      </Card>

      {/* Hydration Goal */}
      <Card className="shadow-lg">
        <CardHeader>
          <div className="flex items-center space-x-2">
            <Droplets className="w-5 h-5 text-mint" />
            <CardTitle className="text-lg text-burgundy">Hydration Goal</CardTitle>
          </div>
          <CardDescription className="text-gray-600">Stay hydrated while drinking</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <div className="flex justify-between text-sm">
              <span className="text-gray-600">Progress</span>
              <span className="font-medium text-burgundy">{waterIntake} / {waterGoal} ml</span>
            </div>
            <Progress value={waterProgress} className="h-2" />
          </div>
          
          <div className="flex items-center space-x-3">
            <div className="flex-1">
              <Label htmlFor="water-input" className="text-burgundy">Add Water (ml)</Label>
              <Input
                id="water-input"
                type="number"
                placeholder="250"
                onChange={(e) => {
                  const value = Number(e.target.value);
                  if (value > 0) setWaterIntake(waterIntake + value);
                }}
                className="border-mint focus:ring-mint"
              />
            </div>
            <Button 
              onClick={() => setWaterIntake(waterIntake + 250)}
              className="bg-mint text-white hover:bg-mint/90"
            >
              <Droplet className="w-4 h-4 mr-1" />
              Quick Add 250ml
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Streaks & Achievements */}
      <Card className="shadow-lg">
        <CardHeader>
          <div className="flex items-center space-x-2">
            <Award className="w-5 h-5 text-gold" />
            <CardTitle className="text-lg text-burgundy">Streaks & Achievements</CardTitle>
          </div>
          <CardDescription className="text-gray-600">Your mindful drinking journey</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="font-medium text-burgundy">Mindful Streak</p>
              <p className="text-sm text-gray-600">{streak} days</p>
            </div>
            <Badge className="bg-gold text-white">🔥 {streak} days</Badge>
          </div>

          <div>
            <p className="font-medium text-burgundy mb-2">Recent Achievements</p>
            <div className="space-y-2">
              {profile.achievements && profile.achievements.length > 0 ? (
                profile.achievements.slice(0, 3).map((achievement: any) => (
                  <div key={achievement.id} className="flex items-center space-x-2 p-2 bg-cream rounded">
                    <span className="text-lg">{achievement.emoji}</span>
                    <div>
                      <p className="text-sm font-medium text-burgundy">{achievement.name}</p>
                      <p className="text-xs text-gray-600">{achievement.description}</p>
                    </div>
                  </div>
                ))
              ) : (
                <p className="text-sm text-gray-600">No achievements yet. Keep sipping smart!</p>
              )}
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Challenge Mode */}
      <Card className="shadow-lg">
        <CardHeader>
          <CardTitle className="text-lg text-burgundy">Challenge Mode</CardTitle>
          <CardDescription className="text-gray-600">Push your mindful drinking limits</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="font-medium text-burgundy">Mindful Drinking Challenge</p>
              <p className="text-sm text-gray-600">Stay below 0.05 BAC tonight</p>
            </div>
            <Switch
              checked={mindfulMode}
              onCheckedChange={setMindfulMode}
              className="data-[state=checked]:bg-mint"
            />
          </div>

          {mindfulMode && (
            <div className="p-3 bg-mint/10 rounded-lg">
              <p className="text-sm font-medium text-burgundy">Challenge Active!</p>
              <p className="text-xs text-gray-600">You'll earn +20 SSP for success</p>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default ProfileTab;