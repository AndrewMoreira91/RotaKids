import { UserProps } from "./userType";

export type AuthStackParamList = {
  InitialAcessPage: undefined;
	PhoneRegister: { user: { cpf: string } };
  CheckCode: { user: { cpf: string, phone: string } | UserProps };
  Register: { user: { cpf: string, phone: string } };
  PrivacyPolicy:{ user: UserProps } ;
  SendDocuments: undefined;
};

export type HomeStackParamList = {
  Home: undefined;
  Childs: undefined;
  ChildRegister: undefined;
  GuardiansRegister: undefined;
  Payments: undefined;
  Guardians: undefined;
  ManageRoutes: undefined;
  Schools: undefined;
  SchoolsRegister: undefined;
};
