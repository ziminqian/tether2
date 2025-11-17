import { useState, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

const SESSION_KEY = '@tether_session';

type MockSession = {
  user: {
    phone: string;
  };
} | null;

// Create a shared state outside the hook
let sharedSession: MockSession = null;
let sharedLoading = true;
let listeners: Array<(session: MockSession) => void> = [];

const notifyListeners = () => {
  listeners.forEach(listener => listener(sharedSession));
};

// Initialize session on app start
AsyncStorage.getItem(SESSION_KEY).then(storedSession => {
  if (storedSession) {
    sharedSession = JSON.parse(storedSession);
  }
  sharedLoading = false;
  notifyListeners();
});

export default function useSession() {
  const [session, setSession] = useState<MockSession>(sharedSession);
  const [loading, setLoading] = useState(sharedLoading);

  useEffect(() => {
    // Subscribe to changes
    const listener = (newSession: MockSession) => {
      setSession(newSession);
      setLoading(false);
    };
    listeners.push(listener);

    // Initial sync
    setSession(sharedSession);
    setLoading(sharedLoading);

    // Cleanup
    return () => {
      listeners = listeners.filter(l => l !== listener);
    };
  }, []);

  const signIn = async (phone: string) => {
    const newSession = {
      user: { phone }
    };
    await AsyncStorage.setItem(SESSION_KEY, JSON.stringify(newSession));
    sharedSession = newSession;
    notifyListeners();
  };

  const signOut = async () => {
    await AsyncStorage.removeItem(SESSION_KEY);
    sharedSession = null;
    notifyListeners();
  };

  return { session, loading, signIn, signOut };
}