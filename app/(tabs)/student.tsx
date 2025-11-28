import React, { useState } from 'react';
import { 
  View,
  ScrollView, 
  StyleSheet, 
  Alert,
  Modal,
  Pressable,
  useColorScheme,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import Colors, { palette, spacing, borderRadius } from '@/constants/Colors';
import { mockStudentProfile, studentMenuSections, MenuItem } from '@/constants/StudentData';
import { 
  ProfileCard, 
  StudentInfo, 
  MenuSection, 
  LogoutButton 
} from '@/components/student';

export default function StudentScreen() {
  const colorScheme = useColorScheme() ?? 'light';
  const colors = Colors[colorScheme];
  const [qrModalVisible, setQrModalVisible] = useState(false);

  const handleMenuItemPress = (item: MenuItem) => {
    Alert.alert(
      item.label,
      `Navigate to ${item.route}`,
      [{ text: 'OK' }]
    );
  };

  const handleExpandQR = () => {
    setQrModalVisible(true);
  };

  const handleLogout = () => {
    Alert.alert(
      'Log Out',
      'Are you sure you want to log out?',
      [
        { text: 'Cancel', style: 'cancel' },
        { text: 'Log Out', style: 'destructive', onPress: () => {
          Alert.alert('Logged out', 'You have been logged out');
        }},
      ]
    );
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
      >
        {/* Profile Card with Photo/QR Toggle */}
        <ProfileCard 
          student={mockStudentProfile} 
          onExpandQR={handleExpandQR}
        />

        {/* Student Info Card */}
        <StudentInfo student={mockStudentProfile} />

        {/* Menu Sections */}
        {studentMenuSections.map((section) => (
          <MenuSection
            key={section.title}
            section={section}
            onItemPress={handleMenuItemPress}
          />
        ))}

        {/* Logout Button */}
        <LogoutButton onPress={handleLogout} />
      </ScrollView>

      {/* Full Screen QR Modal */}
      <Modal
        visible={qrModalVisible}
        animationType="fade"
        transparent={true}
        onRequestClose={() => setQrModalVisible(false)}
      >
        <Pressable 
          style={styles.modalOverlay}
          onPress={() => setQrModalVisible(false)}
        >
          <View style={[styles.modalContent, { backgroundColor: colors.surface }]}>
            <View style={styles.qrLarge}>
              <Ionicons name="qr-code" size={200} color={palette.neutral[800]} />
            </View>
            <Pressable
              style={[styles.closeButton, { backgroundColor: colors.surfaceSecondary }]}
              onPress={() => setQrModalVisible(false)}
            >
              <Ionicons name="close" size={24} color={colors.text} />
            </Pressable>
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
    paddingBottom: spacing['3xl'],
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.8)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  modalContent: {
    width: 280,
    padding: spacing.xl,
    borderRadius: borderRadius['2xl'],
    alignItems: 'center',
  },
  qrLarge: {
    padding: spacing.base,
  },
  closeButton: {
    position: 'absolute',
    top: spacing.sm,
    right: spacing.sm,
    width: 36,
    height: 36,
    borderRadius: 18,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
