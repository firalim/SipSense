import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";

interface AvatarEvolutionProps {
  currentSSP: number;
  drinkingPattern: "mindful" | "party" | "balanced";
}

const AvatarEvolution = ({ currentSSP, drinkingPattern }: AvatarEvolutionProps) => {
  const getAvatarState = () => {
    if (drinkingPattern === "mindful") {
      return {
        mood: "zen",
        emoji: "🧘‍♀️",
        aura: "bg-mint",
        title: "Zen Master",
        description: "Your mindful choices have unlocked inner peace mode",
        unlocks: ["Meditation pose", "Lotus crown", "Peaceful glow"]
      };
    } else if (drinkingPattern === "party") {
      return {
        mood: "energetic",
        emoji: "🎉",
        aura: "bg-burgundy",
        title: "Party Sprite",
        description: "You know how to have fun while staying safe!",
        unlocks: ["Disco ball accessory", "Sparkle effects", "Dance moves"]
      };
    } else {
      return {
        mood: "balanced",
        emoji: "⚖️",
        aura: "bg-gold",
        title: "Balance Keeper",
        description: "Perfect harmony between fun and responsibility",
        unlocks: ["Wisdom cape", "Balance beam", "Harmony aura"]
      };
    }
  };

  const avatarState = getAvatarState();
  
  const upgrades = [
    { name: "Hair Style", cost: 50, category: "appearance" },
    { name: "Outfit", cost: 75, category: "appearance" },
    { name: "Pet Companion", cost: 100, category: "companion" },
    { name: "Aura Effect", cost: 125, category: "effects" },
    { name: "Special Animation", cost: 150, category: "effects" }
  ];

  const evolutionProgress = Math.min((currentSSP / 500) * 100, 100);

  return (
    <Card className="shadow-lg">
      <CardHeader>
        <CardTitle className="text-xl flex items-center space-x-2 text-burgundy">
          <span className="text-2xl">🧑‍🎨</span>
          <span>Avatar Evolution</span>
        </CardTitle>
        <p className="text-sm text-gray-600">Your avatar grows with your choices</p>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="text-center space-y-3">
          <div className={`w-20 h-20 ${avatarState.aura} rounded-full flex items-center justify-center mx-auto animate-pulse`}>
            <span className="text-3xl">{avatarState.emoji}</span>
          </div>
          <div>
            <Badge className="bg-burgundy text-white mb-2">{avatarState.title}</Badge>
            <p className="text-sm text-gray-600">{avatarState.description}</p>
          </div>
        </div>

        <div className="space-y-2">
          <div className="flex justify-between text-sm">
            <span>Evolution Progress</span>
            <span>{Math.round(evolutionProgress)}%</span>
          </div>
          <Progress value={evolutionProgress} className="h-2" />
          <p className="text-xs text-gray-600 text-center">
            Next evolution at 500 SSP
          </p>
        </div>

        <div className="space-y-2">
          <h4 className="font-medium text-sm">Recent Unlocks:</h4>
          <div className="flex flex-wrap gap-1">
            {avatarState.unlocks.map((unlock, index) => (
              <Badge key={index} variant="outline" className="text-xs bg-mint/20 border-mint">
                ✨ {unlock}
              </Badge>
            ))}
          </div>
        </div>

        <div className="space-y-3">
          <h4 className="font-medium">Available Upgrades:</h4>
          {upgrades.map((upgrade, index) => (
            <div key={index} className="flex items-center justify-between p-2 border rounded-lg">
              <div>
                <p className="text-sm font-medium">{upgrade.name}</p>
                <p className="text-xs text-gray-600 capitalize">{upgrade.category}</p>
              </div>
              <div className="flex items-center space-x-2">
                <span className="text-xs text-gold">{upgrade.cost} SSP</span>
                <Button 
                  size="sm" 
                  variant={currentSSP >= upgrade.cost ? "default" : "outline"}
                  disabled={currentSSP < upgrade.cost}
                  className={currentSSP >= upgrade.cost ? "bg-mint text-white hover:bg-mint/90" : "border-gray-300 text-gray-600"}
                >
                  {currentSSP >= upgrade.cost ? "Unlock" : "Locked"}
                </Button>
              </div>
            </div>
          ))}
        </div>

        <Button variant="outline" className="w-full border-burgundy text-burgundy hover:bg-burgundy/10">
          🎭 View Avatar Gallery
        </Button>
      </CardContent>
    </Card>
  );
};

export default AvatarEvolution;