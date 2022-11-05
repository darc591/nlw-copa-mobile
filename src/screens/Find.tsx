import { Heading, useToast, VStack } from "native-base";
import React, { useState } from "react";
import { Header } from "../components/Header";
import { Input } from "../components/Input";
import { Button } from "../components/Button";
import { api } from "../services/api";
import { useNavigation } from "@react-navigation/native";
const Find = () => {
  const [isLoading, setIsloading] = useState<boolean>(false);
  const [code, setCode] = useState<string>("");
  const toast = useToast();
  const { navigate } = useNavigation();
  const handleJoinPool = async () => {
    if (!code.trim()) {
      return toast.show({
        title: "Informe o código",
        placement: "top",
        bgColor: "red.500",
      });
    }
    try {
      setIsloading(true);
      await api.post("/pools/join", { code: code.trim() });

      toast.show({
        title: "Você entrou no bolão com sucesso",
        placement: "top",
        bgColor: "green.500",
      });
      navigate("pools");
      setCode("");
    } catch (error) {
      toast.show({
        title: error.response.data.message.includes("Pool not found")
          ? "Bolão não encontrado"
          : error.response.data.message.includes("You already joined this pool")
          ? "Você já faz parte desse bolão"
          : "ocorreu um erro ao entrar no bolão",
        placement: "top",
        bgColor: "red.500",
      });
    } finally {
      setIsloading(false);
    }
  };

  return (
    <VStack flex={1} bgColor="gray.900">
      <Header title="Buscar por código" showBackButton />
      <VStack mt={8} mx={5} alignItems="center">
        <Heading
          fontFamily="heading"
          color="white"
          fontSize="xl"
          mb={8}
          textAlign="center"
        >
          Encontre um bolão através de seu código único
        </Heading>
        <Input
          mb={2}
          placeholder="Qual o código do bolão?"
          onChangeText={setCode}
          value={code}
          autoCapitalize="characters"
        />
        <Button
          title="BUSCAR BOLÃO"
          isLoading={isLoading}
          onPress={handleJoinPool}
        />
      </VStack>
    </VStack>
  );
};

export default Find;
