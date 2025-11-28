import React from 'react';
import { 
  View, 
  Text, 
  StyleSheet, 
  Pressable, 
  useColorScheme,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import Colors, { palette, spacing, borderRadius, shadows, typography } from '@/constants/Colors';
import { MenuSection as MenuSectionType, MenuItem } from '@/constants/StudentData';

interface MenuSectionProps {
  section: MenuSectionType;
  onItemPress?: (item: MenuItem) => void;
}

interface MenuItemRowProps {
  item: MenuItem;
  onPress?: () => void;
  isFirst: boolean;
  isLast: boolean;
}

function MenuItemRow({ item, onPress, isFirst, isLast }: MenuItemRowProps) {
  const colorScheme = useColorScheme() ?? 'light';
  const colors = Colors[colorScheme];

  return (
    <>
      <Pressable
        onPress={onPress}
        style={({ pressed }) => [
          styles.menuItem,
          { opacity: pressed ? 0.7 : 1 }
        ]}
      >
        <View style={[styles.menuIconContainer, { backgroundColor: palette.primary[50] }]}>
          <Ionicons 
            name={item.icon as any} 
            size={20} 
            color={palette.primary[500]} 
          />
        </View>
        
        <Text style={[styles.menuLabel, { color: colors.text }]}>
          {item.label}
        </Text>
        
        {item.badge && (
          <View style={[
            styles.badge, 
            { backgroundColor: item.badgeColor || palette.primary[100] }
          ]}>
            <Text style={[
              styles.badgeText, 
              { color: item.badgeColor ? palette.neutral[0] : palette.primary[600] }
            ]}>
              {item.badge}
            </Text>
          </View>
        )}
        
        <Ionicons 
          name="chevron-forward" 
          size={18} 
          color={colors.textSecondary} 
        />
      </Pressable>
      
      {!isLast && (
        <View style={[styles.divider, { backgroundColor: colors.border }]} />
      )}
    </>
  );
}

export default function MenuSection({ section, onItemPress }: MenuSectionProps) {
  const colorScheme = useColorScheme() ?? 'light';
  const colors = Colors[colorScheme];

  return (
    <View style={styles.container}>
      <Text style={[styles.sectionTitle, { color: colors.textSecondary }]}>
        {section.title}
      </Text>
      
      <View style={[styles.menuCard, { backgroundColor: colors.surface }, shadows.sm]}>
        {section.items.map((item, index) => (
          <MenuItemRow
            key={item.id}
            item={item}
            onPress={() => onItemPress?.(item)}
            isFirst={index === 0}
            isLast={index === section.items.length - 1}
          />
        ))}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginBottom: spacing.lg,
    paddingHorizontal: spacing.base,
  },
  sectionTitle: {
    fontSize: typography.size.sm,
    fontWeight: '600',
    textTransform: 'uppercase',
    letterSpacing: 0.5,
    marginBottom: spacing.sm,
    marginLeft: spacing.xs,
  },
  menuCard: {
    borderRadius: borderRadius.xl,
    overflow: 'hidden',
  },
  menuItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: spacing.md,
    paddingHorizontal: spacing.base,
  },
  menuIconContainer: {
    width: 36,
    height: 36,
    borderRadius: borderRadius.md,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: spacing.md,
  },
  menuLabel: {
    flex: 1,
    fontSize: typography.size.base,
    fontWeight: '500',
  },
  badge: {
    paddingHorizontal: spacing.sm,
    paddingVertical: spacing.xs,
    borderRadius: borderRadius.full,
    marginRight: spacing.sm,
  },
  badgeText: {
    fontSize: typography.size.xs,
    fontWeight: '600',
  },
  divider: {
    height: 1,
    marginLeft: 64,
  },
});
