import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Droplet } from "lucide-react";

interface BACAnalysisProps {
  bac: number;
  recommendation: string;
  timeToSober: number;
}

const BACAnalysis = ({ bac, recommendation, timeToSober }: BACAnalysisProps) => {
  const getBACStatus = () => {
    if (bac <= 0.05) return { emoji: "🍸", message: "You're good to go!", color: "text-mint", bg: "bg-mint/20" };
    if (bac <= 0.08) return { emoji: "🍃", message: "Go easy, friend", color: "text-gold", bg: "bg-gold/20" };
    return { emoji: "💧", message: "Time to sip water", color: "text-burgundy", bg: "bg-burgundy/20" };
  };

  const status = getBACStatus();
  const bacPercentage = Math.min((bac / 0.12) * 100, 100);

  return (
    <Card className="w-full max-w-md mx-auto shadow-lg">
      <CardHeader className="text-center">
        <div className={`w-16 h-16 ${status.bg} rounded-full flex items-center justify-center mx-auto mb-2`}>
          <span className="text-2xl">{status.emoji}</span>
        </div>
        <CardTitle className={`text-xl ${status.color}`}>
          {status.message}
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="text-center">
          <div className="text-3xl font-bold text-burgundy mb-1">
            {bac.toFixed(3)}%
          </div>
          <div className="text-sm text-gray-600">Blood Alcohol Content</div>
        </div>

        <div className="space-y-2">
          <div className="flex justify-between text-sm">
            <span>BAC Level</span>
            <span>{(bacPercentage).toFixed(0)}%</span>
          </div>
          <Progress value={bacPercentage} className="h-2" />
          <div className="flex justify-between text-xs text-gray-600">
            <span>0.00</span>
            <span>Legal Limit (0.08)</span>
            <span>0.12+</span>
          </div>
        </div>

        <div className="bg-cream rounded-lg p-4">
          <p className="text-sm text-gray-600 mb-2">Recommendation:</p>
          <p className="text-sm font-medium">{recommendation}</p>
        </div>

        <div className="flex items-center justify-between bg-mint/10 rounded-lg p-3">
          <div className="flex items-center space-x-2">
            <Droplet className="w-4 h-4 text-mint" />
            <span className="text-sm font-medium">Time to sober</span>
          </div>
          <span className="text-sm font-bold">
            {timeToSober > 60 ? `${Math.floor(timeToSober / 60)}h ${timeToSober % 60}m` : `${timeToSober}m`}
          </span>
        </div>
      </CardContent>
    </Card>
  );
};

export default BACAnalysis;