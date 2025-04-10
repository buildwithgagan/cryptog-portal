
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { ChevronDown, ChevronsUpDown, CreditCard, Landmark, LineChart, Rocket, Zap } from "lucide-react";
import { toast } from "sonner";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Separator } from "@/components/ui/separator";
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import PageTitle from "@/components/shared/PageTitle";
import useICOData from "@/hooks/useICOData";

// Schema for token price form
const tokenPriceSchema = z.object({
  tokenPrice: z
    .string()
    .refine((val) => !isNaN(Number(val)), {
      message: "Price must be a valid number",
    })
    .refine((val) => Number(val) > 0, {
      message: "Price must be greater than 0",
    }),
});

const ICOToken = () => {
  const { stats, trends, updateTokenPrice } = useICOData();
  const navigate = useNavigate();
  
  const form = useForm<z.infer<typeof tokenPriceSchema>>({
    resolver: zodResolver(tokenPriceSchema),
    defaultValues: {
      tokenPrice: stats.currentTokenPrice.replace("$", ""),
    },
  });

  useEffect(() => {
    form.reset({
      tokenPrice: stats.currentTokenPrice.replace("$", ""),
    });
  }, [stats.currentTokenPrice, form]);

  const onSubmit = async (values: z.infer<typeof tokenPriceSchema>) => {
    // Update token price
    try {
      updateTokenPrice(values.tokenPrice);
      toast.success("Token price updated successfully");
    } catch (error) {
      toast.error("Failed to update token price");
      console.error(error);
    }
  };

  return (
    <div className="space-y-6 animate-enter">
      <PageTitle 
        title="Token Management" 
        subtitle="Configure and manage your token settings for the ICO."
      />

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Token Management Section */}
        <div className="lg:col-span-2">
          <Tabs defaultValue="price" className="w-full">
            <TabsList className="grid w-full grid-cols-3">
              <TabsTrigger value="price">Price Settings</TabsTrigger>
              <TabsTrigger value="allocation">Token Allocation</TabsTrigger>
              <TabsTrigger value="schedule">Vesting Schedule</TabsTrigger>
            </TabsList>
            <TabsContent value="price" className="space-y-4 pt-4">
              <Card>
                <CardHeader>
                  <CardTitle>Token Price Settings</CardTitle>
                  <CardDescription>
                    Adjust the token price for the current presale phase.
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <Form {...form}>
                    <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                      <FormField
                        control={form.control}
                        name="tokenPrice"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Token Price (USD)</FormLabel>
                            <FormControl>
                              <div className="relative">
                                <span className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground">$</span>
                                <Input className="pl-7" placeholder="0.00" {...field} />
                              </div>
                            </FormControl>
                            <FormDescription>
                              Current token price: {stats.currentTokenPrice}
                            </FormDescription>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      <Button type="submit">Update Token Price</Button>
                    </form>
                  </Form>
                </CardContent>
              </Card>
            </TabsContent>
            
            <TabsContent value="allocation" className="space-y-4 pt-4">
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
            </TabsContent>
            
            <TabsContent value="schedule" className="space-y-4 pt-4">
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
            </TabsContent>
          </Tabs>
        </div>

        {/* Token Status Panel */}
        <div className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Token Status</CardTitle>
              <CardDescription>Current token metrics and status</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex justify-between items-center">
                <span className="text-muted-foreground">Current Price</span>
                <span className="font-medium">{stats.currentTokenPrice}</span>
              </div>
              <Separator />
              <div className="flex justify-between items-center">
                <span className="text-muted-foreground">Tokens Sold</span>
                <span className="font-medium">{stats.totalTokensSold}</span>
              </div>
              <Separator />
              <div className="flex justify-between items-center">
                <span className="text-muted-foreground">Total Raised</span>
                <span className="font-medium">{stats.totalRaised}</span>
              </div>
              <Separator />
              <div className="flex justify-between items-center">
                <span className="text-muted-foreground">PreSale Progress</span>
                <span className="font-medium">{stats.preSaleProgress}%</span>
              </div>
              <Separator />
              <div className="flex justify-between items-center">
                <span className="text-muted-foreground">Days Remaining</span>
                <span className="font-medium">{stats.daysRemaining} days</span>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default ICOToken;
