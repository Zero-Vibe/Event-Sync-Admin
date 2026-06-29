import { useState, useEffect } from "react";
import { Event, Question, Room, Session, Speaker } from "../types";

const API_URL = import.meta.env.VITE_JSON_SERVER_URL;

function authHeaders() {
  return new Headers({
    "Content-Type": "application/json",
    Authorization: "Bearer " + (localStorage.getItem("accessToken") || ""),
  });
}

async function fetchCount(url: string): Promise<number> {
  const res = await fetch(url, { headers: authHeaders() });
  return parseInt(res.headers.get("X-Total-Count") || "0", 10);
}

async function fetchJson<T>(url: string): Promise<T[]> {
  const res = await fetch(url, { headers: authHeaders() });
  return res.json();
}

interface QuestionResult {
  sessionId: string;
  title: string;
  count: number;
  upvotes: number;
  createdAt: string | null;
}

export interface DashboardData {
  totalEvents: number;
  totalSessions: number;
  totalSpeakers: number;
  totalQuestions: number;
  totalRooms: number;
  totalUsers: number;
  liveSessions: number;
  upcomingEvents: number;
  totalUpvotes: number;
  eventsByMonth: { month: string; count: number }[];
  sessionsByStatus: { id: string; value: number; label: string }[];
  speakerPlatforms: { id: string; value: number; label: string }[];
  roomsWithCount: { room: string; count: number }[];
  speakersWithCount: { name: string; count: number }[];
  topSessions: { id: string; title: string; count: number }[];
  questionsByDate: { date: string; count: number }[];
}

