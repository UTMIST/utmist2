import { FirestoreAdapter } from "@next-auth/firebase-adapter";
import type { Adapter, AdapterUser, AdapterAccount } from "next-auth/adapters";
import { getFirestore } from "firebase-admin/firestore";

export function CustomFirestoreAdapter(config: any): Adapter {
  const baseAdapter = FirestoreAdapter(config);
  const db = getFirestore();

  return {
    ...baseAdapter,
    createUser: async (data: Omit<AdapterUser, "id">) => {
      if (!baseAdapter?.createUser) {
        throw new Error("createUser method is undefined");
      }
      const user = await baseAdapter.createUser(data);

      await db.collection("users").doc(user.id).set(
        {
          ...user,
          createdAt: new Date(),
          legacy: false,
          legacyClaimed: false,
          legacyClaimedBy: null,
        },
        { merge: true }
      );

      await db.collection("publicUsers").doc(user.id).set(
        {
          displayName: user.name,
          name: user.name,
          image: user.image || "/imgs/default-user.svg",
          role: "user",
          socials: user.socials || {},
        },
        { merge: true }
      );

      return user;
    },
    linkAccount: async (data: AdapterAccount) => {
      if (!baseAdapter?.linkAccount) {
        throw new Error("linkAccount method is undefined");
      }
      const account = await baseAdapter.linkAccount(data);
      if (account) return account;
    },
  };
}
