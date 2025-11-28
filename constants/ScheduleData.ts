/**
 * Schedule Page Data Types & Mock Data
 */

// ============================================
// Types
// ============================================

export type ActivityType = 'lecture' | 'lab' | 'tutorial' | 'seminar' | 'exam' | 'office-hours' | 'event';
export type ActivityStatus = 'upcoming' | 'in-progress' | 'completed' | 'canceled';

export interface Instructor {
  id: string;
  name: string;
  email: string;
  phone?: string;
}

export interface ScheduleActivity {
  id: string;
  courseCode: string;
  courseName: string;
  activityType: ActivityType;
  title: string;
  startTime: Date;
  endTime: Date;
  location: string;
  building: string;
  room: string;
  instructor?: Instructor;
  notes?: string;
  isVirtual?: boolean;
  meetingLink?: string;
  status: ActivityStatus;
}

export interface DaySchedule {
  date: Date;
  activities: ScheduleActivity[];
}

// ============================================
// Helper Functions
// ============================================

export function getActivityStatus(activity: ScheduleActivity): ActivityStatus {
  if (activity.status === 'canceled') return 'canceled';
  
  const now = new Date();
  if (now > activity.endTime) return 'completed';
  if (now >= activity.startTime && now <= activity.endTime) return 'in-progress';
  return 'upcoming';
}

export function formatTimeRange(start: Date, end: Date): string {
  const formatTime = (date: Date) => {
    return date.toLocaleTimeString('en-US', {
      hour: 'numeric',
      minute: '2-digit',
      hour12: true,
    });
  };
  return `${formatTime(start)} - ${formatTime(end)}`;
}

export function formatDateHeader(date: Date): string {
  return date.toLocaleDateString('en-US', {
    weekday: 'long',
    month: 'long',
    day: 'numeric',
    year: 'numeric',
  });
}

export function formatShortDate(date: Date): string {
  return date.toLocaleDateString('en-US', {
    weekday: 'long',
    month: 'long',
    day: 'numeric',
  });
}

export function getMinutesUntil(date: Date): number {
  const now = new Date();
  return Math.floor((date.getTime() - now.getTime()) / (1000 * 60));
}

export function getMinutesRemaining(endTime: Date): number {
  const now = new Date();
  return Math.max(0, Math.floor((endTime.getTime() - now.getTime()) / (1000 * 60)));
}

export function getProgressPercentage(start: Date, end: Date): number {
  const now = new Date();
  const total = end.getTime() - start.getTime();
  const elapsed = now.getTime() - start.getTime();
  return Math.min(100, Math.max(0, (elapsed / total) * 100));
}

export function formatCountdown(minutes: number): string {
  if (minutes < 1) return 'Starting now';
  if (minutes < 60) return `Starts in ${minutes} min`;
  const hours = Math.floor(minutes / 60);
  const mins = minutes % 60;
  if (mins === 0) return `Starts in ${hours} hr`;
  return `Starts in ${hours} hr ${mins} min`;
}

export function isSameDay(date1: Date, date2: Date): boolean {
  return (
    date1.getFullYear() === date2.getFullYear() &&
    date1.getMonth() === date2.getMonth() &&
    date1.getDate() === date2.getDate()
  );
}

export function addDays(date: Date, days: number): Date {
  const result = new Date(date);
  result.setDate(result.getDate() + days);
  return result;
}

export function getActivityTypeLabel(type: ActivityType): string {
  const labels: Record<ActivityType, string> = {
    'lecture': 'Lecture',
    'lab': 'Lab',
    'tutorial': 'Tutorial',
    'seminar': 'Seminar',
    'exam': 'Exam',
    'office-hours': 'Office Hours',
    'event': 'Event',
  };
  return labels[type];
}

// ============================================
// Mock Data
// ============================================

const today = new Date();
const todayStart = new Date(today.getFullYear(), today.getMonth(), today.getDate());

const createTime = (dayOffset: number, hour: number, minute: number = 0): Date => {
  const date = new Date(todayStart);
  date.setDate(date.getDate() + dayOffset);
  date.setHours(hour, minute, 0, 0);
  return date;
};

const mockInstructors: Record<string, Instructor> = {
  smith: {
    id: 'inst-1',
    name: 'Dr. John Smith',
    email: 'j.smith@university.edu',
    phone: '(555) 123-4567',
  },
  johnson: {
    id: 'inst-2',
    name: 'Prof. Sarah Johnson',
    email: 's.johnson@university.edu',
  },
  williams: {
    id: 'inst-3',
    name: 'Dr. Michael Williams',
    email: 'm.williams@university.edu',
    phone: '(555) 987-6543',
  },
  brown: {
    id: 'inst-4',
    name: 'Dr. Emily Brown',
    email: 'e.brown@university.edu',
  },
};

