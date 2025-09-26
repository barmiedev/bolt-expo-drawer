import React, { useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Modal, Dimensions } from 'react-native';
import Animated, { 
  useSharedValue, 
  useAnimatedStyle, 
  withTiming, 
  runOnJS 
} from 'react-native-reanimated';
import { 
  X, 
  Home, 
  Search, 
  User, 
  Settings, 
  HelpCircle, 
  LogOut,
  Bookmark,
  Heart,
  Share2
} from 'lucide-react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

const { width } = Dimensions.get('window');

interface DrawerNavigationProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function DrawerNavigation({ isOpen, onClose }: DrawerNavigationProps) {
  const translateX = useSharedValue(-width);
  const opacity = useSharedValue(0);

  const menuItems = [
    { icon: Home, label: 'Home', subtitle: 'Main dashboard' },
    { icon: Search, label: 'Search', subtitle: 'Find content' },
    { icon: User, label: 'Profile', subtitle: 'Your account' },
    { icon: Bookmark, label: 'Bookmarks', subtitle: 'Saved items' },
    { icon: Heart, label: 'Favorites', subtitle: 'Liked content' },
    { icon: Share2, label: 'Share', subtitle: 'Share with friends' },
  ];

  const bottomMenuItems = [
    { icon: Settings, label: 'Settings' },
    { icon: HelpCircle, label: 'Help & Support' },
    { icon: LogOut, label: 'Sign Out' },
  ];

  useEffect(() => {
    if (isOpen) {
      translateX.value = withTiming(0, { duration: 300 });
      opacity.value = withTiming(0.5, { duration: 300 });
    } else {
      translateX.value = withTiming(-width, { duration: 300 });
      opacity.value = withTiming(0, { duration: 300 });
    }
  }, [isOpen]);

  const animatedDrawerStyle = useAnimatedStyle(() => {
    return {
      transform: [{ translateX: translateX.value }],
    };
  });

  const animatedOverlayStyle = useAnimatedStyle(() => {
    return {
      opacity: opacity.value,
    };
  });

  const handleClose = () => {
    runOnJS(onClose)();
  };

  return (
    <Modal
      visible={isOpen}
      transparent
      animationType="none"
      statusBarTranslucent
      onRequestClose={onClose}
    >
      <View style={styles.container}>
        <Animated.View style={[styles.overlay, animatedOverlayStyle]}>
          <TouchableOpacity
            style={styles.overlayTouchable}
            onPress={handleClose}
            activeOpacity={1}
          />
        </Animated.View>

        <Animated.View style={[styles.drawer, animatedDrawerStyle]}>
          <SafeAreaView style={styles.drawerContent}>
            <View style={styles.header}>
              <View style={styles.profileSection}>
                <View style={styles.avatar}>
                  <Text style={styles.avatarText}>JD</Text>
                </View>
                <View style={styles.userInfo}>
                  <Text style={styles.userName}>John Doe</Text>
                  <Text style={styles.userEmail}>john.doe@example.com</Text>
                </View>
              </View>
              <TouchableOpacity style={styles.closeButton} onPress={handleClose}>
                <X size={24} color="#6b7280" />
              </TouchableOpacity>
            </View>

            <View style={styles.menuSection}>
              <Text style={styles.sectionTitle}>NAVIGATE</Text>
              {menuItems.map((item, index) => (
                <TouchableOpacity key={index} style={styles.menuItem}>
                  <View style={styles.menuIcon}>
                    <item.icon size={20} color="#6b7280" />
                  </View>
                  <View style={styles.menuTextContainer}>
                    <Text style={styles.menuLabel}>{item.label}</Text>
                    <Text style={styles.menuSubtitle}>{item.subtitle}</Text>
                  </View>
                </TouchableOpacity>
              ))}
            </View>

            <View style={styles.bottomSection}>
              <Text style={styles.sectionTitle}>ACCOUNT</Text>
              {bottomMenuItems.map((item, index) => (
                <TouchableOpacity key={index} style={styles.bottomMenuItem}>
                  <View style={styles.menuIcon}>
                    <item.icon size={20} color="#6b7280" />
                  </View>
                  <Text style={styles.bottomMenuLabel}>{item.label}</Text>
                </TouchableOpacity>
              ))}
            </View>
          </SafeAreaView>
        </Animated.View>
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  overlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: '#000000',
  },
  overlayTouchable: {
    flex: 1,
  },
  drawer: {
    position: 'absolute',
    left: 0,
    top: 0,
    bottom: 0,
    width: width * 0.85,
    backgroundColor: '#ffffff',
    elevation: 16,
    shadowColor: '#000',
    shadowOffset: { width: 2, height: 0 },
    shadowOpacity: 0.3,
    shadowRadius: 12,
  },
  drawerContent: {
    flex: 1,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: 24,
    borderBottomWidth: 1,
    borderBottomColor: '#f3f4f6',
  },
  profileSection: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  avatar: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: '#3B82F6',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 12,
  },
  avatarText: {
    fontSize: 18,
    fontWeight: '700',
    color: '#ffffff',
  },
  userInfo: {
    flex: 1,
  },
  userName: {
    fontSize: 16,
    fontWeight: '600',
    color: '#111827',
    marginBottom: 2,
  },
  userEmail: {
    fontSize: 12,
    color: '#6b7280',
  },
  closeButton: {
    padding: 8,
    borderRadius: 8,
    backgroundColor: '#f3f4f6',
  },
  menuSection: {
    flex: 1,
    paddingTop: 24,
  },
  sectionTitle: {
    fontSize: 12,
    fontWeight: '600',
    color: '#9ca3af',
    paddingHorizontal: 24,
    marginBottom: 12,
    letterSpacing: 0.5,
  },
  menuItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 24,
    paddingVertical: 16,
  },
  menuIcon: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#f8fafc',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 16,
  },
  menuTextContainer: {
    flex: 1,
  },
  menuLabel: {
    fontSize: 16,
    fontWeight: '500',
    color: '#111827',
    marginBottom: 2,
  },
  menuSubtitle: {
    fontSize: 12,
    color: '#6b7280',
  },
  bottomSection: {
    paddingVertical: 24,
    borderTopWidth: 1,
    borderTopColor: '#f3f4f6',
  },
  bottomMenuItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 24,
    paddingVertical: 12,
  },
  bottomMenuLabel: {
    fontSize: 16,
    fontWeight: '500',
    color: '#111827',
  },
});