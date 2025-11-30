import React from 'react';
import { View, Text, StyleSheet, useColorScheme } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import Colors, { palette, spacing, borderRadius, typography } from '@/constants/Colors';
import { ScheduleActivity, formatTimeRange, formatShortDate } from '@/constants/ScheduleData';

interface EmptyScheduleProps {
  nextActivity?: ScheduleActivity;
  nextActivityDate?: Date;
}

export default function EmptySchedule({ 
  nextActivity,
  nextActivityDate,
}: EmptyScheduleProps) {
  const colorScheme = useColorScheme() ?? 'light';
  const colors = Colors[colorScheme];

  return (
    <View style={styles.container}>
      <View style={styles.emptyContent}>
        <View style={[styles.iconContainer, { backgroundColor: palette.primary[50] }]}>
          <Ionicons name="calendar-outline" size={48} color={palette.primary[500]} />
        </View>

        <Text style={[styles.title, { color: colors.text }]}>
          No activities scheduled today
        </Text>
      </View>

      {nextActivity && nextActivityDate && (
        <View style={styles.nextContainer}>
          <Text style={[styles.nextLabel, { color: colors.textSecondary }]}>
            Next activity:
          </Text>
          <Text style={[styles.nextDate, { color: colors.text }]}>
            {formatShortDate(nextActivityDate)}, {formatTimeRange(nextActivity.startTime, nextActivity.endTime).split(' - ')[0]}
          </Text>
          <Text style={[styles.nextTitle, { color: colors.text }]}>
            {nextActivity.courseCode} - {nextActivity.title}
          </Text>
          <Text style={[styles.nextLocation, { color: colors.textSecondary }]}>
            {nextActivity.location}
          </Text>
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'space-between',
    paddingTop: spacing['3xl'],
  },
  emptyContent: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: spacing['2xl'],
  },
  iconContainer: {
    width: 96,
    height: 96,
    borderRadius: borderRadius['2xl'],
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: spacing.lg,
  },
  title: {
    fontSize: typography.size.lg,
    fontWeight: '600',
    textAlign: 'center',
  },
  nextContainer: {
    paddingHorizontal: spacing['2xl'],
    paddingTop: 250,
    paddingBottom: spacing.xs,
    opacity: 0.5,
  },
  nextLabel: {
    fontSize: typography.size.sm,
    marginBottom: spacing.xs,
  },
  nextDate: {
    fontSize: typography.size.base,
    fontWeight: '600',
    marginBottom: spacing.xs,
  },
  nextTitle: {
    fontSize: typography.size.base,
    marginBottom: spacing.xs,
  },
  nextLocation: {
    fontSize: typography.size.sm,
  },
});
