import { Heading, Text, VStack } from "native-base";
import React from "react";
import { Header } from "../components/Header";
import Logo from "../assets/logo.svg";
import { Input } from "../components/Input";
import { Button } from "../components/Button";
const Find = () => {
  return (
    <VStack flex={1} bgColor="gray.900">
      <Header title="Criar novo bolão" showBackButton />
      <VStack mt={8} mx={5} alignItems="center">
        <Heading
          fontFamily="heading"
          color="white"
          fontSize="xl"
          my={6}
          textAlign="center"
        >
          Encontre um bolão através de seu código único
        </Heading>
        <Input mb={2} placeholder="Qual o código do bolão?" />
        <Button title="BUSCAR BOLÃO" />
      </VStack>
    </VStack>
  );
};

export default Find;
