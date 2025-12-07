import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, Pressable, useColorScheme } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import Colors, { palette, spacing, borderRadius, shadows, typography } from '@/constants/Colors';
import {
  ScheduleActivity,
  formatTimeRange,
  getActivityStatus,
  getMinutesUntil,
  getMinutesRemaining,
  getProgressPercentage,
  formatCountdown,
} from '@/constants/ScheduleData';

interface NextActivityCardProps {
  activity: ScheduleActivity;
  onNavigate?: () => void;
}

export default function NextActivityCard({
  activity,
  onNavigate,
}: NextActivityCardProps) {
  const colorScheme = useColorScheme() ?? 'light';
  const colors = Colors[colorScheme];
  
  const [status, setStatus] = useState(getActivityStatus(activity));
  const [minutesUntil, setMinutesUntil] = useState(getMinutesUntil(activity.startTime));
  const [minutesRemaining, setMinutesRemaining] = useState(getMinutesRemaining(activity.endTime));
  const [progress, setProgress] = useState(getProgressPercentage(activity.startTime, activity.endTime));

  // Update countdown/progress every minute
  useEffect(() => {
    const interval = setInterval(() => {
      setStatus(getActivityStatus(activity));
      setMinutesUntil(getMinutesUntil(activity.startTime));
      setMinutesRemaining(getMinutesRemaining(activity.endTime));
      setProgress(getProgressPercentage(activity.startTime, activity.endTime));
    }, 60000);

    return () => clearInterval(interval);
  }, [activity]);

  const isInProgress = status === 'in-progress';
  const isUpcomingSoon = !isInProgress && minutesUntil <= 120 && minutesUntil > 0;

  const accentColor = isInProgress
    ? palette.success.main
    : isUpcomingSoon
      ? palette.gold[500]
      : palette.sage[500];

  return (
    <View
      style={[
        styles.container,
        {
          backgroundColor: colors.surface,
        },
      ]}
    >
      {/* Time */}
      <Text style={[styles.time, { color: accentColor }]}>
        {formatTimeRange(activity.startTime, activity.endTime)}
      </Text>

      {/* Title */}
      <Text style={[styles.title, { color: colors.text }]}>
        {activity.courseCode} - {activity.title}
      </Text>

      {/* Location */}
      <View style={styles.infoRow}>
        <Ionicons name="location-outline" size={16} color={colors.textSecondary} />
        <Text style={[styles.infoText, { color: colors.textSecondary }]}>
          {activity.location}
        </Text>
      </View>

      {/* Instructor */}
      {activity.instructor && (
        <View style={styles.infoRow}>
          <Ionicons name="person-outline" size={16} color={colors.textSecondary} />
          <Text style={[styles.infoText, { color: colors.textSecondary }]}>
            {activity.instructor.name}
          </Text>
        </View>
      )}

      {/* Countdown or Progress */}
      {isInProgress ? (
        <View style={styles.progressContainer}>
          <View style={[styles.progressTrack, { backgroundColor: colors.surfaceSecondary }]}>
            <View
              style={[
                styles.progressBar,
                {
                  backgroundColor: palette.success.main,
                  width: `${progress}%`,
                }
              ]}
            />
          </View>
          <View style={styles.statusRow}>
            <Text style={[styles.progressText, { color: palette.success.main }]}>
              {minutesRemaining} min remaining
            </Text>
            <Text style={[
              styles.checkInStatus,
              { color: activity.checkedIn ? palette.success.main : colors.textSecondary }
            ]}>
              {activity.checkedIn ? 'Checked In' : 'Not Checked-In'}
            </Text>
          </View>
        </View>
      ) : (
        <View style={styles.statusRow}>
          <Text style={[styles.countdown, { color: accentColor }]}>
            {formatCountdown(minutesUntil)}
          </Text>
          <Text style={[
            styles.checkInStatus,
            { color: activity.checkedIn ? palette.success.main : colors.textSecondary }
          ]}>
            {activity.checkedIn ? 'Checked In' : 'Not Checked-In'}
          </Text>
        </View>
      )}

      {/* Action Buttons */}
      <View style={styles.actions}>
        {onNavigate && (
          <Pressable
            onPress={onNavigate}
            style={[styles.actionButton, { backgroundColor: colors.surfaceSecondary }]}
          >
            <Ionicons name="navigate-outline" size={16} color={colors.text} />
            <Text style={[styles.actionText, { color: colors.text }]}>Navigate</Text>
          </Pressable>
        )}
        {activity.isVirtual && activity.meetingLink && (
          <Pressable
            style={[styles.actionButton, { backgroundColor: palette.sage[500] }]}
          >
            <Ionicons name="videocam-outline" size={16} color={palette.neutral[0]} />
            <Text style={[styles.actionText, { color: palette.neutral[0] }]}>Join</Text>
          </Pressable>
        )}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginBottom: spacing.base,
    padding: spacing.base,
  },
  time: {
    fontSize: typography.size.lg,
    fontWeight: '700',
    marginBottom: spacing.xs,
  },
  title: {
    fontSize: typography.size.md,
    fontWeight: '600',
    marginBottom: spacing.sm,
  },
  infoRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: spacing.xs,
  },
  infoText: {
    fontSize: typography.size.sm,
    marginLeft: spacing.xs,
  },
  progressContainer: {
    marginTop: spacing.md,
  },
  progressTrack: {
    height: 6,
    borderRadius: 3,
    overflow: 'hidden',
    marginBottom: spacing.xs,
  },
  progressBar: {
    height: '100%',
    borderRadius: 3,
  },
  progressText: {
    fontSize: typography.size.sm,
    fontWeight: '600',
  },
  statusRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: spacing.sm,
  },
  countdown: {
    fontSize: typography.size.base,
    fontWeight: '600',
  },
  checkInStatus: {
    fontSize: typography.size.sm,
    fontWeight: '500',
  },
  actions: {
    flexDirection: 'row',
    marginTop: spacing.md,
    gap: spacing.sm,
  },
  actionButton: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: spacing.md,
    paddingVertical: spacing.sm,
    borderRadius: borderRadius.md,
  },
  actionText: {
    fontSize: typography.size.sm,
    fontWeight: '600',
    marginLeft: spacing.xs,
  },
});
