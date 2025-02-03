import { FirestoreAdapter } from "@next-auth/firebase-adapter";
import type { Adapter, AdapterUser, AdapterAccount } from "next-auth/adapters";
import { cert } from 'firebase-admin/app';
import { getFirestore } from 'firebase-admin/firestore';

export function CustomFirestoreAdapter(config: any): Adapter {
  const baseAdapter = FirestoreAdapter(config);
  const db = getFirestore();

  return {
    ...baseAdapter,
    createUser: async (data: Omit<AdapterUser, "id">) => {
      if (!baseAdapter?.createUser) {
        throw new Error('??? createUser method is undefined');
      }
      const user = await baseAdapter.createUser(data);

      await db.collection('users').doc(user.id).set({
        ...user,
        role: 'user',
        createdAt: new Date(),
        displayName: user.name,
        // preferences: { notifications: true, newsletter: true },
        legacy: false,
        legacyClaimed: false,
        legacyClaimedBy: null,
      }, { merge: true });

      return user;
    },
    linkAccount: async (data: AdapterAccount) => { // needed otherwise users cant login twice
      if (!baseAdapter?.linkAccount) {
        throw new Error('??? linkAccount method is undefined');
      }
      const account = await baseAdapter.linkAccount(data);
      if (account) return account;
    },
  };
} 