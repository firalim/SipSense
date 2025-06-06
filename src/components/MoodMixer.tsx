import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

const MoodMixer = () => {
  const [selectedMood, setSelectedMood] = useState("");
  const [generatedDrink, setGeneratedDrink] = useState<any>(null);

  const moods = [
    { value: "chill", label: "Chill & Relaxed 😌", emoji: "😌" },
    { value: "flirty", label: "Flirty & Fun 😘", emoji: "😘" },
    { value: "bold", label: "Bold & Adventurous 🔥", emoji: "🔥" },
    { value: "rainy", label: "Cozy Rainy Day ☔", emoji: "☔" },
    { value: "social", label: "Social Butterfly 🦋", emoji: "🦋" }
  ];

  const drinkSuggestions = {
    chill: {
      name: "Zen Garden Spritz",
      ingredients: ["Elderflower liqueur", "Prosecco", "Cucumber", "Mint"],
      abv: "8%",
      rating: "Dangerously smooth 🫠",
      playlist: "Lo-fi Sunset Vibes",
      moodBoard: "🌸🍃✨🌙"
    },
    flirty: {
      name: "Blush & Giggle",
      ingredients: ["Rosé wine", "Peach liqueur", "Strawberry", "Lime"],
      abv: "11%",
      rating: "Confidence in a glass 💋",
      playlist: "Flirty Pop Hits",
      moodBoard: "💕🌹🥂✨"
    },
    bold: {
      name: "Fire & Ice",
      ingredients: ["Jalapeño-infused tequila", "Lime", "Agave", "Ginger beer"],
      abv: "15%",
      rating: "Main character energy 🔥",
      playlist: "Power Hour Anthems",
      moodBoard: "🔥⚡🌶️💥"
    },
    rainy: {
      name: "Cozy Cabin Toddy",
      ingredients: ["Bourbon", "Honey", "Lemon", "Cinnamon"],
      abv: "12%",
      rating: "Warm hug in a mug 🤗",
      playlist: "Rainy Day Jazz",
      moodBoard: "☔🍯🕯️📚"
    },
    social: {
      name: "Party Starter Punch",
      ingredients: ["Vodka", "Cranberry", "Pineapple", "Lime"],
      abv: "10%",
      rating: "Instant friend maker 🎉",
      playlist: "Dance Floor Favorites",
      moodBoard: "🎉🍍💃🌈"
    }
  };

  const generateDrink = () => {
    if (selectedMood) {
      setGeneratedDrink(drinkSuggestions[selectedMood as keyof typeof drinkSuggestions]);
    }
  };

  return (
    <Card className="shadow-lg">
      <CardHeader>
        <CardTitle className="text-xl flex items-center space-x-2 text-burgundy">
          <span className="text-2xl">🍹</span>
          <span>MoodMixer AI</span>
        </CardTitle>
        <p className="text-sm text-gray-600">Tell us your vibe, we'll craft your perfect drink</p>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="space-y-2">
          <label className="text-sm font-medium text-burgundy">What's your vibe tonight?</label>
          <Select onValueChange={setSelectedMood}>
            <SelectTrigger className="border-mint focus:ring-mint">
              <SelectValue placeholder="Select your mood..." />
            </SelectTrigger>
            <SelectContent>
              {moods.map((mood) => (
                <SelectItem key={mood.value} value={mood.value}>
                  {mood.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        <Button 
          onClick={generateDrink} 
          disabled={!selectedMood}
          className="w-full bg-mint text-white hover:bg-mint/90"
        >
          Generate My Drink ✨
        </Button>

        {generatedDrink && (
          <div className="space-y-4 p-4 bg-gradient-to-r from-mint/20 to-cream rounded-lg border border-mint">
            <div className="text-center">
              <h3 className="text-lg font-bold text-burgundy">{generatedDrink.name}</h3>
              <Badge className="bg-mint text-white">{generatedDrink.abv} ABV</Badge>
            </div>
            
            <div className="space-y-2">
              <h4 className="font-medium text-burgundy">Ingredients:</h4>
              <div className="flex flex-wrap gap-1">
                {generatedDrink.ingredients.map((ingredient: string, index: number) => (
                  <Badge key={index} variant="outline" className="text-xs border-gold text-gold">
                    {ingredient}
                  </Badge>
                ))}
              </div>
            </div>

            <div className="text-center p-2 bg-cream rounded">
              <p className="text-sm font-medium text-burgundy">{generatedDrink.rating}</p>
            </div>

            <div className="space-y-2">
              <div className="flex items-center justify-between text-sm">
                <span className="text-gray-600">🎵 Playlist:</span>
                <span className="font-medium text-burgundy">{generatedDrink.playlist}</span>
              </div>
              <div className="flex items-center justify-between text-sm">
                <span className="text-gray-600">✨ Mood Board:</span>
                <span className="text-lg">{generatedDrink.moodBoard}</span>
              </div>
            </div>

            <div className="flex space-x-2">
              <Button size="sm" variant="outline" className="flex-1 border-burgundy text-burgundy hover:bg-burgundy/10">
                Save Recipe
              </Button>
              <Button size="sm" variant="outline" className="flex-1 border-burgundy text-burgundy hover:bg-burgundy/10">
                Share Vibe
              </Button>
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default MoodMixer;