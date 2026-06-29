import { Chip, keyframes } from "@mui/material";
import { styled } from "@mui/material/styles";

type ComputedStatus = "UPCOMING" | "LIVE" | "ENDED";

const pulse = keyframes`
  0%, 100% { opacity: 1; }
  50% { opacity: 0.4; }
`;

const LiveDot = styled("span")(({ theme }) => ({
  display: "inline-flex",
  width: 7,
  height: 7,
  borderRadius: "50%",
  backgroundColor: theme.palette.success.main,
  animation: `${pulse} 1.6s ease-in-out infinite`,
}));

const statusConfig: Record<
  ComputedStatus,
  {
    label: string;
    color: "success" | "default" | "error";
    variant: "filled" | "outlined";
  }
> = {
  LIVE: { label: "Live", color: "success", variant: "filled" },
  ENDED: { label: "Ended", color: "default", variant: "outlined" },
  UPCOMING: { label: "Upcoming", color: "default", variant: "outlined" },
};

function computeStatus(startTime: string, endTime: string): ComputedStatus {
  const now = new Date();
  const start = new Date(startTime);
  const end = new Date(endTime);

  if (now < start) return "UPCOMING";
  if (now >= start && now < end) return "LIVE";
  return "ENDED";
}

export const StatusBadge = ({
  startTime,
  endTime,
}: {
  startTime: string;
  endTime: string;
}) => {
  const status = computeStatus(startTime, endTime);
  const config = statusConfig[status];

  if (status === "LIVE") {
    return (
      <Chip
        color="success"
        variant="filled"
        size="small"
        icon={<LiveDot />}
        label={config.label}
      />
    );
  }

  return <Chip variant="outlined" size="small" label={config.label} />;
};
