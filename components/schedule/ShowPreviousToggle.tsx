import React from 'react';
import { Text, StyleSheet, Pressable, useColorScheme } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import Colors, { palette, spacing, borderRadius, typography } from '@/constants/Colors';

interface ShowPreviousToggleProps {
  isExpanded: boolean;
  onToggle: () => void;
  completedCount: number;
}

export default function ShowPreviousToggle({ 
  isExpanded, 
  onToggle,
  completedCount,
}: ShowPreviousToggleProps) {
  const colorScheme = useColorScheme() ?? 'light';
  const colors = Colors[colorScheme];

  if (completedCount === 0) return null;

  return (
    <Pressable
      onPress={onToggle}
      style={({ pressed }) => [
        styles.container,
        { 
          backgroundColor: colors.surfaceSecondary,
          opacity: pressed ? 0.8 : 1,
        }
      ]}
    >
      <Text style={[styles.text, { color: colors.textSecondary }]}>
        {isExpanded ? 'Hide Previous' : `Show Previous (${completedCount})`}
      </Text>
      <Ionicons
        name={isExpanded ? 'chevron-up' : 'chevron-down'}
        size={16}
        color={colors.textSecondary}
      />
    </Pressable>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginHorizontal: spacing.base,
    marginBottom: spacing.base,
    paddingVertical: spacing.sm,
    borderRadius: borderRadius.md,
  },
  text: {
    fontSize: typography.size.sm,
    fontWeight: '500',
    marginRight: spacing.xs,
  },
});
