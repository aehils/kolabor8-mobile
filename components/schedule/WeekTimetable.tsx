import React from 'react';
import { View, Text, StyleSheet, ScrollView, useColorScheme } from 'react-native';
import Colors, { palette, spacing, borderRadius, typography } from '@/constants/Colors';
import { WeekTimetable as WeekTimetableType, TimetableSlot } from '@/constants/ScheduleData';

interface WeekTimetableProps {
  timetable: WeekTimetableType;
  currentDay?: string;
}

const DAYS = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri'];
const START_HOUR = 8;
const END_HOUR = 18;
const HOUR_HEIGHT = 60;

export default function WeekTimetable({ timetable, currentDay }: WeekTimetableProps) {
  const colorScheme = useColorScheme() ?? 'light';
  const colors = Colors[colorScheme];

  const hours = Array.from(
    { length: END_HOUR - START_HOUR },
    (_, i) => START_HOUR + i
  );

  const formatHour = (hour: number) => {
    const suffix = hour >= 12 ? 'PM' : 'AM';
    const displayHour = hour > 12 ? hour - 12 : hour;
    return `${displayHour} ${suffix}`;
  };

  const getSlotStyle = (slot: TimetableSlot) => {
    const top = (slot.startHour - START_HOUR) * HOUR_HEIGHT;
    const height = slot.duration * HOUR_HEIGHT - 4;
    return { top, height };
  };

  return (
    <ScrollView 
      style={styles.container}
      showsVerticalScrollIndicator={false}
    >
      <View style={styles.grid}>
        {/* Header Row */}
        <View style={styles.headerRow}>
          <View style={styles.timeColumn} />
          {DAYS.map((day) => (
            <View 
              key={day} 
              style={[
                styles.dayHeader,
                currentDay === day && { backgroundColor: palette.primary[50] }
              ]}
            >
              <Text style={[
                styles.dayText,
                { color: currentDay === day ? palette.primary[500] : colors.text }
              ]}>
                {day}
              </Text>
            </View>
          ))}
        </View>

        {/* Time Grid */}
        <View style={styles.gridBody}>
          {/* Time Labels */}
          <View style={styles.timeColumn}>
            {hours.map((hour) => (
              <View key={hour} style={[styles.timeCell, { height: HOUR_HEIGHT }]}>
                <Text style={[styles.timeText, { color: colors.textSecondary }]}>
                  {formatHour(hour)}
                </Text>
              </View>
            ))}
          </View>

          {/* Day Columns */}
          {DAYS.map((day) => (
            <View 
              key={day} 
              style={[
                styles.dayColumn,
                { borderLeftColor: colors.border },
                currentDay === day && { backgroundColor: palette.primary[50] + '30' }
              ]}
            >
              {/* Hour lines */}
              {hours.map((hour) => (
                <View 
                  key={hour} 
                  style={[
                    styles.hourLine, 
                    { 
                      height: HOUR_HEIGHT,
                      borderBottomColor: colors.border,
                    }
                  ]} 
                />
              ))}

              {/* Activity Blocks */}
              {timetable[day]?.map((slot) => {
                const position = getSlotStyle(slot);
                return (
                  <View
                    key={slot.id}
                    style={[
                      styles.activityBlock,
                      {
                        backgroundColor: slot.color,
                        top: position.top,
                        height: position.height,
                      }
                    ]}
                  >
                    <Text style={styles.blockText} numberOfLines={2}>
                      {slot.courseCode}
                    </Text>
                  </View>
                );
              })}
            </View>
          ))}
        </View>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  grid: {
    flexDirection: 'column',
  },
  headerRow: {
    flexDirection: 'row',
    borderBottomWidth: 1,
    borderBottomColor: palette.neutral[200],
  },
  timeColumn: {
    width: 50,
  },
  dayHeader: {
    flex: 1,
    paddingVertical: spacing.sm,
    alignItems: 'center',
  },
  dayText: {
    fontSize: typography.size.sm,
    fontWeight: '600',
  },
  gridBody: {
    flexDirection: 'row',
  },
  timeCell: {
    justifyContent: 'flex-start',
    paddingTop: 2,
    paddingRight: spacing.xs,
  },
  timeText: {
    fontSize: typography.size.xs,
    textAlign: 'right',
  },
  dayColumn: {
    flex: 1,
    position: 'relative',
    borderLeftWidth: 1,
  },
  hourLine: {
    borderBottomWidth: 1,
  },
  activityBlock: {
    position: 'absolute',
    left: 2,
    right: 2,
    borderRadius: borderRadius.sm,
    padding: spacing.xs,
    overflow: 'hidden',
  },
  blockText: {
    fontSize: typography.size.xs,
    fontWeight: '600',
    color: palette.neutral[0],
  },
});
