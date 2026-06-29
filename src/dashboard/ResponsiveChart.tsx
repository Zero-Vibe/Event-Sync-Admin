import { useRef, useEffect, useState, type ReactNode } from "react";
import { Box } from "@mui/material";

export const ResponsiveChart = ({
  children,
}: {
  children: (width: number) => ReactNode;
}) => {
  const ref = useRef<HTMLDivElement>(null);
  const [width, setWidth] = useState(400);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const observer = new ResizeObserver((entries) => {
      for (const entry of entries) setWidth(entry.contentRect.width);
    });
    observer.observe(el);
    return () => observer.disconnect();
  }, []);
  return (
    <Box ref={ref} sx={{ width: "100%", height: 250 }}>
      {children(width)}
    </Box>
  );
};
