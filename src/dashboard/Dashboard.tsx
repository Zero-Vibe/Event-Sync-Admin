import { Typography, Box, Grid, CircularProgress } from "@mui/material";
import { useTheme } from "@mui/material/styles";
import EventIcon from "@mui/icons-material/Event";
import PlayCircleIcon from "@mui/icons-material/PlayCircle";
import PeopleIcon from "@mui/icons-material/People";
import QuestionAnswerIcon from "@mui/icons-material/QuestionAnswer";
import MeetingRoomIcon from "@mui/icons-material/MeetingRoom";
import PersonIcon from "@mui/icons-material/Person";
import FiberManualRecordIcon from "@mui/icons-material/FiberManualRecord";
import ScheduleIcon from "@mui/icons-material/Schedule";
import ThumbUpIcon from "@mui/icons-material/ThumbUp";
import { SummaryCard } from "./SummaryCard";
import { useDashboardData } from "./useDashboardData";
import { SessionStatusChart } from "./SessionStatusChart";
import { EventsTimelineChart } from "./EventsTimelineChart";
import { SpeakerPlatformsChart } from "./SpeakerPlatformsChart";
import { RoomUtilizationChart } from "./RoomUtilizationChart";
import { TopSessionsChart } from "./TopSessionsChart";
import { SpeakerActivityChart } from "./SpeakerActivityChart";
import { QuestionsOverTimeChart } from "./QuestionsOverTimeChart";

export const Dashboard = () => {
  const theme = useTheme();
  const { data, loading, error } = useDashboardData();

  if (loading)
    return (
      <Box sx={{ display: "flex", justifyContent: "center", py: 8 }}>
        <CircularProgress />
      </Box>
    );

  if (error)
    return (
      <Box sx={{ py: 4, px: 3 }}>
        <Typography color="error">Error: {error}</Typography>
      </Box>
    );

  if (!data) return null;

  const primary = theme.palette.primary.main;
  const secondary = theme.palette.secondary.main;
  const success = theme.palette.success.main;
  const warning = theme.palette.warning.main;
  const errorColor = theme.palette.error.main;

  return (
    <Box sx={{ p: { xs: 2, md: 3 } }}>
      <Typography
        variant="h4"
        sx={{ fontWeight: 700, mb: 2.5, letterSpacing: "-0.025em" }}
      >
        Dashboard
      </Typography>

      <Grid container spacing={1.5} sx={{ mb: 2 }}>
        <Grid size={{ xs: 6, sm: 4, md: 3, lg: 2 }}>
          <SummaryCard
            icon={<EventIcon />}
            label="Total Events"
            value={data.totalEvents}
            color={primary}
          />
        </Grid>
        <Grid size={{ xs: 6, sm: 4, md: 3, lg: 2 }}>
          <SummaryCard
            icon={<PlayCircleIcon />}
            label="Total Sessions"
            value={data.totalSessions}
            color={secondary}
          />
        </Grid>
        <Grid size={{ xs: 6, sm: 4, md: 3, lg: 2 }}>
          <SummaryCard
            icon={<PeopleIcon />}
            label="Total Speakers"
            value={data.totalSpeakers}
            color={success}
          />
        </Grid>
        <Grid size={{ xs: 6, sm: 4, md: 3, lg: 2 }}>
          <SummaryCard
            icon={<QuestionAnswerIcon />}
            label="Total Questions"
            value={data.totalQuestions}
            color={warning}
          />
        </Grid>
        <Grid size={{ xs: 6, sm: 4, md: 3, lg: 2 }}>
          <SummaryCard
            icon={<MeetingRoomIcon />}
            label="Total Rooms"
            value={data.totalRooms}
            color="#9c27b0"
          />
        </Grid>
        <Grid size={{ xs: 6, sm: 4, md: 3, lg: 2 }}>
          <SummaryCard
            icon={<PersonIcon />}
            label="Total Users"
            value={data.totalUsers}
            color="#607d8b"
          />
        </Grid>
        <Grid size={{ xs: 6, sm: 4, md: 3, lg: 2 }}>
          <SummaryCard
            icon={
              <FiberManualRecordIcon sx={{ animation: "pulse 2s infinite" }} />
            }
            label="Live Sessions"
            value={data.liveSessions}
            color={errorColor}
          />
        </Grid>
        <Grid size={{ xs: 6, sm: 4, md: 3, lg: 2 }}>
          <SummaryCard
            icon={<ScheduleIcon />}
            label="Upcoming Events"
            value={data.upcomingEvents}
            color="#00bcd4"
          />
        </Grid>
        <Grid size={{ xs: 6, sm: 4, md: 3, lg: 2 }}>
          <SummaryCard
            icon={<ThumbUpIcon />}
            label="Total Upvotes"
            value={data.totalUpvotes}
            color="#ff9800"
          />
        </Grid>
      </Grid>

      <Grid container spacing={1.5} sx={{ mb: 1.5 }}>
        <Grid size={{ xs: 12, md: 6 }}>
          <SessionStatusChart data={data.sessionsByStatus} />
        </Grid>
        <Grid size={{ xs: 12, md: 6 }}>
          <EventsTimelineChart data={data.eventsByMonth} />
        </Grid>
      </Grid>

      <Grid container spacing={1.5} sx={{ mb: 1.5 }}>
        <Grid size={{ xs: 12, md: 6 }}>
          <SpeakerPlatformsChart data={data.speakerPlatforms} />
        </Grid>
        <Grid size={{ xs: 12, md: 6 }}>
          <RoomUtilizationChart data={data.roomsWithCount} />
        </Grid>
      </Grid>

      <Grid container spacing={1.5} sx={{ mb: 1.5 }}>
        <Grid size={{ xs: 12, md: 6 }}>
          <TopSessionsChart data={data.topSessions} />
        </Grid>
        <Grid size={{ xs: 12, md: 6 }}>
          <SpeakerActivityChart data={data.speakersWithCount} />
        </Grid>
      </Grid>

      {data.questionsByDate.length > 0 && (
        <Grid container spacing={1.5}>
          <Grid size={{ xs: 12, md: 6 }}>
            <QuestionsOverTimeChart data={data.questionsByDate} />
          </Grid>
        </Grid>
      )}

      <style>{`
        @keyframes pulse {
          0%, 100% { opacity: 1; }
          50% { opacity: 0.4; }
        }
      `}</style>
    </Box>
  );
};
