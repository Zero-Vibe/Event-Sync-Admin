import type { ReactElement } from "react";
import { Card, CardContent, Typography, Box, alpha } from "@mui/material";
import { useTheme } from "@mui/material/styles";

export const SummaryCard = ({
  icon,
  label,
  value,
  color,
}: {
  icon: ReactElement;
  label: string;
  value: number | string;
  color?: string;
}) => {
  const theme = useTheme();
  const bg = color || theme.palette.primary.main;
  return (
    <Card
      sx={{
        borderRadius: 3,
        height: "100%",
        transition: "all 0.15s ease-in-out",
        "&:hover": {
          boxShadow: theme.shadows[4],
          transform: "translateY(-2px)",
        },
      }}
    >
      <CardContent
        sx={{
          display: "flex",
          alignItems: "center",
          gap: 1.5,
          p: 1.5,
          height: "100%",
          "&:last-child": { pb: 1.5 },
        }}
      >
        <Box
          sx={{
            width: 36,
            height: 36,
            borderRadius: 1.5,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            bgcolor: alpha(bg, 0.12),
            color: bg,
            "& .MuiSvgIcon-root": { fontSize: 18 },
          }}
        >
          {icon}
        </Box>
        <Box sx={{ minWidth: 0 }}>
          <Typography
            sx={{ fontWeight: 700, lineHeight: 1.2, fontSize: "1.25rem" }}
          >
            {value}
          </Typography>
          <Typography
            variant="body2"
            color="text.secondary"
            sx={{
              whiteSpace: "nowrap",
              overflow: "hidden",
              textOverflow: "ellipsis",
            }}
          >
            {label}
          </Typography>
        </Box>
      </CardContent>
    </Card>
  );
};
