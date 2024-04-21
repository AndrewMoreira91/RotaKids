import { UserProps } from "@/store/user-store";

export type AuthStackParamList = {
  InitialAcessPage: undefined;
	PhoneRegister: { user: { cpf: number } };
  CheckCode: { user: { cpf: number, phone: number } };
  Register: { user: { cpf: number, phone: number } };
  PrivacyPolicy:{ user: UserProps } ;
  SendDocuments: undefined;
};

export type HomeStackParamList = {
  Home: undefined;
  Childs: undefined;
  Payments: undefined;
  Guardians: undefined;
  ManageRoutes: undefined;
};
