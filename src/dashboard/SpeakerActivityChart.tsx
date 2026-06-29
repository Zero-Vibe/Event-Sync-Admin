import { Typography } from "@mui/material";
import { BarChart } from "@mui/x-charts/BarChart";
import { useTheme } from "@mui/material/styles";
import { ResponsiveChart } from "./ResponsiveChart";
import { ChartCard } from "./ChartCard";

interface SpeakerActivityItem {
  name: string;
  count: number;
}

function truncate(text: string, max: number) {
  return text.length > max ? text.slice(0, max) + "\u2026" : text;
}

export const SpeakerActivityChart = ({
  data,
}: {
  data: SpeakerActivityItem[];
}) => {
  const theme = useTheme();
  const top = data.slice(0, 10);

  return (
    <ChartCard title="Speaker Activity">
      {top.length > 0 ? (
        <ResponsiveChart>
          {(width) => (
            <BarChart
              width={width}
              height={250}
              layout="horizontal"
              yAxis={[
                {
                  scaleType: "band",
                  data: top.map((s) => truncate(s.name, 22)),
                },
              ]}
              xAxis={[{ label: "Sessions" }]}
              series={[
                {
                  data: top.map((s) => s.count),
                  color: theme.palette.success.main,
                },
              ]}
              margin={{ left: 100, right: 100, top: 10, bottom: 50 }}
            />
          )}
        </ResponsiveChart>
      ) : (
        <Typography color="text.secondary" sx={{ py: 4, textAlign: "center" }}>
          No speaker activity data
        </Typography>
      )}
    </ChartCard>
  );
};
