'use client';

import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';

import { FirebaseAppProvider, AuthProvider, FirestoreProvider, useFirebaseApp } from 'reactfire';

const firebaseConfig = {
  apiKey: "AIzaSyBWZnAmJr8PWDhOwz4BtD9fhr1CSmFJx18",
  authDomain: "remarkable-92ea7.firebaseapp.com",
  projectId: "remarkable-92ea7",
  storageBucket: "remarkable-92ea7.appspot.com",
  messagingSenderId: "342731740147",
  appId: "1:342731740147:web:f8f653181f9ea2daa0b886"
};

interface FirebaseProvidersProps {
  children: React.ReactNode;
}
export const FirebaseProviders = ({ children }: FirebaseProvidersProps) => {
  return (
    <FirebaseAppProvider firebaseConfig={firebaseConfig}>
      <FeatureProviders>
        {children}
      </FeatureProviders> 
    </FirebaseAppProvider>
  );
}

interface FeatureProvidersProps {
  children: React.ReactNode;
}
const FeatureProviders = ({ children }: FeatureProvidersProps) => {
  const app = useFirebaseApp();

  const auth = getAuth(app);
  const firestore = getFirestore(app);

  return (
    <AuthProvider sdk={auth}>
      <FirestoreProvider sdk={firestore}>
        {children}
      </FirestoreProvider>
    </AuthProvider>);
}
