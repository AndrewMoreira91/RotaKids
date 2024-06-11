import { GuardianProps, UserProps } from "./userType";
import { RouteProps } from "./routeType";

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
  Payments: undefined;
  Guardians: undefined | { guardian: GuardianProps };
  GuardiansRegister: undefined;
  ManageRoutes: { routes: RouteProps[] };
  DetailsRoute: { route: RouteProps };
  Schools: undefined;
  SchoolsRegister: undefined;
};
