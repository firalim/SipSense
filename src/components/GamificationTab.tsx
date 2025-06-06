import AvatarEvolution from "./AvatarEvolution";
import DrinkDoubles from "./DrinkDoubles";
import SSPSystem from "./SSPSystem";
import MoodMixer from "./MoodMixer";
import SpinTheSip from "./SpinTheSip";
import StreaksChallenges from "./StreaksChallenges";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

interface GamificationTabProps {
  currentSSP: number;
  level: number;
  drinkingPattern: "mindful" | "party" | "balanced";
  currentBAC: number;
  streak: number;
}

const GamificationTab = ({ currentSSP, level, drinkingPattern, currentBAC, streak }: GamificationTabProps) => {
  const nextLevelSSP = (level + 1) * 100;

  return (
    <div className="w-full max-w-6xl mx-auto">
      <Tabs defaultValue="overview" className="w-full">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="social">Social</TabsTrigger>
          <TabsTrigger value="challenges">Challenges</TabsTrigger>
          <TabsTrigger value="games">Games</TabsTrigger>
        </TabsList>

        <TabsContent value="overview" className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <div className="lg:col-span-2">
              <SSPSystem 
                currentSSP={currentSSP} 
                level={level} 
                nextLevelSSP={nextLevelSSP} 
              />
            </div>
            
            <MoodMixer />
            
            <AvatarEvolution 
              currentSSP={currentSSP} 
              drinkingPattern={drinkingPattern} 
            />
          </div>
        </TabsContent>

        <TabsContent value="social" className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <DrinkDoubles 
              currentBAC={currentBAC}
              currentSSP={currentSSP}
            />
            
            <div className="space-y-6">
              <div className="text-center p-8 border-2 border-dashed border-gray-300 rounded-lg">
                <div className="text-4xl mb-2">👥</div>
                <h3 className="font-medium mb-1 text-burgundy">Community Feed</h3>
                <p className="text-sm text-gray-600">Coming soon! Connect with other mindful drinkers</p>
              </div>
            </div>
          </div>
        </TabsContent>

        <TabsContent value="challenges" className="space-y-6">
          <StreaksChallenges 
            currentSSP={currentSSP}
            streak={streak}
          />
        </TabsContent>

        <TabsContent value="games" className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <SpinTheSip />
            
            <div className="space-y-6">
              <div className="text-center p-8 border-2 border-dashed border-gray-300 rounded-lg">
                <div className="text-4xl mb-2">🎮</div>
                <h3 className="font-medium mb-1 text-burgundy">More Games</h3>
                <p className="text-sm text-gray-600">Additional mini-games coming soon!</p>
              </div>
            </div>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default GamificationTab;