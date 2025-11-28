import React from 'react';
import { Tabs } from 'expo-router';
import { useColorScheme, Platform } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import Colors from '@/constants/Colors';

/**
 * Tab Layout
 * 
 * Order: Student | Services | Home | Schedule
 * Home is the default/initial tab (index)
 */

function TabBarIcon({ 
  name, 
  color, 
}: { 
  name: React.ComponentProps<typeof Ionicons>['name']; 
  color: string;
}) {
  return (
    <Ionicons 
      name={name} 
      size={24} 
      color={color}
      style={{ marginBottom: -2 }}
    />
  );
}

export default function TabLayout() {
  const colorScheme = useColorScheme() ?? 'light';
  const colors = Colors[colorScheme];

  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: colors.tint,
        tabBarInactiveTintColor: colors.tabIconDefault,
        tabBarStyle: {
          backgroundColor: colors.surface,
          borderTopColor: colors.border,
          borderTopWidth: 1,
          paddingTop: 8,
          paddingBottom: Platform.OS === 'ios' ? 24 : 8,
          height: Platform.OS === 'ios' ? 88 : 64,
        },
        tabBarLabelStyle: {
          fontSize: 11,
          fontWeight: '600',
          marginTop: 4,
        },
        headerShown: false,
      }}
    >
      {/* Tab 1: Student */}
      <Tabs.Screen
        name="student"
        options={{
          title: 'Student',
          tabBarIcon: ({ color, focused }) => (
            <TabBarIcon 
              name={focused ? 'person' : 'person-outline'} 
              color={color} 
            />
          ),
        }}
      />
      
      {/* Tab 2: Services */}
      <Tabs.Screen
        name="services"
        options={{
          title: 'Services',
          tabBarIcon: ({ color, focused }) => (
            <TabBarIcon 
              name={focused ? 'grid' : 'grid-outline'} 
              color={color}
            />
          ),
        }}
      />
      
      {/* Tab 3: Home (default) */}
      <Tabs.Screen
        name="index"
        options={{
          title: 'Home',
          tabBarIcon: ({ color, focused }) => (
            <TabBarIcon 
              name={focused ? 'home' : 'home-outline'} 
              color={color}
            />
          ),
        }}
      />
      
      {/* Tab 4: Schedule */}
      <Tabs.Screen
        name="schedule"
        options={{
          title: 'Schedule',
          tabBarIcon: ({ color, focused }) => (
            <TabBarIcon 
              name={focused ? 'calendar' : 'calendar-outline'} 
              color={color}
            />
          ),
        }}
      />
    </Tabs>
  );
}
