import { useEffect, useState } from "react"
import { FontAwesome } from "@expo/vector-icons"
import { NativeStackScreenProps } from "@react-navigation/native-stack"
import { View, Text, StatusBar, Alert } from "react-native"

import { AuthStackParamList } from "@/types/reactNavigationTypes"

import { colors } from "@/styles/colors"
import { isCPFValidFormat } from "@/utils/validations"
import { formatCPF } from "@/utils/formatToTexts"

import Button from "@/components/button"
import { Input } from "@/components/input"
import MainConteiner from "@/components/mainConteiner"
import api from "@/lib/axios"

type Props = NativeStackScreenProps<AuthStackParamList, "InitialAcessPage">;

export default function InitialAccessScreen({ navigation }: Props) {

  const [cpf, setCpf] = useState<string | null>(null)

  const [isDisabled, setIsDisabled] = useState(true)

  const [isLoading, setIsLoading] = useState(false)

  function handleCpfChange(value: string) {
    setCpf(value)

    if (value.length === 14) {
      setIsDisabled(false)
    } else {
      setIsDisabled(true)
    }
  }

  async function handleNext() {
    if (cpf === null || !isCPFValidFormat(cpf)) {
      return Alert.alert("Digite um CPF válido")
    }
    if (cpf.length < 11) {
      return Alert.alert("Digite um CPF completo")
    }
    if (cpf) {
      setIsLoading(true)
      await api.get(`/users/search?cpf=${cpf}`)
        .then((res) => {
          console.log(res.data)
          if (res.data.length > 0) {
            navigation.navigate("CheckCode", { user: res.data[0] })
          } else {
            navigation.navigate("PhoneRegister", { user: { cpf } })
          }
        })
        .catch(() => Alert.alert("Erro de conecção com o servidor, tente novamente mais tarde	"))
        .finally(() => setIsLoading(false))
    }
  }

  return (
    <MainConteiner>
      <StatusBar backgroundColor={"#ffffff"} barStyle={"dark-content"} />

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
            value={formatCPF(cpf ? cpf : "")}
          />
        </Input>

        <Button onPress={handleNext} isDisabled={isDisabled} isLoading={isLoading}>
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

    </MainConteiner>
  )
}