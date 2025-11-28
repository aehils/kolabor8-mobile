import React from 'react';
import { View, Text, StyleSheet, useColorScheme } from 'react-native';
import Colors, { spacing, typography } from '@/constants/Colors';

interface PageHeaderProps {
  title: string;
  subtitle?: string;
}

export default function PageHeader({ title, subtitle }: PageHeaderProps) {
  const colorScheme = useColorScheme() ?? 'light';
  const colors = Colors[colorScheme];

  return (
    <View style={styles.container}>
      <Text style={[styles.title, { color: colors.text }]}>{title}</Text>
      {subtitle && (
        <Text style={[styles.subtitle, { color: colors.textSecondary }]}>
          {subtitle}
        </Text>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: spacing.lg,
    paddingTop: spacing.xl,
    paddingBottom: spacing.base,
  },
  
  title: {
    fontSize: typography.size['2xl'],
    fontWeight: '700',
    letterSpacing: -0.5,
  },
  
  subtitle: {
    fontSize: typography.size.base,
    marginTop: spacing.xs,
  },
});
