import { View, Text, StatusBar } from "react-native"
import { FontAwesome } from "@expo/vector-icons"

import { colors } from "@/styles/colors"

import Button from "@/components/button"
import { Input } from "@/components/input"
import { useState } from "react"

export default function Home() {

  const [cpf, setCpf] = useState("")

  function handleCpfChange(value: string) {
    value = value.replace(/\D/g, "")
    console.log(value);

    value = value.replace(/^(\d{3})(\d)/, '$1.$2');
    value = value.replace(/^(\d{3})\.(\d{3})(\d)/, '$1.$2.$3');
    value = value.replace(/^(\d{3})\.(\d{3})\.(\d{3})(\d{1,2})/, '$1.$2.$3-$4');
    setCpf(value)
  }

  return (
    <View className="flex-1 bg-gray-25 px-4">
      <StatusBar barStyle={"dark-content"} />

      <View className="mt-10 gap-3">
        <Text className="font-semibold text-3xl">
          Digite seu CPF
        </Text>

        <Input>
          <Input.Field
            placeholder="Digite aqui seu cpf"
            keyboardType="number-pad"
            onChangeText={value => handleCpfChange(value)}
            maxLength={14}
            value={cpf}
          />
        </Input>

        <Button>
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
  )
}