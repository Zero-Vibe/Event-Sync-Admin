import { Typography } from "@mui/material";
import { BarChart } from "@mui/x-charts/BarChart";
import { useTheme } from "@mui/material/styles";
import { ResponsiveChart } from "./ResponsiveChart";
import { ChartCard } from "./ChartCard";

interface TopSessionItem {
  id: string;
  title: string;
  count: number;
}

function truncate(text: string, max: number) {
  return text.length > max ? text.slice(0, max) + "\u2026" : text;
}

export const TopSessionsChart = ({ data }: { data: TopSessionItem[] }) => {
  const theme = useTheme();

  return (
    <ChartCard title="Top Sessions by Questions">
      {data.length > 0 ? (
        <ResponsiveChart>
          {(width) => (
            <BarChart
              width={width}
              height={250}
              layout="horizontal"
              yAxis={[
                {
                  scaleType: "band",
                  data: data.map((s) => truncate(s.title, 25)),
                },
              ]}
              xAxis={[{ label: "Questions" }]}
              series={[
                {
                  data: data.map((s) => s.count),
                  color: theme.palette.warning.main,
                },
              ]}
              margin={{ left: 100, right: 100, top: 10, bottom: 50 }}
            />
          )}
        </ResponsiveChart>
      ) : (
        <Typography color="text.secondary" sx={{ py: 4, textAlign: "center" }}>
          No question data
        </Typography>
      )}
    </ChartCard>
  );
};
