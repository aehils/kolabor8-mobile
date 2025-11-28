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

  const handleActivityPress = (activity: ScheduleActivity) => {
    Alert.alert(
      `${activity.courseCode} - ${activity.title}`,
      `${activity.location}\n${activity.instructor?.name || ''}\n\n${activity.notes || 'No notes'}`,
      [{ text: 'OK' }]
    );
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
                    onPress={() => handleActivityPress(activity)}
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
                onPress={() => handleActivityPress(nextActivity)}
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
                    onPress={() => handleActivityPress(activity)}
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
              borderColor: colors.border,
              opacity: pressed ? 0.9 : 1,
            },
            shadows.sm,
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
    borderWidth: 1,
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
});
