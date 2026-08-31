import { Link } from "expo-router";
import {
  Dimensions,
  Image,
  Pressable,
  StyleSheet,
  Text,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

const trevizolliLogo = require("../../assets/trevizolli-logo.png");
const { width } = Dimensions.get("window");
const logoHeight = Math.min(width * 0.58, 260);
const isSmallScreen = width < 360;

export default function HomeScreen() {
  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.container}>
        <View style={styles.hero}>
          <Image
            source={trevizolliLogo}
            resizeMode="contain"
            style={{
              width: "100%",
              height: logoHeight,
              marginVertical: -18,
              transform: [{ scale: isSmallScreen ? 1.15 : 1.6 }],
            }}
          />
          <Text style={styles.eyebrow}>React Native + Expo Router</Text>
          <Text style={styles.title}>Um app organizado</Text>
          <Text style={styles.description}>
            Estrutura pronta para o aluno focar em componentes, navegação e
            lógica de negócio desde a primeira aula.
          </Text>
        </View>

        <View style={styles.card}>
          <Text style={styles.cardTitle}>O que vem configurado</Text>
          <Text style={styles.cardItem}>• JavaScript habilitado</Text>
          <Text style={styles.cardItem}>• Rotas com expo-router</Text>
          <Text style={styles.cardItem}>• Abas e modal de exemplo</Text>
          <Text style={styles.cardItem}>• Scripts para Android, iOS e Web</Text>
        </View>

        <Link href="/modal" asChild>
          <Pressable style={styles.button}>
            <Text style={styles.buttonText}>Abrir modal de exemplo</Text>
          </Pressable>
        </Link>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: "#f8fbff",
  },
  container: {
    flex: 1,
    paddingHorizontal: 20,
    paddingTop: 16,
    paddingBottom: 20,
    gap: 18,
  },
  hero: {
    alignItems: "center",
    gap: 10,
    paddingHorizontal: 20,
    paddingTop: 10,
    paddingBottom: 22,
    borderRadius: 24,
    backgroundColor: "#000653",
  },
  logo: {
    width: 120,
    height: 120,
    marginBottom: 4,
  },
  eyebrow: {
    fontSize: 12,
    fontWeight: "700",
    letterSpacing: 1,
    textTransform: "uppercase",
    color: "#d0e2ff",
    textAlign: "center",
  },
  title: {
    fontSize: isSmallScreen ? 26 : 32,
    fontWeight: "800",
    color: "#ffffff",
    textAlign: "center",
  },
  description: {
    fontSize: isSmallScreen ? 14 : 16,
    lineHeight: isSmallScreen ? 21 : 24,
    color: "#edf5ff",
    textAlign: "center",
  },
  card: {
    gap: 8,
    padding: 20,
    borderRadius: 20,
    backgroundColor: "#ffffff",
  },
  cardTitle: {
    fontSize: 18,
    fontWeight: "700",
    color: "#102542",
  },
  cardItem: {
    fontSize: 15,
    color: "#334e68",
    lineHeight: 22,
  },
  button: {
    paddingVertical: 16,
    paddingHorizontal: 20,
    borderRadius: 16,
    alignItems: "center",
    backgroundColor: "#c62828",
  },
  buttonText: {
    fontSize: 16,
    fontWeight: "700",
    color: "#ffffff",
  },
});
