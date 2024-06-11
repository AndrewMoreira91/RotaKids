import { RouteProps } from "@/types/routeType"
import AsyncStorage from "@react-native-async-storage/async-storage"
import { create } from "zustand"
import { persist, createJSONStorage} from "zustand/middleware"

type RoutesStoreProps = {
	routes: RouteProps[] | []
	setRoutes: (routes: RouteProps[]) => void
	removeRoute: (routeId: number) => void
}

export const useRoutesStore = create(
	persist<RoutesStoreProps>(set => ({
		routes: [],
		setRoutes: (routes: RouteProps[]) => set({ routes }),
		removeRoute: (routeId: number) => set(state => ({
			routes: state.routes.filter(route => route.id !== routeId)
		}))
	}), {
		name: "rota-kids: route-store",
		storage: createJSONStorage(() => AsyncStorage)
	})
)