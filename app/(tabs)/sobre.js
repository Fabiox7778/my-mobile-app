import { View, Text, StyleSheet, Image } from "react-native";
import { StatusBar } from "expo-status-bar";

export default function Sobre() {
  return (
    <View style={styles.container}>
      <Text style={styles.name}>Fabio Trevizolli</Text>

      <Image
        source={require("../../assets/myPicture.webp")}
        style={styles.photo}
      />

      <View style={styles.card}>
        <Text style={styles.cardTitle}>Sobre mim</Text>
        <Text style={styles.cardText}>
          Sou desenvolvedor Full Stack e gosto de transformar ideias em
          projetos simples, organizados e funcionais.
        </Text>
      </View>

      <View style={styles.card}>
        <Text style={styles.cardTitle}>Este projeto</Text>
        <Text style={styles.cardText}>
          Este aplicativo foi criado com React Native e Expo Router para
          praticar componentes, telas e navegação.
        </Text>
      </View>

      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 24,
    backgroundColor: "#f8fbff",
  },
  name: {
    marginBottom: 28,
    fontSize: 30,
    fontWeight: "800",
    color: "#102542",
    textAlign: "center",
  },
  photo: {
    alignSelf: "center",
    width: 160,
    height: 160,
    marginBottom: 28,
    borderRadius: 80,
  },
  card: {
    marginBottom: 16,
    padding: 20,
    borderRadius: 18,
    backgroundColor: "#ffffff",
  },
  cardTitle: {
    marginBottom: 8,
    fontSize: 19,
    fontWeight: "700",
    color: "#102542",
  },
  cardText: {
    fontSize: 15,
    lineHeight: 23,
    color: "#334e68",
  },
});