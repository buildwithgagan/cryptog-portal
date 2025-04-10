
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";

const TokenVestingTab = () => {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Vesting Schedule</CardTitle>
        <CardDescription>Configure vesting parameters for token release.</CardDescription>
      </CardHeader>
      <CardContent>
        <p className="text-muted-foreground">
          Vesting schedule configuration will be available in a future update.
        </p>
      </CardContent>
    </Card>
  );
};

export default TokenVestingTab;
