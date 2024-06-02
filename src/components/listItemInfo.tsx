import { GuardianProps, UserProps } from "@/types/userType";
import ButtonPill from "./buttonPill";
import { Text, View } from "react-native";

type ListItemInfoProps = {
	title: string;
	secondTitle?: string;
}

function ListItemInfo({ title, secondTitle }: ListItemInfoProps ) {
	
	return (
		<View className=" w-full py-3 flex-row items-center justify-between">
			<View className="flex-auto">
				<Text className="font-semibold text-2xl">{title}</Text>
				{secondTitle && <Text className="font-regular leading-5">{secondTitle}</Text>}
			</View>
			<ButtonPill title="Detalhes" />
		</View>
	);
}

export default ListItemInfo;