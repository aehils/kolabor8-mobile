import React, { useRef } from 'react';
import {
  View,
  Text,
  StyleSheet,
  Pressable,
  Animated,
  useColorScheme,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import Colors, { palette, spacing, borderRadius, shadows, typography } from '@/constants/Colors';
import {
  Service,
  ServiceStatus,
  capacityConfig,
  CapacityStatus,
  CountStatus,
  HoursStatus,
  AvailabilityStatus,
  SERVICE_IDS
} from '@/constants/Services';

interface ServiceTileProps {
  service: Service;
  status?: ServiceStatus;
  onPress?: (service: Service) => void;
  style?: object;
  isFirstInRow?: boolean;
  isSecondInRow?: boolean;
}

export default function ServiceTile({ 
  service, 
  status, 
  onPress, 
  style,
  isFirstInRow,
  isSecondInRow,
}: ServiceTileProps) {
  const colorScheme = useColorScheme() ?? 'light';
  const colors = Colors[colorScheme];
  const scaleAnim = useRef(new Animated.Value(1)).current;
  
  const handlePressIn = () => {
    Animated.spring(scaleAnim, {
      toValue: 0.97,
      useNativeDriver: true,
      friction: 8,
      tension: 100,
    }).start();
  };
  
  const handlePressOut = () => {
    Animated.spring(scaleAnim, {
      toValue: 1,
      useNativeDriver: true,
      friction: 8,
      tension: 40,
    }).start();
  };
  
  const renderStatus = () => {
    if (!service.hasStatus || !status) return null;
    
    switch (service.statusType) {
      case 'capacity': {
        const capacityStatus = status as CapacityStatus;
        const config = capacityConfig[capacityStatus.capacity];
        if (!config) return null;

        // Use red text for moderate (amber) capacity for better visibility
        const isModerate = capacityStatus.capacity === 'moderate';
        const statusColor = isModerate ? palette.error.main : (palette[config.color]?.main || palette.neutral[500]);
        const bgColor = palette[config.color]?.light || palette.neutral[100];

        return (
          <View style={[styles.statusBadge, { backgroundColor: bgColor }]}>
            <View style={[styles.statusDot, { backgroundColor: statusColor }]} />
            <Text style={[styles.statusText, { color: statusColor }]}>
              {config.label}
            </Text>
          </View>
        );
      }
      
      case 'count': {
        const countStatus = status as CountStatus;
        if (!countStatus.upcomingCount) return null;
        return (
          <View style={[styles.statusBadge, { backgroundColor: palette.gold[100] }]}>
            <Text style={[styles.statusText, { color: palette.gold[700] }]}>
              {countStatus.upcomingCount} this week
            </Text>
          </View>
        );
      }
      
      case 'hours': {
        const hoursStatus = status as HoursStatus;
        const isOpen = hoursStatus.isOpen;
        const bgColor = isOpen ? palette.success.light : palette.neutral[150];
        const textColor = isOpen ? palette.success.dark : palette.neutral[600];

        return (
          <View style={[styles.statusBadge, { backgroundColor: bgColor }]}>
            <Text style={[styles.statusText, { color: textColor }]}>
              {isOpen ? `Open until ${hoursStatus.closingTime}` : 'Closed'}
            </Text>
          </View>
        );
      }

      case 'availability': {
        const availabilityStatus = status as AvailabilityStatus;
        const availability = availabilityStatus.availability;

        let bgColor: string;
        let textColor: string;
        let label: string;

        switch (availability) {
          case 'available':
            bgColor = palette.success.light;
            textColor = palette.success.dark;
            label = 'Available';
            break;
          case 'busy':
            bgColor = palette.warning.light;
            textColor = palette.warning.dark;
            label = 'Busy';
            break;
          case 'closed':
            bgColor = palette.neutral[150];
            textColor = palette.neutral[600];
            label = 'Closed';
            break;
        }

        return (
          <View style={[styles.statusBadge, { backgroundColor: bgColor }]}>
            <Text style={[styles.statusText, { color: textColor }]}>
              {label}
            </Text>
          </View>
        );
      }
      
      default:
        return null;
    }
  };
  
  const getIconColor = () => {
    if (service.type === 'featured') {
      return palette.gold[400];
    }
    return palette.sage[500];
  };

  const getIconBgColor = () => {
    if (service.type === 'featured') {
      return 'rgba(255, 255, 255, 0.15)';
    }
    return palette.sage[100];
  };

  const shouldShowDescription = () => {
    // Always show description for featured tiles
    if (service.type === 'featured') return true;
    // Show description for Campus Map and Sports
    if (service.id === SERVICE_IDS.CAMPUS_MAP || service.id === SERVICE_IDS.SPORTS) return true;
    // Hide description for other tiles
    return false;
  };
  
  const tileStyles = [
    styles.tile,
    { backgroundColor: colors.surface },
    service.type === 'featured' && styles.featuredTile,
    service.type === 'double-height' && styles.doubleHeightTile,
    service.type === 'standard' && styles.standardTile,
    style,
  ];
  
  const contentStyles = [
    styles.content,
    service.type === 'featured' && styles.featuredContent,
    service.type === 'standard' && styles.standardContent,
  ];

  return (
    <Animated.View 
      style={[
        { transform: [{ scale: scaleAnim }] },
        service.type === 'standard' && styles.standardTileWrapper,
        isFirstInRow && styles.firstInRow,
        isSecondInRow && styles.secondInRow,
        service.type === 'double-height' && styles.doubleHeightWrapper,
      ]}
    >
      <Pressable
        onPress={() => onPress?.(service)}
        onPressIn={handlePressIn}
        onPressOut={handlePressOut}
        style={tileStyles}
        android_ripple={{
          color: service.type === 'featured'
            ? 'rgba(255,255,255,0.2)'
            : palette.sage[100],
          borderless: false,
        }}
      >
        <View style={contentStyles}>
          {/* Icon */}
          <View style={[
            styles.iconContainer,
            service.type === 'featured' && styles.featuredIconContainer,
            service.type === 'standard' && styles.standardIconContainer,
            { backgroundColor: getIconBgColor() }
          ]}>
            <Ionicons
              name={service.icon as any}
              size={service.type === 'featured' ? 28 : 24}
              color={getIconColor()}
            />
          </View>

          {/* Text Content */}
          <View style={[
            styles.textContainer,
            service.type === 'standard' && styles.standardTextContainer,
          ]}>
            <Text style={[
              styles.name,
              { color: service.type === 'featured' ? palette.neutral[0] : colors.text },
              service.type === 'featured' && styles.featuredName,
              service.type === 'standard' && styles.standardName,
            ]}>
              {service.name}
            </Text>

            {shouldShowDescription() && (
              <Text style={[
                styles.description,
                service.type === 'featured' && styles.featuredDescription,
              ]} numberOfLines={2}>
                {service.description}
              </Text>
            )}

            {renderStatus()}
          </View>
        </View>
      </Pressable>
    </Animated.View>
  );
}

const styles = StyleSheet.create({
  tile: {
    borderRadius: borderRadius.xl,
    overflow: 'hidden',
    ...shadows.md,
  },
  
  featuredTile: {
    backgroundColor: palette.forest[600],
    minHeight: 120,
  },

  standardTile: {
    flex: 1,
    minHeight: 160,
  },
  
  standardTileWrapper: {
    flex: 1,
  },
  
  firstInRow: {
    marginRight: spacing.sm / 2,
  },
  
  secondInRow: {
    marginLeft: spacing.sm / 2,
  },
  
  content: {
    padding: spacing.base,
    flex: 1,
  },

  featuredContent: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: spacing.lg,
  },

  standardContent: {
    padding: spacing.base,
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  
  iconContainer: {
    width: 48,
    height: 48,
    borderRadius: borderRadius.lg,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: spacing.md,
  },

  featuredIconContainer: {
    width: 56,
    height: 56,
    borderRadius: borderRadius.xl,
    marginBottom: 0,
    marginRight: spacing.base,
  },

  standardIconContainer: {
    width: 48,
    height: 48,
    borderRadius: borderRadius.lg,
    marginBottom: spacing.lg,
    position: 'absolute',
    top: '25%',
    left: '50%',
    marginLeft: -24, // Half of width to center
  },
  
  textContainer: {
    flex: 1,
  },

  standardTextContainer: {
    position: 'absolute',
    bottom: spacing.base,
    left: spacing.base,
    right: spacing.base,
    alignItems: 'center',
  },

  name: {
    fontSize: typography.size.md,
    fontWeight: '600',
    marginBottom: spacing.xs,
    letterSpacing: -0.5,
  },

  featuredName: {
    fontSize: typography.size.xl,
    color: palette.neutral[0],
    fontWeight: '700',
  },

  standardName: {
    textAlign: 'center',
  },
  
  description: {
    fontSize: typography.size.sm,
    color: palette.neutral[500],
    lineHeight: typography.size.sm * 1.6,
    textAlign: 'center',
  },
  
  featuredDescription: {
    color: 'rgba(255, 255, 255, 0.8)',
    fontSize: typography.size.base,
    textAlign: 'left',
  },

  statusBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    alignSelf: 'center',
    paddingHorizontal: spacing.sm,
    paddingVertical: spacing.xs,
    borderRadius: borderRadius.full,
    marginTop: spacing.sm,
  },
  
  statusDot: {
    width: 6,
    height: 6,
    borderRadius: 3,
    marginRight: spacing.xs,
  },
  
  statusText: {
    fontSize: typography.size.xs,
    fontWeight: '600',
  },
});
