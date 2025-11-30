import React, { useState, useCallback, useMemo } from 'react';
import { 
  View, 
  ScrollView, 
  StyleSheet, 
  Pressable,
  Text,
  Modal,
  Alert,
  useColorScheme,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import Colors, { palette, spacing, borderRadius, shadows, typography } from '@/constants/Colors';
import {
  ScheduleActivity,
  getScheduleForDate,
  getActivityStatus,
  addDays,
  isSameDay,
  mockTomorrowActivities,
  mockWeekTimetable,
} from '@/constants/ScheduleData';
import {
  DateNavigator,
  NextActivityCard,
  ActivityListItem,
  ShowPreviousToggle,
  TomorrowPreview,
  EmptySchedule,
  WeekTimetable,
} from '@/components/schedule';

export default function ScheduleScreen() {
  const colorScheme = useColorScheme() ?? 'light';
  const colors = Colors[colorScheme];

  const [selectedDate, setSelectedDate] = useState(new Date());
  const [showPrevious, setShowPrevious] = useState(false);
  const [timetableModalVisible, setTimetableModalVisible] = useState(false);
  const [selectedWeek, setSelectedWeek] = useState(3); // Week 3 as default
  const [weekDropdownVisible, setWeekDropdownVisible] = useState(false);

  // Get activities for selected date
  const activities = useMemo(() => {
    return getScheduleForDate(selectedDate);
  }, [selectedDate]);

  // Separate completed and upcoming activities
  const { completedActivities, upcomingActivities, nextActivity } = useMemo(() => {
    const completed: ScheduleActivity[] = [];
    const upcoming: ScheduleActivity[] = [];
    let next: ScheduleActivity | null = null;

    activities.forEach((activity) => {
      const status = getActivityStatus(activity);
      if (status === 'completed') {
        completed.push(activity);
      } else {
        upcoming.push(activity);
        if (!next && (status === 'in-progress' || status === 'upcoming')) {
          next = activity;
        }
      }
    });

    return {
      completedActivities: completed,
      upcomingActivities: upcoming.slice(next ? 1 : 0), // Exclude next activity from list
      nextActivity: next,
    };
  }, [activities]);

  // Check if we should show tomorrow preview
  const showTomorrowPreview = upcomingActivities.length === 0 && !nextActivity;
  const tomorrow = addDays(selectedDate, 1);
  const tomorrowActivities = isSameDay(selectedDate, new Date()) 
    ? mockTomorrowActivities 
    : [];

  // Navigation limits (30 days)
  const today = new Date();
  const minDate = addDays(today, -30);
  const maxDate = addDays(today, 30);
  const canGoPrevious = selectedDate > minDate;
  const canGoNext = selectedDate < maxDate;

  const handlePreviousDay = useCallback(() => {
    if (canGoPrevious) {
      setSelectedDate(prev => addDays(prev, -1));
      setShowPrevious(false);
    }
  }, [canGoPrevious]);

  const handleNextDay = useCallback(() => {
    if (canGoNext) {
      setSelectedDate(prev => addDays(prev, 1));
      setShowPrevious(false);
    }
  }, [canGoNext]);

  const handleDatePress = () => {
    // In production, this would open a date picker
    Alert.alert('Date Picker', 'Date picker would open here');
  };

  const handleNavigate = () => {
    Alert.alert('Navigate', 'Opening campus map...');
  };

  const handleGoToTomorrow = () => {
    setSelectedDate(tomorrow);
    setShowPrevious(false);
  };

  // Get current day for timetable highlight
  const dayNames = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
  const currentDayName = dayNames[new Date().getDay()];

  // Generate week options (e.g., Week 1 through Week 12)
  const weekOptions = Array.from({ length: 12 }, (_, i) => {
    const weekNumber = i + 1;
    // Calculate the start date for each week (for demo purposes)
    const startDate = new Date(2025, 9, 2); // October 2, 2025
    startDate.setDate(startDate.getDate() + (i * 7));
    const dateString = startDate.toLocaleDateString('en-US', {
      month: 'long',
      day: 'numeric',
      year: 'numeric'
    });
    return {
      week: weekNumber,
      label: `Week ${weekNumber}: ${dateString}`,
    };
  });

  return (
    <SafeAreaView 
      style={[styles.container, { backgroundColor: colors.background }]} 
      edges={['top']}
    >
      {/* Date Navigator */}
      <DateNavigator
        date={selectedDate}
        onPrevious={handlePreviousDay}
        onNext={handleNextDay}
        onDatePress={handleDatePress}
        canGoPrevious={canGoPrevious}
        canGoNext={canGoNext}
      />

      <ScrollView
        style={styles.scrollView}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        {activities.length === 0 ? (
          // Empty State
          <EmptySchedule
            nextActivity={mockTomorrowActivities[0]}
            nextActivityDate={tomorrow}
          />
        ) : (
          <>
            {/* Show Previous Toggle */}
            <ShowPreviousToggle
              isExpanded={showPrevious}
              onToggle={() => setShowPrevious(!showPrevious)}
              completedCount={completedActivities.length}
            />

            {/* Completed Activities (when expanded) */}
            {showPrevious && completedActivities.length > 0 && (
              <View style={styles.completedSection}>
                <Text style={[styles.sectionLabel, { color: colors.textSecondary }]}>
                  COMPLETED
                </Text>
                {completedActivities.map((activity) => (
                  <ActivityListItem
                    key={activity.id}
                    activity={activity}
                    showCompleted
                  />
                ))}
                <View style={[styles.sectionDivider, { backgroundColor: colors.border }]} />
              </View>
            )}

            {/* Next Activity Card */}
            {nextActivity && (
              <NextActivityCard
                activity={nextActivity}
                onNavigate={handleNavigate}
              />
            )}

            {/* Upcoming Activities List */}
            {upcomingActivities.length > 0 && (
              <View style={styles.upcomingSection}>
                {upcomingActivities.map((activity) => (
                  <ActivityListItem
                    key={activity.id}
                    activity={activity}
                  />
                ))}
              </View>
            )}

            {/* Tomorrow Preview */}
            {showTomorrowPreview && tomorrowActivities.length > 0 && (
              <TomorrowPreview
                date={tomorrow}
                activities={tomorrowActivities}
                onPress={handleGoToTomorrow}
              />
            )}
          </>
        )}
      </ScrollView>

      {/* Full Timetable Button */}
      <View style={[styles.timetableButtonContainer, { backgroundColor: colors.background }]}>
        <Pressable
          onPress={() => setTimetableModalVisible(true)}
          style={({ pressed }) => [
            styles.timetableButton,
            {
              backgroundColor: colors.surface,
              borderColor: palette.primary[500],
              opacity: pressed ? 0.9 : 1,
            },
            shadows.lg,
          ]}
        >
          <Ionicons name="calendar" size={20} color={palette.primary[500]} />
          <Text style={[styles.timetableButtonText, { color: colors.text }]}>
            View Full Timetable
          </Text>
        </Pressable>
      </View>

      {/* Full Timetable Modal */}
      <Modal
        visible={timetableModalVisible}
        animationType="slide"
        presentationStyle="pageSheet"
        onRequestClose={() => setTimetableModalVisible(false)}
      >
        <SafeAreaView style={[styles.modalContainer, { backgroundColor: colors.background }]}>
          {/* Modal Header */}
          <View style={[styles.modalHeader, { borderBottomColor: colors.border }]}>
            <Pressable
              onPress={() => setTimetableModalVisible(false)}
              style={styles.modalBackButton}
            >
              <Ionicons name="chevron-down" size={24} color={colors.text} />
            </Pressable>
            <Text style={[styles.modalTitle, { color: colors.text }]}>
              Weekly Timetable
            </Text>
            <View style={styles.modalBackButton} />
          </View>

          {/* Week Selector */}
          <Pressable
            onPress={() => setWeekDropdownVisible(true)}
            style={[styles.weekSelector, { borderBottomColor: colors.border }]}
          >
            <View style={styles.weekLabelContainer}>
              <Text style={[styles.weekDateLabel, { color: colors.text }]}>
                {weekOptions[selectedWeek - 1]?.label.split(': ')[1] || 'October 2, 2025'}
              </Text>
              <View style={[styles.weekBadge, { backgroundColor: palette.primary[100] }]}>
                <Text style={[styles.weekBadgeText, { color: palette.primary[700] }]}>
                  Week {selectedWeek}
                </Text>
              </View>
            </View>
            <Ionicons
              name="chevron-down"
              size={20}
              color={colors.textSecondary}
            />
          </Pressable>

          {/* Week Timetable */}
          <WeekTimetable
            timetable={mockWeekTimetable}
            currentDay={currentDayName}
          />
        </SafeAreaView>
      </Modal>

      {/* Week Dropdown Modal */}
      <Modal
        visible={weekDropdownVisible}
        transparent={true}
        animationType="fade"
        onRequestClose={() => setWeekDropdownVisible(false)}
      >
        <Pressable
          style={styles.dropdownOverlay}
          onPress={() => setWeekDropdownVisible(false)}
        >
          <View style={[styles.dropdownContainer, { backgroundColor: colors.surface }]}>
            <ScrollView showsVerticalScrollIndicator={false}>
              {weekOptions.map((option) => (
                <Pressable
                  key={option.week}
                  onPress={() => {
                    setSelectedWeek(option.week);
                    setWeekDropdownVisible(false);
                  }}
                  style={({ pressed }) => [
                    styles.dropdownItem,
                    {
                      backgroundColor: selectedWeek === option.week
                        ? palette.primary[50]
                        : pressed
                        ? colors.surfaceSecondary
                        : colors.surface,
                    },
                  ]}
                >
                  <Text
                    style={[
                      styles.dropdownItemText,
                      {
                        color: selectedWeek === option.week ? palette.primary[700] : colors.text,
                        fontWeight: selectedWeek === option.week ? '600' : '400',
                      },
                    ]}
                  >
                    {option.label.split(': ')[1]} <Text style={{ fontWeight: '600' }}>[Week {option.week}]</Text>
                  </Text>
                </Pressable>
              ))}
            </ScrollView>
          </View>
        </Pressable>
      </Modal>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  scrollView: {
    flex: 1,
  },
  scrollContent: {
    paddingBottom: spacing['4xl'],
  },
  completedSection: {
    marginBottom: spacing.base,
  },
  sectionLabel: {
    fontSize: typography.size.xs,
    fontWeight: '600',
    letterSpacing: 0.5,
    marginHorizontal: spacing.base,
    marginBottom: spacing.sm,
  },
  sectionDivider: {
    height: 1,
    marginHorizontal: spacing.base,
    marginTop: spacing.sm,
    marginBottom: spacing.base,
  },
  upcomingSection: {
    marginTop: spacing.sm,
  },
  timetableButtonContainer: {
    paddingHorizontal: spacing.base,
    paddingVertical: spacing.md,
    borderTopWidth: 1,
    borderTopColor: 'transparent',
  },
  timetableButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: spacing.md,
    borderRadius: borderRadius.xl,
    borderWidth: 2,
  },
  timetableButtonText: {
    fontSize: typography.size.base,
    fontWeight: '600',
    marginLeft: spacing.sm,
  },
  modalContainer: {
    flex: 1,
  },
  modalHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: spacing.base,
    paddingVertical: spacing.md,
    borderBottomWidth: 1,
  },
  modalBackButton: {
    width: 44,
    height: 44,
    alignItems: 'center',
    justifyContent: 'center',
  },
  modalTitle: {
    fontSize: typography.size.lg,
    fontWeight: '600',
  },
  weekSelector: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: spacing.base,
    paddingVertical: spacing.md,
    borderBottomWidth: 1,
  },
  weekLabelContainer: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.sm,
  },
  weekDateLabel: {
    fontSize: typography.size.base,
    fontWeight: '400',
  },
  weekBadge: {
    paddingHorizontal: spacing.sm,
    paddingVertical: 2,
    borderRadius: borderRadius.sm,
  },
  weekBadgeText: {
    fontSize: typography.size.xs,
    fontWeight: '600',
  },
  dropdownOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'center',
    alignItems: 'center',
    padding: spacing.base,
  },
  dropdownContainer: {
    width: '100%',
    maxWidth: 400,
    maxHeight: '70%',
    borderRadius: borderRadius.lg,
    overflow: 'hidden',
  },
  dropdownItem: {
    paddingHorizontal: spacing.base,
    paddingVertical: spacing.md,
    borderBottomWidth: 1,
    borderBottomColor: palette.neutral[100],
  },
  dropdownItemText: {
    fontSize: typography.size.base,
  },
});
