
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { useEffect } from "react";
import { toast } from "sonner";

import { Button } from "@/components/ui/button";
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";

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

interface TokenPriceFormProps {
  currentTokenPrice: string;
  updateTokenPrice: (price: string) => void;
}

const TokenPriceForm = ({ currentTokenPrice, updateTokenPrice }: TokenPriceFormProps) => {
  const form = useForm<z.infer<typeof tokenPriceSchema>>({
    resolver: zodResolver(tokenPriceSchema),
    defaultValues: {
      tokenPrice: currentTokenPrice.replace("$", ""),
    },
  });

  useEffect(() => {
    form.reset({
      tokenPrice: currentTokenPrice.replace("$", ""),
    });
  }, [currentTokenPrice, form]);

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
                    Current token price: {currentTokenPrice}
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
  );
};

export default TokenPriceForm;
