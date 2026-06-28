import { Chip, keyframes } from "@mui/material";
import { alpha, styled } from "@mui/material/styles";

export type SessionStatus = "PUBLISHED" | "LIVE" | "ENDED";

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
  SessionStatus,
  { label: string; color: "success" | "default" | "error"; variant: "filled" | "outlined" }
> = {
  LIVE: { label: "Live", color: "success", variant: "filled" },
  ENDED: { label: "Ended", color: "default", variant: "outlined" },
  PUBLISHED: { label: "Upcoming", color: "default", variant: "outlined" },
};

export const StatusBadge = ({ status }: { status: SessionStatus }) => {
  const config = statusConfig[status] ?? statusConfig.PUBLISHED;

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

  return (
    <Chip
      variant="outlined"
      size="small"
      label={config.label}
    />
  );
};
