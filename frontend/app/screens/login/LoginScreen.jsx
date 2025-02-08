import React from 'react';
import { View, Button, Text } from 'react-native';
import { useAuth0 } from 'react-native-auth0';

export default function LoginScreen({ navigation }) {
  const { user, authorize, clearSession, error } = useAuth0();

  // Log user info when it changes
  React.useEffect(() => {
    if (user) {
      console.log("User logged in:", user);
    }
  }, [user]);

  const LoginButton = () => {
    const onPress = async () => {
      try {
        await authorize();
      } catch (e) {
        console.log(e);
      }
    };
    return <Button onPress={onPress} title="Log in" />;
  };

  const LogoutButton = () => {
    const onPress = async () => {
      try {
        await clearSession();
      } catch (e) {
        console.log(e);
      }
    };
    return <Button onPress={onPress} title="Log out" />;
  };

  const Profile = () => (
    <>
      {user && <Text>Logged in as {user.name}</Text>}
      {error && <Text>Error: {error.message}</Text>}
    </>
  );

  return (
    <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
      {user ? (
        <>
          <Profile />
          <LogoutButton />
          <Button title="Go to Home" onPress={() => navigation.replace("Home")} />
        </>
      ) : (
        <View>
          <Text>Please log in</Text>
          <LoginButton />
        </View>
      )}
    </View>
  );
}
