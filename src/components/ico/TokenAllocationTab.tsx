
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";

const TokenAllocationTab = () => {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Token Allocation</CardTitle>
        <CardDescription>Configure token allocation for different stakeholders.</CardDescription>
      </CardHeader>
      <CardContent>
        <p className="text-muted-foreground">
          Token allocation settings will be available in a future update.
        </p>
      </CardContent>
    </Card>
  );
};

export default TokenAllocationTab;