// Generate activities for today
export const mockTodayActivities: ScheduleActivity[] = [
  {
    id: 'act-1',
    courseCode: 'CHEM 101',
    courseName: 'General Chemistry',
    activityType: 'lecture',
    title: 'Lecture',
    startTime: createTime(0, 9, 0),
    endTime: createTime(0, 10, 30),
    location: 'Science Building, Room 204',
    building: 'Science Building',
    room: 'Room 204',
    instructor: mockInstructors.smith,
    status: 'upcoming',
  },
  {
    id: 'act-2',
    courseCode: 'MATH 150',
    courseName: 'Calculus II',
    activityType: 'lecture',
    title: 'Lecture',
    startTime: createTime(0, 11, 0),
    endTime: createTime(0, 12, 0),
    location: 'Math Building, Room 101',
    building: 'Math Building',
    room: 'Room 101',
    instructor: mockInstructors.johnson,
    status: 'upcoming',
  },
  {
    id: 'act-3',
    courseCode: 'CHEM 101',
    courseName: 'General Chemistry',
    activityType: 'lab',
    title: 'Lab Session',
    startTime: createTime(0, 14, 0),
    endTime: createTime(0, 16, 0),
    location: 'Science Building, Lab B',
    building: 'Science Building',
    room: 'Lab B',
    instructor: mockInstructors.smith,
    notes: 'Bring lab coat and safety goggles',
    status: 'upcoming',
  },
  {
    id: 'act-4',
    courseCode: 'CHEM 101',
    courseName: 'General Chemistry',
    activityType: 'office-hours',
    title: 'Office Hours - Dr. Smith',
    startTime: createTime(0, 16, 30),
    endTime: createTime(0, 17, 30),
    location: 'Science Building, Room 310',
    building: 'Science Building',
    room: 'Room 310',
    instructor: mockInstructors.smith,
    status: 'upcoming',
  },
];

// Tomorrow's activities
export const mockTomorrowActivities: ScheduleActivity[] = [
  {
    id: 'act-5',
    courseCode: 'CS 201',
    courseName: 'Data Structures',
    activityType: 'lecture',
    title: 'Lecture',
    startTime: createTime(1, 10, 0),
    endTime: createTime(1, 11, 30),
    location: 'Computer Science Building, Room 150',
    building: 'Computer Science Building',
    room: 'Room 150',
    instructor: mockInstructors.williams,
    status: 'upcoming',
  },
  {
    id: 'act-6',
    courseCode: 'ENG 202',
    courseName: 'Creative Writing',
    activityType: 'seminar',
    title: 'Workshop',
    startTime: createTime(1, 14, 0),
    endTime: createTime(1, 15, 30),
    location: 'Arts Building, Room 220',
    building: 'Arts Building',
    room: 'Room 220',
    instructor: mockInstructors.brown,
    isVirtual: true,
    meetingLink: 'https://meet.university.edu/eng202',
    status: 'upcoming',
  },
];

// Week view data (simplified for timetable)
export interface TimetableSlot {
  id: string;
  courseCode: string;
  activityType: ActivityType;
  startHour: number;
  duration: number; // in hours
  color: string;
}

export interface WeekTimetable {
  [day: string]: TimetableSlot[];
}

export const mockWeekTimetable: WeekTimetable = {
  'Mon': [
    { id: 'w1', courseCode: 'MATH 150', activityType: 'lecture', startHour: 9, duration: 1, color: '#42A5F5' },
    { id: 'w2', courseCode: 'CS 201', activityType: 'lecture', startHour: 14, duration: 1.5, color: '#AB47BC' },
  ],
  'Tue': [
    { id: 'w3', courseCode: 'ENG 202', activityType: 'seminar', startHour: 10, duration: 1.5, color: '#4CAF50' },
    { id: 'w4', courseCode: 'CHEM 101', activityType: 'lecture', startHour: 14, duration: 1, color: '#E89B74' },
  ],
  'Wed': [
    { id: 'w5', courseCode: 'MATH 150', activityType: 'tutorial', startHour: 9, duration: 1, color: '#42A5F5' },
    { id: 'w6', courseCode: 'CS 201', activityType: 'lab', startHour: 14, duration: 2, color: '#AB47BC' },
  ],
  'Thu': [
    { id: 'w7', courseCode: 'CHEM 101', activityType: 'lecture', startHour: 9, duration: 1.5, color: '#E89B74' },
    { id: 'w8', courseCode: 'MATH 150', activityType: 'lecture', startHour: 11, duration: 1, color: '#42A5F5' },
    { id: 'w9', courseCode: 'CHEM 101', activityType: 'lab', startHour: 14, duration: 2, color: '#E89B74' },
  ],
  'Fri': [
    { id: 'w10', courseCode: 'ENG 202', activityType: 'lecture', startHour: 10, duration: 1.5, color: '#4CAF50' },
    { id: 'w11', courseCode: 'CS 201', activityType: 'tutorial', startHour: 13, duration: 1, color: '#AB47BC' },
  ],
};

// Function to get schedule for a specific date
export function getScheduleForDate(date: Date): ScheduleActivity[] {
  if (isSameDay(date, todayStart)) {
    return mockTodayActivities;
  }
  if (isSameDay(date, addDays(todayStart, 1))) {
    return mockTomorrowActivities;
  }
  // Return empty for other days in mock
  return [];
}
