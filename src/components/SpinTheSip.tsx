import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

const SpinTheSip = () => {
  return (
    <Card className="shadow-lg">
      <CardHeader>
        <CardTitle className="text-lg text-burgundy">Spin The Sip</CardTitle>
      </CardHeader>
      <CardContent>
        <p className="text-gray-600">Spin to discover a new drink suggestion!</p>
        <Button className="bg-mint text-white mt-4">Spin Now</Button>
      </CardContent>
    </Card>
  );
};

export default SpinTheSip;