/**
 * Home Page Data Types & Mock Data
 */

// ============================================
// Types
// ============================================

export interface ScheduleEvent {
  id: string;
  title: string;
  courseCode: string;
  location: string;
  startTime: Date;
  endTime: Date;
  type: 'lecture' | 'lab' | 'seminar' | 'exam' | 'other';
}

export interface Deadline {
  id: string;
  title: string;
  courseCode: string;
  courseName: string;
  dueDate: Date;
  type: 'assignment' | 'quiz' | 'exam' | 'project';
  isCompleted: boolean;
}

export interface Module {
  id: string;
  courseCode: string;
  courseName: string;
  nextClass?: {
    title: string;
    time: Date;
    location: string;
  };
  pendingAssignments: number;
  hasNewGrade: boolean;
  accentColor: string;
}

export interface CampusAlert {
  id: string;
  message: string;
  type: 'info' | 'warning' | 'emergency';
  timestamp: Date;
}

export interface QuickActionCounts {
  unreadAnnouncements: number;
  upcomingEvents: number;
}

export type DeadlineFilter = '7days' | '4weeks' | '3months';

// ============================================
// Urgency Helpers
// ============================================

export type UrgencyLevel = 'critical' | 'soon' | 'normal';

export function getDeadlineUrgency(dueDate: Date): UrgencyLevel {
  const now = new Date();
  const hoursUntilDue = (dueDate.getTime() - now.getTime()) / (1000 * 60 * 60);
  
  if (hoursUntilDue < 24) return 'critical';
  if (hoursUntilDue < 72) return 'soon';
  return 'normal';
}

export function formatTimeUntil(date: Date): string {
  const now = new Date();
  const diffMs = date.getTime() - now.getTime();
  const diffMins = Math.floor(diffMs / (1000 * 60));
  const diffHours = Math.floor(diffMs / (1000 * 60 * 60));
  const diffDays = Math.floor(diffMs / (1000 * 60 * 60 * 24));
  
  if (diffMins < 0) return 'now';
  if (diffMins < 60) return `in ${diffMins} min`;
  if (diffHours < 24) return `in ${diffHours} hr`;
  if (diffDays === 1) return 'tomorrow';
  return `in ${diffDays} days`;
}

export function formatDueDate(date: Date): string {
  const now = new Date();
  const tomorrow = new Date(now);
  tomorrow.setDate(tomorrow.getDate() + 1);
  
  const isToday = date.toDateString() === now.toDateString();
  const isTomorrow = date.toDateString() === tomorrow.toDateString();
  
  const timeStr = date.toLocaleTimeString('en-US', { 
    hour: 'numeric', 
    minute: '2-digit',
    hour12: true 
  });
  
  if (isToday) return `Today, ${timeStr}`;
  if (isTomorrow) return `Tomorrow, ${timeStr}`;
  
  return date.toLocaleDateString('en-US', { 
    month: 'short', 
    day: 'numeric',
    hour: 'numeric',
    minute: '2-digit',
    hour12: true
  });
}

export function isEventOngoing(event: ScheduleEvent): boolean {
  const now = new Date();
  return now >= event.startTime && now <= event.endTime;
}

// ============================================
// Mock Data
// ============================================

const now = new Date();
const today = new Date(now.getFullYear(), now.getMonth(), now.getDate());

// Helper to create dates relative to now
const hoursFromNow = (hours: number) => new Date(now.getTime() + hours * 60 * 60 * 1000);
const daysFromNow = (days: number, hour = 12, minute = 0) => {
  const date = new Date(today);
  date.setDate(date.getDate() + days);
  date.setHours(hour, minute, 0, 0);
  return date;
};

export const mockCurrentUser = {
  firstName: 'Jane',
  lastName: 'Doe',
  studentId: 'STU-2024-001',
  avatarUrl: null,
};

export const mockCampusAlert: CampusAlert | null = null;
// Uncomment to test alert banner:
// export const mockCampusAlert: CampusAlert = {
//   id: 'alert-1',
//   message: 'Campus closure due to weather - all afternoon classes cancelled',
//   type: 'warning',
//   timestamp: new Date(),
// };

