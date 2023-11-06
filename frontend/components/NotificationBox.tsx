import React, { useEffect, useRef } from 'react';
import { View, Text, TouchableOpacity, Animated } from 'react-native';

const NotificationBox: React.FC<{
    isVisible: boolean;
    onClose: () => void;
    content: string;
    isSuccess: boolean;
  }> = ({ isVisible, onClose, content, isSuccess }) => {
  const backgroundColor = isSuccess ? 'green' : '#B50B0B';
  const fadeAnim = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    if (isVisible) {
      Animated.timing(fadeAnim, {
        toValue: 1,
        duration: 500,
        useNativeDriver: true,
      }).start();
    } else {
      Animated.timing(fadeAnim, {
        toValue: 0,
        duration: 500,
        useNativeDriver: true,
      }).start();
    }
  }, [isVisible, fadeAnim]);

  const handleClose = () => {
    Animated.timing(fadeAnim, {
      toValue: 0,
      duration: 500,
      useNativeDriver: true,
    }).start(() => onClose());
  };

  return (
    <TouchableOpacity onPress={handleClose} style={{ marginLeft: 10 }}>
      <Animated.View
        style={{
          padding: 10,
          backgroundColor,
          borderRadius: 5,
          marginBottom: 10,
          flexDirection: 'row',
          alignItems: 'center',
          justifyContent: 'space-between',
          opacity: fadeAnim,
        }}
      >
        <Text style={{ color: 'white', flex: 1 }}>
          {content}
        </Text>
      </Animated.View>
    </TouchableOpacity>
  );
};

export default NotificationBox;