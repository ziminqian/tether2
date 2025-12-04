import React, { useState, useEffect, useRef } from 'react';
import { 
  View, 
  Text, 
  SafeAreaView, 
  ImageBackground, 
  TouchableOpacity,
  ScrollView,
  Image,
  Dimensions,
  StyleSheet,
  Animated,
} from 'react-native';
import styles from '../../styles/styles';
import { palette } from '../../styles/palette';
import { ChevronDown, ChevronLeft, ChevronUp, Phone, X } from 'lucide-react-native';
import portalStyles from '../../styles/portalStyles';
import { createClient } from '@supabase/supabase-js';
import { Reflect } from './reflect';

const supabaseUrl = 'https://iyjdjalbdcstlskoildv.supabase.co';
const supabaseKey =
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Iml5amRqYWxiZGNzdGxza29pbGR2Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjQzOTA3NTEsImV4cCI6MjA3OTk2Njc1MX0.Oh5zp-WhW8DpzXRYP4exF14cq_oscot7zJsKkzwrPK4';
const db = createClient(supabaseUrl, supabaseKey);

const strokemap = require('../../assets/portal/strokemap.png');

const together = require('../../assets/portal/together.png');
const expectationsnum = require('../../assets/portal/expectation#image.png');
const reflect = require('../../assets/portal/reflect_icon.png');

const one = require('../../assets/portal/one.png');
const spiral = require('../../assets/portal/spiral_res.png');
const invite = require('../../assets/portal/invite.png');
const two = require('../../assets/portal/two.png');
const expectations = require('../../assets/portal/expectations_.png');
const lock = require('../../assets/portal/graylock.png');
const assurances = require('../../assets/portal/assurances.png');
const three = require('../../assets/portal/3.png');
const four = require('../../assets/portal/four.png');
const reflectwhite = require('../../assets/portal/reflectwhite.png');
const down = require('../../assets/portal/down.png');

const maptwo = require('../../assets/portal/maptwo.png');

const { width: SCREEN_WIDTH, height: SCREEN_HEIGHT } = Dimensions.get('window');

interface PortalProps {
  contact: { id: string; name: string; color: any };
  userColor?: any;
  isNewPortalRequest?: boolean;
  expectationsCompleted?: boolean;
  onBack: () => void;
  onNavigateToExpectations: () => void;
  onNavigateToReflect: () => void;
  onNavigateToAcceptInvite: () => void;
  onNavigateToLockedStep: () => void;
  onNavigateToAIAssurance: () => void;
  onStartCall?: () => void;
  onComplete?: () => void;
}

