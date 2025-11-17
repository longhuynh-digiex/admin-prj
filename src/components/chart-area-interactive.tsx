"use client";

import { TrendingDown, TrendingUp } from "lucide-react";
import { Area, AreaChart, CartesianGrid, XAxis } from "recharts";

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";
import { TUsersByMonth } from "@/dtos/admin/admin.response.dto";
import { useMemo } from "react";
import { getGrowthPercentage } from "@/utils/utils";

const chartConfig = {
  newUsers: {
    label: "New Users",
    color: "var(--chart-1)",
  },
} satisfies ChartConfig;

export function ChartAreaInteractive({
  chartData,
}: {
  chartData: TUsersByMonth;
}) {
  const isGrowth = useMemo(() => {
    if (!chartData) return;
    console.log({ chartData });
    return (
      Number(chartData[chartData.length - 1].month) >
      Number(chartData[chartData.length - 2].month)
    );
  }, [chartData]);
  return (
    <Card>
      <CardHeader>
        <CardTitle>User Growth Chart</CardTitle>
        <CardDescription>
          Showing new users for the last 6 months
        </CardDescription>
      </CardHeader>
      <CardContent>
        <ChartContainer
          className='w-full h-[250px]'
          config={chartConfig}
        >
          <AreaChart
            accessibilityLayer
            data={chartData}
            margin={{
              left: 12,
              right: 12,
            }}
          >
            <CartesianGrid vertical={false} />
            <XAxis
              minTickGap={32}
              dataKey='month'
              tickLine={false}
              axisLine={false}
              tickMargin={8}
            />
            <ChartTooltip
              cursor={false}
              content={<ChartTooltipContent indicator='line' />}
            />
            <Area
              dataKey='newUsers'
              type='natural'
              fill='var(--color-newUsers)'
              fillOpacity={0.4}
              stroke='var(--color-newUsers)'
            />
          </AreaChart>
        </ChartContainer>
      </CardContent>
      <CardFooter>
        <div className='flex w-full items-start gap-2 text-sm'>
          <div className='grid gap-2'>
            <div className='flex items-center gap-2 leading-none font-medium'>
              Trending {isGrowth ? "up" : "down"}{" "}
              {getGrowthPercentage(
                Number(chartData[chartData.length - 1].newUsers),
                Number(chartData[chartData.length - 2].newUsers)
              )}
              {"% "}
              by this month{" "}
              {isGrowth ? (
                <TrendingUp className='h-4 w-4' />
              ) : (
                <TrendingDown className='h-4 w-4' />
              )}
            </div>
            <div className='text-muted-foreground flex items-center gap-2 leading-none'>
              {chartData[chartData.length - 1].month}
            </div>
          </div>
        </div>
      </CardFooter>
    </Card>
  );
}
