import AsyncStorage from "@react-native-async-storage/async-storage"
import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";
import { UserProps } from "@/types/userType";

type UseStoreProps = {
	guardiansList: UserProps[];
	setGuardiansList: (guardians: UserProps[]) => void;
	clearList: () => void;
};

export const useGuardianStore = create(
	persist<UseStoreProps>(set => ({
		guardiansList: [],
		setGuardiansList: (guardians: UserProps[]) => set({ guardiansList: guardians }),
		clearList: () => set({ guardiansList: [] })
	}), {
		name: "rota-kids: guardian-store",
		storage: createJSONStorage(() => AsyncStorage)
	}))