export const Portal = ({
  contact,
  userColor,
  isNewPortalRequest = false,
  expectationsCompleted = false,
  onBack,
  onNavigateToExpectations,
  onNavigateToReflect,
  onNavigateToAcceptInvite,
  onNavigateToLockedStep,
  onNavigateToAIAssurance,
  onStartCall,
  onComplete,
}: PortalProps) => {
  const [hasCompletedExpectations, setHasCompletedExpectations] =
    useState(expectationsCompleted);

  // when true, show the reflect page
  const [showReflect, setShowReflect] = useState(false);
  
  // Add ref for the main portal ScrollView
  const scrollViewRef = useRef<ScrollView>(null);
  
  // Add state to track if user has accepted the invite (completed step 1)
  const [hasAcceptedInvite, setHasAcceptedInvite] = useState(false);
  
  // Track if we're in the lower half of the portal
  const [isInLowerHalf, setIsInLowerHalf] = useState(false);
  
  // Track if complete modal is visible
  const [showCompleteModal, setShowCompleteModal] = useState(false);

  useEffect(() => {
    const checkExpectationsCompletion = async () => {
      try {
        const sections = ['section1', 'section2', 'section3', 'section4', 'section5'];
        const promises = sections.map((section) =>
          db
            .from('expectations2')
            .select('id')
            .eq('section', section)
            .order('created_at', { ascending: false })
            .limit(1)
        );

        const results = await Promise.all(promises);
        const allCompleted = results.every(
          (result) => result.data && result.data.length > 0
        );
        setHasCompletedExpectations(allCompleted || expectationsCompleted);
      } catch (error) {
        console.error('Error checking expectations completion:', error);
        setHasCompletedExpectations(expectationsCompleted);
      }
    };

    const checkInviteAcceptance = async () => {
      try {
        // Add your logic here to check if user has accepted invite
        // For now, assume it's completed if not a new portal request
        setHasAcceptedInvite(!isNewPortalRequest);
      } catch (error) {
        console.error('Error checking invite acceptance:', error);
      }
    };

    checkExpectationsCompletion();
    checkInviteAcceptance();
  }, [expectationsCompleted, isNewPortalRequest]);

  const scrollToLowerHalf = () => {
    scrollViewRef.current?.scrollTo({ 
      y: SCREEN_HEIGHT, 
      animated: true 
    });
    setTimeout(() => setIsInLowerHalf(true), 800);
  };

  const scrollToUpperHalf = () => {
    scrollViewRef.current?.scrollTo({ 
      y: 0, 
      animated: true 
    });
    setTimeout(() => setIsInLowerHalf(false), 800);
  };

  const handleScroll = (event: any) => {
    const offsetY = event.nativeEvent.contentOffset.y;
    setIsInLowerHalf(offsetY > SCREEN_HEIGHT / 2);
  };

  // --------- REFLECT PAGE ----------
  if (showReflect) {
    return (
      <Reflect onBack={() => setShowReflect(false)} />
    );
  }

  // --------- SINGLE SCROLLABLE PORTAL SCREEN ----------
  return (
    <ImageBackground
      source={require('../../assets/backgrounds/background_vibrant.png')}
      style={{ flex: 1, width: '100%', height: '100%' }}
      resizeMode="cover"
    >
      <SafeAreaView style={{ flex: 1, overflow: 'visible' }}>
        <View style={styles.screen}>
          <View style={[styles.heading, { marginBottom: 0, zIndex: 100 }]}>
            <TouchableOpacity onPress={onBack} style={styles.backButton}>
              <ChevronLeft size={40} color={palette.slate} />
            </TouchableOpacity>
          </View>

          <ScrollView 
            ref={scrollViewRef}
            style={{ flex: 1 }}
            contentContainerStyle={{
              height: SCREEN_HEIGHT * 2,
            }}
            showsVerticalScrollIndicator={false}
            scrollEnabled={true}
            onScroll={handleScroll}
            scrollEventThrottle={16}
          >
            {/* Spacer for upper half content - keeps original layout positioning */}
            <View style={{ height: SCREEN_HEIGHT }} />
            
            {/* ========== LOWER HALF - FULL MAP VIEW ========== */}
            <View style={{ height: SCREEN_HEIGHT, width: SCREEN_WIDTH, paddingHorizontal: 16, paddingBottom: 32, alignItems: 'center' }}>
              {/* Together image */}
              <Image
                source={together}
                style={{
                  width: SCREEN_WIDTH * 1.2,
                  resizeMode: 'contain',
                  marginTop: 0,
                  marginBottom: 0,
                  top: -20,
                  left: -8
                }}
              />

              {/* Map image */}
              <Image
                source={maptwo}
                style={{
                  width: SCREEN_WIDTH * 0.6,
                  height: SCREEN_HEIGHT * 0.4,
                  resizeMode: 'contain',
                  marginTop: -150,
                }}
              />
            </View>
          </ScrollView>
        </View>
      </SafeAreaView>

      {/* ABSOLUTE POSITIONED CONTENT - UPPER HALF (original portal elements) */}
      {/* Only show upper half elements when not in lower half */}
      {!isInLowerHalf && (
        <>
      {/* Two frogs in upper right */}
      <View style={portalStyles.frogsContainer}>
        <View style={portalStyles.frogPair}>
          {/* User's frog (left) */}
          <View style={portalStyles.singleFrog}>
            <Image 
              source={require('../../assets/frogs/cute_frog_body.png')}
              style={[
                portalStyles.frogBody,
                { height: 37 },
                { transform: [{ translateY: 6 }, { translateX: 9 }, { scaleX: -1 }] },
              ]}
              resizeMode="contain"
              tintColor={userColor} 
            />
            <Image 
              source={require('../../assets/frogs/cute_frog_outline.png')}
              style={[
                portalStyles.frogBody,
                { position: 'absolute', height: 46 },
                { transform: [{ translateY: 6 }, { translateX: 9 }, { scaleX: -1 }] },
              ]}
              resizeMode="contain"
            />
            <Image 
              source={require('../../assets/frogs/cute_frog_cheeks.png')}
              style={[
                portalStyles.frogBody,
                { position: 'absolute', height: 44 },
                { transform: [{ translateY: 4 }, { translateX: 3 }, { scaleX: -1 }] },
              ]}
            />
          </View>

          {/* Contact's frog (right) */}
          <View style={portalStyles.singleFrog}>
            <Image 
              source={require('../../assets/frogs/cute_frog_body.png')}
              style={[
                portalStyles.frogBody,
                { height: 37 },
                { transform: [{ translateY: 6 }, { translateX: -5 }] },
              ]}
              resizeMode="contain"
              tintColor={contact.color || palette.sage}
            />
            <Image 
              source={require('../../assets/frogs/cute_frog_outline.png')}
              style={[
                portalStyles.frogBody,
                { position: 'absolute', height: 46 },
                { transform: [{ translateY: 6 }, { translateX: -5 }] },
              ]}
              resizeMode="contain"
            />
            <Image 
              source={require('../../assets/frogs/cute_frog_cheeks.png')}
              style={[
                portalStyles.frogBody,
                { position: 'absolute', height: 44 },
                { transform: [{ translateY: 4 }, { translateX: 0 }] },
              ]}
            />
          </View>
        </View>

        <View style={portalStyles.labelsContainer}>
          <Text style={portalStyles.userGraphicLabel}>You</Text>
          <Text style={portalStyles.userGraphicLabel}>{contact.name}</Text>
        </View>
      </View>

      <View style={[portalStyles.spiralTouchable, { alignSelf: 'flex-start' }]}>
        <TouchableOpacity onPress={onNavigateToAcceptInvite}>
          <Image 
            source={hasAcceptedInvite ? one : lock} 
            style={portalStyles.one} 
          />
        </TouchableOpacity>
      </View>
      <Image 
        source={invite} 
        style={portalStyles.invite} 
      />

      <Image 
        source={spiral} 
        style={portalStyles.spiral} 
      />

      <TouchableOpacity 
        onPress={() => {
          if (isNewPortalRequest || !hasAcceptedInvite) {
            onNavigateToLockedStep();
          } else {
            onNavigateToExpectations();
          }
        }}
        style={portalStyles.expectationsTouchable}
      >
        <Image 
          source={(isNewPortalRequest || !hasAcceptedInvite) ? lock : two} 
          style={portalStyles.two} 
        />
      </TouchableOpacity>
      <Image 
        source={expectations} 
        style={portalStyles.expectationsImage} 
      />

      <View style={[portalStyles.reflectContainer]}> 
        <TouchableOpacity 
          onPress={() => {
            if (isNewPortalRequest || !hasCompletedExpectations) {
              onNavigateToLockedStep();
            } else {
              onNavigateToAIAssurance();
            }
          }}
          style={portalStyles.reflectTouchable}
        > 
          <Image 
            source={(isNewPortalRequest || !hasCompletedExpectations) ? lock : three} 
            style={portalStyles.lock} 
          />
        </TouchableOpacity>
      </View>
      <Image 
        source={assurances} 
        style={portalStyles.assurances} 
      />
      
      <TouchableOpacity 
        style={[portalStyles.portalCallButton, {bottom: 165, left: 163}]}
        onPress={onStartCall}
      >
        <View style={[portalStyles.portalCallButtonInner, {}]}>
          <Phone size={34} color={palette.cream} />
        </View>
      </TouchableOpacity>

      <View style={portalStyles.elementcontainer}>
        <Image 
          source={strokemap} 
          style={portalStyles.strokemap} 
        />
        <Image 
          source={together} 
          style={[portalStyles.together, {top: -25, width: 600, height: 400}]} 
        />
      </View>

      {/* See full map button - only visible in upper half */}
      <View
        style={{
          position: 'absolute',
          bottom: 20,
          alignSelf: 'center',
        }}
      >
        <TouchableOpacity
          onPress={scrollToLowerHalf}
          style={portalStyles.scrollButton}
        >
          <ChevronDown size={16} color="white" />
          <Text style={portalStyles.scrollText}>See full map</Text>
        </TouchableOpacity>
      </View>
        </>
      )}

      {/* ABSOLUTE POSITIONED CONTENT - LOWER HALF (map view elements) */}
      {/* Only show lower half elements when in lower half */}
      {isInLowerHalf && (
        <>
      {/* Reflect white image - positioned for lower half in bottom right */}
      <TouchableOpacity
        onPress={() => {
          if (isNewPortalRequest || !hasCompletedExpectations) {
            onNavigateToLockedStep();
          } else {
            setShowReflect(true);
          }
        }}
        style={{
          position: 'absolute',
          bottom: SCREEN_HEIGHT * 0.24,
          right: SCREEN_WIDTH * 0.1,
          zIndex: 100,
        }}
      >
        <Image
          source={reflectwhite}
          style={{
            width: SCREEN_WIDTH * 0.35,
            height: SCREEN_WIDTH * 0.27,
            resizeMode: 'contain',
          }}
        />
      </TouchableOpacity>

      {/* Four image or Lock - positioned for lower half */}
      {(isNewPortalRequest || !hasCompletedExpectations) ? (
        <TouchableOpacity
          onPress={onNavigateToLockedStep}
          style={{
            position: 'absolute',
            bottom: SCREEN_HEIGHT * 0.19,
            right: SCREEN_WIDTH * 0.16,
            zIndex: 100,
          }}
        >
          <Image
            source={lock}
            style={{
              width: SCREEN_WIDTH * 0.18,
              height: SCREEN_WIDTH * 0.18,
              resizeMode: 'contain',
            }}
          />
        </TouchableOpacity>
      ) : (
        <TouchableOpacity
          onPress={() => setShowReflect(true)}
          style={{
            position: 'absolute',
            bottom: SCREEN_HEIGHT * 0.18,
            right: SCREEN_WIDTH * 0.2,
            zIndex: 100,
          }}
        >
          <Image
            source={four}
            style={{
              width: SCREEN_WIDTH * 0.18,
              height: SCREEN_WIDTH * 0.18,
              resizeMode: 'contain',
            }}
          />
        </TouchableOpacity>
      )}

      {/* Up arrow button - only visible in lower half */}
      <View
        style={{
          position: 'absolute',
          top: 60,
          alignSelf: 'center',
          zIndex: 1000,
        }}
      >
        <TouchableOpacity
          onPress={scrollToUpperHalf}
          style={[portalStyles.scrollButton, {top: 15}]}
        >
          <ChevronUp size={16} color="white" />
          <Text style={portalStyles.scrollText}>Back to Top</Text>
        </TouchableOpacity>
      </View>

      {/* Complete button - only visible in lower half */}
      <TouchableOpacity
        style={{
          position: 'absolute',
          bottom: 30,
          alignSelf: 'center',
          backgroundColor: palette.slate,
          paddingVertical: 14,
          paddingHorizontal: 32,
          borderRadius: 30,
          zIndex: 10,
          shadowColor: palette.shadow,
          shadowOffset: { width: 0, height: 4 },
          shadowOpacity: 0.2,
          shadowRadius: 8,
          elevation: 4,
        }}
        onPress={() => setShowCompleteModal(true)}
      >
        <Text style={{ ...portalStyles.continueButtonText, color: palette.cream }}>Complete</Text>
      </TouchableOpacity>
        </>
      )}
      
      {/* Complete Modal */}
      {showCompleteModal && (
        <View
          style={{
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            backgroundColor: 'rgba(0,0,0,0.5)',
            justifyContent: 'center',
            alignItems: 'center',
            zIndex: 2000,
          }}
        >
          <View
            style={{
              backgroundColor: palette.cream,
              borderRadius: 20,
              padding: 32,
              alignItems: 'center',
              width: SCREEN_WIDTH * 0.8,
              shadowColor: palette.shadow,
              shadowOffset: { width: 0, height: 4 },
              shadowOpacity: 0.3,
              shadowRadius: 12,
              elevation: 8,
            }}
          >
            <TouchableOpacity
              onPress={() => {
                setShowCompleteModal(false);
                if (onComplete) {
                  onComplete();
                }
              }}
              style={{
                position: 'absolute',
                top: 16,
                right: 16,
                zIndex: 10,
              }}
            >
              <X size={28} color={palette.slate} />
            </TouchableOpacity>
            
            <Text
              style={{
                fontSize: 28,
                fontWeight: 'bold',
                color: palette.slate,
                marginTop: 8,
                marginBottom: 16,
                textAlign: 'center',
              }}
            >
              Conversation Complete!
            </Text>
            
            <Text
              style={{
                fontSize: 16,
                color: palette.slate,
                textAlign: 'center',
                opacity: 0.8,
              }}
            >
              Great work on your conversation
            </Text>
          </View>
        </View>
      )}
    </ImageBackground>
  );
};