import React, { createContext, useContext, useState, useEffect } from 'react';
import { 
  User, 
  signInWithPopup, 
  GoogleAuthProvider, 
  signInAnonymously, 
  signOut, 
  onAuthStateChanged,
  updateProfile
} from 'firebase/auth';
import { doc, setDoc, getDoc, serverTimestamp } from 'firebase/firestore';
import { auth, db } from '../firebase';

export interface UserProfile {
  uid: string;
  name: string;
  email?: string;
  phone?: string;
  photoURL?: string;
  isAnonymous: boolean;
  createdAt?: any;
}

interface AuthContextType {
  user: User | null;
  userProfile: UserProfile | null;
  loading: boolean;
  signInWithGoogle: () => Promise<void>;
  signInAsGuest: (name?: string, phone?: string) => Promise<void>;
  signOutUser: () => Promise<void>;
  isAuthModalOpen: boolean;
  setIsAuthModalOpen: (open: boolean) => void;
  isOrderHistoryOpen: boolean;
  setIsOrderHistoryOpen: (open: boolean) => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [userProfile, setUserProfile] = useState<UserProfile | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [isAuthModalOpen, setIsAuthModalOpen] = useState<boolean>(false);
  const [isOrderHistoryOpen, setIsOrderHistoryOpen] = useState<boolean>(false);

  // Listen to Firebase Auth state
  useEffect(() => {
    let isMounted = true;
    const unsubscribe = onAuthStateChanged(auth, async (currentUser) => {
      if (!isMounted) return;
      setUser(currentUser);
      if (currentUser) {
        try {
          const userDocRef = doc(db, 'users', currentUser.uid);
          const snap = await getDoc(userDocRef);
          
          if (snap.exists()) {
            setUserProfile(snap.data() as UserProfile);
          } else {
            const initialProfile: UserProfile = {
              uid: currentUser.uid,
              name: currentUser.displayName || (currentUser.isAnonymous ? 'Quickmart Guest' : 'Shopper'),
              email: currentUser.email || undefined,
              phone: currentUser.phoneNumber || undefined,
              photoURL: currentUser.photoURL || undefined,
              isAnonymous: currentUser.isAnonymous,
              createdAt: serverTimestamp(),
            };
            await setDoc(userDocRef, initialProfile, { merge: true });
            setUserProfile(initialProfile);
          }
        } catch (err) {
          console.error('Error fetching/setting user profile in Firestore:', err);
          // Fallback local profile
          setUserProfile({
            uid: currentUser.uid,
            name: currentUser.displayName || 'Shopper',
            email: currentUser.email || undefined,
            isAnonymous: currentUser.isAnonymous,
          });
        }
      } else {
        setUserProfile(null);
      }
      setLoading(false);
    });

    return () => {
      isMounted = false;
      unsubscribe();
    };
  }, []);

  const signInWithGoogle = async () => {
    try {
      const provider = new GoogleAuthProvider();
      const result = await signInWithPopup(auth, provider);
      const loggedUser = result.user;
      
      const profile: UserProfile = {
        uid: loggedUser.uid,
        name: loggedUser.displayName || 'Shopper',
        email: loggedUser.email || undefined,
        photoURL: loggedUser.photoURL || undefined,
        isAnonymous: false,
        createdAt: serverTimestamp(),
      };

      await setDoc(doc(db, 'users', loggedUser.uid), profile, { merge: true });
      setUserProfile(profile);
      setIsAuthModalOpen(false);
    } catch (error: any) {
      console.error('Google Sign-in failed:', error);
      throw error;
    }
  };

  const signInAsGuest = async (name: string = 'Quickmart Shopper', phone?: string) => {
    try {
      const result = await signInAnonymously(auth);
      const guestUser = result.user;

      if (name) {
        await updateProfile(guestUser, { displayName: name });
      }

      const profile: UserProfile = {
        uid: guestUser.uid,
        name: name || 'Quickmart Shopper',
        phone: phone || undefined,
        isAnonymous: true,
        createdAt: serverTimestamp(),
      };

      await setDoc(doc(db, 'users', guestUser.uid), profile, { merge: true });
      setUserProfile(profile);
      setIsAuthModalOpen(false);
    } catch (error: any) {
      // If anonymous auth is not enabled in Firebase Console, smoothly fall back to a guest profile
      if (
        error?.code === 'auth/admin-restricted-operation' ||
        error?.code === 'auth/operation-not-allowed'
      ) {
        let guestId = localStorage.getItem('quickmart_guest_id');
        if (!guestId) {
          guestId = `guest_${Math.random().toString(36).substring(2, 12)}`;
          localStorage.setItem('quickmart_guest_id', guestId);
        }
        const profile: UserProfile = {
          uid: guestId,
          name: name || 'Quickmart Shopper',
          phone: phone || undefined,
          isAnonymous: true,
        };
        setUserProfile(profile);
        setIsAuthModalOpen(false);
        return;
      }
      console.error('Guest Sign-in failed:', error);
      throw error;
    }
  };

  const signOutUser = async () => {
    try {
      await signOut(auth);
      setUser(null);
      setUserProfile(null);
    } catch (error) {
      console.error('Sign-out error:', error);
    }
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        userProfile,
        loading,
        signInWithGoogle,
        signInAsGuest,
        signOutUser,
        isAuthModalOpen,
        setIsAuthModalOpen,
        isOrderHistoryOpen,
        setIsOrderHistoryOpen,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
