import { Button, HStack, Text, useTheme, useToast, VStack } from "native-base";
import { X, Check } from "phosphor-react-native";
import { getName } from "country-list";
import dayjs from "dayjs";
import ptBR from "dayjs/locale/pt-br";
import { Team } from "./Team";
import { useEffect, useState } from "react";

interface GuessProps {
  id: string;
  gameId: string;
  createdAt: string;
  participantId: string;
  firstTeamPoints: number;
  secondTeamPoints: number;
}

export interface GameProps {
  id: string;
  date: string;
  firstTeamCountryCode: string;
  secondTeamCountryCode: string;
  guess: null | GuessProps;
}

interface Props {
  data: GameProps;
  onGuessConfirm: (
    gameId: string,
    firstTeamPoints: number,
    secondTeamPoints: number
  ) => void;
}

export function Game({ data, onGuessConfirm }: Props) {
  const { colors, sizes } = useTheme();
  const [firstTeamPoints, setFirstTeamPoints] = useState("");
  const [secondTeamPoints, setSecondTeamPoints] = useState("");
  const [tempoEsgotado, setTempoEsgotado] = useState(false);
  const toast = useToast();
  const onSubmit = () => {
    if (!firstTeamPoints || !secondTeamPoints) {
      return toast.show({
        title: "palpite invalido, insira um valor para cada time",
        placement: "top",
        bgColor: "red.500",
      });
    }
    onGuessConfirm(data.id, Number(firstTeamPoints), Number(secondTeamPoints));
  };

  const parsedDate = dayjs(data.date)
    .locale(ptBR)
    .format("DD [de] MMMM [de] YYYY [às] HH:00[h]");
  useEffect(() => {
    setTempoEsgotado(dayjs(data.date) < dayjs());
  }, [data.date]);
  return (
    <VStack
      w="full"
      bgColor="gray.800"
      rounded="sm"
      alignItems="center"
      borderBottomWidth={3}
      borderBottomColor="yellow.500"
      mb={3}
      p={4}
    >
      <Text color="gray.100" fontFamily="heading" fontSize="sm">
        {getName(data.firstTeamCountryCode)} vs.{" "}
        {getName(data.secondTeamCountryCode)}
      </Text>

      <Text color="gray.200" fontSize="xs">
        {parsedDate}
      </Text>

      <HStack
        mt={4}
        w="full"
        justifyContent="space-between"
        alignItems="center"
      >
        <Team
          code={data.firstTeamCountryCode}
          position="right"
          onChangeText={setFirstTeamPoints}
        />

        <X color={colors.gray[300]} size={sizes[6]} />

        <Team
          code={data.secondTeamCountryCode}
          position="left"
          onChangeText={setSecondTeamPoints}
        />
      </HStack>

      {!data.guess && (
        <Button
          size="xs"
          w="full"
          bgColor={tempoEsgotado ? "gray.500" : "green.500"}
          mt={4}
          onPress={onSubmit}
          disabled={tempoEsgotado}
        >
          <HStack alignItems="center">
            <Text color="white" fontSize="xs" fontFamily="heading" mr={3}>
              {tempoEsgotado ? "TEMPO ESGOTADO" : "CONFIRMAR PALPITE"}
            </Text>
            {!tempoEsgotado && <Check color={colors.white} size={sizes[4]} />}
          </HStack>
        </Button>
      )}
    </VStack>
  );
}
