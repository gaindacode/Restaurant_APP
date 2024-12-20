import { 
  collection,
  doc,
  addDoc,
  getDocs,
  query,
  where,
  orderBy,
  limit,
  serverTimestamp
} from 'firebase/firestore';
import { db } from '../../config/firebase.config';
import type { Transaction } from '../../types/user';

export async function createTransaction(
  userId: string,
  transactionData: Omit<Transaction, 'id' | 'userId' | 'createdAt' | 'status'>
) {
  const transactionsRef = collection(db, 'transactions');
  
  const newTransaction = await addDoc(transactionsRef, {
    ...transactionData,
    userId,
    status: 'pending',
    createdAt: serverTimestamp()
  });

  return newTransaction.id;
}

export async function getUserTransactions(
  userId: string,
  options: { limit?: number; status?: Transaction['status'] } = {}
): Promise<Transaction[]> {
  const transactionsRef = collection(db, 'transactions');
  let q = query(
    transactionsRef,
    where('userId', '==', userId),
    orderBy('createdAt', 'desc')
  );

  if (options.status) {
    q = query(q, where('status', '==', options.status));
  }

  if (options.limit) {
    q = query(q, limit(options.limit));
  }

  const querySnapshot = await getDocs(q);
  
  return querySnapshot.docs.map(doc => ({
    id: doc.id,
    ...doc.data()
  })) as Transaction[];
}