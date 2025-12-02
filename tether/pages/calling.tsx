import React, { useState, useEffect, useRef } from 'react';
import { 
  View, 
  Text, 
  ImageBackground, 
  TouchableOpacity,
  Modal,
  Animated,
  Easing,
  Image
} from 'react-native';
import { palette } from '../styles/palette';
import { ChevronLeft, Phone, PhoneOff } from 'lucide-react-native';
import convoStyles from '../styles/convoStyles';

interface CallingProps {
  contact: { id: string; name: string };
  onBack: () => void;
  onCallConnected: () => void;
}

export const Calling = ({ contact, onBack, onCallConnected }: CallingProps) => {
  const [isCallStarted, setIsCallStarted] = useState(true);
  const [dots, setDots] = useState('');
  
  // Animation values for ringing effect
  const pulseAnim = useRef(new Animated.Value(1)).current;
  const ringOpacity1 = useRef(new Animated.Value(0.7)).current;
  const ringOpacity2 = useRef(new Animated.Value(0.7)).current;
  const ringOpacity3 = useRef(new Animated.Value(0.7)).current;

  // Animated dots for "Ringing..."
  useEffect(() => {
    const dotsInterval = setInterval(() => {
      setDots(prev => {
        if (prev === '...') return '';
        return prev + '.';
      });
    }, 500);

    return () => clearInterval(dotsInterval);
  }, []);

  // Ringing animation
  useEffect(() => {
    // Pulse animation for avatar
    const pulse = Animated.loop(
      Animated.sequence([
        Animated.timing(pulseAnim, {
          toValue: 1.15,
          duration: 1000,
          easing: Easing.inOut(Easing.ease),
          useNativeDriver: true,
        }),
        Animated.timing(pulseAnim, {
          toValue: 1,
          duration: 1000,
          easing: Easing.inOut(Easing.ease),
          useNativeDriver: true,
        }),
      ])
    );

    // Ring animations (staggered)
    const ring1 = Animated.loop(
      Animated.sequence([
        Animated.timing(ringOpacity1, {
          toValue: 0,
          duration: 2000,
          useNativeDriver: true,
        }),
        Animated.timing(ringOpacity1, {
          toValue: 0.7,
          duration: 0,
          useNativeDriver: true,
        }),
      ])
    );

    const ring2 = Animated.loop(
      Animated.sequence([
        Animated.delay(666),
        Animated.timing(ringOpacity2, {
          toValue: 0,
          duration: 2000,
          useNativeDriver: true,
        }),
        Animated.timing(ringOpacity2, {
          toValue: 0.7,
          duration: 0,
          useNativeDriver: true,
        }),
      ])
    );

    const ring3 = Animated.loop(
      Animated.sequence([
        Animated.delay(1332),
        Animated.timing(ringOpacity3, {
          toValue: 0,
          duration: 2000,
          useNativeDriver: true,
        }),
        Animated.timing(ringOpacity3, {
          toValue: 0.7,
          duration: 0,
          useNativeDriver: true,
        }),
      ])
    );

    pulse.start();
    ring1.start();
    ring2.start();
    ring3.start();

    return () => {
      pulse.stop();
      ring1.stop();
      ring2.stop();
      ring3.stop();
    };
  }, []);

  // Simulate call connecting after 3-5 seconds
  useEffect(() => {
    if (isCallStarted) {
      const connectDelay = Math.random() * 2000 + 3000; // 3-5 seconds
      const timer = setTimeout(() => {
        onCallConnected();
      }, connectDelay);

      return () => clearTimeout(timer);
    }
  }, [isCallStarted]);

  const handleEndCall = () => {
    onBack();
  };

  return (
    <ImageBackground 
      source={require("../assets/backgrounds/background_vibrant.png")}
      style={convoStyles.background}
      resizeMode='cover'
    >
      <TouchableOpacity onPress={handleEndCall} style={convoStyles.backButton}>
        <ChevronLeft size={40} color={palette.slate} />
      </TouchableOpacity>

      <View style={convoStyles.container}>
        <Text style={convoStyles.statusText}>Calling...</Text>

        <View style={convoStyles.callingAvatarContainer}>
          {/* Animated rings */}
          <Animated.View 
            style={[
              convoStyles.callingRing,
              { 
                opacity: ringOpacity1,
                transform: [{ scale: 1.3 }]
              }
            ]} 
          />
          <Animated.View 
            style={[
              convoStyles.callingRing,
              { 
                opacity: ringOpacity2,
                transform: [{ scale: 1.6 }]
              }
            ]} 
          />
          <Animated.View 
            style={[
              convoStyles.callingRing,
              { 
                opacity: ringOpacity3,
                transform: [{ scale: 1.9 }]
              }
            ]} 
          />

          {/* Avatar */}
          <Animated.View 
            style={[
              convoStyles.callingAvatar,
              { transform: [{ scale: pulseAnim }] }
            ]}
          >
            <Image source={require('../assets/frogs/frog.png')} />
          </Animated.View>
        </View>

        <Text style={convoStyles.callingNameText}>{contact.name}</Text>
        <Text style={convoStyles.callingStatusText}>Ringing{dots}</Text>

        {/* Temporary Skip Button - Discrete text only */}
        <TouchableOpacity 
          style={{ paddingVertical: 12, marginBottom: 20 }}
          onPress={onCallConnected}
        >
          <Text style={[convoStyles.callingStatusText, { fontSize: 14, opacity: 0.6 }]}>
            (skip to conversation)
          </Text>
        </TouchableOpacity>

        <TouchableOpacity 
          style={convoStyles.endCallButton}
          onPress={handleEndCall}
        >
          <PhoneOff size={28} color={palette.cream} />
          <Text style={convoStyles.endCallButtonText}>END CALL</Text>
        </TouchableOpacity>
      </View>
    </ImageBackground>
  );
};