import React from 'react';
import { View, Text, StyleSheet, Pressable, useColorScheme } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import Colors, { palette, spacing, borderRadius, shadows, typography } from '@/constants/Colors';
import { Module, formatTimeUntil } from '@/constants/HomeData';

interface ModulesSectionProps {
  modules: Module[];
  onModulePress?: (module: Module) => void;
}

function ModuleItem({ module, onPress }: { module: Module; onPress?: () => void }) {
  const colorScheme = useColorScheme() ?? 'light';
  const colors = Colors[colorScheme];

  const getSubtitle = () => {
    if (module.hasNewGrade) {
      return { text: '1 new grade', icon: 'star' as const, color: palette.success.main };
    }
    if (module.pendingAssignments > 0) {
      return { 
        text: `${module.pendingAssignments} pending assignment${module.pendingAssignments > 1 ? 's' : ''}`, 
        icon: 'document-text-outline' as const, 
        color: palette.warning.main 
      };
    }
    if (module.nextClass) {
      return { 
        text: `Next: ${module.nextClass.title}, ${formatTimeUntil(module.nextClass.time)}`, 
        icon: 'time-outline' as const, 
        color: colors.textSecondary 
      };
    }
    return null;
  };

  const subtitle = getSubtitle();

  return (
    <Pressable
      onPress={onPress}
      style={({ pressed }) => [
        styles.moduleItem,
        { 
          backgroundColor: colors.surface,
          opacity: pressed ? 0.8 : 1,
        }
      ]}
    >
      {/* Accent Bar */}
      <View style={[styles.accentBar, { backgroundColor: module.accentColor }]} />
      
      {/* Content */}
      <View style={styles.moduleContent}>
        <View style={styles.moduleHeader}>
          <Text style={[styles.courseCode, { color: colors.text }]}>
            {module.courseCode}
          </Text>
          <Ionicons name="chevron-forward" size={18} color={colors.textSecondary} />
        </View>
        <Text style={[styles.courseName, { color: colors.textSecondary }]} numberOfLines={1}>
          {module.courseName}
        </Text>
        
        {subtitle && (
          <View style={styles.subtitleRow}>
            <Ionicons 
              name={subtitle.icon} 
              size={14} 
              color={subtitle.color} 
              style={styles.subtitleIcon}
            />
            <Text style={[styles.subtitleText, { color: subtitle.color }]}>
              {subtitle.text}
            </Text>
          </View>
        )}
      </View>
    </Pressable>
  );
}

export default function ModulesSection({ modules, onModulePress }: ModulesSectionProps) {
  const colorScheme = useColorScheme() ?? 'light';
  const colors = Colors[colorScheme];

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <View style={styles.titleRow}>
          <Ionicons 
            name="book-outline" 
            size={20} 
            color={colors.text} 
            style={styles.titleIcon}
          />
          <Text style={[styles.title, { color: colors.text }]}>
            My Modules
          </Text>
        </View>
      </View>
      
      {/* Modules List */}
      <View style={styles.listContainer}>
        {modules.map((module) => (
          <ModuleItem
            key={module.id}
            module={module}
            onPress={() => onModulePress?.(module)}
          />
        ))}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginBottom: spacing.lg,
  },
  header: {
    paddingHorizontal: spacing.base,
    marginBottom: spacing.sm,
  },
  titleRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  titleIcon: {
    marginRight: spacing.sm,
  },
  title: {
    fontSize: typography.size.lg,
    fontWeight: '600',
  },
  listContainer: {
    paddingHorizontal: spacing.base,
  },
  moduleItem: {
    flexDirection: 'row',
    marginBottom: spacing.sm,
    borderRadius: borderRadius.lg,
    overflow: 'hidden',
    ...shadows.sm,
  },
  accentBar: {
    width: 4,
  },
  moduleContent: {
    flex: 1,
    padding: spacing.base,
  },
  moduleHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  courseCode: {
    fontSize: typography.size.base,
    fontWeight: '600',
  },
  courseName: {
    fontSize: typography.size.sm,
    marginTop: spacing.xs,
  },
  subtitleRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: spacing.sm,
  },
  subtitleIcon: {
    marginRight: spacing.xs,
  },
  subtitleText: {
    fontSize: typography.size.xs,
    fontWeight: '500',
  },
});
