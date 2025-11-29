import React, { useState } from 'react';
import { View, Text, StyleSheet, Pressable, useColorScheme } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import Colors, { palette, spacing, borderRadius, shadows, typography } from '@/constants/Colors';
import { 
  Deadline, 
  DeadlineFilter, 
  filterDeadlines, 
  getDeadlineUrgency, 
  formatDueDate,
  UrgencyLevel 
} from '@/constants/HomeData';

interface DeadlinesSectionProps {
  deadlines: Deadline[];
  onDeadlinePress?: (deadline: Deadline) => void;
}

const FILTER_OPTIONS: { key: DeadlineFilter; label: string }[] = [
  { key: '7days', label: '7 Days' },
  { key: '4weeks', label: '4 Weeks' },
  { key: '3months', label: '3 Months' },
];

function UrgencyBadge({ urgency }: { urgency: UrgencyLevel }) {
  const config = {
    critical: { bg: '#FEE2E2', color: '#DC2626' },
    soon: { bg: '#FEF3C7', color: '#D97706' },
    normal: { bg: '#DBEAFE', color: '#2563EB' },
  };
  
  const style = config[urgency];
  
  return (
    <View style={[styles.urgencyBadge, { backgroundColor: style.bg }]}>
      <View style={[styles.urgencyDot, { backgroundColor: style.color }]} />
    </View>
  );
}

function DeadlineItem({
  deadline,
  onPress
}: {
  deadline: Deadline;
  onPress?: () => void;
}) {
  const colorScheme = useColorScheme() ?? 'light';
  const colors = Colors[colorScheme];
  const urgency = getDeadlineUrgency(deadline.dueDate);

  return (
    <Pressable
      onPress={onPress}
      style={({ pressed }) => [
        styles.deadlineItem,
        {
          opacity: pressed ? 0.7 : 1,
        }
      ]}
    >
      <View style={styles.deadlineContent}>
        <Text style={[styles.deadlineTitle, { color: colors.text }]} numberOfLines={1}>
          {deadline.title}
        </Text>
        <Text style={[styles.deadlineCourse, { color: colors.textSecondary }]}>
          {deadline.courseCode} • {formatDueDate(deadline.dueDate)}
        </Text>
      </View>
      <UrgencyBadge urgency={urgency} />
    </Pressable>
  );
}

