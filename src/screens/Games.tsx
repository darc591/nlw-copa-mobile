import { FlatList, useToast, View } from "native-base";
import React, { useCallback, useEffect, useState } from "react";
import { Game, GameProps } from "../components/Game";
import { api } from "../services/api";
import { useFocusEffect } from "@react-navigation/native";
import { Loading } from "../components/Loading";

interface Props {
  poolId: string;
}

const Games = ({ poolId }: Props) => {
  const [isLoading, setIsloading] = useState<boolean>(true);
  const [games, setGames] = useState<GameProps[]>([] as GameProps[]);
  const toast = useToast();
  const handleConfirmarPalpite = async (
    gameId: string,
    firstTeamPoints: number,
    secondTeamPoints: number
  ) => {
    try {
      setIsloading(true);
      await api.post(`/pools/${poolId}/games/${gameId}/guesses`, {
        firstTeamPoints,
        secondTeamPoints,
      });
      toast.show({
        title: "Palpite confirmado!",
        placement: "top",
        bgColor: "green.500",
      });
      handleBuscarGames();
    } catch (error) {
      toast.show({
        title: error.response.data.message,
        bgColor: "red.500",
        placement: "top",
      });
    } finally {
      setIsloading(false);
    }
  };

  const handleBuscarGames = async () => {
    try {
      setIsloading(true);
      const response = await api.get(`/pools/${poolId}/games`);
      setGames(response.data?.games);
    } catch (error) {
      console.error(error);
    } finally {
      setIsloading(false);
    }
  };

  useFocusEffect(
    useCallback(() => {
      handleBuscarGames();
    }, [poolId])
  );

  return isLoading ? (
    <Loading />
  ) : (
    <FlatList
      data={games}
      keyExtractor={(item) => item.id}
      _contentContainerStyle={{
        paddingBottom: "24",
      }}
      renderItem={({ item }) => (
        <Game data={item} onGuessConfirm={handleConfirmarPalpite} />
      )}
    />
  );
};

export default Games;
