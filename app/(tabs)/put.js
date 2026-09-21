import { useEffect, useState } from "react";
import {
  View,
  Text,
  Image,
  Pressable,
  StyleSheet,
  ScrollView,
  ActivityIndicator,
  TextInput,
  Alert,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import axios from "axios";

const API_KEY =
  "cv_2A1bwKgas3-94nqKQODSVJdqTJy2d9D77Eu0smDfByfiv2nHq4WFaESuKAFHCkUT";

const api = axios.create({
  baseURL: "https://api-ds.codeverse.dev.br",
  headers: {
    "x-api-key": API_KEY,
  },
});

const API_BASE_URL = "https://api-ds.codeverse.dev.br";

function imagemCompleta(url) {
  if (!url) return null;
  return url.startsWith("http") ? url : `${API_BASE_URL}${url}`;
}

export default function EditarAnimeScreen() {
  const [animes, setAnimes] = useState([]);
  const [carregando, setCarregando] = useState(true);
  const [erro, setErro] = useState(null);
  const [selecionado, setSelecionado] = useState(null);

  const [titulo, setTitulo] = useState("");
  const [imagemUrl, setImagemUrl] = useState("");
  const [genero, setGenero] = useState("");
  const [numeroEpisodios, setNumeroEpisodios] = useState("");
  const [anoLancamento, setAnoLancamento] = useState("");
  const [estudio, setEstudio] = useState("");
  const [salvando, setSalvando] = useState(false);

  async function buscarAnimes() {
    setCarregando(true);
    setErro(null);

    try {
      const resposta = await api.get("/api/animes", {
        params: { limit: 50 },
      });

      setAnimes(Array.isArray(resposta.data.data) ? resposta.data.data : []);
    } catch (error) {
      setErro("Não foi possível carregar os animes.");
    } finally {
      setCarregando(false);
    }
  }

  useEffect(() => {
    buscarAnimes();
  }, []);

  function selecionarAnime(anime) {
    setSelecionado(anime);
    setTitulo(anime.title || "");
    setImagemUrl(anime.imageUrl || "");
    setGenero(anime.genero || "");
    setNumeroEpisodios(String(anime.numero_episodios || ""));
    setAnoLancamento(String(anime.ano_lancamento || ""));
    setEstudio(anime.estudio || "");
  }

  async function salvarEdicao() {
    if (!selecionado) return;

    if (!titulo) {
      Alert.alert("Preencha pelo menos o título.");
      return;
    }

    setSalvando(true);

    try {
      await api.put(`/api/animes/${selecionado.id}`, {
        title: titulo,
        imageUrl: imagemUrl,
        genero,
        numero_episodios: Number(numeroEpisodios),
        ano_lancamento: Number(anoLancamento),
        estudio,
      });

      Alert.alert("Anime atualizado!");
      setSelecionado(null);
      buscarAnimes();
    } catch (error) {
      Alert.alert("Não foi possível atualizar o anime.");
    } finally {
      setSalvando(false);
    }
  }

  return (
    <SafeAreaView style={styles.safeArea}>
      <ScrollView contentContainerStyle={styles.conteudo}>
        <View style={styles.header}>
          <Text style={styles.tituloPagina}>Editar anime</Text>
          <Text style={styles.subtitulo}>Selecione um item para alterar</Text>
        </View>

        {!selecionado && (
          <>
            {carregando && <ActivityIndicator style={{ marginVertical: 16 }} />}
            {erro && <Text style={styles.erro}>{erro}</Text>}

            {!carregando &&
              animes.map((anime) => (
                <View key={anime.id} style={styles.card}>
                  {imagemCompleta(anime.imageUrl) ? (
                    <Image
                      source={{ uri: imagemCompleta(anime.imageUrl) }}
                      style={styles.imagem}
                    />
                  ) : (
                    <View style={styles.imagemSemFoto} />
                  )}

                  <View style={styles.info}>
                    <Text style={styles.id}>#{anime.id}</Text>
                    <Text style={styles.titulo}>{anime.title}</Text>
                  </View>

                  <Pressable
                    style={styles.botao}
                    onPress={() => selecionarAnime(anime)}
                  >
                    <Text style={styles.botaoTexto}>Editar</Text>
                  </Pressable>
                </View>
              ))}
          </>
        )}

        {selecionado && (
          <>
            <Pressable
              onPress={() => setSelecionado(null)}
              style={styles.voltar}
            >
              <Text style={styles.voltarTexto}>Voltar para a lista</Text>
            </Pressable>

            <Text style={styles.rotulo}>Título</Text>
            <TextInput
              style={styles.campo}
              value={titulo}
              onChangeText={setTitulo}
              placeholder="Ex: Naruto"
            />

            <Text style={styles.rotulo}>URL da imagem</Text>
            <TextInput
              style={styles.campo}
              value={imagemUrl}
              onChangeText={setImagemUrl}
              placeholder="Ex: https://exemplo.com/naruto.jpg"
            />

            <Text style={styles.rotulo}>Gênero</Text>
            <TextInput
              style={styles.campo}
              value={genero}
              onChangeText={setGenero}
              placeholder="Ex: Shounen"
            />

            <Text style={styles.rotulo}>Número de episódios</Text>
            <TextInput
              style={styles.campo}
              value={numeroEpisodios}
              onChangeText={setNumeroEpisodios}
              placeholder="Ex: 220"
              keyboardType="numeric"
            />

            <Text style={styles.rotulo}>Ano de lançamento</Text>
            <TextInput
              style={styles.campo}
              value={anoLancamento}
              onChangeText={setAnoLancamento}
              placeholder="Ex: 2002"
              keyboardType="numeric"
            />

            <Text style={styles.rotulo}>Estúdio</Text>
            <TextInput
              style={styles.campo}
              value={estudio}
              onChangeText={setEstudio}
              placeholder="Ex: Pierrot"
            />

            <Pressable
              style={styles.botaoSalvar}
              onPress={salvarEdicao}
              disabled={salvando}
            >
              <Text style={styles.botaoSalvarTexto}>
                {salvando ? "Salvando..." : "Salvar alterações"}
              </Text>
            </Pressable>
          </>
        )}
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: "#f8fbff",
  },
  conteudo: {
    padding: 24,
    paddingBottom: 48,
  },
  header: {
    marginBottom: 16,
  },
  tituloPagina: {
    fontSize: 24,
    fontWeight: "800",
    color: "#102542",
  },
  subtitulo: {
    fontSize: 14,
    color: "#5f6b7a",
    marginTop: 2,
  },
  erro: {
    color: "#000653",
    marginTop: 12,
  },
  card: {
    flexDirection: "row",
    alignItems: "center",
    gap: 12,
    backgroundColor: "#ffffff",
    borderRadius: 12,
    padding: 12,
    marginBottom: 10,
  },
  imagem: {
    width: 56,
    height: 56,
    borderRadius: 10,
  },
  imagemSemFoto: {
    width: 56,
    height: 56,
    borderRadius: 10,
    backgroundColor: "#dfe7f2",
  },
  info: {
    flex: 1,
  },
  id: {
    fontSize: 12,
    color: "#5f6b7a",
    marginBottom: 4,
  },
  titulo: {
    fontSize: 16,
    fontWeight: "700",
    color: "#102542",
  },
  botao: {
    backgroundColor: "#000653",
    paddingHorizontal: 14,
    paddingVertical: 10,
    borderRadius: 8,
  },
  botaoTexto: {
    color: "#ffffff",
    fontWeight: "700",
    fontSize: 13,
  },
  voltar: {
    marginBottom: 16,
  },
  voltarTexto: {
    color: "#000653",
    fontWeight: "700",
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
  botaoSalvar: {
    backgroundColor: "#000653",
    paddingVertical: 14,
    borderRadius: 10,
    alignItems: "center",
    marginTop: 4,
  },
  botaoSalvarTexto: {
    color: "white",
    fontWeight: "700",
  },
});