export function useDashboardData() {
  const [data, setData] = useState<DashboardData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let cancelled = false;

    async function load() {
      try {
        setLoading(true);
        setError(null);

        const [events, rooms, speakers] = await Promise.all([
          fetchJson<Event>(`${API_URL}/events?_end=10000`),
          fetchJson<Room>(`${API_URL}/rooms?_end=10000`),
          fetchJson<Speaker>(`${API_URL}/speakers?_end=10000`),
        ]);

        const [usersCount, eventsCountRes, roomsCountRes, speakersCountRes] =
          await Promise.all([
            fetchCount(`${API_URL}/users?_end=1`),
            fetch(`${API_URL}/events?_end=1`, { headers: authHeaders() }),
            fetch(`${API_URL}/rooms?_end=1`, { headers: authHeaders() }),
            fetch(`${API_URL}/speakers?_end=1`, { headers: authHeaders() }),
          ]);

        const totalEvents = parseInt(
          eventsCountRes.headers.get("X-Total-Count") || "0",
          10,
        );
        const totalRooms = parseInt(
          roomsCountRes.headers.get("X-Total-Count") || "0",
          10,
        );
        const totalSpeakers = parseInt(
          speakersCountRes.headers.get("X-Total-Count") || "0",
          10,
        );

        const now = new Date();

        const upcomingEvents = events.filter(
          (e) => new Date(e.startDateTime || "") > now,
        ).length;

        const eventsByMonthMap = new Map<string, number>();
        for (const e of events) {
          const d = new Date(e.startDateTime || "");
          const key = `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, "0")}`;
          eventsByMonthMap.set(key, (eventsByMonthMap.get(key) || 0) + 1);
        }
        const eventsByMonth = [...eventsByMonthMap.entries()]
          .map(([month, count]) => ({ month, count }))
          .sort((a, b) => a.month.localeCompare(b.month));

        const sessionResults = await Promise.allSettled(
          events.map((e) =>
            fetchJson<Session>(`${API_URL}/events/${e.id}/sessions?_end=10000`),
          ),
        );

        const allSessions: Session[] = [];
        for (const r of sessionResults) {
          if (r.status === "fulfilled") allSessions.push(...r.value);
        }

        const totalSessions = allSessions.length;

        let liveSessions = 0;
        const statusCounts: Record<string, number> = {
          UPCOMING: 0,
          LIVE: 0,
          ENDED: 0,
        };
        for (const s of allSessions) {
          const start = new Date(s.startTime);
          const end = new Date(s.endTime);
          if (start > now) {
            statusCounts.UPCOMING++;
          } else if (end < now) {
            statusCounts.ENDED++;
          } else {
            statusCounts.LIVE++;
            liveSessions++;
          }
        }
        const sessionsByStatus = Object.entries(statusCounts)
          .map(([label, value]) => ({ id: label, value, label }))
          .filter((s) => s.value > 0);

        const roomsMap = new Map<string, string>();
        for (const r of rooms) roomsMap.set(r.id, r.name);

        const roomCounts = new Map<string, number>();
        for (const s of allSessions) {
          const id = s.roomId;
          if (id) roomCounts.set(id, (roomCounts.get(id) || 0) + 1);
        }
        const roomsWithCount = [...roomCounts.entries()]
          .map(([id, count]) => ({ room: roomsMap.get(id) || id, count }))
          .sort((a, b) => b.count - a.count);

        const speakerCounts = new Map<string, number>();
        for (const s of allSessions) {
          const sps = s.speakers || [];
          for (const sp of sps) {
            const name =
              `${sp.firstName || ""} ${sp.lastName || ""}`.trim() || sp.id;
            speakerCounts.set(name, (speakerCounts.get(name) || 0) + 1);
          }
        }
        const speakersWithCount = [...speakerCounts.entries()]
          .map(([name, count]) => ({ name, count }))
          .sort((a, b) => b.count - a.count);

        const platformCounts = new Map<string, number>();
        for (const sp of speakers) {
          const links = sp.links || [];
          for (const link of links) {
            const plat = link.platform || "OTHER";
            platformCounts.set(plat, (platformCounts.get(plat) || 0) + 1);
          }
        }
        const speakerPlatforms = [...platformCounts.entries()]
          .map(([label, value]) => ({ id: label, value, label }))
          .sort((a, b) => b.value - a.value);

        const questionResults = await Promise.allSettled(
          allSessions.map(async (s) => {
            const eventId = s.eventId;
            if (!eventId)
              return {
                sessionId: s.id,
                title: s.title,
                count: 0,
                upvotes: 0,
                createdAt: null,
              };
            const res = await fetch(
              `${API_URL}/events/${eventId}/sessions/${s.id}/questions?_end=10000`,
              { headers: authHeaders() },
            );
            const questions: Question[] = await res.json();
            const total = parseInt(
              res.headers.get("X-Total-Count") || String(questions.length),
              10,
            );
            const upvotes = questions.reduce(
              (sum, q) => sum + (q.upvotes || 0),
              0,
            );
            return {
              sessionId: s.id,
              title: s.title,
              count: total,
              upvotes,
              createdAt:
                questions.length > 0
                  ? questions[questions.length - 1].createdAt
                  : null,
            };
          }),
        );

        const questionData: QuestionResult[] = [];
        for (const r of questionResults) {
          if (r.status === "fulfilled") questionData.push(r.value);
        }

        const totalQuestions = questionData.reduce(
          (sum, q) => sum + q.count,
          0,
        );
        const totalUpvotes = questionData.reduce(
          (sum, q) => sum + q.upvotes,
          0,
        );

        const topSessions = questionData
          .filter((q) => q.count > 0)
          .sort((a, b) => b.count - a.count)
          .slice(0, 10)
          .map((q) => ({
            id: q.sessionId,
            title: q.title || "Untitled",
            count: q.count,
          }));

        let questionsByDate: { date: string; count: number }[] = [];
        const validDates = questionData.filter((q) => q.createdAt);
        if (validDates.length > 0) {
          const questionsByDateMap = new Map<string, number>();
          for (const q of validDates) {
            if (q.createdAt) {
              const d = new Date(q.createdAt);
              const key = `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, "0")}-${String(d.getDate()).padStart(2, "0")}`;
              questionsByDateMap.set(
                key,
                (questionsByDateMap.get(key) || 0) + 1,
              );
            }
          }
          questionsByDate = [...questionsByDateMap.entries()]
            .map(([date, count]) => ({ date, count }))
            .sort((a, b) => a.date.localeCompare(b.date));
        }

        if (!cancelled) {
          setData({
            totalEvents,
            totalSessions,
            totalSpeakers,
            totalQuestions,
            totalRooms,
            totalUsers: usersCount,
            liveSessions,
            upcomingEvents,
            totalUpvotes,
            eventsByMonth,
            sessionsByStatus,
            speakerPlatforms,
            roomsWithCount,
            speakersWithCount,
            topSessions,
            questionsByDate,
          });
        }
      } catch (err: unknown) {
        if (!cancelled)
          setError(
            err instanceof Error
              ? err.message
              : "Failed to load dashboard data",
          );
      } finally {
        if (!cancelled) setLoading(false);
      }
    }

    load();
    return () => {
      cancelled = true;
    };
  }, []);

  return { data, loading, error };
}
