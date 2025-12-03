import React from 'react';
import { 
  View, 
  Text, 
  ImageBackground, 
  TouchableOpacity,
} from 'react-native';
import { palette } from '../../styles/palette';
import { ChevronLeft } from 'lucide-react-native';
import portalStyles from '../../styles/portalStyles';

interface LockedStepProps {
  onBack: () => void;
}

export const LockedStep = ({ onBack }: LockedStepProps) => {
  return (
    <ImageBackground 
      source={require("../../assets/backgrounds/background_vibrant.png")}
      style={portalStyles.background}
      resizeMode='cover'
    >
      <View style={portalStyles.container}>
        <TouchableOpacity onPress={onBack} style={portalStyles.backButton}>
          <ChevronLeft size={40} color={palette.slate} />
        </TouchableOpacity>
        
        <View style={[portalStyles.content, { paddingTop: 80 }]}>
          <Text style={[portalStyles.title, { fontFamily: 'Avenir' }]}>
            LOCKED
          </Text>
          <Text style={[portalStyles.message, { fontFamily: 'Avenir', marginTop: 24 }]}>
            Please ensure the preceding step is fully completed before continuing.
          </Text>
        </View>
      </View>
    </ImageBackground>
  );
};

