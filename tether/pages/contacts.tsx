import React from 'react';
import { View, Text, Pressable, SafeAreaView, ScrollView, TouchableOpacity } from 'react-native';
import styles from '../styles/styles';
import { ChevronLeft } from 'lucide-react-native';
import { palette } from '../styles/palette';

interface ContactsProps {
  onNext: () => void;
  onBack: () => void;
}

export const Contacts = ({ onNext, onBack }: ContactsProps) => {
  const contacts = [
    { id: '1', name: 'Zafar' },
    { id: '2', name: 'Yuina' },
    { id: '3', name: 'Zimin' },
    { id: '4', name: 'Fayez' },
    { id: '5', name: 'James' },
  ];

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.screen}>
        <View style={styles.heading}>
          <TouchableOpacity onPress={onBack} style={styles.backButton}>
            <ChevronLeft size={40} color={palette.slate} />
          </TouchableOpacity>
          <Text style={styles.headingtext}>Select Contact</Text>
        </View>
        
          {contacts.map((contact) => (
            <TouchableOpacity 
              key={contact.id} 
              style={styles.contactCard} 
              onPress={onNext}
            >
              <View style={styles.avatar}>
                <Text style={styles.text}>
                  {contact.name.split(' ').map(n => n[0]).join('')}
                </Text>
              </View>
              <Text style={styles.text}>{contact.name}</Text>
            </TouchableOpacity>
          ))}
      </View>
    </SafeAreaView>
  );
};