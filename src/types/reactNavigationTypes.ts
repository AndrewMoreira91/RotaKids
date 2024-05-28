import { UserProps } from "./userType";

export type AuthStackParamList = {
  InitialAcessPage: undefined;
	PhoneRegister: { user: { cpf: string } };
  CheckCode: { user: { cpf: string, phone: string } };
  Register: { user: { cpf: string, phone: string } };
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
