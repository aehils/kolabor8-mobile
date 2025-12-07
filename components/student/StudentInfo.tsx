import React from 'react';
import { 
  View, 
  Text, 
  StyleSheet, 
  Pressable, 
  Linking,
  useColorScheme,
  Alert,
} from 'react-native';
import * as Clipboard from 'expo-clipboard';
import { Ionicons } from '@expo/vector-icons';
import Colors, { palette, spacing, borderRadius, shadows, typography } from '@/constants/Colors';
import { StudentProfile } from '@/constants/StudentData';

interface StudentInfoProps {
  student: StudentProfile;
}

interface InfoRowProps {
  icon: keyof typeof Ionicons.glyphMap;
  label: string;
  value: string;
  onPress?: () => void;
  actionIcon?: keyof typeof Ionicons.glyphMap;
}

function InfoRow({ icon, label, value, onPress, actionIcon }: InfoRowProps) {
  const colorScheme = useColorScheme() ?? 'light';
  const colors = Colors[colorScheme];

  const content = (
    <View style={styles.infoRow}>
      <View style={[styles.iconContainer, { backgroundColor: palette.sage[100] }]}>
        <Ionicons name={icon} size={18} color={palette.sage[500]} />
      </View>
      <View style={styles.infoContent}>
        <Text style={[styles.infoLabel, { color: colors.textSecondary }]}>{label}</Text>
        <Text style={[styles.infoValue, { color: colors.text }]}>{value}</Text>
      </View>
      {actionIcon && (
        <Ionicons name={actionIcon} size={18} color={colors.textSecondary} />
      )}
    </View>
  );

  if (onPress) {
    return (
      <Pressable 
        onPress={onPress}
        style={({ pressed }) => [{ opacity: pressed ? 0.7 : 1 }]}
      >
        {content}
      </Pressable>
    );
  }

  return content;
}

export default function StudentInfo({ student }: StudentInfoProps) {
  const colorScheme = useColorScheme() ?? 'light';
  const colors = Colors[colorScheme];

  const handleCopyId = async () => {
    try {
      await Clipboard.setStringAsync(student.studentId);
      Alert.alert('Copied', 'Student ID copied to clipboard');
    } catch {
      Alert.alert('Error', 'Failed to copy to clipboard');
    }
  };

  const handleEmailPress = () => {
    Linking.openURL(`mailto:${student.email}`);
  };

  return (
    <View style={[styles.container, { backgroundColor: colors.surface }, shadows.md]}>
      <InfoRow
        icon="school-outline"
        label="Degree"
        value={`${student.degree.title} • ${student.yearLabel}`}
      />
      
      <View style={[styles.divider, { backgroundColor: colors.border }]} />
      
      <InfoRow
        icon="id-card-outline"
        label="Student ID"
        value={student.studentId}
        onPress={handleCopyId}
        actionIcon="copy-outline"
      />

      <View style={[styles.divider, { backgroundColor: colors.border }]} />

      <InfoRow
        icon="mail-outline"
        label="Email"
        value={student.email}
        onPress={handleEmailPress}
        actionIcon="open-outline"
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginHorizontal: spacing.base,
    marginBottom: spacing.lg,
    borderRadius: borderRadius.xl,
    padding: spacing.base,
  },
  infoRow: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: spacing.sm,
  },
  iconContainer: {
    width: 36,
    height: 36,
    borderRadius: borderRadius.md,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: spacing.md,
  },
  infoContent: {
    flex: 1,
  },
  infoLabel: {
    fontSize: typography.size.xs,
    marginBottom: 4,
  },
  infoValue: {
    fontSize: typography.size.base,
    fontWeight: '500',
  },
  divider: {
    height: 1,
    marginLeft: 48,
  },
});
