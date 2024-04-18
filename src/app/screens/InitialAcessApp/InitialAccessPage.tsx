import { useState } from "react"
import { FontAwesome } from "@expo/vector-icons"

import { View, Text, StatusBar, Alert, SafeAreaView } from "react-native"

import { NativeStackScreenProps } from "@react-navigation/native-stack"
import { RootStackParamList } from "@/types/reactNavigationTypes"

import { colors } from "@/styles/colors"
import formatCPF from "@/utils/formatCPF"

import Button from "@/components/button"
import { Input } from "@/components/input"

export type Props = NativeStackScreenProps<RootStackParamList, "InitialAcessPage">;

export default function InitialAccessPage({ navigation }: Props) {

  const [cpf, setCpf] = useState<number | null>(null)

  const [isDisabled, setIsDisabled] = useState(false)

  function handleCpfChange(value: string) {
    value = value.replace(/\D/g, "")
    setCpf(Number(value))

    if (value.length === 11) {
      setIsDisabled(false)
    } else {
      setIsDisabled(true)
    }
  }

  function handleNext() {
    // if (cpf === null) {
    //   return Alert.alert("Digite um CPF válido")
    // }
    // if (cpf < 11) {
    //   return Alert.alert("Digite um CPF completo")
    // }
    if (cpf) {
    }
		navigation.navigate("TelRegister")
  }

  return (
    <SafeAreaView className="flex-1 bg-gray-25 px-4">
      <StatusBar backgroundColor={"#ffffff"} barStyle={"dark-content"} />
      <View className="flex-1 mt-16">
        <View className="gap-3">
          <Text className="font-semibold text-3xl">
            Digite seu CPF
          </Text>

          <Input>
            <Input.Field
              placeholder="Digite aqui seu cpf"
              keyboardType="number-pad"
              onChangeText={value => handleCpfChange(value)}
              maxLength={14}
              value={formatCPF(cpf ? cpf.toString() : "")}
            />
          </Input>

          <Button onPress={handleNext} isDisabled={isDisabled}>
            <Button.Text title="Continue" />
          </Button>
        </View>

        <View className="w-full flex-row justify-between items-center my-8">
          <View className="flex-1 border-b border-ink-light" />
          <Text className="text-ink-light font-regular mx-3">OU</Text>
          <View className="flex-1 border-b border-ink-light" />
        </View>

        <View className="gap-6">
          <Button theme="secondary">
            <FontAwesome name="facebook" color={colors.blue[900]} size={24} />
            <Button.Text theme="secondary" title="Continue com o Facebook" />
          </Button>
          <Button theme="secondary">
            <FontAwesome name="google" color={colors.blue[900]} size={24} />
            <Button.Text theme="secondary" title="Continue com o Google" />
          </Button>
        </View>

      </View>
    </SafeAreaView>
  )
}