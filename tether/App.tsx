import React, { useEffect, useState } from 'react';
import { View, StatusBar } from 'react-native';
import { TetherProvider } from './context/TetherContext';
import { Contacts } from './pages/contacts';
import { Message } from './pages/message';
import { Portal } from './pages/portal';
import { Home } from './pages/home';
import { Profile } from './pages/profile';
import Welcome from './pages/welcome';
import Footer from './pages/components/Footer';
import styles from './styles/styles';
import AuthGate from './pages/components/AuthGate';
//import { supabase } from './config/supabase';

function AppContent() {
  const [activeTab, setActiveTab] = useState< 'friends' | 'home' | 'profile'>('home');

  //　
  const [showMessage, setShowMessage] = useState(false);
  const [showPortal, setShowPortal] = useState(false);
  const [selectedContact, setSelectedContact] = useState<{ id: string; name: string } | null>(null);

  // supabase stuff : for later
  /*
  useEffect(() => {
    supabase.auth.getSession().then(({ data }) => {
      console.log("CURRENT SESSION:", data.session);
    });
  }, []);*/

  const handleContactSelect = (contact: { id: string; name: string }, isInvite?: boolean) => {
    setSelectedContact(contact);
    if (isInvite) {
      // Navigate to initiate conversation (Message page) for invites
      setShowMessage(true);
      setShowPortal(false);
    } else {
      // Navigate to portal page for friends
      setShowPortal(true);
      setShowMessage(false);
    }
  };

  const handleBackToContacts = () => {
    setShowMessage(false);
    setShowPortal(false);
    setSelectedContact(null);
  };

  const handleSendInvite = () => {
    setShowMessage(false);
    setSelectedContact(null);
  };

  console.log(activeTab);
  return (
    <View style={styles.container}>
      <StatusBar barStyle="dark-content" />
      <View style={{ flex: 9 }}>
        {activeTab === 'friends' && !showMessage && !showPortal && (
          <Contacts 
            onNext={handleContactSelect} 
            onBack={() => {}}
            onSearch={(query) => console.log(query)}
          />
        )}
        {activeTab === 'friends' && showPortal && selectedContact && (
          <Portal 
            contact={selectedContact}
            onBack={handleBackToContacts}
          />
        )}
        {activeTab === 'friends' && showMessage && selectedContact && (
          <Message 
            contact={selectedContact}
            onNext={handleSendInvite} 
            onBack={handleBackToContacts}
          />
        )}
        {activeTab === 'home' && (
          <Home 
            onBack={() => {}}
            onNext={() => {}}
            onSearch={(query) => console.log(query)}
          />
        )}
        {activeTab === 'profile' && (
          <Profile 
            onBack={() => setActiveTab('profile')} 
          />
        )}
      </View>
      <View style={{flex: 1}}>
        <Footer activeTab={activeTab} setActiveTab={setActiveTab}/>
      </View>
    </View>
  );
}

export default function App() {
  const [showWelcome, setShowWelcome] = useState(true);

  const handleWelcomeContinue = () => {
    setShowWelcome(false);
  };

  // Show welcome page first, before login
  if (showWelcome) {
    return (
      <TetherProvider>
        <View style={styles.container}>
          <StatusBar barStyle="dark-content" />
          <Welcome onContinue={handleWelcomeContinue} />
        </View>
      </TetherProvider>
    );
  }

  // After welcome page, show login/auth flow
  return (
    <TetherProvider>
      <AuthGate>
        <AppContent/>
      </AuthGate>
    </TetherProvider>
  );
}