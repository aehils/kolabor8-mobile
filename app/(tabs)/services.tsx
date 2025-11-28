import React, { useState, useCallback } from 'react';
import {
  View,
  ScrollView,
  StyleSheet,
  RefreshControl,
  Alert,
  useColorScheme,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import Colors, { palette, spacing } from '@/constants/Colors';
import { services, mockServiceStatus, Service, ServiceStatusMap } from '@/constants/Services';
import PageHeader from '@/components/PageHeader';
import ServiceTile from '@/components/ServiceTile';

/**
 * ServicesScreen
 * 
 * Main services page displaying campus utilities and transactional actions.
 * Services are displayed as interactive tiles with real-time status.
 */

export default function ServicesScreen() {
  const colorScheme = useColorScheme() ?? 'light';
  const colors = Colors[colorScheme];
  
  const [refreshing, setRefreshing] = useState(false);
  const [statusData, setStatusData] = useState<ServiceStatusMap>(mockServiceStatus);
  
  const onRefresh = useCallback(() => {
    setRefreshing(true);
    // Simulate API refresh
    setTimeout(() => {
      setRefreshing(false);
    }, 1500);
  }, []);
  
  const handleServicePress = (service: Service) => {
    // For demo purposes, show an alert. In production, this would navigate.
    Alert.alert(
      service.name,
      `Navigate to ${service.route}`,
      [{ text: 'OK' }]
    );
  };
  
  // Get the featured service (Attendance)
  const featuredService = services.find(s => s.type === 'featured');

  // Get standard services for the grid
  const standardServices = services.filter(s => s.type === 'standard');

  // Create pairs for the grid (2 columns)
  const gridRows: Service[][] = [];
  for (let i = 0; i < standardServices.length; i += 2) {
    gridRows.push(standardServices.slice(i, i + 2));
  }
  
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
        <PageHeader
          title="Services"
        />
        
        <View style={styles.tilesContainer}>
          {/* Featured Service (Attendance) - Full Width */}
          {featuredService && (
            <View style={styles.featuredRow}>
              <ServiceTile
                service={featuredService}
                status={statusData[featuredService.id]}
                onPress={handleServicePress}
              />
            </View>
          )}

          {/* Standard Services Grid (2 columns) */}
          {gridRows.map((row, rowIndex) => (
            <View key={`row-${rowIndex}`} style={styles.gridRow}>
              {row.map((service, index) => (
                <ServiceTile
                  key={service.id}
                  service={service}
                  status={statusData[service.id]}
                  onPress={handleServicePress}
                  isFirstInRow={index === 0}
                  isSecondInRow={index === 1}
                />
              ))}
              {/* Add empty space if row has only one item */}
              {row.length === 1 && <View style={styles.emptyTile} />}
            </View>
          ))}
        </View>
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
  
  tilesContainer: {
    paddingHorizontal: spacing.base,
  },
  
  featuredRow: {
    marginBottom: spacing.base,
  },
  
  doubleHeightRow: {
    flexDirection: 'row',
    marginBottom: spacing.base,
  },
  
  stackedServices: {
    flex: 1,
    justifyContent: 'space-between',
  },
  
  stackedTile: {
    flex: 1,
  },
  
  stackedTileFirst: {
    marginBottom: spacing.sm / 2,
  },
  
  stackedTileLast: {
    marginTop: spacing.sm / 2,
  },
  
  gridRow: {
    flexDirection: 'row',
    marginBottom: spacing.base,
  },
  
  emptyTile: {
    flex: 1,
    marginLeft: spacing.sm / 2,
  },
});
