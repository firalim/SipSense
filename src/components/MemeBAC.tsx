import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Heart, Users } from "lucide-react";

interface MemeBACProps {
  currentBAC: number;
}

const MemeBAC = ({ currentBAC }: MemeBACProps) => {
  const getMemeContent = () => {
    if (currentBAC <= 0.03) {
      return {
        title: "CEO of Self-Control 💼",
        subtitle: "Sober Squad",
        description: "Making responsible decisions and still having a blast",
        emoji: "🧠",
        color: "bg-mint/20 border-mint",
        textColor: "text-mint",
        badgeColor: "bg-mint"
      };
    } else if (currentBAC <= 0.08) {
      return {
        title: "Sending texts I'll regret but spelling them right 🍸",
        subtitle: "Tipsy Texter",
        description: "Confidence level: Will definitely tell everyone my life story",
        emoji: "📱",
        color: "bg-gold/20 border-gold",
        textColor: "text-gold",
        badgeColor: "bg-gold"
      };
    } else {
      return {
        title: "Dancing like nobody's recording 🎥🔥",
        subtitle: "Main Character Energy",
        description: "Plot twist: Everyone is recording",
        emoji: "💃",
        color: "bg-burgundy/20 border-burgundy",
        textColor: "text-burgundy",
        badgeColor: "bg-burgundy"
      };
    }
  };

  const meme = getMemeContent();

  return (
    <Card className={`shadow-lg ${meme.color} transition-all duration-500`}>
      <CardHeader className="text-center pb-3">
        <div className="flex items-center justify-between">
          <Badge className={`${meme.badgeColor} text-white`}>
            {meme.subtitle}
          </Badge>
          <div className="flex items-center space-x-1">
            <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
              <Heart className="w-4 h-4 text-burgundy" />
            </Button>
            <span className="text-xs text-gray-600">42</span>
          </div>
        </div>
        <div className="text-4xl mb-2">{meme.emoji}</div>
        <CardTitle className={`text-lg ${meme.textColor} leading-tight`}>
          {meme.title}
        </CardTitle>
      </CardHeader>
      <CardContent className="text-center space-y-4">
        <p className="text-sm text-gray-600 italic">
          {meme.description}
        </p>
        
        <div className="flex justify-center space-x-2">
          <Button size="sm" variant="outline" className="text-xs border-burgundy text-burgundy hover:bg-burgundy/10">
            <Users className="w-3 h-3 mr-1" />
            Share Meme
          </Button>
          <Button size="sm" variant="outline" className="text-xs border-burgundy text-burgundy hover:bg-burgundy/10">
            💾 Save
          </Button>
        </div>
        
        <div className="text-xs text-gray-600">
          BAC: {(currentBAC * 100).toFixed(2)}% • Mood Level: {meme.subtitle}
        </div>
      </CardContent>
    </Card>
  );
};

export default MemeBAC;