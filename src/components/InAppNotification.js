import React, {useState, useEffect} from 'react';
import {StyleSheet, Text, View} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from 'react-native-reanimated';
import {TouchableOpacity} from 'react-native';
import {setIncomingNotificationStatus} from '../store/slices/notifications/notificationSlice';
import Icon from 'react-native-vector-icons/Ionicons';

export const InAppNotification = () => {
  const dispatch = useDispatch();
  const {notifications, incomingNotification} = useSelector(
    state => state.notification,
  );

  const opacityBox = useSharedValue(0);
  const topPositionBox = useSharedValue(-70);

  const style = useAnimatedStyle(() => ({
    opacity: withTiming(opacityBox.value, {duration: 300}),
    transform: [
      {
        translateY: withTiming(topPositionBox.value, {duration: 300}),
      },
    ],
  }));

  useEffect(() => {
    if (incomingNotification) {
      opacityBox.value = 1;
      topPositionBox.value = 0;
    } else {
      opacityBox.value = 0;
      topPositionBox.value = -70;
    }
  }, [incomingNotification]);

  return (
    <Animated.View View style={[styles.container, style]}>
      <View style={{flexDirection: 'row', width: '100%'}}>
        {notifications.length > 0 && (
          <View style={{width: '90%'}}>
            <Text style={{fontWeight: 'bold', color: 'black'}}>
              {notifications[notifications.length - 1]?.title}
            </Text>
            <Text>{notifications[notifications.length - 1]?.body}</Text>
          </View>
        )}
        <TouchableOpacity
          onPress={() => dispatch(setIncomingNotificationStatus(false))}
          style={styles.closeBtn}>
          <Icon name="close" size={25} />
        </TouchableOpacity>
      </View>
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: '95%',
    backgroundColor: '#fff',
    borderRadius: 10,
    padding: 10,
    height: 80,
    position: 'absolute',
    top: 10,
    left: 0,
    marginHorizontal: 10,
    elevation: 6,
    justifyContent: 'center',
    zIndex: 150,
  },
  closeBtn: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
