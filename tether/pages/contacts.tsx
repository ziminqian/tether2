import React from 'react';
import { useState } from "react";
import { View, Text, SafeAreaView, ScrollView, TouchableOpacity, TextInput, Image, ImageBackground } from 'react-native';
import styles from '../styles/styles';
import { ChevronLeft, Search, ChevronDown } from 'lucide-react-native';
import { palette } from '../styles/palette';
import theme from '../styles/theme';

interface ContactsProps {
  onNext: () => void;
  onBack: () => void;
  onSearch: (query: string) => void;
}

export const Contacts = ({ onNext, onBack, onSearch }: ContactsProps) => {
  const contacts = [
    { id: '1', name: 'Zafar'},
    { id: '2', name: 'Yuina'},
    { id: '3', name: 'Zimin'},
    { id: '4', name: 'Fayez'},
  ];

  const invites = [
    { id: '1', name: 'James' },
    { id: '2', name: 'Charlotte' },
  ];
  const [input, setInput] = useState<string>("");

  const handleSearchSubmit = () => {
        if (input.trim()) {
            onSearch(input.trim());
        }
    };

  return (
    <ImageBackground 
              source={require("../assets/backgrounds/light_ombre.png")}
              style={{ flex: 1, width: '100%', height: '100%' }}
              resizeMode='cover'
            >
      <SafeAreaView style={{flex: 1}}>
        
        <View style={styles.screen}>
          <View style={styles.heading}>
            <TouchableOpacity onPress={onBack} style={styles.backButton}>
              <ChevronLeft size={40} color={palette.slate} />
            </TouchableOpacity>
            <Text style={styles.headingtext}>Select Contact</Text>
          </View>
          <View style={[styles.search]}>
            <Search size={20} style={{margin: 5}} color={theme.button}></Search>
            <TextInput 
                style={[styles.text, { flex: 1 }]} 
                value={input} 
                onChangeText={setInput}
                onSubmitEditing={handleSearchSubmit}
                returnKeyType="search"
                placeholder={"Search contacts"} 
                placeholderTextColor={theme.textSecondary}
            />
          </View>
          <ScrollView>
            <View style={styles.dropdown}><ChevronDown color={theme.button}/><Text style={styles.subheading}>Friends on Tether</Text></View>
            {contacts.map((contact) => (
              <TouchableOpacity 
                key={contact.id} 
                style={styles.contactCard} 
                onPress={onNext}
              >
                <View style={styles.avatar}>
                  <Image source = {require('../assets/other/frog.png')}/>
                </View>
                <Text style={styles.text}>{contact.name}</Text>
              </TouchableOpacity>
            
            ))}
            <View style={styles.dropdown}><ChevronDown color={theme.button}/><Text style={styles.subheading}>Invite to Tether</Text></View>
            {invites.map((invite) => (
              <TouchableOpacity 
                key={invite.id} 
                style={styles.contactCard} 
                onPress={onNext}
              >
                <View style={styles.avatar}>
                  <Image source = {require('../assets/other/frog.png')}/>
                </View>
                <Text style={styles.text}>{invite.name}</Text>
              </TouchableOpacity>
            
            ))}
          </ScrollView>
        </View>
      </SafeAreaView>
    </ImageBackground>
    
  );
};