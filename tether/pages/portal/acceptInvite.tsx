import React from 'react';
import { 
  View, 
  Text, 
  ImageBackground, 
  TouchableOpacity,
  Image,
} from 'react-native';
import { palette } from '../../styles/palette';
import { ChevronLeft } from 'lucide-react-native';
import portalStyles from '../../styles/portalStyles';

const spiral = require('../../assets/portal/spiral_res.png');

interface AcceptInviteProps {
  contact: { id: string; name: string };
  isNewPortalRequest?: boolean;
  onBack: () => void;
  onNavigateToExpectations: () => void;
}

export const AcceptInvite = ({ contact, isNewPortalRequest = false, onBack, onNavigateToExpectations }: AcceptInviteProps) => {
  return (
    <ImageBackground 
      source={require("../../assets/backgrounds/light_ombre.png")}
      style={portalStyles.background}
      resizeMode='cover'
    >
      <View style={portalStyles.container}>
        <TouchableOpacity onPress={onBack} style={portalStyles.backButton}>
          <ChevronLeft size={40} color={palette.slate} />
        </TouchableOpacity>
        
        <View style={[portalStyles.content, { paddingTop: 80, justifyContent: 'center', flex: 1, alignItems: 'center' }]}>
          <Text style={[portalStyles.title, { textAlign: 'center' }]}>
            {isNewPortalRequest
              ? `Awaiting ${contact.name}'s${"\n"} acceptance of invitation`
              : `${contact.name} accepted invite!${"\n"}Continue to setting expectations`
            }
          </Text>
          {!isNewPortalRequest && (
            <TouchableOpacity
              style={[portalStyles.continueButton, { marginTop: 8, alignSelf: 'center', position: 'relative', bottom: 'auto', right: 'auto', width: 'auto', minWidth: 200 }]}
              onPress={onNavigateToExpectations}
            >
              <Text style={[portalStyles.continueButtonText,]}>
                Continue
              </Text>
            </TouchableOpacity>
          )}
        </View>
        
        <View style={{ alignItems: 'center', marginBottom: 40 }}>
          {/*
          <TouchableOpacity onPress={onBack} style={{ alignItems: 'center' }}>
            <Image 
              source={spiral} 
              style={{ width: 100, height: 100, resizeMode: 'contain' }}
            />
            <Text style={[portalStyles.backToPortalText, { marginTop: 8 }]}>
              Back to Portal
            </Text>
          </TouchableOpacity> */}
        </View>
      </View>
    </ImageBackground>
  );
};
