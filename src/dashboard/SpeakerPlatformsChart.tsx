import { Typography } from "@mui/material";
import { PieChart } from "@mui/x-charts/PieChart";
import { ResponsiveChart } from "./ResponsiveChart";
import { ChartCard } from "./ChartCard";

interface SpeakerPlatformItem {
  id: string;
  value: number;
  label: string;
}

export const SpeakerPlatformsChart = ({
  data,
}: {
  data: SpeakerPlatformItem[];
}) => (
  <ChartCard title="Speaker Platforms">
    {data.length > 0 ? (
      <ResponsiveChart>
        {(width) => (
          <PieChart
            width={width}
            height={240}
            series={[
              {
                data,
                innerRadius: 50,
                outerRadius: 100,
                paddingAngle: 2,
                cornerRadius: 4,
                arcLabel: (item) => `${item.value}`,
                arcLabelMinAngle: 20,
              },
            ]}
            slotProps={{
              legend: {
                direction: "row",
                position: { vertical: "bottom", horizontal: "middle" },
              },
            }}
          />
        )}
      </ResponsiveChart>
    ) : (
      <Typography color="text.secondary" sx={{ py: 4, textAlign: "center" }}>
        No platform data
      </Typography>
    )}
  </ChartCard>
);
