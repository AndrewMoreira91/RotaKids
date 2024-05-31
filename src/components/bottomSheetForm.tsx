import BottomSheet, { BottomSheetProps, BottomSheetView } from "@gorhom/bottom-sheet";
import { Input } from "./input";
import Button from "./button";

type BottomSheetFormProps = {
	index?: number;
	title: string;
	placeholder?: string;
	onClose: () => void;
}

function BottomSheetForm({ index = 0, title, placeholder, onClose }: BottomSheetFormProps) {
	return (
		<BottomSheet
			snapPoints={["1%", '90%']}
			index={index}
			onClose={onClose}
		>
			<BottomSheetView className="mx-4 gap-4">
				<Input>
					<Input.Field placeholder={placeholder}/>
				</Input>
				<Button>
					<Button.Text title={title} />
				</Button>
			</BottomSheetView>
		</BottomSheet>
	)
}

export default BottomSheetForm;