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
          <View style={[styles.weekSelector, { borderBottomColor: colors.border }]}>
            <Pressable
              onPress={() => setSelectedWeek(Math.max(1, selectedWeek - 1))}
              style={styles.weekArrow}
              disabled={selectedWeek === 1}
            >
              <Ionicons
                name="chevron-back"
                size={24}
                color={selectedWeek === 1 ? colors.textSecondary : palette.primary[500]}
              />
            </Pressable>
            <View style={styles.weekLabelContainer}>
              <Text style={[styles.weekLabel, { color: colors.text }]}>
                {weekOptions[selectedWeek - 1]?.label || 'Week 1'}
              </Text>
            </View>
            <Pressable
              onPress={() => setSelectedWeek(Math.min(12, selectedWeek + 1))}
              style={styles.weekArrow}
              disabled={selectedWeek === 12}
            >
              <Ionicons
                name="chevron-forward"
                size={24}
                color={selectedWeek === 12 ? colors.textSecondary : palette.primary[500]}
              />
            </Pressable>
          </View>

          {/* Week Timetable */}
          <WeekTimetable
            timetable={mockWeekTimetable}
            currentDay={currentDayName}
          />
        </SafeAreaView>
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
  weekArrow: {
    width: 44,
    height: 44,
    alignItems: 'center',
    justifyContent: 'center',
  },
  weekLabelContainer: {
    flex: 1,
    alignItems: 'center',
  },
  weekLabel: {
    fontSize: typography.size.base,
    fontWeight: '600',
  },
});
