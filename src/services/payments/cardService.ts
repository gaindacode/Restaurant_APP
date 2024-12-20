import { 
  collection,
  doc,
  addDoc,
  updateDoc,
  deleteDoc,
  getDocs,
  query,
  where,
  serverTimestamp
} from 'firebase/firestore';
import { db } from '../../config/firebase.config';
import type { PaymentCard } from '../../types/user';

export async function addCard(userId: string, cardData: Omit<PaymentCard, 'id' | 'userId'>) {
  const cardsRef = collection(db, 'cards');
  
  // If this is the first card, make it default
  const existingCards = await getDocs(query(cardsRef, where('userId', '==', userId)));
  const isFirstCard = existingCards.empty;

  const newCard = await addDoc(cardsRef, {
    ...cardData,
    userId,
    isDefault: isFirstCard || cardData.isDefault,
    createdAt: serverTimestamp()
  });

  // If setting as default, remove default from other cards
  if (cardData.isDefault) {
    const batch = db.batch();
    existingCards.forEach(doc => {
      if (doc.id !== newCard.id) {
        batch.update(doc.ref, { isDefault: false });
      }
    });
    await batch.commit();
  }

  return newCard.id;
}

export async function updateCard(cardId: string, updates: Partial<PaymentCard>) {
  const cardRef = doc(db, 'cards', cardId);
  await updateDoc(cardRef, {
    ...updates,
    updatedAt: serverTimestamp()
  });
}

export async function deleteCard(cardId: string) {
  await deleteDoc(doc(db, 'cards', cardId));
}

export async function getUserCards(userId: string): Promise<PaymentCard[]> {
  const cardsRef = collection(db, 'cards');
  const q = query(cardsRef, where('userId', '==', userId));
  const querySnapshot = await getDocs(q);
  
  return querySnapshot.docs.map(doc => ({
    id: doc.id,
    ...doc.data()
  })) as PaymentCard[];
}