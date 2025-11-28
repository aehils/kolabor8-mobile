import React from 'react';
import { View, Text, StyleSheet, Pressable, useColorScheme } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { spacing, borderRadius, typography } from '@/constants/Colors';
import { CampusAlert } from '@/constants/HomeData';

interface CampusAlertBannerProps {
  alert: CampusAlert;
  onDismiss?: () => void;
}

export default function CampusAlertBanner({ alert, onDismiss }: CampusAlertBannerProps) {
  const getAlertStyles = () => {
    switch (alert.type) {
      case 'emergency':
        return {
          bg: '#FEE2E2',
          border: '#EF4444',
          text: '#991B1B',
          icon: 'warning' as const,
        };
      case 'warning':
        return {
          bg: '#FEF3C7',
          border: '#F59E0B',
          text: '#92400E',
          icon: 'alert-circle' as const,
        };
      default:
        return {
          bg: '#DBEAFE',
          border: '#3B82F6',
          text: '#1E40AF',
          icon: 'information-circle' as const,
        };
    }
  };
  
  const alertStyles = getAlertStyles();

  return (
    <View style={[
      styles.container, 
      { 
        backgroundColor: alertStyles.bg,
        borderLeftColor: alertStyles.border,
      }
    ]}>
      <Ionicons 
        name={alertStyles.icon} 
        size={20} 
        color={alertStyles.text} 
        style={styles.icon}
      />
      <Text style={[styles.message, { color: alertStyles.text }]} numberOfLines={2}>
        {alert.message}
      </Text>
      {onDismiss && (
        <Pressable onPress={onDismiss} hitSlop={8}>
          <Ionicons name="close" size={18} color={alertStyles.text} />
        </Pressable>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: spacing.sm,
    paddingHorizontal: spacing.base,
    borderLeftWidth: 4,
    marginHorizontal: spacing.base,
    marginBottom: spacing.base,
    borderRadius: borderRadius.sm,
  },
  icon: {
    marginRight: spacing.sm,
  },
  message: {
    flex: 1,
    fontSize: typography.size.sm,
    fontWeight: '500',
    lineHeight: typography.size.sm * 1.4,
  },
});
