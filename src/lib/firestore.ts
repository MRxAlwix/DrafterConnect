import { 
  collection, 
  doc, 
  getDocs, 
  getDoc, 
  addDoc, 
  updateDoc, 
  deleteDoc, 
  query, 
  where, 
  orderBy, 
  limit,
  serverTimestamp,
  Timestamp
} from 'firebase/firestore';
import { db } from './firebase';
import { User, Material, ForumPost, Portfolio, Task, Announcement } from '@/types';

// User operations
export const createUser = async (userId: string, userData: Omit<User, 'id'>) => {
  try {
    await updateDoc(doc(db, 'users', userId), {
      ...userData,
      joinedAt: serverTimestamp(),
      updatedAt: serverTimestamp()
    });
    return { success: true };
  } catch (error) {
    console.error('Error creating user:', error);
    return { success: false, error };
  }
};

export const getUser = async (userId: string): Promise<User | null> => {
  try {
    const userDoc = await getDoc(doc(db, 'users', userId));
    if (userDoc.exists()) {
      const data = userDoc.data();
      return {
        id: userDoc.id,
        ...data,
        joinedAt: data.joinedAt?.toDate() || new Date(),
      } as User;
    }
    return null;
  } catch (error) {
    console.error('Error getting user:', error);
    return null;
  }
};

// Material operations
export const getMaterials = async () => {
  try {
    const materialsQuery = query(
      collection(db, 'materi'),
      orderBy('createdAt', 'desc')
    );
    const snapshot = await getDocs(materialsQuery);
    return snapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data(),
      createdAt: doc.data().createdAt?.toDate() || new Date(),
      updatedAt: doc.data().updatedAt?.toDate() || new Date(),
    })) as Material[];
  } catch (error) {
    console.error('Error getting materials:', error);
    return [];
  }
};

export const createMaterial = async (materialData: Omit<Material, 'id' | 'createdAt' | 'updatedAt'>) => {
  try {
    const docRef = await addDoc(collection(db, 'materi'), {
      ...materialData,
      createdAt: serverTimestamp(),
      updatedAt: serverTimestamp()
    });
    return { success: true, id: docRef.id };
  } catch (error) {
    console.error('Error creating material:', error);
    return { success: false, error };
  }
};

// Forum operations
export const getForumPosts = async () => {
  try {
    const postsQuery = query(
      collection(db, 'forum'),
      orderBy('isPinned', 'desc'),
      orderBy('createdAt', 'desc')
    );
    const snapshot = await getDocs(postsQuery);
    return snapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data(),
      createdAt: doc.data().createdAt?.toDate() || new Date(),
      updatedAt: doc.data().updatedAt?.toDate() || new Date(),
    })) as ForumPost[];
  } catch (error) {
    console.error('Error getting forum posts:', error);
    return [];
  }
};

export const createForumPost = async (postData: Omit<ForumPost, 'id' | 'createdAt' | 'updatedAt' | 'replies'>) => {
  try {
    const docRef = await addDoc(collection(db, 'forum'), {
      ...postData,
      replies: [],
      likes: [],
      createdAt: serverTimestamp(),
      updatedAt: serverTimestamp()
    });
    return { success: true, id: docRef.id };
  } catch (error) {
    console.error('Error creating forum post:', error);
    return { success: false, error };
  }
};

// Portfolio operations
export const getPortfolios = async () => {
  try {
    const portfoliosQuery = query(
      collection(db, 'portofolio'),
      orderBy('createdAt', 'desc')
    );
    const snapshot = await getDocs(portfoliosQuery);
    return snapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data(),
      createdAt: doc.data().createdAt?.toDate() || new Date(),
      updatedAt: doc.data().updatedAt?.toDate() || new Date(),
    })) as Portfolio[];
  } catch (error) {
    console.error('Error getting portfolios:', error);
    return [];
  }
};

export const createPortfolio = async (portfolioData: Omit<Portfolio, 'id' | 'createdAt' | 'updatedAt'>) => {
  try {
    const docRef = await addDoc(collection(db, 'portofolio'), {
      ...portfolioData,
      createdAt: serverTimestamp(),
      updatedAt: serverTimestamp()
    });
    return { success: true, id: docRef.id };
  } catch (error) {
    console.error('Error creating portfolio:', error);
    return { success: false, error };
  }
};

// Task operations
export const getTasks = async () => {
  try {
    const tasksQuery = query(
      collection(db, 'tugas'),
      orderBy('createdAt', 'desc')
    );
    const snapshot = await getDocs(tasksQuery);
    return snapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data(),
      deadline: doc.data().deadline?.toDate() || new Date(),
      createdAt: doc.data().createdAt?.toDate() || new Date(),
      updatedAt: doc.data().updatedAt?.toDate() || new Date(),
    })) as Task[];
  } catch (error) {
    console.error('Error getting tasks:', error);
    return [];
  }
};

export const createTask = async (taskData: Omit<Task, 'id' | 'createdAt' | 'updatedAt' | 'submissions'>) => {
  try {
    const docRef = await addDoc(collection(db, 'tugas'), {
      ...taskData,
      submissions: [],
      createdAt: serverTimestamp(),
      updatedAt: serverTimestamp()
    });
    return { success: true, id: docRef.id };
  } catch (error) {
    console.error('Error creating task:', error);
    return { success: false, error };
  }
};

// Announcement operations
export const getAnnouncements = async () => {
  try {
    const announcementsQuery = query(
      collection(db, 'pengumuman'),
      orderBy('isPinned', 'desc'),
      orderBy('createdAt', 'desc')
    );
    const snapshot = await getDocs(announcementsQuery);
    return snapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data(),
      createdAt: doc.data().createdAt?.toDate() || new Date(),
      updatedAt: doc.data().updatedAt?.toDate() || new Date(),
    })) as Announcement[];
  } catch (error) {
    console.error('Error getting announcements:', error);
    return [];
  }
};

export const createAnnouncement = async (announcementData: Omit<Announcement, 'id' | 'createdAt' | 'updatedAt'>) => {
  try {
    const docRef = await addDoc(collection(db, 'pengumuman'), {
      ...announcementData,
      createdAt: serverTimestamp(),
      updatedAt: serverTimestamp()
    });
    return { success: true, id: docRef.id };
  } catch (error) {
    console.error('Error creating announcement:', error);
    return { success: false, error };
  }
};