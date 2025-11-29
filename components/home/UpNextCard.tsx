import React from 'react';
import { View, Text, StyleSheet, Pressable, useColorScheme } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import Colors, { palette, spacing, borderRadius, shadows, typography } from '@/constants/Colors';
import { ScheduleEvent, isEventOngoing, formatTimeUntil } from '@/constants/HomeData';

interface UpNextCardProps {
  event: ScheduleEvent;
  onPress?: () => void;
}

export default function UpNextCard({ event, onPress }: UpNextCardProps) {
  const colorScheme = useColorScheme() ?? 'light';
  const colors = Colors[colorScheme];
  
  const ongoing = isEventOngoing(event);
  const timeLabel = ongoing ? 'Now' : 'Up Next';
  const timeUntil = ongoing ? 'Ongoing' : formatTimeUntil(event.startTime);

  return (
    <Pressable 
      onPress={onPress}
      style={({ pressed }) => [
        styles.container,
        { 
          backgroundColor: colors.surface,
          opacity: pressed ? 0.9 : 1,
          transform: [{ scale: pressed ? 0.98 : 1 }],
        }
      ]}
    >
      <View style={styles.header}>
        <View style={[
          styles.badge,
          { backgroundColor: ongoing ? palette.success.light : palette.primary[100] }
        ]}>
          <Text style={[
            styles.badgeText,
            { color: ongoing ? palette.success.dark : palette.primary[600] }
          ]}>
            {timeLabel}
          </Text>
        </View>
        <Ionicons
          name="chevron-forward"
          size={18}
          color={colors.textSecondary}
        />
      </View>
      
      <Text style={[styles.title, { color: colors.text }]}>
        {event.courseCode} • {event.location}
      </Text>
      
      <View style={styles.footer}>
        <Text style={[styles.eventTitle, { color: colors.textSecondary }]}>
          {event.title}
        </Text>
        <Text style={[styles.time, { color: palette.primary[500] }]}>
          {timeUntil}
        </Text>
      </View>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  container: {
    marginHorizontal: spacing.base,
    marginBottom: spacing.base,
    padding: spacing.base,
    borderRadius: borderRadius.xl,
    ...shadows.md,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: spacing.sm,
  },
  badge: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: spacing.sm,
    paddingVertical: spacing.xs,
    borderRadius: borderRadius.full,
  },
  badgeText: {
    fontSize: typography.size.xs,
    fontWeight: '600',
  },
  title: {
    fontSize: typography.size.md,
    fontWeight: '600',
    marginBottom: spacing.xs,
  },
  footer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  eventTitle: {
    fontSize: typography.size.sm,
  },
  time: {
    fontSize: typography.size.sm,
    fontWeight: '600',
  },
});
