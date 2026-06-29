import type { ReactNode } from "react";
import { Card, CardContent, Typography, alpha } from "@mui/material";
import { useTheme } from "@mui/material/styles";

export const ChartCard = ({
  title,
  children,
}: {
  title: string;
  children: ReactNode;
}) => {
  const theme = useTheme();
  return (
    <Card
      sx={{
        borderRadius: 3,
        height: "100%",
        border: `1px solid ${alpha(theme.palette.divider, 0.7)}`,
        boxShadow: "none",
      }}
    >
      <CardContent sx={{ p: 2 }}>
        <Typography variant="subtitle2" sx={{ fontWeight: 600, mb: 1.5 }}>
          {title}
        </Typography>
        {children}
      </CardContent>
    </Card>
  );
};
