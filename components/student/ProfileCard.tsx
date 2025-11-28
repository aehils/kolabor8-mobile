import React, { useState, useRef } from 'react';
import { 
  View, 
  Text, 
  StyleSheet, 
  Pressable, 
  Animated,
  useColorScheme,
  Image,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import Colors, { palette, spacing, borderRadius, shadows, typography } from '@/constants/Colors';
import { StudentProfile } from '@/constants/StudentData';

interface ProfileCardProps {
  student: StudentProfile;
  onExpandQR?: () => void;
}

export default function ProfileCard({ student, onExpandQR }: ProfileCardProps) {
  const colorScheme = useColorScheme() ?? 'light';
  const colors = Colors[colorScheme];
  const [showQR, setShowQR] = useState(false);
  const flipAnim = useRef(new Animated.Value(0)).current;

  const handleToggle = () => {
    Animated.spring(flipAnim, {
      toValue: showQR ? 0 : 1,
      useNativeDriver: true,
      friction: 8,
      tension: 10,
    }).start();
    setShowQR(!showQR);
  };

  const frontInterpolate = flipAnim.interpolate({
    inputRange: [0, 1],
    outputRange: ['0deg', '180deg'],
  });

  const backInterpolate = flipAnim.interpolate({
    inputRange: [0, 1],
    outputRange: ['180deg', '360deg'],
  });

  const frontAnimatedStyle = {
    transform: [{ rotateY: frontInterpolate }],
  };

  const backAnimatedStyle = {
    transform: [{ rotateY: backInterpolate }],
  };

  // Generate initials for placeholder
  const initials = `${student.firstName[0]}${student.lastName[0]}`;

  return (
    <View style={styles.container}>
      {/* Card with flip animation */}
      <View style={styles.cardContainer}>
        {/* Front - Photo */}
        <Animated.View style={[styles.card, styles.cardFront, frontAnimatedStyle]}>
          <View style={[styles.photoContainer, { backgroundColor: palette.primary[100] }]}>
            {student.photoUrl ? (
              <Image source={{ uri: student.photoUrl }} style={styles.photo} />
            ) : (
              <Text style={[styles.initials, { color: palette.primary[500] }]}>
                {initials}
              </Text>
            )}
          </View>
        </Animated.View>

        {/* Back - QR Code */}
        <Animated.View style={[styles.card, styles.cardBack, backAnimatedStyle]}>
          <Pressable 
            onPress={onExpandQR}
            style={[styles.qrContainer, { backgroundColor: colors.surface }]}
          >
            {/* Placeholder QR - in production, use a QR library */}
            <View style={styles.qrPlaceholder}>
              <Ionicons name="qr-code" size={80} color={palette.neutral[800]} />
            </View>
            <Text style={[styles.qrHint, { color: colors.textSecondary }]}>
              Tap to expand
            </Text>
          </Pressable>
        </Animated.View>
      </View>

      {/* Toggle Button */}
      <Pressable
        onPress={handleToggle}
        style={({ pressed }) => [
          styles.toggleButton,
          { 
            backgroundColor: showQR ? palette.primary[500] : colors.surface,
            opacity: pressed ? 0.8 : 1,
          }
        ]}
      >
        <Ionicons 
          name={showQR ? 'person' : 'qr-code'} 
          size={18} 
          color={showQR ? palette.neutral[0] : palette.primary[500]} 
        />
        <Text style={[
          styles.toggleText, 
          { color: showQR ? palette.neutral[0] : palette.primary[500] }
        ]}>
          {showQR ? 'Show Photo' : 'Show QR'}
        </Text>
      </Pressable>

      {/* Name */}
      <Text style={[styles.name, { color: colors.text }]}>
        {student.firstName} {student.lastName}
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    paddingVertical: spacing.xl,
    paddingHorizontal: spacing.base,
  },
  cardContainer: {
    width: 140,
    height: 140,
    marginBottom: spacing.base,
  },
  card: {
    position: 'absolute',
    width: '100%',
    height: '100%',
    backfaceVisibility: 'hidden',
    borderRadius: borderRadius.xl,
    ...shadows.lg,
  },
  cardFront: {
    zIndex: 1,
  },
  cardBack: {
    zIndex: 0,
  },
  photoContainer: {
    width: '100%',
    height: '100%',
    borderRadius: borderRadius.xl,
    alignItems: 'center',
    justifyContent: 'center',
    overflow: 'hidden',
  },
  photo: {
    width: '100%',
    height: '100%',
  },
  initials: {
    fontSize: 48,
    fontWeight: '700',
  },
  qrContainer: {
    width: '100%',
    height: '100%',
    borderRadius: borderRadius.xl,
    alignItems: 'center',
    justifyContent: 'center',
  },
  qrPlaceholder: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  qrHint: {
    fontSize: typography.size.xs,
    marginTop: spacing.xs,
  },
  toggleButton: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: spacing.base,
    paddingVertical: spacing.sm,
    borderRadius: borderRadius.full,
    marginBottom: spacing.base,
    ...shadows.sm,
  },
  toggleText: {
    fontSize: typography.size.sm,
    fontWeight: '600',
    marginLeft: spacing.xs,
  },
  name: {
    fontSize: typography.size.xl,
    fontWeight: '700',
    letterSpacing: -0.5,
  },
});
