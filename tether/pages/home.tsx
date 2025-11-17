import React, { useState } from 'react';
import { View, Text, Pressable, SafeAreaView, TouchableOpacity, TextInput, ScrollView, Image, ImageBackground } from 'react-native';
import styles from '../styles/styles';
import { ChevronDown, Search } from 'lucide-react-native';
import theme from '../styles/theme';

interface HomeProps {
  onBack: () => void;
  onNext: () => void;
  onSearch: (query: string) => void;
}

export const Home = ({ onBack, onNext, onSearch }: HomeProps) => {
  
  const activePortals: any[] = [];

  const requestPortals = [
    { id: '1', name: 'Yuina' },
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
          <Text style={styles.titleLarge}>Tether</Text>
        </View>
        <View style={[styles.search]}>
          <Search size={20} style={{margin: 5}} color={theme.button}></Search>
          <TextInput 
              style={[styles.text, { flex: 1 }]} 
              value={input} 
              onChangeText={setInput}
              onSubmitEditing={handleSearchSubmit}
              returnKeyType="search"
              placeholder={"Search conversations"} 
              placeholderTextColor={theme.textSecondary}
          />
        </View>
        <ScrollView>
          <View style={styles.dropdown}><ChevronDown color={theme.button}/><Text style={styles.subheading}>Active Portals</Text></View>
          {activePortals.length === 0 ? (
            <View style={styles.empty}>
              <Text style={styles.text}>No active portals</Text>
            </View>
          ) : (
            activePortals.map((contact) => (
              <TouchableOpacity 
                key={contact.id} 
                style={styles.contactCard} 
                onPress={onNext}
              >
                <View style={styles.avatar}>
                  <Image source={require('../assets/other/frog.png')}/>
                </View>
                <Text style={styles.text}>{contact.name}</Text>
              </TouchableOpacity>
            ))
          )}
          <View style={styles.dropdown}><ChevronDown color={theme.button}/><Text style={styles.subheading}>NewPortal Requests</Text></View>
          {requestPortals.map((invite) => (
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