export const mockUpNextEvent: ScheduleEvent | null = {
  id: 'event-1',
  title: 'Organic Chemistry',
  courseCode: 'CHEM 101',
  location: 'Lab B',
  startTime: hoursFromNow(0.5),
  endTime: hoursFromNow(2),
  type: 'lab',
};

export const mockDeadlines: Deadline[] = [
  {
    id: 'deadline-1',
    title: 'Essay Draft',
    courseCode: 'ENG 202',
    courseName: 'Creative Writing',
    dueDate: daysFromNow(1, 23, 59),
    type: 'assignment',
    isCompleted: false,
  },
  {
    id: 'deadline-2',
    title: 'Lab Report',
    courseCode: 'CHEM 101',
    courseName: 'Organic Chemistry',
    dueDate: daysFromNow(3, 17, 0),
    type: 'assignment',
    isCompleted: false,
  },
  {
    id: 'deadline-3',
    title: 'Quiz 3',
    courseCode: 'MATH 150',
    courseName: 'Calculus II',
    dueDate: daysFromNow(5, 23, 59),
    type: 'quiz',
    isCompleted: false,
  },
  {
    id: 'deadline-4',
    title: 'Group Project Presentation',
    courseCode: 'CS 201',
    courseName: 'Data Structures',
    dueDate: daysFromNow(10, 14, 0),
    type: 'project',
    isCompleted: false,
  },
  {
    id: 'deadline-5',
    title: 'Midterm Exam',
    courseCode: 'MATH 150',
    courseName: 'Calculus II',
    dueDate: daysFromNow(21, 9, 0),
    type: 'exam',
    isCompleted: false,
  },
  {
    id: 'deadline-6',
    title: 'Research Paper Final',
    courseCode: 'ENG 202',
    courseName: 'Creative Writing',
    dueDate: daysFromNow(45, 23, 59),
    type: 'assignment',
    isCompleted: false,
  },
];

export const mockQuickActionCounts: QuickActionCounts = {
  unreadAnnouncements: 3,
  upcomingEvents: 5,
};

export const mockModules: Module[] = [
  {
    id: 'module-1',
    courseCode: 'CHEM 101',
    courseName: 'Organic Chemistry',
    nextClass: {
      title: 'Lab B',
      time: hoursFromNow(0.5),
      location: 'Science Building',
    },
    pendingAssignments: 2,
    hasNewGrade: false,
    accentColor: '#E89B74',
  },
  {
    id: 'module-2',
    courseCode: 'ENG 202',
    courseName: 'Creative Writing',
    nextClass: {
      title: 'Lecture',
      time: daysFromNow(1, 10, 0),
      location: 'Arts Building',
    },
    pendingAssignments: 1,
    hasNewGrade: true,
    accentColor: '#4CAF50',
  },
  {
    id: 'module-3',
    courseCode: 'MATH 150',
    courseName: 'Calculus II',
    nextClass: {
      title: 'Tutorial',
      time: daysFromNow(2, 14, 0),
      location: 'Math Wing',
    },
    pendingAssignments: 1,
    hasNewGrade: false,
    accentColor: '#42A5F5',
  },
  {
    id: 'module-4',
    courseCode: 'CS 201',
    courseName: 'Data Structures',
    nextClass: {
      title: 'Lab',
      time: daysFromNow(1, 15, 0),
      location: 'Computer Lab 3',
    },
    pendingAssignments: 0,
    hasNewGrade: false,
    accentColor: '#AB47BC',
  },
];

// Filter deadlines by time range
export function filterDeadlines(deadlines: Deadline[], filter: DeadlineFilter): Deadline[] {
  const now = new Date();
  let cutoffDate: Date;
  
  switch (filter) {
    case '7days':
      cutoffDate = new Date(now.getTime() + 7 * 24 * 60 * 60 * 1000);
      break;
    case '4weeks':
      cutoffDate = new Date(now.getTime() + 28 * 24 * 60 * 60 * 1000);
      break;
    case '3months':
      cutoffDate = new Date(now.getTime() + 90 * 24 * 60 * 60 * 1000);
      break;
  }
  
  return deadlines
    .filter(d => !d.isCompleted && d.dueDate <= cutoffDate && d.dueDate >= now)
    .sort((a, b) => a.dueDate.getTime() - b.dueDate.getTime());
}
