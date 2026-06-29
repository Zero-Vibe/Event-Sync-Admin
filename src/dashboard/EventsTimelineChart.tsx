import { Typography } from "@mui/material";
import { BarChart } from "@mui/x-charts/BarChart";
import { useTheme } from "@mui/material/styles";
import { ResponsiveChart } from "./ResponsiveChart";
import { ChartCard } from "./ChartCard";

interface EventsTimelineItem {
  month: string;
  count: number;
}

const MONTHS = [
  "Jan",
  "Feb",
  "Mar",
  "Apr",
  "May",
  "Jun",
  "Jul",
  "Aug",
  "Sep",
  "Oct",
  "Nov",
  "Dec",
];

export const EventsTimelineChart = ({
  data,
}: {
  data: EventsTimelineItem[];
}) => {
  const theme = useTheme();
  const labels = data.map((e) => {
    const [y, m] = e.month.split("-");
    return `${MONTHS[parseInt(m) - 1]} ${y}`;
  });

  return (
    <ChartCard title="Events by Month">
      {data.length > 0 ? (
        <ResponsiveChart>
          {(width) => (
            <BarChart
              width={width}
              height={240}
              xAxis={[{ scaleType: "band", data: labels }]}
              series={[
                {
                  data: data.map((e) => e.count),
                  color: theme.palette.primary.main,
                },
              ]}
            />
          )}
        </ResponsiveChart>
      ) : (
        <Typography color="text.secondary" sx={{ py: 4, textAlign: "center" }}>
          No event data
        </Typography>
      )}
    </ChartCard>
  );
};
