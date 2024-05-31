import { useState } from "react";
import { StatusBar, View, Text, ScrollView } from "react-native";
import { NativeStackScreenProps } from "@react-navigation/native-stack";

import { HomeStackParamList } from "@/types/reactNavigationTypes";
import { formatCPF, formatPhone } from "@/utils/formatToTexts";

import MainConteiner from "@/components/mainConteiner";
import ButtonPill from "@/components/buttonPill";
import { Input } from "@/components/input";
import Button from "@/components/button";
import Header from "@/components/header";

type Props = NativeStackScreenProps<HomeStackParamList, "GuardiansRegister">;

export function GuardianRegisterScreen({ navigation }: Props) {
	const [cpf, setCpf] = useState<string>("");
	const [phone, setPhone] = useState<string>("");

	function handleSave() {
		navigation.goBack();
	}

	return (
		<>
			<Header title="Cadastrar responsável" navigation={navigation} />
			<MainConteiner style={{ marginTop: 0 }}>
				<StatusBar barStyle={"dark-content"} />
				<View className="gap-4">

					<ScrollView>
						<View className="gap-5">
							<View>
								<Text className="text-xl font-semibold">Primeiro nome do responsável</Text>
								<Input>
									<Input.Field placeholder="Digite aqui o nome do responsável" />
								</Input>
							</View>

							<View>
								<Text className="text-xl font-semibold"> Sobrenome do responsável</Text>
								<Input>
									<Input.Field placeholder="Digite aqui o sobrenome do responsável" />
								</Input>
							</View>

							<View>
								<Text className="text-xl font-semibold">CPF do responsável</Text>
								<Input>
									<Input.Field
										placeholder="000.000.000-00"
										onChangeText={value => setCpf(formatCPF(value))}
										value={cpf}
										keyboardType="number-pad"
										maxLength={14}
									/>
								</Input>
							</View>

							<View>
								<Text className="text-xl font-semibold">Email do responsável</Text>
								<Input>
									<Input.Field
										placeholder="Digite aqui o email"
										keyboardType="email-address"
									/>
								</Input>
							</View>

							<View>
								<Text className="text-xl font-semibold">Telefone do responsável</Text>
								<Input>
									<Input.Field
										placeholder="(00) 90000-0000"
										keyboardType="number-pad"
										value={phone}
										onChangeText={value => setPhone(formatPhone(value))}
										maxLength={13}
									/>
								</Input>
							</View>

							<Button onPress={() => handleSave()}>
								<Button.Text title="Salvar" />
							</Button>
						</View>
					</ScrollView>

				</View>
			</MainConteiner >
		</>
	)
}