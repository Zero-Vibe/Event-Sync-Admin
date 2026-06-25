export interface Event {
  id: string;
  title: string;
  description: string;
  startDateTime: Date;
  endDateTime: Date;
  location: string;
  createdBy: User;
}

export interface User {
  id: string;
  admin: boolean;
  email: string;
  name: string;
  joinDate: Date;
}

export interface Session {
  id: string;
  eventId: string;
  roomId: string;
  title: string;
  description: string;
  startTime: Date;
  endTime: Date;
  capacity: number;
  status: SessionStatus;
  speakers: Speaker[];
}

export interface SpeakerLink {
  id: string;
  platform: LinkPlatform;
  url: string;
  label: string;
}

export interface Speaker {
  id: string;
  firstName: string;
  lastName: string;
  base64Picture: string;
  biography: string;
  links: SpeakerLink[];
}

export interface Room {
  id: string;
  name: string;
  sessions: Session[];
}

export interface Question {
  id: string;
  sessionId: string;
  content: string;
  user: User | null;
  upvotes: number;
  createdAt: Date;
}

type SessionStatus = "PUBLISHED" | "LIVE" | "ENDED";
type LinkPlatform =
  | "TWITTER"
  | "LINKEDIN"
  | "GITHUB"
  | "YOUTUBE"
  | "WEBSITE"
  | "OTHER";