export default function DeadlinesSection({ deadlines, onDeadlinePress }: DeadlinesSectionProps) {
  const colorScheme = useColorScheme() ?? 'light';
  const colors = Colors[colorScheme];
  const [activeFilter, setActiveFilter] = useState<DeadlineFilter>('7days');
  const [currentPage, setCurrentPage] = useState(1);

  const filteredDeadlines = filterDeadlines(deadlines, activeFilter);

  const ITEMS_PER_PAGE = 3;
  const totalPages = Math.ceil(filteredDeadlines.length / ITEMS_PER_PAGE);
  const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
  const endIndex = startIndex + ITEMS_PER_PAGE;
  const paginatedDeadlines = filteredDeadlines.slice(startIndex, endIndex);

  // Reset to page 1 when filter changes
  const handleFilterChange = (filter: DeadlineFilter) => {
    setActiveFilter(filter);
    setCurrentPage(1);
  };

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <View style={styles.titleRow}>
          <Ionicons
            name="clipboard-outline"
            size={20}
            color={colors.text}
            style={styles.titleIcon}
          />
          <Text style={[styles.title, { color: colors.text }]}>
            Upcoming Deadlines
          </Text>
        </View>
      </View>

      {/* Filter Tabs */}
      <View style={[styles.filterContainer, { backgroundColor: colors.surfaceSecondary }]}>
        {FILTER_OPTIONS.map((option) => (
          <Pressable
            key={option.key}
            onPress={() => handleFilterChange(option.key)}
            style={[
              styles.filterTab,
              activeFilter === option.key && {
                backgroundColor: colors.surface,
                ...shadows.sm,
              }
            ]}
          >
            <Text style={[
              styles.filterText,
              { color: activeFilter === option.key ? colors.text : colors.textSecondary }
            ]}>
              {option.label}
            </Text>
          </Pressable>
        ))}
      </View>

      {/* Deadlines Window */}
      <View style={[styles.windowContainer, { backgroundColor: colors.surface }]}>
        {filteredDeadlines.length === 0 ? (
          <View style={styles.emptyState}>
            <Text style={styles.emptyEmoji}>🎉</Text>
            <Text style={[styles.emptyText, { color: colors.textSecondary }]}>
              No upcoming deadlines
            </Text>
          </View>
        ) : (
          <>
            {/* Deadlines List */}
            <View style={styles.listContainer}>
              {paginatedDeadlines.map((deadline, index) => (
                <View key={deadline.id}>
                  <DeadlineItem
                    deadline={deadline}
                    onPress={() => onDeadlinePress?.(deadline)}
                  />
                  {index < paginatedDeadlines.length - 1 && (
                    <View style={[styles.divider, { backgroundColor: colors.border }]} />
                  )}
                </View>
              ))}
            </View>

            {/* Pagination */}
            {totalPages > 1 && (
              <View style={[styles.paginationContainer, { borderTopColor: colors.border }]}>
                <Text style={[styles.paginationText, { color: colors.textSecondary }]}>
                  Showing page {currentPage} of {totalPages}
                </Text>
                <View style={styles.paginationButtons}>
                  <Pressable
                    onPress={() => setCurrentPage(Math.max(1, currentPage - 1))}
                    disabled={currentPage === 1}
                    style={({ pressed }) => [
                      styles.paginationButton,
                      { opacity: pressed ? 0.6 : currentPage === 1 ? 0.3 : 1 }
                    ]}
                  >
                    <Ionicons
                      name="chevron-back"
                      size={20}
                      color={currentPage === 1 ? colors.textSecondary : colors.text}
                    />
                  </Pressable>
                  <Pressable
                    onPress={() => setCurrentPage(Math.min(totalPages, currentPage + 1))}
                    disabled={currentPage === totalPages}
                    style={({ pressed }) => [
                      styles.paginationButton,
                      { opacity: pressed ? 0.6 : currentPage === totalPages ? 0.3 : 1 }
                    ]}
                  >
                    <Ionicons
                      name="chevron-forward"
                      size={20}
                      color={currentPage === totalPages ? colors.textSecondary : colors.text}
                    />
                  </Pressable>
                </View>
              </View>
            )}
          </>
        )}
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
  filterContainer: {
    flexDirection: 'row',
    marginHorizontal: spacing.base,
    marginBottom: spacing.sm,
    padding: spacing.xs,
    borderRadius: borderRadius.lg,
  },
  filterTab: {
    flex: 1,
    paddingVertical: spacing.sm,
    alignItems: 'center',
    borderRadius: borderRadius.md,
  },
  filterText: {
    fontSize: typography.size.sm,
    fontWeight: '500',
  },
  windowContainer: {
    marginHorizontal: spacing.base,
    borderRadius: borderRadius.xl,
    ...shadows.md,
    overflow: 'hidden',
  },
  listContainer: {
    // No padding needed - items have their own padding
  },
  deadlineItem: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: spacing.base,
  },
  deadlineContent: {
    flex: 1,
    marginRight: spacing.sm,
  },
  deadlineTitle: {
    fontSize: typography.size.base,
    fontWeight: '500',
    marginBottom: spacing.xs,
  },
  deadlineCourse: {
    fontSize: typography.size.sm,
  },
  urgencyBadge: {
    width: 24,
    height: 24,
    borderRadius: 12,
    alignItems: 'center',
    justifyContent: 'center',
  },
  urgencyDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
  },
  divider: {
    height: 1,
    marginHorizontal: spacing.base,
  },
  paginationContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: spacing.base,
    paddingVertical: spacing.sm,
    borderTopWidth: 1,
  },
  paginationText: {
    fontSize: typography.size.sm,
    fontWeight: '500',
  },
  paginationButtons: {
    flexDirection: 'row',
    gap: spacing.sm,
  },
  paginationButton: {
    padding: spacing.xs,
  },
  emptyState: {
    alignItems: 'center',
    paddingVertical: spacing['2xl'],
  },
  emptyEmoji: {
    fontSize: 32,
    marginBottom: spacing.sm,
  },
  emptyText: {
    fontSize: typography.size.base,
  },
});
