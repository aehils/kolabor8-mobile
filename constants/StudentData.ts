/**
 * Student Page Data Types & Mock Data
 */

// ============================================
// Types
// ============================================

export interface StudentProfile {
  id: string;
  firstName: string;
  lastName: string;
  studentId: string;
  email: string;
  photoUrl: string | null;
  degree: {
    title: string;
    type: string; // BSc, BA, MSc, etc.
    field: string;
  };
  year: number;
  yearLabel: string; // "Year 2", "Junior", etc.
  gpa: number;
  qrCodeData: string; // Data encoded in QR code
}

export interface MenuSection {
  title: string;
  items: MenuItem[];
}

export interface MenuItem {
  id: string;
  label: string;
  icon: string;
  route: string;
  badge?: string | number;
  badgeColor?: string;
}

// ============================================
// Mock Data
// ============================================

export const mockStudentProfile: StudentProfile = {
  id: 'student-001',
  firstName: 'Jane',
  lastName: 'Doe',
  studentId: '2023-CS-12345',
  email: 'jane.doe@university.edu',
  photoUrl: null, // Will use placeholder
  degree: {
    title: 'BSc Computer Science',
    type: 'BSc',
    field: 'Computer Science',
  },
  year: 2,
  yearLabel: 'Year 2',
  gpa: 3.65,
  qrCodeData: 'STUDENT:2023-CS-12345:JANE:DOE:VALID',
};

export const studentMenuSections: MenuSection[] = [
  {
    title: 'Academic',
    items: [
      {
        id: 'my-degree',
        label: 'My Degree',
        icon: 'school-outline',
        route: '/student/degree',
      },
      {
        id: 'my-modules',
        label: 'My Modules',
        icon: 'book-outline',
        route: '/student/modules',
      },
      {
        id: 'transcript',
        label: 'Transcript',
        icon: 'document-text-outline',
        route: '/student/transcript',
      },
      {
        id: 'academic-calendar',
        label: 'Academic Calendar',
        icon: 'calendar-outline',
        route: '/student/calendar',
      },
    ],
  },
  {
    title: 'Financial',
    items: [
      {
        id: 'fees-tuition',
        label: 'Fees & Tuition',
        icon: 'card-outline',
        route: '/student/fees',
      },
      {
        id: 'balances',
        label: 'Account Balances',
        icon: 'wallet-outline',
        route: '/student/balances',
      },
    ],
  },
  {
    title: 'Settings & Support',
    items: [
      {
        id: 'personal-info',
        label: 'Personal Information',
        icon: 'person-outline',
        route: '/student/personal-info',
      },
      {
        id: 'notifications',
        label: 'Notifications',
        icon: 'notifications-outline',
        route: '/student/notifications',
      },
      {
        id: 'privacy-security',
        label: 'Privacy & Security',
        icon: 'lock-closed-outline',
        route: '/student/privacy',
      },
      {
        id: 'help-support',
        label: 'Help & Support',
        icon: 'help-circle-outline',
        route: '/student/support',
      },
      {
        id: 'about',
        label: 'About',
        icon: 'information-circle-outline',
        route: '/student/about',
      },
    ],
  },
];
