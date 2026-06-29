import { Typography } from "@mui/material";
import { PieChart } from "@mui/x-charts/PieChart";
import { ResponsiveChart } from "./ResponsiveChart";
import { ChartCard } from "./ChartCard";

interface SessionStatusItem {
  id: string;
  value: number;
  label: string;
}

export const SessionStatusChart = ({ data }: { data: SessionStatusItem[] }) => (
  <ChartCard title="Session Status">
    {data.length > 0 ? (
      <ResponsiveChart>
        {(width) => (
          <PieChart
            width={width}
            height={240}
            series={[
              {
                data,
                innerRadius: 60,
                outerRadius: 100,
                paddingAngle: 3,
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
        No session data
      </Typography>
    )}
  </ChartCard>
);
