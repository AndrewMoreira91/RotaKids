import AsyncStorage from "@react-native-async-storage/async-storage"
import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";
import { UserProps } from "@/types/userType";

type UseStoreProps = {
	user: UserProps | null;
	signIn: ({}: UserProps) => void;
	signOut: () => void;
};

export const useUserStore = create(
	persist<UseStoreProps>(set => ({
		user: null,
		
		signIn: ({id, firstName, lastName, email, phone, cpf }: UserProps) => set({
			user: {
				id,
				firstName,
				lastName,
				email,
				phone,
				cpf
			}
		}),

		signOut: () => set({ user: null }),
	}), {
		name: "rota-kids: user-store",
		storage: createJSONStorage(() => AsyncStorage)
	}))
