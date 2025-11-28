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
  HoursStatus 
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
        
        const statusColor = palette[config.color]?.main || palette.neutral[500];
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
          <View style={[styles.statusBadge, { backgroundColor: palette.primary[100] }]}>
            <Text style={[styles.statusText, { color: palette.primary[600] }]}>
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
      
      default:
        return null;
    }
  };
  
  const getIconColor = () => {
    if (service.type === 'featured') {
      return palette.neutral[0];
    }
    return palette.primary[500];
  };
  
  const getIconBgColor = () => {
    if (service.type === 'featured') {
      return 'rgba(255, 255, 255, 0.2)';
    }
    return palette.primary[50];
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
    service.type === 'double-height' && styles.doubleHeightContent,
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
            : palette.primary[100],
          borderless: false,
        }}
      >
        <View style={contentStyles}>
          {/* Icon */}
          <View style={[
            styles.iconContainer,
            service.type === 'featured' && styles.featuredIconContainer,
            service.type === 'double-height' && styles.doubleHeightIconContainer,
            { backgroundColor: getIconBgColor() }
          ]}>
            <Ionicons 
              name={service.icon as any} 
              size={service.type === 'featured' ? 28 : service.type === 'double-height' ? 32 : 24} 
              color={getIconColor()} 
            />
          </View>
          
          {/* Text Content */}
          <View style={styles.textContainer}>
            <Text style={[
              styles.name,
              { color: service.type === 'featured' ? palette.neutral[0] : colors.text },
              service.type === 'featured' && styles.featuredName,
            ]}>
              {service.name}
            </Text>
            
            <Text style={[
              styles.description,
              service.type === 'featured' && styles.featuredDescription,
            ]} numberOfLines={2}>
              {service.description}
            </Text>
            
            {renderStatus()}
          </View>
          
          {/* Arrow indicator for featured tile */}
          {service.type === 'featured' && (
            <View style={styles.arrowContainer}>
              <Ionicons 
                name="arrow-forward" 
                size={20} 
                color={palette.neutral[0]} 
              />
            </View>
          )}
        </View>
        
        {/* Decorative elements for double-height tile */}
        {service.type === 'double-height' && (
          <View style={styles.mapDecoration}>
            <View style={styles.mapGrid}>
              {[...Array(6)].map((_, i) => (
                <View key={i} style={styles.mapDot} />
              ))}
            </View>
            <View style={styles.mapPin}>
              <Ionicons name="location" size={24} color={palette.primary[400]} />
            </View>
          </View>
        )}
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
    backgroundColor: palette.primary[500],
    minHeight: 120,
  },
  
  doubleHeightTile: {
    flex: 1,
    minHeight: 260,
  },
  
  doubleHeightWrapper: {
    flex: 1,
    marginRight: spacing.sm,
  },
  
  standardTile: {
    flex: 1,
    minHeight: 125,
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
  
  doubleHeightContent: {
    padding: spacing.lg,
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
  
  doubleHeightIconContainer: {
    width: 56,
    height: 56,
    borderRadius: borderRadius.xl,
  },
  
  textContainer: {
    flex: 1,
  },
  
  name: {
    fontSize: typography.size.md,
    fontWeight: '600',
    marginBottom: spacing.xs,
    letterSpacing: -0.5,
  },
  
  featuredName: {
    fontSize: typography.size.lg,
    color: palette.neutral[0],
    fontWeight: '700',
  },
  
  description: {
    fontSize: typography.size.sm,
    color: palette.neutral[500],
    lineHeight: typography.size.sm * 1.6,
  },
  
  featuredDescription: {
    color: 'rgba(255, 255, 255, 0.8)',
    fontSize: typography.size.base,
  },
  
  arrowContainer: {
    width: 40,
    height: 40,
    borderRadius: borderRadius.full,
    backgroundColor: 'rgba(255, 255, 255, 0.15)',
    alignItems: 'center',
    justifyContent: 'center',
    marginLeft: spacing.md,
  },
  
  statusBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    alignSelf: 'flex-start',
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
  
  mapDecoration: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    height: 100,
    overflow: 'hidden',
  },
  
  mapGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center',
    paddingHorizontal: spacing.lg,
    paddingTop: spacing.base,
  },
  
  mapDot: {
    width: 6,
    height: 6,
    borderRadius: 3,
    backgroundColor: palette.primary[100],
    margin: spacing.sm,
  },
  
  mapPin: {
    position: 'absolute',
    bottom: 20,
    right: 24,
    opacity: 0.6,
  },
});
