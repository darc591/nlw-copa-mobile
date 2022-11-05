import { NavigationContainer } from "@react-navigation/native";
import AppRoutes from "./app.routes";
import SingIn from "../screens/SingIn";
import useAuth from "../hooks/useAuth";
import { Box } from "native-base";

const Routes = () => {
  const { user } = useAuth();
  return (
    <Box flex={1} bg="gray.900">
      <NavigationContainer>
        {user.name ? <AppRoutes /> : <SingIn />}
      </NavigationContainer>
    </Box>
  );
};

export default Routes;
