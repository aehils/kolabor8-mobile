import React from 'react';
import { View, Text, StyleSheet, Pressable, useColorScheme } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import Colors, { palette, spacing, borderRadius, typography } from '@/constants/Colors';
import { ScheduleActivity, formatTimeRange, formatShortDate } from '@/constants/ScheduleData';

interface TomorrowPreviewProps {
  date: Date;
  activities: ScheduleActivity[];
  onPress?: () => void;
}

export default function TomorrowPreview({ 
  date, 
  activities,
  onPress,
}: TomorrowPreviewProps) {
  const colorScheme = useColorScheme() ?? 'light';
  const colors = Colors[colorScheme];

  if (activities.length === 0) return null;

  // Show first 2 activities
  const previewActivities = activities.slice(0, 2);

  return (
    <View style={styles.container}>
      {/* Divider */}
      <View style={[styles.divider, { backgroundColor: colors.border }]} />

      {/* Header */}
      <Pressable
        onPress={onPress}
        style={({ pressed }) => [
          styles.header,
          { opacity: pressed ? 0.7 : 1 }
        ]}
      >
        <Text style={[styles.headerText, { color: colors.text }]}>
          Tomorrow ({formatShortDate(date)})
        </Text>
        <Ionicons name="chevron-forward" size={18} color={colors.textSecondary} />
      </Pressable>

      {/* Preview Activities */}
      {previewActivities.map((activity) => (
        <View 
          key={activity.id} 
          style={[styles.activityItem, { backgroundColor: colors.surface }]}
        >
          <Text style={[styles.time, { color: colors.textSecondary }]}>
            {formatTimeRange(activity.startTime, activity.endTime)}
          </Text>
          <Text style={[styles.title, { color: colors.text }]}>
            {activity.courseCode} - {activity.title}
          </Text>
          <View style={styles.locationRow}>
            <Ionicons 
              name={activity.isVirtual ? 'videocam-outline' : 'location-outline'} 
              size={12} 
              color={colors.textSecondary} 
            />
            <Text style={[styles.location, { color: colors.textSecondary }]}>
              {activity.isVirtual ? 'Virtual' : activity.location}
            </Text>
          </View>
        </View>
      ))}

      {activities.length > 2 && (
        <Text style={[styles.moreText, { color: colors.textSecondary }]}>
          +{activities.length - 2} more activities
        </Text>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginTop: spacing.lg,
    paddingHorizontal: spacing.base,
  },
  divider: {
    height: 1,
    marginBottom: spacing.lg,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: spacing.md,
  },
  headerText: {
    fontSize: typography.size.md,
    fontWeight: '600',
  },
  activityItem: {
    padding: spacing.md,
    borderRadius: borderRadius.md,
    marginBottom: spacing.sm,
    opacity: 0.8,
  },
  time: {
    fontSize: typography.size.sm,
    fontWeight: '500',
    marginBottom: spacing.xs,
  },
  title: {
    fontSize: typography.size.base,
    marginBottom: spacing.xs,
  },
  locationRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  location: {
    fontSize: typography.size.xs,
    marginLeft: spacing.xs,
  },
  moreText: {
    fontSize: typography.size.sm,
    textAlign: 'center',
    marginTop: spacing.xs,
  },
});
