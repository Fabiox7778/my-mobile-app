import { useState } from "react";
import {
  View,
  Text,
  TextInput,
  Pressable,
  StyleSheet,
  Alert,
  ScrollView,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import axios from "axios";

const API_KEY =
  "cv_zj9zQ1zMsi6PvyG-l73gbZvZupEU0ZlJgchcJcWTVEwOPpCDbaf6QwgBSNCV3kB3";

const api = axios.create({
  baseURL: "https://api-ds.codeverse.dev.br",
  headers: {
    "x-api-key": API_KEY,
  },
});

export default function AnimesCriarScreen() {
  const [titulo, setTitulo] = useState("");
  const [descricao, setDescricao] = useState("");
  const [imagemUrl, setImagemUrl] = useState("");
  const [status, setStatus] = useState("Finalizado");
  const [estudio, setEstudio] = useState("");
  const [genero, setGenero] = useState("");
  const [baseadoEmManga, setBaseadoEmManga] = useState(false);

  const [enviando, setEnviando] = useState(false);

  async function criarAnime() {
    if (!titulo) {
      Alert.alert("Preencha pelo menos o título.");
      return;
    }

    setEnviando(true);
    try {
      const resposta = await api.post("/api/animes", {
        title: titulo,
        description: descricao,
        imageUrl: imagemUrl,
        status,
        estudio,
        baseado_em_manga: baseadoEmManga,
        genero,
      });

      Alert.alert("Anime criado!", resposta.data.title);
      setTitulo("");
      setDescricao("");
      setImagemUrl("");
      setStatus("Finalizado");
      setEstudio("");
      setGenero("");
      setBaseadoEmManga(false);
    } catch (e) {
      Alert.alert(
        "Não deu pra criar o anime",
        "A API respondeu com erro. Confere se todos os campos estão certinhos e tenta de novo.",
      );
    } finally {
      setEnviando(false);
    }
  }

  return (
    <SafeAreaView style={styles.safeArea}>
      <ScrollView contentContainerStyle={styles.conteudo}>
        <View style={styles.header}>
          <Text style={styles.tituloPagina}>Criar anime</Text>
          <Text style={styles.subtitulo}>POST /api/animes</Text>
        </View>

        <Text style={styles.rotulo}>Título</Text>
        <TextInput
          style={styles.campo}
          value={titulo}
          onChangeText={setTitulo}
          placeholder="Ex: Naruto"
        />

        <Text style={styles.rotulo}>Descrição</Text>
        <TextInput
          style={styles.campo}
          value={descricao}
          onChangeText={setDescricao}
          placeholder="Ex: Gennin da vila da folha"
        />

        <Text style={styles.rotulo}>URL da imagem</Text>
        <TextInput
          style={styles.campo}
          value={imagemUrl}
          onChangeText={setImagemUrl}
          placeholder="Ex: https://exemplo.com/naruto.jpg"
        />

        <Text style={styles.secao}>Campos específicos do tema animes</Text>

        <Text style={styles.rotulo}>Status</Text>
        <TextInput
          style={styles.campo}
          value={status}
          onChangeText={setStatus}
          placeholder="Ex: Finalizado"
        />

        <Text style={styles.rotulo}>Estudio</Text>
        <TextInput
          style={styles.campo}
          value={estudio}
          onChangeText={setEstudio}
          placeholder="Ex: Toei"
        />

        <Text style={styles.rotulo}>Gênero</Text>
        <TextInput
          style={styles.campo}
          value={genero}
          onChangeText={setGenero}
          placeholder="Ex: Shounen"
        />

        <Pressable
          style={styles.checkbox}
          onPress={() => setBaseadoEmManga(!baseadoEmManga)}
        >
          <Text style={styles.checkboxTexto}>
            {baseadoEmManga ? "✓" : "□"} Baseado em mangá
          </Text>
        </Pressable>

        <Pressable
          style={styles.botao}
          onPress={criarAnime}
          disabled={enviando}
        >
          <Text style={styles.botaoTexto}>
            {enviando ? "Enviando..." : "Criar anime"}
          </Text>
        </Pressable>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: { flex: 1, backgroundColor: "#f8fbff" },
  conteudo: { padding: 24, paddingBottom: 48 },
  header: { marginBottom: 16 },
  tituloPagina: { fontSize: 24, fontWeight: "800", color: "#102542" },
  subtitulo: { fontSize: 14, color: "#5f6b7a", marginTop: 2 },
  secao: {
    fontSize: 14,
    fontWeight: "700",
    color: "#102542",
    marginTop: 8,
    marginBottom: 8,
  },

  rotulo: {
    fontSize: 13,
    fontWeight: "600",
    color: "#334155",
    marginBottom: 4,
  },
  campo: {
    borderWidth: 1,
    borderColor: "#cbd5e1",
    borderRadius: 8,
    paddingHorizontal: 12,
    paddingVertical: 10,
    marginBottom: 12,
    backgroundColor: "white",
  },
  checkbox: {
    marginBottom: 16,
  },
  checkboxTexto: {
    fontSize: 15,
    color: "#334155",
  },
  botao: {
    backgroundColor: "#c62828",
    paddingVertical: 14,
    borderRadius: 10,
    alignItems: "center",
  },
  botaoTexto: { color: "white", fontWeight: "700" },
});