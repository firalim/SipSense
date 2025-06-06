import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Heart, Users, DollarSign, MapPin } from "lucide-react";
import MapTheHangout from './MapTheHangout';
import SipStoryAI from './SipStoryAI';

interface DrinkDiscoveryProps {
  drinks?: any[];
  currentBAC?: number;
  waterIntake?: number;
}

const DrinkDiscovery = ({ drinks = [], currentBAC = 0, waterIntake = 0 }: DrinkDiscoveryProps) => {
  const [budgetRange, setBudgetRange] = useState("");
  const [flavorPreference, setFlavorPreference] = useState("");

  const drinkCategories = [
    {
      name: "Popular Beers",
      emoji: "🍺",
      drinks: [
        { name: "Heineken", abv: "5.0%", origin: "Netherlands", price: "$3-5", taste: "Crisp, Light" },
        { name: "Corona Extra", abv: "4.6%", origin: "Mexico", price: "$4-6", taste: "Light, Citrusy" },
        { name: "Guinness", abv: "4.2%", origin: "Ireland", price: "$5-7", taste: "Rich, Creamy" }
      ]
    },
    {
      name: "Classic Wines",
      emoji: "🍷",
      drinks: [
        { name: "Chardonnay", abv: "13.5%", origin: "France", price: "$15-25", taste: "Crisp, Fruity" },
        { name: "Cabernet Sauvignon", abv: "14.5%", origin: "France", price: "$20-35", taste: "Bold, Dry" },
        { name: "Prosecco", abv: "11.0%", origin: "Italy", price: "$12-20", taste: "Light, Bubbly" }
      ]
    },
    {
      name: "Premium Spirits",
      emoji: "🥃",
      drinks: [
        { name: "Grey Goose Vodka", abv: "40.0%", origin: "France", price: "$35-45", taste: "Smooth, Clean" },
        { name: "Macallan 12", abv: "40.0%", origin: "Scotland", price: "$65-85", taste: "Rich, Smoky" },
        { name: "Hendrick's Gin", abv: "41.4%", origin: "Scotland", price: "$30-40", taste: "Floral, Herbal" }
      ]
    }
  ];

  const friends = [
    { name: "Alex", avatar: "A", lastDrink: "🍺 IPA", status: "online" },
    { name: "Sam", avatar: "S", lastDrink: "🍷 Pinot Noir", status: "offline" },
    { name: "Jordan", avatar: "J", lastDrink: "🍸 Martini", status: "online" },
    { name: "Casey", avatar: "C", lastDrink: "🥃 Whiskey", status: "online" }
  ];

  const budgetRecommendations = [
    { name: "Miller High Life", price: "$2-3", taste: "Light, Crisp", type: "Beer", rating: 4.1 },
    { name: "Barefoot Wine", price: "$8-12", taste: "Sweet, Fruity", type: "Wine", rating: 4.0 },
    { name: "Svedka Vodka", price: "$15-20", taste: "Clean, Neutral", type: "Spirit", rating: 3.8 }
  ];

  return (
    <div className="w-full max-w-6xl mx-auto">
      <Tabs defaultValue="explore" className="w-full">
        <TabsList className="grid w-full grid-cols-5">
          <TabsTrigger value="explore">Explore</TabsTrigger>
          <TabsTrigger value="budget">Budget</TabsTrigger>
          <TabsTrigger value="friends">Friends</TabsTrigger>
          <TabsTrigger value="locations">Locations</TabsTrigger>
          <TabsTrigger value="stories">Stories</TabsTrigger>
        </TabsList>

        <TabsContent value="explore" className="space-y-6">
          <div className="text-center mb-8">
            <h2 className="text-3xl font-bold mb-2 text-burgundy">Discover Drinks</h2>
            <p className="text-gray-600">Explore alcohol by type, region, and budget</p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {drinkCategories.map((category, index) => (
              <Card key={index} className="shadow-lg hover:shadow-xl transition-shadow">
                <CardHeader>
                  <div className="flex items-center space-x-2">
                    <span className="text-2xl">{category.emoji}</span>
                    <CardTitle className="text-lg text-burgundy">{category.name}</CardTitle>
                  </div>
                  <CardDescription>Popular choices in this category</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {category.drinks.map((drink, drinkIndex) => (
                      <div key={drinkIndex} className="border rounded-lg p-3 hover:bg-cream transition-colors">
                        <div className="flex justify-between items-start mb-2">
                          <h4 className="font-medium text-burgundy">{drink.name}</h4>
                          <Badge variant="outline" className="text-xs">{drink.abv}</Badge>
                        </div>
                        <div className="grid grid-cols-2 gap-2 text-xs text-gray-600">
                          <span>🌍 {drink.origin}</span>
                          <span>💰 {drink.price}</span>
                          <span className="col-span-2">👅 {drink.taste}</span>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="budget" className="space-y-6">
          <Card className="shadow-lg">
            <CardHeader>
              <div className="flex items-center space-x-2">
                <DollarSign className="w-5 h-5 text-mint" />
                <CardTitle className="text-xl text-burgundy">Budget Boozer</CardTitle>
              </div>
              <CardDescription>Find drinks that match your taste and wallet</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label>Flavor Preference</Label>
                  <Select onValueChange={setFlavorPreference}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select flavor profile" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="sweet">Sweet & Fruity 🍓</SelectItem>
                      <SelectItem value="bitter">Bitter & Hoppy 🌿</SelectItem>
                      <SelectItem value="light">Light & Crisp ✨</SelectItem>
                      <SelectItem value="rich">Rich & Bold 🔥</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label>Budget Range</Label>
                  <Select onValueChange={setBudgetRange}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select budget" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="low">$5-15 💸</SelectItem>
                      <SelectItem value="mid">$15-30 💰</SelectItem>
                      <SelectItem value="high">$30+ 💎</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              {(flavorPreference || budgetRange) && (
                <div className="space-y-4">
                  <h3 className="font-medium">Recommended for you:</h3>
                  <div className="grid gap-3">
                    {budgetRecommendations.map((drink, index) => (
                      <div key={index} className="flex items-center justify-between p-3 border rounded-lg">
                        <div>
                          <h4 className="font-medium text-burgundy">{drink.name}</h4>
                          <p className="text-sm text-gray-600">{drink.taste} • {drink.type}</p>
                        </div>
                        <div className="text-right">
                          <p className="font-medium">{drink.price}</p>
                          <div className="flex items-center space-x-1">
                            <span className="text-gold">⭐</span>
                            <span className="text-sm">{drink.rating}</span>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="friends" className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card className="shadow-lg">
              <CardHeader>
                <div className="flex items-center space-x-2">
                  <Users className="w-5 h-5 text-mint" />
                  <CardTitle className="text-xl text-burgundy">Your Drinking Buddies</CardTitle>
                </div>
                <CardDescription>See what your friends are up to</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                {friends.map((friend, index) => (
                  <div key={index} className="flex items-center justify-between p-3 border rounded-lg">
                    <div className="flex items-center space-x-3">
                      <div className="relative">
                        <Avatar>
                          <AvatarFallback>{friend.avatar}</AvatarFallback>
                        </Avatar>
                        <div className={`absolute -bottom-1 -right-1 w-3 h-3 rounded-full border-2 border-white ${
                          friend.status === 'online' ? 'bg-mint' : 'bg-gray-400'
                        }`} />
                      </div>
                      <div>
                        <p className="font-medium text-burgundy">{friend.name}</p>
                        <p className="text-sm text-gray-600">Last: {friend.lastDrink}</p>
                      </div>
                    </div>
                    <Button size="sm" variant="outline" className="border-burgundy text-burgundy hover:bg-burgundy/10">
                      🥂 Cheers
                    </Button>
                  </div>
                ))}
              </CardContent>
            </Card>

            <Card className="shadow-lg">
              <CardHeader>
                <CardTitle className="text-xl text-burgundy">🏆 Mindful Drinking Leaderboard</CardTitle>
                <CardDescription>This week's most responsible drinkers</CardDescription>
              </CardHeader>
              <CardContent className="space-y-3">
                {[
                  { name: "Alex", streak: 7, badge: "🥇" },
                  { name: "You", streak: 5, badge: "🥈" },
                  { name: "Jordan", streak: 4, badge: "🥉" },
                  { name: "Sam", streak: 3, badge: "🏅" }
                ].map((user, index) => (
                  <div key={index} className={`flex items-center justify-between p-3 rounded-lg ${
                    user.name === "You" ? "bg-mint/10 border border-mint/20" : "bg-cream"
                  }`}>
                    <div className="flex items-center space-x-3">
                      <span className="text-xl">{user.badge}</span>
                      <span className="font-medium text-burgundy">{user.name}</span>
                    </div>
                    <Badge variant="outline">{user.streak} days</Badge>
                  </div>
                ))}
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="locations" className="space-y-6">
          <MapTheHangout />
        </TabsContent>

        <TabsContent value="stories" className="space-y-6">
          <SipStoryAI 
            drinks={drinks}
            currentBAC={currentBAC}
            waterIntake={waterIntake}
          />
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default DrinkDiscovery;