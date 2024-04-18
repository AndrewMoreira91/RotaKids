import type { NativeStackScreenProps } from '@react-navigation/native-stack';

export type RootStackParamList = {
  InitialAcessPage: undefined;
	TelRegister: undefined;
  CheckCode: { tel: number | null };
  Register: undefined;
  PrivacyPolicy: undefined;
  SendDocuments: undefined;
};

export type Props = NativeStackScreenProps<RootStackParamList>;