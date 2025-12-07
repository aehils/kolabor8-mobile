import React from 'react';
import { View, Text, StyleSheet, useColorScheme } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import Colors, { palette, spacing, typography, borderRadius } from '@/constants/Colors';

interface PlaceholderScreenProps {
  title: string;
  icon: string;
  description?: string;
}

export default function PlaceholderScreen({ 
  title, 
  icon, 
  description = 'Coming soon' 
}: PlaceholderScreenProps) {
  const colorScheme = useColorScheme() ?? 'light';
  const colors = Colors[colorScheme];

  return (
    <View style={[styles.container, { backgroundColor: colors.background }]}>
      <View style={[styles.iconContainer, { backgroundColor: palette.sage[100] }]}>
        <Ionicons
          name={icon as any}
          size={48}
          color={palette.sage[500]}
        />
      </View>
      <Text style={[styles.title, { color: colors.text }]}>{title}</Text>
      <Text style={[styles.description, { color: colors.textSecondary }]}>
        {description}
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: spacing['2xl'],
  },
  
  iconContainer: {
    width: 96,
    height: 96,
    borderRadius: borderRadius['2xl'],
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: spacing.xl,
  },
  
  title: {
    fontSize: typography.size.xl,
    fontWeight: '700',
    marginBottom: spacing.sm,
    letterSpacing: -0.5,
  },
  
  description: {
    fontSize: typography.size.base,
    textAlign: 'center',
  },
});
