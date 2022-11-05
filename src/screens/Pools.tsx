import { VStack, Icon, FlatList } from "native-base";
import { Button } from "../components/Button";
import { Header } from "../components/Header";
import { PoolCard } from "../components/PoolCard";
import { Octicons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import { api } from "../services/api";
import { useCallback, useEffect, useState } from "react";
import { Loading } from "../components/Loading";
import { EmptyPoolList } from "../components/EmptyPoolList";
import { useFocusEffect } from "@react-navigation/native";
type Pool = {
  id: string;
  title: string;
  code: string;
  createdAt: string;
  ownerId: string;
  participants: Participant[];
  owner: Owner;
  _count: {
    participants: number;
  };
};
type Owner = {
  name: string;
  id: string;
};
type Participant = {
  id: string;
  user: {
    name: string;
    avatarUrl: string;
  };
};

const Pools = () => {
  const [pools, setPools] = useState<Pool[]>([] as Pool[]);
  const [isLoading, setIsloading] = useState<boolean>(true);
  const navigation = useNavigation();

  const listarBoloes = async () => {
    try {
      setIsloading(true);
      const response = await api.get("/pools");
      setPools(response.data?.pools);
    } catch (error) {
      console.log(error);
    } finally {
      setIsloading(false);
    }
  };

  useFocusEffect(
    useCallback(() => {
      listarBoloes();
    }, [])
  );

  return (
    <VStack flex={1} bgColor="gray.900">
      <Header title="Meus bolões" />
      <VStack
        borderBottomWidth={1}
        borderBottomColor="gray.600"
        mt={6}
        mx={5}
        pb={4}
        mb={4}
      >
        <Button
          title="BUSCAR BOLÃO POR CÓDIGO"
          leftIcon={
            <Icon as={Octicons} name="search" color="black" size="md" />
          }
          onPress={() => navigation.navigate("find")}
        />
      </VStack>
      {isLoading ? (
        <Loading />
      ) : (
        <FlatList
          data={pools}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => (
            <PoolCard
              data={item}
              onPress={() => navigation.navigate("details", { id: item.id })}
            />
          )}
          px={5}
          showsVerticalScrollIndicator={false}
          _contentContainerStyle={{
            paddingBottom: "24",
          }}
          ListEmptyComponent={<EmptyPoolList />}
        />
      )}
    </VStack>
  );
};

export default Pools;
