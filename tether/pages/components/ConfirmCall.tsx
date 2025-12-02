import React, { useEffect, useRef } from 'react';
import {
  Modal,
  View,
  Text,
  TouchableOpacity,
  Animated,
  StyleSheet,
} from 'react-native';
import { Phone } from 'lucide-react-native';
import { palette } from '../../styles/palette';

interface ConfirmCallModalProps {
  visible: boolean;
  contactName: string;
  onConfirm: () => void;
  onCancel: () => void;
}

export const ConfirmCallModal = ({ visible, contactName, onConfirm, onCancel }: ConfirmCallModalProps) => {
  const fadeAnim = useRef(new Animated.Value(0)).current;
  const scaleAnim = useRef(new Animated.Value(0.9)).current;

  useEffect(() => {
    if (visible) {
      fadeAnim.setValue(0);
      scaleAnim.setValue(0.9);
      
      Animated.parallel([
        Animated.timing(fadeAnim, {
          toValue: 1,
          duration: 250,
          useNativeDriver: true,
        }),
        Animated.spring(scaleAnim, {
          toValue: 1,
          tension: 50,
          friction: 7,
          useNativeDriver: true,
        }),
      ]).start();
    } else {
      Animated.parallel([
        Animated.timing(fadeAnim, {
          toValue: 0,
          duration: 200,
          useNativeDriver: true,
        }),
        Animated.timing(scaleAnim, {
          toValue: 0.9,
          duration: 200,
          useNativeDriver: true,
        }),
      ]).start();
    }
  }, [visible]);

  return (
    <Modal
      animationType="none"
      transparent={true}
      visible={visible}
      onRequestClose={onCancel}
    >
      <Animated.View 
        style={[
          styles.modalOverlay,
          { opacity: fadeAnim }
        ]}
      >
        <Animated.View 
          style={[
            styles.confirmModalContent,
            {
              opacity: fadeAnim,
              transform: [{ scale: scaleAnim }]
            }
          ]}
        >
          <Phone size={48} color={palette.teal} style={{ marginBottom: 20 }} />
          
          <Text style={styles.confirmModalTitle}>
            Start a conversation with {contactName}?
          </Text>
          
          <Text style={styles.confirmModalText}>
            You're about to initiate a portal conversation. Make sure you're both ready for a meaningful discussion.
          </Text>

          <View style={styles.confirmModalButtons}>
            <TouchableOpacity 
              style={styles.confirmModalButtonCancel}
              onPress={onCancel}
            >
              <Text style={styles.confirmModalButtonCancelText}>Cancel</Text>
            </TouchableOpacity>

            <TouchableOpacity 
              style={styles.confirmModalButtonConfirm}
              onPress={onConfirm}
            >
              <Phone size={20} color={palette.cream} />
              <Text style={styles.confirmModalButtonConfirmText}>Start Call</Text>
            </TouchableOpacity>
          </View>
        </Animated.View>
      </Animated.View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  confirmModalContent: {
    width: '85%',
    backgroundColor: palette.cream,
    borderRadius: 20,
    padding: 30,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 8,
  },
  confirmModalTitle: {
    fontSize: 24,
    fontWeight: '700',
    color: palette.slate,
    textAlign: 'center',
    marginBottom: 12,
  },
  confirmModalText: {
    fontSize: 16,
    color: palette.darkBrown,
    textAlign: 'center',
    lineHeight: 24,
    marginBottom: 30,
  },
  confirmModalButtons: {
    flexDirection: 'row',
    gap: 12,
    width: '100%',
  },
  confirmModalButtonCancel: {
    flex: 1,
    paddingVertical: 14,
    paddingHorizontal: 20,
    borderRadius: 12,
    borderWidth: 2,
    borderColor: palette.slate,
    alignItems: 'center',
  },
  confirmModalButtonCancelText: {
    color: palette.slate,
    fontSize: 16,
    fontWeight: '700',
  },
  confirmModalButtonConfirm: {
    flex: 1,
    paddingVertical: 14,
    paddingHorizontal: 20,
    borderRadius: 12,
    backgroundColor: palette.teal,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
    shadowColor: palette.shadow,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 4,
  },
  confirmModalButtonConfirmText: {
    color: palette.cream,
    fontSize: 16,
    fontWeight: '700',
  },
});