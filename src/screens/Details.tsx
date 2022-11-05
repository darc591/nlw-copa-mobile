import { HStack, VStack } from "native-base";
import React, { useCallback, useEffect, useState } from "react";
import { useRoute } from "@react-navigation/native";
import { Header } from "../components/Header";
import { PoolHeader } from "../components/PoolHeader";
import { PoolPros } from "../components/PoolCard";
import { api } from "../services/api";
import { Loading } from "../components/Loading";
import { useFocusEffect } from "@react-navigation/native";
import { Option } from "../components/Option";
import Games from "./Games";
import Ranking from "./Ranking";
import { Share } from "react-native";
type RouteParams = {
  id: string;
};

const Details = () => {
  const [poolDetails, setPoolDetails] = useState<PoolPros>();
  const [isLoading, setIsLoading] = useState<Boolean>(true);
  const [selectedOption, setSelectedOption] = useState<number>(0);
  const route = useRoute();
  const { id } = route.params as RouteParams;

  const handleBuscarPoolDetails = async () => {
    try {
      setIsLoading(true);
      const response = await api.get(`/pools/${id}`);
      setPoolDetails(response.data.pool);
    } catch (error) {
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleShareCode = async () => {
    await Share.share({
      message: poolDetails.code,
    });
  };

  useFocusEffect(
    useCallback(() => {
      handleBuscarPoolDetails();
    }, [id])
  );

  return (
    <VStack flex={1} bgColor="gray.900">
      <Header
        title={isLoading ? "" : poolDetails.title}
        showBackButton
        showShareButton
        handleShare={handleShareCode}
      />
      {isLoading ? (
        <Loading />
      ) : (
        <VStack flex={1} px={5}>
          <PoolHeader data={poolDetails} />
          <HStack bgColor="gray.800" p={1} rounded="sm" mb={5}>
            <Option
              title="Seus palpites"
              isSelected={selectedOption === 0}
              onPress={() => setSelectedOption(0)}
            />
            <Option
              title="Ranking de grupo"
              isSelected={selectedOption === 1}
              onPress={() => setSelectedOption(1)}
            />
          </HStack>
          {selectedOption === 0 ? (
            <Games poolId={poolDetails.id} />
          ) : (
            <Ranking />
          )}
        </VStack>
      )}
    </VStack>
  );
};

export default Details;
