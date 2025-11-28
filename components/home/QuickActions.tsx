import React from 'react';
import { View, Text, StyleSheet, Pressable, useColorScheme } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import Colors, { palette, spacing, borderRadius, shadows, typography } from '@/constants/Colors';
import { QuickActionCounts } from '@/constants/HomeData';

interface QuickActionsProps {
  counts: QuickActionCounts;
  onAnnouncementsPress?: () => void;
  onEventsPress?: () => void;
}

interface ActionButtonProps {
  icon: keyof typeof Ionicons.glyphMap;
  label: string;
  count: number;
  countLabel: string;
  onPress?: () => void;
}

function ActionButton({ icon, label, count, countLabel, onPress }: ActionButtonProps) {
  const colorScheme = useColorScheme() ?? 'light';
  const colors = Colors[colorScheme];

  return (
    <Pressable
      onPress={onPress}
      style={({ pressed }) => [
        styles.button,
        { 
          backgroundColor: colors.surface,
          transform: [{ scale: pressed ? 0.97 : 1 }],
          opacity: pressed ? 0.9 : 1,
        }
      ]}
    >
      <View style={[styles.iconContainer, { backgroundColor: palette.primary[50] }]}>
        <Ionicons name={icon} size={22} color={palette.primary[500]} />
      </View>
      <Text style={[styles.label, { color: colors.text }]}>{label}</Text>
      {count > 0 && (
        <View style={[styles.countBadge, { backgroundColor: palette.primary[100] }]}>
          <Text style={[styles.countText, { color: palette.primary[600] }]}>
            {count} {countLabel}
          </Text>
        </View>
      )}
    </Pressable>
  );
}

export default function QuickActions({ 
  counts, 
  onAnnouncementsPress, 
  onEventsPress 
}: QuickActionsProps) {
  return (
    <View style={styles.container}>
      <ActionButton
        icon="megaphone-outline"
        label="Announcements"
        count={counts.unreadAnnouncements}
        countLabel="unread"
        onPress={onAnnouncementsPress}
      />
      <ActionButton
        icon="calendar-outline"
        label="Events"
        count={counts.upcomingEvents}
        countLabel="upcoming"
        onPress={onEventsPress}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    paddingHorizontal: spacing.base,
    marginBottom: spacing.lg,
    gap: spacing.sm,
  },
  button: {
    flex: 1,
    padding: spacing.base,
    borderRadius: borderRadius.xl,
    alignItems: 'center',
    ...shadows.md,
  },
  iconContainer: {
    width: 44,
    height: 44,
    borderRadius: borderRadius.lg,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: spacing.sm,
  },
  label: {
    fontSize: typography.size.sm,
    fontWeight: '600',
    marginBottom: spacing.xs,
  },
  countBadge: {
    paddingHorizontal: spacing.sm,
    paddingVertical: spacing.xs,
    borderRadius: borderRadius.full,
  },
  countText: {
    fontSize: typography.size.xs,
    fontWeight: '500',
  },
});
