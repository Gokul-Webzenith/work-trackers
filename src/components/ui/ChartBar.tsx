import { Bar, BarChart, CartesianGrid, XAxis } from "recharts"
import { TrendingUp } from "lucide-react"
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
  type ChartConfig,
} from "@/components/ui/chart"
import { useQuery } from "@tanstack/react-query"
import { useTodoStore } from "@/Store/Todostore"



const smallChartConfig = {
  value: { label: "Tasks", color: "var(--chart-1)" },
} satisfies ChartConfig

const bigChartConfig = {
  value: { label: "Tasks", color: "var(--chart-2)" },
} satisfies ChartConfig

export function ChartBar() {


  const { data: items = [] } = useQuery({
    queryKey: ["todos"],
    queryFn: () => useTodoStore.getState().items,
    staleTime: Infinity,
  });


  const progressCount = items.filter(i => i.status === "progress").length;
  const doneCount = items.filter(i => i.status === "done").length;

  const statusData = [
    { label: "Progress", value: progressCount },
    { label: "Done", value: doneCount },
  ];


  const monthMap: Record<string, number> = {};

  items.forEach(task => {
    const d = new Date(task.date);
    const key = `${d.getFullYear()}-${d.getMonth()}`;
    monthMap[key] = (monthMap[key] || 0) + 1;
  });

  const monthlyData = Object.entries(monthMap).map(([key, value]) => {
    const [year, month] = key.split("-");
    const date = new Date(Number(year), Number(month));
    return {
      label: date.toLocaleString("default", { month: "short" }),
      value,
    };
  });


  const upcoming = items.filter(i => {
    const end = new Date(i.endDate).getTime();
    const nowT = Date.now();
    const threeDays = nowT + 3 * 24 * 60 * 60 * 1000;
    return end > nowT && end <= threeDays && i.status !== "done";
  }).length;

  const active = items.filter(i => i.status === "progress").length;

  const upcomingActiveData = [
    { label: "Upcoming", value: upcoming },
    { label: "Active", value: active },
  ];


  const weekMap: Record<string, number> = {};

  items.forEach(task => {
    const d = new Date(task.date);

    const month = d.toLocaleString("default", { month: "short" });
    const firstDay = new Date(d.getFullYear(), d.getMonth(), 1);

    const weekNumber = Math.ceil((d.getDate() + firstDay.getDay()) / 7);
    const key = `${month} Week ${weekNumber}`;

    weekMap[key] = (weekMap[key] || 0) + 1;
  });

  const weeklyData = Object.entries(weekMap).map(([label, value]) => ({
    label,
    value,
  }));


  return (
    <div className="w-full space-y-6">

     
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">

        <SmallGraph
          title="Progress vs Done"
          desc="Work completion status"
          data={statusData}
          config={smallChartConfig}
        />

        <SmallGraph
          title="Monthly Tasks"
          desc="Month-wise workload"
          data={monthlyData}
          config={smallChartConfig}
        />

        <SmallGraph
          title="Upcoming & Active"
          desc="Deadlines & active work"
          data={upcomingActiveData}
          config={smallChartConfig}
        />

      </div>

    
      <div className="flex justify-center">
        <Card className="w-full md:w-[70%]">
          <CardHeader>
            <CardTitle>Weekly Planning</CardTitle>
            <CardDescription>
              Week-wise task distribution (Feb Week 1, Week 2, etc)
            </CardDescription>
          </CardHeader>

          <CardContent>
            <ChartContainer config={bigChartConfig}>
              <BarChart data={weeklyData}>
                <CartesianGrid vertical={false} />
                <XAxis
                  dataKey="label"
                  tickLine={false}
                  tickMargin={10}
                  axisLine={false}
                />
                <ChartTooltip
                  cursor={false}
                  content={<ChartTooltipContent />}
                />
                <Bar dataKey="value" fill="var(--color-value)" radius={8} />
              </BarChart>
            </ChartContainer>
          </CardContent>

          <CardFooter className="flex-col items-start gap-2 text-sm">
            <div className="flex gap-2 leading-none font-medium">
              Weekly workload planning <TrendingUp className="h-4 w-4" />
            </div>
            <div className="text-muted-foreground leading-none">
              Distribution of tasks per week for planning & scheduling
            </div>
          </CardFooter>
        </Card>
      </div>

    </div>
  );
}


function SmallGraph({
  title,
  desc,
  data,
  config,
}: {
  title: string;
  desc: string;
  data: any[];
  config: ChartConfig;
}) {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-base">{title}</CardTitle>
        <CardDescription className="text-xs">{desc}</CardDescription>
      </CardHeader>

      <CardContent>
        <ChartContainer config={config}>
          <BarChart data={data}>
            <CartesianGrid vertical={false} />
            <XAxis
              dataKey="label"
              tickLine={false}
              tickMargin={8}
              axisLine={false}
            />
            <ChartTooltip cursor={false} content={<ChartTooltipContent />} />
            <Bar dataKey="value" fill="var(--color-value)" radius={6} />
          </BarChart>
        </ChartContainer>
      </CardContent>
    </Card>
  );
}
