import { IconTrendingDown, IconTrendingUp } from "@tabler/icons-react";

import { Badge } from "@/components/ui/badge";
import {
  Card,
  CardAction,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { TDashboardKpi } from "@/dtos/admin/admin.response.dto";

export function SectionCards({
  totalUsers,
  activeUsers,
  growthRatePercent,
  newUsersThisMonth,
}: TDashboardKpi) {
  return (
    <div className='*:data-[slot=card]:from-primary/5 *:data-[slot=card]:to-card dark:*:data-[slot=card]:bg-card grid grid-cols-1 gap-4 *:data-[slot=card]:bg-gradient-to-t *:data-[slot=card]:shadow-xs @xl/main:grid-cols-2 @5xl/main:grid-cols-4'>
      <Card className='@container/card'>
        <CardHeader>
          <CardDescription>Total User</CardDescription>
          <CardTitle className='text-2xl font-semibold tabular-nums @[250px]/card:text-3xl'>
            {totalUsers}
          </CardTitle>
          <CardAction>
            <Badge variant='outline'>
              <IconTrendingUp />
              {growthRatePercent}
            </Badge>
          </CardAction>
        </CardHeader>
        <CardFooter className='flex-col items-start gap-1.5 text-sm'>
          <div className='line-clamp-1 flex gap-2 font-medium'>
            Trending up this month <IconTrendingUp className='size-4' />
          </div>
          <div className='text-muted-foreground'>Active Users</div>
        </CardFooter>
      </Card>
      <Card className='@container/card'>
        <CardHeader>
          <CardDescription>New Users This Month</CardDescription>
          <CardTitle className='text-2xl font-semibold tabular-nums @[250px]/card:text-3xl'>
            {newUsersThisMonth}
          </CardTitle>
        </CardHeader>
      </Card>
      <Card className='@container/card'>
        <CardHeader>
          <CardDescription>Active Accounts</CardDescription>
          <CardTitle className='text-2xl font-semibold tabular-nums @[250px]/card:text-3xl'>
            {activeUsers}
          </CardTitle>
        </CardHeader>
      </Card>
      <Card className='@container/card'>
        <CardHeader>
          <CardDescription>Growth Rate</CardDescription>
          <CardTitle className='text-2xl font-semibold tabular-nums @[250px]/card:text-3xl'>
            {growthRatePercent}
          </CardTitle>
        </CardHeader>
        <CardFooter className='flex-col items-start gap-1.5 text-sm'>
          <div className='line-clamp-1 flex gap-2 font-medium'>
            Steady performance increase <IconTrendingUp className='size-4' />
          </div>
          <div className='text-muted-foreground'>Meets growth projections</div>
        </CardFooter>
      </Card>
    </div>
  );
}
