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
      
      try {
        const user = await baseAdapter.createUser(data);

        await db.collection("users").doc(user.id).set(
          {
            ...user,
            id: user.id,
            email: data.email,
            createdAt: new Date(),
            legacy: false,
            legacyClaimed: false,
          },
          { merge: true }
        );

        await db.collection("publicUsers").doc(user.id).set(
          {
            id: user.id,
            displayName: user.name,
            createdAt: new Date(),
            Joined: new Date(),
            name: user.name,
            image: user.image || "/imgs/default-user.svg",
            roles: user.roles || {},
            socials: user.socials || {},
          },
          { merge: true }
        );

        return user;
      } catch (error) {
        console.error("Error in createUser:", error);
        throw error;
      }
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
