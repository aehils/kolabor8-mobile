import React, { useState, useCallback } from 'react';
import { 
  View, 
  Text, 
  ScrollView, 
  StyleSheet, 
  RefreshControl,
  useColorScheme,
  Alert,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useRouter } from 'expo-router';
import Colors, { palette, spacing, typography } from '@/constants/Colors';
import {
  mockCurrentUser,
  mockCampusAlert,
  mockUpNextEvent,
  mockDeadlines,
  mockQuickActionCounts,
  mockModules,
  Deadline,
  Module,
  CampusAlert,
  isEventRemainingToday,
} from '@/constants/HomeData';
import {
  CampusAlertBanner,
  UpNextCard,
  DeadlinesSection,
  QuickActions,
  ModulesSection,
} from '@/components/home';

export default function HomeScreen() {
  const colorScheme = useColorScheme() ?? 'light';
  const colors = Colors[colorScheme];
  const router = useRouter();
  
  const [refreshing, setRefreshing] = useState(false);
  const [campusAlert, setCampusAlert] = useState<CampusAlert | null>(mockCampusAlert);

  const onRefresh = useCallback(() => {
    setRefreshing(true);
    // Simulate API refresh
    setTimeout(() => {
      setRefreshing(false);
    }, 1500);
  }, []);

  const handleUpNextPress = () => {
    router.push('/schedule');
  };

  const handleDeadlinePress = (deadline: Deadline) => {
    Alert.alert(
      deadline.title,
      `${deadline.courseCode} - ${deadline.courseName}\nDue: ${deadline.dueDate.toLocaleString()}`,
      [{ text: 'OK' }]
    );
  };

  const handleModulePress = (module: Module) => {
    Alert.alert(
      module.courseCode,
      module.courseName,
      [{ text: 'OK' }]
    );
  };

  const handleAnnouncementsPress = () => {
    Alert.alert('Announcements', 'Navigate to announcements page', [{ text: 'OK' }]);
  };

  const handleEventsPress = () => {
    Alert.alert('Events', 'Navigate to events page', [{ text: 'OK' }]);
  };

  const handleAlertDismiss = () => {
    setCampusAlert(null);
  };

  return (
    <SafeAreaView 
      style={[styles.container, { backgroundColor: colors.background }]} 
      edges={['top']}
    >
      <ScrollView
        style={styles.scrollView}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
        refreshControl={
          <RefreshControl
            refreshing={refreshing}
            onRefresh={onRefresh}
            tintColor={palette.primary[500]}
            colors={[palette.primary[500]]}
          />
        }
      >
        {/* Campus Alert Banner */}
        {campusAlert && (
          <CampusAlertBanner 
            alert={campusAlert} 
            onDismiss={handleAlertDismiss}
          />
        )}

        {/* Greeting */}
        <View style={styles.greetingContainer}>
          <Text style={[styles.greeting, { color: colors.text }]}>
            {mockCurrentUser.firstName} {mockCurrentUser.lastName}
          </Text>
        </View>

        {/* Up Next Card */}
        {isEventRemainingToday(mockUpNextEvent) && mockUpNextEvent && (
          <UpNextCard
            event={mockUpNextEvent}
            onPress={handleUpNextPress}
          />
        )}

        {/* Upcoming Deadlines */}
        <DeadlinesSection 
          deadlines={mockDeadlines}
          onDeadlinePress={handleDeadlinePress}
        />

        {/* Quick Actions */}
        <QuickActions
          counts={mockQuickActionCounts}
          onAnnouncementsPress={handleAnnouncementsPress}
          onEventsPress={handleEventsPress}
        />

        {/* My Modules */}
        <ModulesSection
          modules={mockModules}
          onModulePress={handleModulePress}
        />
      </ScrollView>
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
    paddingBottom: spacing['3xl'],
  },

  greetingContainer: {
    paddingHorizontal: spacing.base,
    paddingTop: spacing.lg,
    paddingBottom: spacing.base,
  },

  greeting: {
    fontSize: typography.size['2xl'],
    fontWeight: '700',
    letterSpacing: -0.5,
  },
});
