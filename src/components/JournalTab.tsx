import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import DrinkInput from "./DrinkInput";
import BACAnalysis from "./BACAnalysis";
import { MessageSquare, Calendar, Droplets, Clock } from "lucide-react";
import { getRecommendation, getTimeToSober } from "../utils/bacCalculator";

interface JournalTabProps {
  profile: any;
  drinks: any[];
  onDrinkAdd: (drink: any) => void;
  currentBAC: number;
  waterIntake: number;
  setWaterIntake: (value: number) => void;
}

const JournalTab = ({ 
  profile, 
  drinks, 
  onDrinkAdd, 
  currentBAC, 
  waterIntake, 
  setWaterIntake 
}: JournalTabProps) => {
  const [chatMessage, setChatMessage] = useState("");
  const [chatHistory, setChatHistory] = useState([
    { sender: "ava", message: "Hi! I'm Ava, your sober buddy. How can I help you tonight? 😊" }
  ]);
  const [partyPlan, setPartyPlan] = useState({
    expectedDrinks: "",
    timeframe: "",
    location: ""
  });

  const handleChatSend = () => {
    if (!chatMessage.trim()) return;

    const newHistory = [...chatHistory, { sender: "user", message: chatMessage }];
    
    let avaResponse = "";
    if (currentBAC > 0.08) {
      avaResponse = "I'd suggest switching to water for now. Your BAC is getting up there! 💧";
    } else if (drinks.length > 3) {
      avaResponse = "You've had a few drinks! How about a snack and some water? 🥨";
    } else if (chatMessage.toLowerCase().includes("water")) {
      avaResponse = "Great thinking! Water is your best friend tonight. Keep it up! 💪";
    } else {
      avaResponse = `Based on your current state, I'd recommend pacing yourself. Maybe a ${getRecommendation(currentBAC)} next? 🍷`;
    }

    newHistory.push({ sender: "ava", message: avaResponse });
    setChatHistory(newHistory);
    setChatMessage("");
  };

  const scheduleWaterReminder = () => {
    alert("Water reminder set! I'll ping you in 30 minutes 💧");
  };

  const timeToSober = getTimeToSober(currentBAC, profile); // Calculate sober time

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
      {/* Current Session */}
      <div className="space-y-6">
        <DrinkInput onDrinkAdd={onDrinkAdd} />
        
        {drinks.length > 0 && (
          <BACAnalysis 
            bac={currentBAC}
            recommendation={getRecommendation(currentBAC)}
            timeToSober={timeToSober}
          />
        )}
      </div>

      {/* AI Sober Buddy - Ava */}
      <Card className="shadow-lg">
        <CardHeader>
          <div className="flex items-center space-x-2">
            <MessageSquare className="w-5 h-5 text-burgundy" />
            <CardTitle className="text-lg text-burgundy">Ask Ava</CardTitle>
          </div>
          <CardDescription className="text-gray-600">Your friendly sober coach</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="h-48 overflow-y-auto space-y-3 p-3 bg-cream rounded-lg">
            {chatHistory.map((chat, index) => (
              <div key={index} className={`flex ${chat.sender === 'user' ? 'justify-end' : 'justify-start'}`}>
                <div className={`max-w-[80%] p-2 rounded-lg text-sm ${
                  chat.sender === 'user' 
                    ? 'bg-mint text-white' 
                    : 'bg-white border border-gray-300'
                }`}>
                  {chat.message}
                </div>
              </div>
            ))}
          </div>
          <div className="flex space-x-2">
            <Input
              placeholder="Ask Ava anything..."
              value={chatMessage}
              onChange={(e) => setChatMessage(e.target.value)}
              onKeyPress={(e) => e.key === 'Enter' && handleChatSend()}
              className="border-mint focus:ring-mint"
            />
            <Button onClick={handleChatSend} className="bg-mint text-white hover:bg-mint/90">
              Send
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Water Reminder */}
      <Card className="shadow-lg">
        <CardHeader>
          <div className="flex items-center space-x-2">
            <Droplets className="w-5 h-5 text-mint" />
            <CardTitle className="text-lg text-burgundy">Water Reminder</CardTitle>
          </div>
          <CardDescription className="text-gray-600">Stay hydrated throughout the night</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="text-center p-4 bg-mint/10 rounded-lg">
            <div className="text-2xl mb-2">💧</div>
            <p className="text-sm font-medium text-burgundy">Current hydration: {waterIntake}ml</p>
            <p className="text-xs text-gray-600">Recommended: {drinks.length * 250}ml</p>
          </div>
          <Button 
            onClick={scheduleWaterReminder} 
            className="w-full bg-mint text-white hover:bg-mint/90"
            variant="outline"
          >
            <Clock className="w-4 h-4 mr-2" />
            Set 30min Reminder
          </Button>
        </CardContent>
      </Card>

      {/* Pre-Party Planner */}
      <Card className="shadow-lg">
        <CardHeader>
          <div className="flex items-center space-x-2">
            <Calendar className="w-5 h-5 text-gold" />
            <CardTitle className="text-lg text-burgundy">Pre-Party Planner</CardTitle>
          </div>
          <CardDescription className="text-gray-600">Plan your night ahead</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-3">
            <div>
              <Label htmlFor="expected-drinks" className="text-burgundy">Expected drinks</Label>
              <Input
                id="expected-drinks"
                placeholder="3-4 beers"
                value={partyPlan.expectedDrinks}
                onChange={(e) => setPartyPlan({...partyPlan, expectedDrinks: e.target.value})}
                className="border-mint focus:ring-mint"
              />
            </div>
            <div>
              <Label htmlFor="timeframe" className="text-burgundy">Timeframe</Label>
              <Input
                id="timeframe"
                placeholder="6 PM - 12 AM"
                value={partyPlan.timeframe}
                onChange={(e) => setPartyPlan({...partyPlan, timeframe: e.target.value})}
                className="border-mint focus:ring-mint"
              />
            </div>
            <div>
              <Label htmlFor="location" className="text-burgundy">Location</Label>
              <Input
                id="location"
                placeholder="Local bar"
                value={partyPlan.location}
                onChange={(e) => setPartyPlan({...partyPlan, location: e.target.value})}
                className="border-mint focus:ring-mint"
              />
            </div>
          </div>
          
          {partyPlan.expectedDrinks && (
            <div className="p-3 bg-gold/10 rounded-lg">
              <h4 className="font-medium text-burgundy mb-2">Smart Forecast</h4>
              <div className="space-y-1 text-sm text-gray-600">
                <p>• Pace: 1 drink per 90 minutes</p>
                <p>• Eat before 8 PM</p>
                <p>• Water break every 2 drinks</p>
                <p>• Call ride home after 11:30 PM</p>
              </div>
            </div>
          )}
          
          <Button className="w-full border-burgundy text-burgundy hover:bg-burgundy/10" variant="outline">
            Share Plan with Friends
          </Button>
        </CardContent>
      </Card>
    </div>
  );
};

export default JournalTab;