import React from 'react';
import { 
  Text, 
  StyleSheet, 
  Pressable, 
  useColorScheme,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import Colors, { palette, spacing, borderRadius, shadows, typography } from '@/constants/Colors';

interface LogoutButtonProps {
  onPress?: () => void;
}

export default function LogoutButton({ onPress }: LogoutButtonProps) {
  const colorScheme = useColorScheme() ?? 'light';
  const colors = Colors[colorScheme];

  return (
    <Pressable
      onPress={onPress}
      style={({ pressed }) => [
        styles.button,
        { 
          backgroundColor: colors.surface,
          opacity: pressed ? 0.8 : 1,
          transform: [{ scale: pressed ? 0.98 : 1 }],
        },
        shadows.sm,
      ]}
    >
      <Ionicons 
        name="log-out-outline" 
        size={20} 
        color={palette.error.main} 
      />
      <Text style={[styles.label, { color: palette.error.main }]}>
        Log Out
      </Text>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  button: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginHorizontal: spacing.base,
    marginBottom: spacing['2xl'],
    paddingVertical: spacing.base,
    borderRadius: borderRadius.xl,
  },
  label: {
    fontSize: typography.size.base,
    fontWeight: '600',
    marginLeft: spacing.sm,
  },
});
