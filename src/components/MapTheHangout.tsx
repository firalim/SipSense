import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { MapPin, Star, DollarSign, Users } from "lucide-react";

const MapTheHangout = () => {
  const [showLogForm, setShowLogForm] = useState(false);
  const [newLog, setNewLog] = useState({
    venue: "",
    drink: "",
    cost: "",
    mood: "",
    review: ""
  });

  const mockVenues = [
    {
      name: "The Mindful Mixer",
      type: "Cocktail Bar",
      rating: 4.5,
      priceRange: "$$",
      specialty: "Low-ABV cocktails",
      recentLogs: 12,
      mood: "Chill",
      distance: "0.3 miles"
    },
    {
      name: "Brew & Balance",
      type: "Craft Beer",
      rating: 4.2,
      priceRange: "$",
      specialty: "Session ales",
      recentLogs: 8,
      mood: "Social",
      distance: "0.7 miles"
    },
    {
      name: "Zero Proof Club",
      type: "Mocktail Bar",
      rating: 4.8,
      priceRange: "$$",
      specialty: "Creative mocktails",
      recentLogs: 15,
      mood: "Trendy",
      distance: "1.2 miles"
    }
  ];

  const handleLogSubmit = () => {
    console.log("New venue log:", newLog);
    setShowLogForm(false);
    setNewLog({ venue: "", drink: "", cost: "", mood: "", review: "" });
    alert("🎉 +20 SSP for logging your experience!");
  };

  return (
    <Card className="shadow-lg">
      <CardHeader>
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <MapPin className="w-5 h-5 text-mint" />
            <CardTitle className="text-lg text-burgundy">Map the Hangout</CardTitle>
          </div>
          <Button 
            size="sm" 
            onClick={() => setShowLogForm(!showLogForm)}
            variant={showLogForm ? "outline" : "default"}
            className={showLogForm ? "border-burgundy text-burgundy hover:bg-burgundy/10" : "bg-mint text-white hover:bg-mint/90"}
          >
            {showLogForm ? "Cancel" : "Log Venue"}
          </Button>
        </div>
        <p className="text-sm text-gray-600">Discover mindful drinking spots near you</p>
      </CardHeader>
      <CardContent className="space-y-4">
        {/* Log Form */}
        {showLogForm && (
          <div className="space-y-4 p-4 bg-gradient-to-r from-mint/20 to-cream rounded-lg border border-mint">
            <h3 className="font-medium text-burgundy">Log Your Experience</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              <div>
                <Label htmlFor="venue" className="text-burgundy">Venue Name</Label>
                <Input
                  id="venue"
                  placeholder="The Local Pub"
                  value={newLog.venue}
                  onChange={(e) => setNewLog({...newLog, venue: e.target.value})}
                  className="border-mint focus:ring-mint"
                />
              </div>
              <div>
                <Label htmlFor="drink" className="text-burgundy">What You Had</Label>
                <Input
                  id="drink"
                  placeholder="IPA, Wine, Mocktail..."
                  value={newLog.drink}
                  onChange={(e) => setNewLog({...newLog, drink: e.target.value})}
                  className="border-mint focus:ring-mint"
                />
              </div>
              <div>
                <Label htmlFor="cost" className="text-burgundy">Cost Range</Label>
                <Select onValueChange={(value) => setNewLog({...newLog, cost: value})}>
                  <SelectTrigger className="border-mint focus:ring-mint">
                    <SelectValue placeholder="Select price range" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="$">$ (Under $10)</SelectItem>
                    <SelectItem value="$$">$$ ($10-20)</SelectItem>
                    <SelectItem value="$$$">$$$ ($20+)</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div>
                <Label htmlFor="mood" className="text-burgundy">Vibe/Mood</Label>
                <Select onValueChange={(value) => setNewLog({...newLog, mood: value})}>
                  <SelectTrigger className="border-mint focus:ring-mint">
                    <SelectValue placeholder="Select vibe" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="chill">Chill & Relaxed 😌</SelectItem>
                    <SelectItem value="social">Social & Lively 🎉</SelectItem>
                    <SelectItem value="romantic">Romantic & Cozy 💕</SelectItem>
                    <SelectItem value="trendy">Trendy & Hip ✨</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
            <div>
              <Label htmlFor="review" className="text-burgundy">Quick Review</Label>
              <Textarea
                id="review"
                placeholder="Great low-ABV options, stayed in green zone all night!"
                value={newLog.review}
                onChange={(e) => setNewLog({...newLog, review: e.target.value})}
                className="border-mint focus:ring-mint"
              />
            </div>
            <Button 
              onClick={handleLogSubmit}
              disabled={!newLog.venue || !newLog.drink}
              className="w-full bg-mint text-white hover:bg-mint/90"
            >
              Submit & Earn 20 SSP 🎯
            </Button>
          </div>
        )}

        {/* Venue List */}
        <div className="space-y-3">
          <h3 className="font-medium text-burgundy">Trending Spots Near You</h3>
          {mockVenues.map((venue, index) => (
            <div key={index} className="border rounded-lg p-4 hover:bg-cream transition-colors">
              <div className="flex justify-between items-start mb-2">
                <div>
                  <h4 className="font-medium text-burgundy">{venue.name}</h4>
                  <p className="text-sm text-gray-600">{venue.type} • {venue.distance}</p>
                </div>
                <div className="flex items-center space-x-1">
                  <Star className="w-4 h-4 text-gold fill-current" />
                  <span className="text-sm font-medium text-burgundy">{venue.rating}</span>
                </div>
              </div>
              
              <div className="flex items-center space-x-2 mb-2">
                <Badge variant="outline" className="border-mint text-mint">{venue.priceRange}</Badge>
                <Badge variant="outline" className="border-gold text-gold">{venue.mood}</Badge>
                <Badge className="bg-mint text-white">{venue.recentLogs} logs</Badge>
              </div>
              
              <p className="text-sm text-gray-600 mb-3">
                <strong>Specialty:</strong> {venue.specialty}
              </p>
              
              <div className="flex space-x-2">
                <Button size="sm" variant="outline" className="flex-1 border-burgundy text-burgundy hover:bg-burgundy/10">
                  <MapPin className="w-3 h-3 mr-1" />
                  Directions
                </Button>
                <Button size="sm" variant="outline" className="flex-1 border-burgundy text-burgundy hover:bg-burgundy/10">
                  <Users className="w-3 h-3 mr-1" />
                  Check-in
                </Button>
              </div>
            </div>
          ))}
        </div>

        {/* Map Placeholder */}
        <div className="h-32 bg-gradient-to-r from-mint/20 to-cream rounded-lg flex items-center justify-center border-2 border-dashed border-mint">
          <div className="text-center">
            <MapPin className="w-8 h-8 mx-auto mb-1 text-mint" />
            <p className="text-sm text-gray-600">Interactive map coming soon!</p>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default MapTheHangout;