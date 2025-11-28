import React from 'react';
import { View, Text, StyleSheet, Pressable, useColorScheme } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import Colors, { palette, spacing, typography } from '@/constants/Colors';
import { formatDateHeader } from '@/constants/ScheduleData';

interface DateNavigatorProps {
  date: Date;
  onPrevious: () => void;
  onNext: () => void;
  onDatePress: () => void;
  canGoPrevious?: boolean;
  canGoNext?: boolean;
}

export default function DateNavigator({
  date,
  onPrevious,
  onNext,
  onDatePress,
  canGoPrevious = true,
  canGoNext = true,
}: DateNavigatorProps) {
  const colorScheme = useColorScheme() ?? 'light';
  const colors = Colors[colorScheme];

  return (
    <View style={[styles.container, { backgroundColor: colors.surface }]}>
      <Pressable
        onPress={onPrevious}
        disabled={!canGoPrevious}
        style={({ pressed }) => [
          styles.arrowButton,
          { opacity: !canGoPrevious ? 0.3 : pressed ? 0.6 : 1 }
        ]}
        hitSlop={8}
      >
        <Ionicons
          name="chevron-back"
          size={24}
          color={canGoPrevious ? colors.text : colors.textSecondary}
        />
      </Pressable>

      <Pressable
        onPress={onDatePress}
        style={({ pressed }) => [
          styles.dateContainer,
          { opacity: pressed ? 0.7 : 1 }
        ]}
      >
        <Text style={[styles.dateText, { color: colors.text }]}>
          {formatDateHeader(date)}
        </Text>
      </Pressable>

      <Pressable
        onPress={onNext}
        disabled={!canGoNext}
        style={({ pressed }) => [
          styles.arrowButton,
          { opacity: !canGoNext ? 0.3 : pressed ? 0.6 : 1 }
        ]}
        hitSlop={8}
      >
        <Ionicons
          name="chevron-forward"
          size={24}
          color={canGoNext ? colors.text : colors.textSecondary}
        />
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: spacing.base,
    paddingVertical: spacing.md,
  },
  arrowButton: {
    width: 44,
    height: 44,
    alignItems: 'center',
    justifyContent: 'center',
  },
  dateContainer: {
    flex: 1,
    alignItems: 'center',
  },
  dateText: {
    fontSize: typography.size.md,
    fontWeight: '600',
  },
});
