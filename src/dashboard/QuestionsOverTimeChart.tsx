import { LineChart } from "@mui/x-charts/LineChart";
import { useTheme } from "@mui/material/styles";
import { ResponsiveChart } from "./ResponsiveChart";
import { ChartCard } from "./ChartCard";

interface QuestionsOverTimeItem {
  date: string;
  count: number;
}

export const QuestionsOverTimeChart = ({
  data,
}: {
  data: QuestionsOverTimeItem[];
}) => {
  const theme = useTheme();

  if (data.length === 0) return null;

  return (
    <ChartCard title="Questions Over Time">
      <ResponsiveChart>
        {(width) => (
          <LineChart
            width={width}
            height={240}
            xAxis={[
              {
                scaleType: "point",
                data: data.map((q) => {
                  const parts = q.date.split("-");
                  return `${parts[2]}/${parts[1]}`;
                }),
                tickLabelStyle: { fontSize: 11 },
              },
            ]}
            series={[
              {
                data: data.map((q) => q.count),
                color: theme.palette.primary.main,
                showMark: true,
                area: true,
              },
            ]}
            margin={{ left: 40, right: 20, top: 10, bottom: 50 }}
          />
        )}
      </ResponsiveChart>
    </ChartCard>
  );
};
