import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { 
  signInWithEmailAndPassword, 
  createUserWithEmailAndPassword,
  signOut,
  onAuthStateChanged,
  User as FirebaseUser
} from 'firebase/auth';
import { doc, setDoc, getDoc } from 'firebase/firestore';
import { auth, db } from '@/lib/firebase';
import { User, UserRole } from '@/types';

interface AuthState {
  user: User | null;
  loading: boolean;
  error: string | null;
  setUser: (user: User | null) => void;
  setLoading: (loading: boolean) => void;
  setError: (error: string | null) => void;
  login: (email: string, password: string) => Promise<boolean>;
  register: (email: string, password: string, userData: Partial<User>) => Promise<boolean>;
  logout: () => Promise<void>;
  initializeAuth: () => void;
}

export const useAuthStore = create<AuthState>()(
  persist(
    (set, get) => ({
      user: null,
      loading: true,
      error: null,

      setUser: (user) => set({ user }),
      setLoading: (loading) => set({ loading }),
      setError: (error) => set({ error }),

      login: async (email: string, password: string) => {
        try {
          set({ loading: true, error: null });
          const userCredential = await signInWithEmailAndPassword(auth, email, password);
          
          // Get user data from Firestore
          const userDoc = await getDoc(doc(db, 'users', userCredential.user.uid));
          if (userDoc.exists()) {
            const userData = userDoc.data();
            const user: User = {
              id: userCredential.user.uid,
              email: userCredential.user.email || '',
              name: userData.name || '',
              role: userData.role || 'student',
              avatar: userData.avatar || '',
              bio: userData.bio || '',
              skills: userData.skills || [],
              joinedAt: userData.joinedAt?.toDate() || new Date(),
              isActive: userData.isActive !== false,
            };
            set({ user, loading: false });
            return true;
          } else {
            // Create user document if it doesn't exist
            const defaultUser: User = {
              id: userCredential.user.uid,
              email: userCredential.user.email || '',
              name: userCredential.user.displayName || 'User',
              role: 'student',
              avatar: '',
              bio: '',
              skills: [],
              joinedAt: new Date(),
              isActive: true,
            };
            await setDoc(doc(db, 'users', userCredential.user.uid), defaultUser);
            set({ user: defaultUser, loading: false });
            return true;
          }
        } catch (error: any) {
          console.error('Login error:', error);
          set({ error: error.message, loading: false });
          return false;
        }
      },

      register: async (email: string, password: string, userData: Partial<User>) => {
        try {
          set({ loading: true, error: null });
          const userCredential = await createUserWithEmailAndPassword(auth, email, password);
          
          const newUser: User = {
            id: userCredential.user.uid,
            email: userCredential.user.email || '',
            name: userData.name || 'User',
            role: userData.role || 'student',
            avatar: userData.avatar || '',
            bio: userData.bio || '',
            skills: userData.skills || [],
            joinedAt: new Date(),
            isActive: true,
          };

          await setDoc(doc(db, 'users', userCredential.user.uid), newUser);
          set({ user: newUser, loading: false });
          return true;
        } catch (error: any) {
          console.error('Registration error:', error);
          set({ error: error.message, loading: false });
          return false;
        }
      },

      logout: async () => {
        try {
          await signOut(auth);
          set({ user: null, error: null });
        } catch (error: any) {
          console.error('Logout error:', error);
          set({ error: error.message });
        }
      },

      initializeAuth: () => {
        const unsubscribe = onAuthStateChanged(auth, async (firebaseUser: FirebaseUser | null) => {
          if (firebaseUser) {
            try {
              const userDoc = await getDoc(doc(db, 'users', firebaseUser.uid));
              if (userDoc.exists()) {
                const userData = userDoc.data();
                const user: User = {
                  id: firebaseUser.uid,
                  email: firebaseUser.email || '',
                  name: userData.name || '',
                  role: userData.role || 'student',
                  avatar: userData.avatar || '',
                  bio: userData.bio || '',
                  skills: userData.skills || [],
                  joinedAt: userData.joinedAt?.toDate() || new Date(),
                  isActive: userData.isActive !== false,
                };
                set({ user, loading: false });
              } else {
                set({ user: null, loading: false });
              }
            } catch (error) {
              console.error('Error fetching user data:', error);
              set({ user: null, loading: false });
            }
          } else {
            set({ user: null, loading: false });
          }
        });

        return unsubscribe;
      },
    }),
    {
      name: 'auth-storage',
      partialize: (state) => ({ user: state.user }),
    }
  )
);