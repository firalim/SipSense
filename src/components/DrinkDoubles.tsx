import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Progress } from "@/components/ui/progress";
import { Users, UserPlus, Award, Heart } from "lucide-react";

interface DrinkDoublesProps {
  currentBAC: number;
  currentSSP: number;
}

const DrinkDoubles = ({ currentBAC, currentSSP }: DrinkDoublesProps) => {
  const [friendCode, setFriendCode] = useState("");
  const [syncedFriend, setSyncedFriend] = useState<any>(null);
  const [sessionActive, setSessionActive] = useState(false);

  const mockFriend = {
    name: "Alex",
    avatar: "A",
    bac: 0.04,
    lastDrink: "2 mins ago",
    waterCount: 3,
    status: "mindful_zone"
  };

  const startSync = () => {
    if (friendCode.trim()) {
      setSyncedFriend(mockFriend);
      setSessionActive(true);
    }
  };

  const getStatusEmoji = (bac: number) => {
    if (bac <= 0.03) return "🟢";
    if (bac <= 0.08) return "🟡";
    return "🔴";
  };

  const sharedAchievements = [
    { name: "Both Under 0.06%", earned: true, ssp: 25 },
    { name: "Hydration Twins", earned: currentBAC <= 0.05 && (syncedFriend?.bac || 0) <= 0.05, ssp: 15 },
    { name: "Mindful Mates", earned: false, ssp: 30 }
  ];

  return (
    <Card className="shadow-lg">
      <CardHeader>
        <div className="flex items-center space-x-2">
          <Users className="w-5 h-5 text-burgundy" />
          <CardTitle className="text-lg text-burgundy">Drink Doubles</CardTitle>
        </div>
        <p className="text-sm text-gray-600">Sync with a friend for shared accountability</p>
      </CardHeader>
      <CardContent className="space-y-4">
        {!sessionActive ? (
          <div className="space-y-4">
            <div className="text-center p-6 bg-gradient-to-r from-mint/20 to-cream rounded-lg border border-mint">
              <div className="text-3xl mb-2">👫</div>
              <h3 className="font-medium mb-1 text-burgundy">Find Your Drinking Buddy</h3>
              <p className="text-sm text-gray-600">Stay safe and have fun together</p>
            </div>
            
            <div className="space-y-2">
              <label className="text-sm font-medium text-burgundy">Friend Code</label>
              <div className="flex space-x-2">
                <Input
                  placeholder="Enter friend's code..."
                  value={friendCode}
                  onChange={(e) => setFriendCode(e.target.value)}
                  className="border-mint focus:ring-mint"
                />
                <Button onClick={startSync} disabled={!friendCode.trim()} className="bg-mint text-white hover:bg-mint/90">
                  <UserPlus className="w-4 h-4 mr-1" />
                  Sync
                </Button>
              </div>
            </div>
            
            <div className="text-center p-3 bg-cream rounded-lg">
              <p className="text-xs text-gray-600">Your code: <span className="font-mono font-bold">SIP2024</span></p>
            </div>
          </div>
        ) : (
          <div className="space-y-4">
            <div className="flex items-center justify-between p-3 bg-gradient-to-r from-mint/20 to-cream rounded-lg border border-mint">
              <div className="flex items-center space-x-3">
                <div className="relative">
                  <Avatar>
                    <AvatarFallback>{syncedFriend.avatar}</AvatarFallback>
                  </Avatar>
                  <div className="absolute -bottom-1 -right-1 text-lg">
                    {getStatusEmoji(syncedFriend.bac)}
                  </div>
                </div>
                <div>
                  <p className="font-medium text-burgundy">{syncedFriend.name}</p>
                  <p className="text-xs text-gray-600">BAC: {(syncedFriend.bac * 100).toFixed(2)}%</p>
                </div>
              </div>
              <Badge className="bg-mint text-white">Synced</Badge>
            </div>

            <div className="space-y-3">
              <h4 className="font-medium text-burgundy">BAC Sync Status</h4>
              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span>You: {(currentBAC * 100).toFixed(2)}%</span>
                  <span>{syncedFriend.name}: {(syncedFriend.bac * 100).toFixed(2)}%</span>
                </div>
                <div className="grid grid-cols-2 gap-2">
                  <Progress value={(currentBAC / 0.12) * 100} className="h-2" />
                  <Progress value={(syncedFriend.bac / 0.12) * 100} className="h-2" />
                </div>
              </div>
              
              {currentBAC <= 0.06 && syncedFriend.bac <= 0.06 && (
                <div className="flex items-center justify-center p-2 bg-mint/20 rounded-lg">
                  <span className="text-sm font-medium text-mint">🎉 Both in the safe zone!</span>
                </div>
              )}
            </div>

            <div className="space-y-2">
              <h4 className="font-medium text-burgundy">Shared Goals</h4>
              {sharedAchievements.map((achievement, index) => (
                <div key={index} className={`flex items-center justify-between p-2 border rounded-lg ${
                  achievement.earned ? 'bg-mint/20 border-mint' : 'bg-cream border-gray-200'
                }`}>
                  <div className="flex items-center space-x-2">
                    <span className="text-sm">{achievement.earned ? '🏆' : '⏳'}</span>
                    <span className="text-sm font-medium text-burgundy">{achievement.name}</span>
                  </div>
                  <Badge variant={achievement.earned ? "default" : "outline"} className={achievement.earned ? "bg-mint text-white" : "border-gray-300 text-gray-600"}>
                    +{achievement.ssp} SSP
                  </Badge>
                </div>
              ))}
            </div>

            <Button 
              variant="outline" 
              className="w-full border-burgundy text-burgundy hover:bg-burgundy/10"
              onClick={() => alert("🥂 Cheers sent to " + syncedFriend.name + "!")}
            >
              <Heart className="w-4 h-4 mr-2" />
              Send Virtual Cheers 🥂
            </Button>
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default DrinkDoubles;