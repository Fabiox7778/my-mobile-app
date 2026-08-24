import { View, Text, StyleSheet, Image } from "react-native";
import { StatusBar } from "expo-status-bar";
import { Octicons, MaterialCommunityIcons, MaterialIcons } from "@expo/vector-icons";

export default function Sobre() {
    return (
    <View style={styles.container}>
      <View style={styles.whiteBox}>
        <Image source={require('../../assets/myPicture.webp')} style={styles.myPicture} />
        <Text style={styles.title}>Dev Fabio T.</Text>
        <Text>Full Stack Developer</Text>
        <View style={styles.socialBox}>
          <Octicons name="mark-github" size={30} color="black" />
          <MaterialCommunityIcons name="linkedin" size={36} color="black" />
          <MaterialIcons name="email" size={32} color="black" />
        </View>
      </View>
      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#ffffff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  whiteBox: {
    height: 260,
    width: 220,
    backgroundColor: '#eeeaea',
    borderRadius: 14,
    alignItems: 'center',
    borderRadius: 16,
    borderColor: "#000000",
    borderWidth: 2
  },
  myPicture: {
    height: 92,
    width: 92,
    borderRadius: 50,
    marginTop: 16,
    justifyContent: 'center'
  },
  title: {
    fontWeight: 'bold',
    fontSize: 22,
    marginTop: 10
  },
  socialBox: {
    flex: 1,
    width: '70%',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between'
  },
    
});