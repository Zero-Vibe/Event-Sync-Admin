import type { ReactNode } from "react";
import { Box, Typography } from "@mui/material";
import { alpha, useTheme } from "@mui/material/styles";

export const SectionBox = ({
  children,
  sx,
}: {
  children: ReactNode;
  sx?: Record<string, unknown>;
}) => {
  const theme = useTheme();
  return (
    <Box
      sx={{
        mx: 2,
        mb: 2,
        borderRadius: 3,
        border: `1px solid ${alpha(theme.palette.divider, 0.7)}`,
        bgcolor: "background.paper",
        p: 2.5,
        transition: "all 0.15s ease-in-out",
        ...sx,
      }}
    >
      {children}
    </Box>
  );
};

export const SectionHeader = ({
  title,
  label,
}: {
  title: string;
  label?: string;
}) => (
  <Box sx={{ mb: 2 }}>
    {label && (
      <Typography
        variant="caption"
        sx={{
          fontWeight: 600,
          fontSize: "0.75rem",
          textTransform: "uppercase",
          letterSpacing: "0.05em",
          color: "text.secondary",
        }}
      >
        {label}
      </Typography>
    )}
    <Typography variant="h6" sx={{ fontWeight: 600 }}>
      {title}
    </Typography>
  </Box>
);
