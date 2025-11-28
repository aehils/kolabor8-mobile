/**
 * Services Configuration
 * 
 * Defines all available campus services with their metadata,
 * icons, and status configurations.
 */

export const SERVICE_IDS = {
  ATTENDANCE: 'attendance',
  CAMPUS_MAP: 'campus-map',
  LIBRARY: 'library',
  EVENTS: 'events',
  SPORTS: 'sports',
  IT_SERVICES: 'it-services',
  HEALTH: 'health',
} as const;

export const CAPACITY_LEVELS = {
  LOW: 'low',
  MODERATE: 'moderate',
  HIGH: 'high',
  VERY_HIGH: 'very-high',
} as const;

export type CapacityLevel = typeof CAPACITY_LEVELS[keyof typeof CAPACITY_LEVELS];
export type ServiceId = typeof SERVICE_IDS[keyof typeof SERVICE_IDS];

export const capacityConfig: Record<CapacityLevel, { label: string; color: 'success' | 'warning' | 'error' }> = {
  [CAPACITY_LEVELS.LOW]: {
    label: 'Low capacity',
    color: 'success',
  },
  [CAPACITY_LEVELS.MODERATE]: {
    label: 'Moderate capacity',
    color: 'warning',
  },
  [CAPACITY_LEVELS.HIGH]: {
    label: 'High capacity',
    color: 'error',
  },
  [CAPACITY_LEVELS.VERY_HIGH]: {
    label: 'Very high capacity',
    color: 'error',
  },
};

export type ServiceType = 'featured' | 'double-height' | 'standard';
export type StatusType = 'capacity' | 'count' | 'hours' | 'availability';

export interface Service {
  id: ServiceId;
  name: string;
  description: string;
  icon: string;
  type: ServiceType;
  route: string;
  hasStatus?: boolean;
  statusType?: StatusType;
}

export const services: Service[] = [
  {
    id: SERVICE_IDS.ATTENDANCE,
    name: 'Attendance Check-in',
    description: 'Mark your daily attendance',
    icon: 'checkmark-circle',
    type: 'featured',
    route: '/attendance',
  },
  {
    id: SERVICE_IDS.CAMPUS_MAP,
    name: 'Campus Map',
    description: 'Navigate the campus',
    icon: 'location',
    type: 'standard',
    route: '/map',
  },
  {
    id: SERVICE_IDS.LIBRARY,
    name: 'Library',
    description: 'Book rooms, view catalog, and more',
    icon: 'book',
    type: 'standard',
    hasStatus: true,
    statusType: 'capacity',
    route: '/library',
  },
  {
    id: SERVICE_IDS.EVENTS,
    name: 'Events',
    description: 'Campus events & activities',
    icon: 'calendar',
    type: 'standard',
    hasStatus: true,
    statusType: 'count',
    route: '/events',
  },
  {
    id: SERVICE_IDS.SPORTS,
    name: 'Sports',
    description: 'Recreation & athletics',
    icon: 'fitness',
    type: 'standard',
    route: '/sports',
  },
  {
    id: SERVICE_IDS.HEALTH,
    name: 'Health & Wellness',
    description: 'Health services & counseling',
    icon: 'heart',
    type: 'standard',
    hasStatus: true,
    statusType: 'hours',
    route: '/health',
  },
  {
    id: SERVICE_IDS.IT_SERVICES,
    name: 'IT Services',
    description: 'Help desk & support',
    icon: 'laptop-outline',
    type: 'standard',
    hasStatus: true,
    statusType: 'availability',
    route: '/it-services',
  },
];

// Status data types
export interface CapacityStatus {
  capacity: CapacityLevel;
}

export interface CountStatus {
  upcomingCount: number;
}

export interface HoursStatus {
  isOpen: boolean;
  closingTime?: string;
}

export interface AvailabilityStatus {
  status: 'Available' | 'Busy' | 'Closed';
}

export type ServiceStatus = CapacityStatus | CountStatus | HoursStatus | AvailabilityStatus;

export type ServiceStatusMap = Partial<Record<ServiceId, ServiceStatus>>;

// Mock status data (would come from API in production)
export const mockServiceStatus: ServiceStatusMap = {
  [SERVICE_IDS.LIBRARY]: {
    capacity: CAPACITY_LEVELS.MODERATE,
  } as CapacityStatus,
  [SERVICE_IDS.EVENTS]: {
    upcomingCount: 5,
  } as CountStatus,
  [SERVICE_IDS.HEALTH]: {
    isOpen: true,
    closingTime: '5:00 PM',
  } as HoursStatus,
  [SERVICE_IDS.IT_SERVICES]: {
    status: 'Available',
  } as AvailabilityStatus,
};

export default services;
