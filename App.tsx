import { NativeBaseProvider, StatusBar, View } from "native-base";
import { THEME } from "./src/styles/theme";
import {
  useFonts,
  Roboto_400Regular,
  Roboto_500Medium,
  Roboto_700Bold,
} from "@expo-google-fonts/roboto";
import SingIn from "./src/screens/SingIn";
import { AuthContextProvider } from "./src/contexts/AuthContext";
import New from "./src/screens/New";
import { Loading } from "./src/components/Loading";
import Find from "./src/screens/Find";

export default function App() {
  const [fontsloaded] = useFonts({
    Roboto_400Regular,
    Roboto_500Medium,
    Roboto_700Bold,
  });

  return (
    <NativeBaseProvider theme={THEME}>
      <AuthContextProvider>
        <StatusBar
          barStyle="light-content"
          backgroundColor="transparent"
          translucent
        />
        {/* <New /> */}
        <Find />
        {/* {fontsloaded ? <SingIn /> : <Loading />} */}
      </AuthContextProvider>
    </NativeBaseProvider>
  );
}
