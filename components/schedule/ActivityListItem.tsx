import React from 'react';
import { View, Text, StyleSheet, Pressable, useColorScheme } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import Colors, { palette, spacing, borderRadius, shadows, typography } from '@/constants/Colors';
import { ScheduleActivity, formatTimeRange, getActivityStatus } from '@/constants/ScheduleData';

interface ActivityListItemProps {
  activity: ScheduleActivity;
  onPress?: () => void;
  showCompleted?: boolean;
}

export default function ActivityListItem({ 
  activity, 
  onPress,
  showCompleted = false,
}: ActivityListItemProps) {
  const colorScheme = useColorScheme() ?? 'light';
  const colors = Colors[colorScheme];
  
  const status = getActivityStatus(activity);
  const isCompleted = status === 'completed';
  const isCanceled = activity.status === 'canceled';

  if (isCompleted && !showCompleted) return null;

  return (
    <Pressable
      onPress={onPress}
      style={({ pressed }) => [
        styles.container,
        { 
          backgroundColor: colors.surface,
          opacity: isCompleted ? 0.6 : pressed ? 0.9 : 1,
        },
        shadows.sm,
      ]}
    >
      {/* Completed Checkmark */}
      {isCompleted && (
        <View style={[styles.checkmark, { backgroundColor: palette.success.light }]}>
          <Ionicons name="checkmark" size={14} color={palette.success.main} />
        </View>
      )}

      {/* Canceled Badge */}
      {isCanceled && (
        <View style={[styles.canceledBadge, { backgroundColor: palette.error.light }]}>
          <Text style={[styles.canceledText, { color: palette.error.main }]}>CANCELED</Text>
        </View>
      )}

      <View style={styles.content}>
        {/* Time */}
        <Text style={[
          styles.time, 
          { color: isCanceled ? colors.textSecondary : colors.text },
          isCanceled && styles.strikethrough,
        ]}>
          {formatTimeRange(activity.startTime, activity.endTime)}
        </Text>

        {/* Title */}
        <Text style={[
          styles.title, 
          { color: isCanceled ? colors.textSecondary : colors.text },
          isCanceled && styles.strikethrough,
        ]}>
          {activity.courseCode} - {activity.title}
        </Text>

        {/* Location */}
        <View style={styles.locationRow}>
          <Ionicons 
            name={activity.isVirtual ? 'videocam-outline' : 'location-outline'} 
            size={14} 
            color={colors.textSecondary} 
          />
          <Text style={[styles.location, { color: colors.textSecondary }]}>
            {activity.isVirtual ? 'Virtual' : activity.location}
          </Text>
        </View>
      </View>

      <Ionicons name="chevron-forward" size={18} color={colors.textSecondary} />
    </Pressable>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    marginHorizontal: spacing.base,
    marginBottom: spacing.sm,
    padding: spacing.base,
    borderRadius: borderRadius.lg,
  },
  checkmark: {
    width: 24,
    height: 24,
    borderRadius: 12,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: spacing.md,
  },
  canceledBadge: {
    position: 'absolute',
    top: spacing.sm,
    right: spacing.sm,
    paddingHorizontal: spacing.sm,
    paddingVertical: 2,
    borderRadius: borderRadius.sm,
  },
  canceledText: {
    fontSize: typography.size.xs,
    fontWeight: '700',
  },
  content: {
    flex: 1,
  },
  time: {
    fontSize: typography.size.base,
    fontWeight: '600',
    marginBottom: spacing.xs,
  },
  title: {
    fontSize: typography.size.sm,
    marginBottom: spacing.xs,
  },
  locationRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  location: {
    fontSize: typography.size.sm,
    marginLeft: spacing.xs,
  },
  strikethrough: {
    textDecorationLine: 'line-through',
  },
});
