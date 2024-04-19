import type { NativeStackScreenProps } from '@react-navigation/native-stack';

import { UserProps } from "@/store/user-store";

export type RootStackParamList = {
  InitialAcessPage: undefined;
	PhoneRegister: { user: { cpf: number } };
  CheckCode: { user: { cpf: number, phone: number } };
  Register: { user: { cpf: number, phone: number } };
  PrivacyPolicy:{ user: UserProps } ;
  SendDocuments: undefined;
};

export type Props = NativeStackScreenProps<RootStackParamList>;