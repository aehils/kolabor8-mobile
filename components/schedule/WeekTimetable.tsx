import React, { useRef } from 'react';
import { View, Text, StyleSheet, ScrollView, useColorScheme } from 'react-native';
import Colors, { palette, spacing, borderRadius, typography } from '@/constants/Colors';
import { WeekTimetable as WeekTimetableType, TimetableSlot } from '@/constants/ScheduleData';

interface WeekTimetableProps {
  timetable: WeekTimetableType;
  currentDay?: string;
}

const DAYS = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri'];
const START_HOUR = 8;
const END_HOUR = 20;
const HOUR_WIDTH = 80;
const ROW_HEIGHT = 60;

export default function WeekTimetable({ timetable, currentDay }: WeekTimetableProps) {
  const colorScheme = useColorScheme() ?? 'light';
  const colors = Colors[colorScheme];

  const headerScrollRef = useRef<ScrollView>(null);
  const gridScrollRef = useRef<ScrollView>(null);

  const hours = Array.from(
    { length: END_HOUR - START_HOUR },
    (_, i) => START_HOUR + i
  );

  const handleHeaderScroll = (event: any) => {
    const scrollX = event.nativeEvent.contentOffset.x;
    gridScrollRef.current?.scrollTo({ x: scrollX, animated: false });
  };

  const handleGridScroll = (event: any) => {
    const scrollX = event.nativeEvent.contentOffset.x;
    headerScrollRef.current?.scrollTo({ x: scrollX, animated: false });
  };

  const formatHour = (hour: number) => {
    const suffix = hour >= 12 ? 'PM' : 'AM';
    const displayHour = hour > 12 ? hour - 12 : hour;
    return `${displayHour} ${suffix}`;
  };

  const getSlotStyle = (slot: TimetableSlot) => {
    const left = (slot.startHour - START_HOUR) * HOUR_WIDTH;
    const width = slot.duration * HOUR_WIDTH - 4;
    return { left, width };
  };

  // Detect conflicts (overlapping time slots) for a given day
  const getConflicts = (day: string) => {
    const slots = timetable[day] || [];
    const conflicts: string[] = [];

    for (let i = 0; i < slots.length; i++) {
      for (let j = i + 1; j < slots.length; j++) {
        const slot1 = slots[i];
        const slot2 = slots[j];
        const end1 = slot1.startHour + slot1.duration;
        const end2 = slot2.startHour + slot2.duration;

        // Check if they overlap
        if (
          (slot1.startHour < end2 && end1 > slot2.startHour) ||
          (slot2.startHour < end1 && end2 > slot1.startHour)
        ) {
          if (!conflicts.includes(slot1.id)) conflicts.push(slot1.id);
          if (!conflicts.includes(slot2.id)) conflicts.push(slot2.id);
        }
      }
    }

    return conflicts;
  };

  return (
    <View style={styles.container}>
      {/* Header Row with Time Slots */}
      <View style={styles.headerRow}>
        <View style={styles.dayColumn} />
        <ScrollView
          ref={headerScrollRef}
          horizontal
          showsHorizontalScrollIndicator={false}
          scrollEventThrottle={16}
          onScroll={handleHeaderScroll}
        >
          <View style={styles.timeHeadersContainer}>
            {hours.map((hour) => (
              <View
                key={hour}
                style={[
                  styles.timeHeader,
                  { width: HOUR_WIDTH, borderLeftColor: colors.border }
                ]}
              >
                <Text style={[styles.timeText, { color: colors.textSecondary }]}>
                  {formatHour(hour)}
                </Text>
              </View>
            ))}
          </View>
        </ScrollView>
      </View>

      {/* Day Rows with Sticky Labels */}
      <View style={styles.gridBody}>
        {/* Fixed Day Labels Column */}
        <View style={styles.fixedDayColumn}>
          {DAYS.map((day) => (
            <View
              key={day}
              style={[
                styles.dayLabel,
                {
                  backgroundColor: currentDay === day ? palette.forest[700] : colors.surface,
                  borderTopColor: palette.forest[400],
                  borderRightColor: palette.forest[400],
                }
              ]}
            >
              <Text style={[
                styles.dayText,
                { color: currentDay === day ? palette.gold[300] : colors.text }
              ]}>
                {day}
              </Text>
            </View>
          ))}
        </View>

        {/* Scrollable Time Grid */}
        <ScrollView
          ref={gridScrollRef}
          horizontal
          showsHorizontalScrollIndicator={true}
          scrollEventThrottle={16}
          onScroll={handleGridScroll}
        >
          <View style={styles.scrollableContent}>
            {DAYS.map((day) => {
              const conflicts = getConflicts(day);

              return (
                <View key={day} style={styles.dayRow}>
                  {/* Time Cells */}
                  <View style={styles.timeCellsContainer}>
                    {hours.map((hour) => {
                      const isOffPeak = hour < 9 || hour >= 17;
                      const baseColor = currentDay === day ? palette.forest[700] : colors.surface;
                      const backgroundColor = isOffPeak
                        ? palette.forest[800]
                        : baseColor;

                      return (
                        <View
                          key={hour}
                          style={[
                            styles.timeCell,
                            {
                              width: HOUR_WIDTH,
                              height: ROW_HEIGHT,
                              borderTopColor: palette.forest[400],
                              borderLeftColor: palette.forest[400],
                              backgroundColor,
                            }
                          ]}
                        />
                      );
                    })}

                    {/* Activity Blocks */}
                    {timetable[day]?.map((slot) => {
                      const position = getSlotStyle(slot);
                      const hasConflict = conflicts.includes(slot.id);

                      return (
                        <View
                          key={slot.id}
                          style={[
                            styles.activityBlock,
                            {
                              backgroundColor: palette.sage[600],
                              borderColor: palette.sage[400],
                              left: position.left,
                              width: position.width,
                            }
                          ]}
                        >
                          {hasConflict && (
                            <View style={styles.hatchOverlay} pointerEvents="none">
                              {Array.from({ length: 20 }).map((_, i) => (
                                <View
                                  key={i}
                                  style={[
                                    styles.hatchLine,
                                    {
                                      backgroundColor: palette.gold[400],
                                      left: i * 8,
                                    }
                                  ]}
                                />
                              ))}
                            </View>
                          )}
                          <Text style={[styles.blockText, { color: palette.neutral[0] }]} numberOfLines={2}>
                            {slot.courseCode}
                          </Text>
                        </View>
                      );
                    })}
                  </View>
                </View>
              );
            })}
          </View>
        </ScrollView>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  headerRow: {
    flexDirection: 'row',
    borderBottomWidth: 1,
    borderBottomColor: palette.forest[400],
  },
  dayColumn: {
    width: 60,
  },
  timeHeadersContainer: {
    flexDirection: 'row',
  },
  timeHeader: {
    paddingVertical: spacing.sm,
    alignItems: 'center',
    justifyContent: 'center',
    borderLeftWidth: 1,
  },
  timeText: {
    fontSize: typography.size.xs,
    fontWeight: '600',
  },
  gridBody: {
    flex: 1,
    flexDirection: 'row',
  },
  fixedDayColumn: {
    width: 60,
  },
  dayLabel: {
    width: 60,
    height: ROW_HEIGHT,
    alignItems: 'center',
    justifyContent: 'center',
    borderTopWidth: 1,
    borderRightWidth: 1,
  },
  dayText: {
    fontSize: typography.size.sm,
    fontWeight: '600',
  },
  scrollableContent: {
    flexDirection: 'column',
  },
  dayRow: {
    flexDirection: 'row',
  },
  timeCellsContainer: {
    flexDirection: 'row',
    position: 'relative',
  },
  timeCell: {
    borderTopWidth: 1,
    borderLeftWidth: 1,
  },
  activityBlock: {
    position: 'absolute',
    top: 4,
    bottom: 4,
    borderRadius: 2,
    padding: spacing.xs,
    overflow: 'hidden',
    borderWidth: 1,
  },
  blockText: {
    fontSize: typography.size.xs,
    fontWeight: '600',
  },
  hatchOverlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    overflow: 'hidden',
  },
  hatchLine: {
    position: 'absolute',
    top: -50,
    bottom: -50,
    width: 2,
    transform: [{ rotate: '45deg' }],
  },
});
