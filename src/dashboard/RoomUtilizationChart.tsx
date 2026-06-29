import { Typography } from "@mui/material";
import { BarChart } from "@mui/x-charts/BarChart";
import { useTheme } from "@mui/material/styles";
import { ResponsiveChart } from "./ResponsiveChart";
import { ChartCard } from "./ChartCard";

interface RoomUtilizationItem {
  room: string;
  count: number;
}

export const RoomUtilizationChart = ({
  data,
}: {
  data: RoomUtilizationItem[];
}) => {
  const theme = useTheme();

  return (
    <ChartCard title="Room Utilization">
      {data.length > 0 ? (
        <ResponsiveChart>
          {(width) => (
            <BarChart
              width={width}
              height={240}
              xAxis={[
                {
                  scaleType: "band",
                  data: data.map((r) => r.room),
                  tickLabelStyle: {
                    angle: -35,
                    textAnchor: "end",
                    fontSize: 11,
                  },
                },
              ]}
              series={[
                {
                  data: data.map((r) => r.count),
                  color: theme.palette.secondary.main,
                },
              ]}
            />
          )}
        </ResponsiveChart>
      ) : (
        <Typography color="text.secondary" sx={{ py: 4, textAlign: "center" }}>
          No room data
        </Typography>
      )}
    </ChartCard>
  );
};
