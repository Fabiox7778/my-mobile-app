import { React, useState, useEffect } from "react"
import { View, Text, Image, TextInput, ActivityIndicator, ScrollView, StyleSheet } from "react-native"
import axios from "axios"
import { SafeAreaView } from "react-native-safe-area-context"

const API_KEY = "cv_D8ljS9Qd0DZntaavU1Fvf0UoNyfYjiH8EAtykKdVWV9RsD2beBn1yD2eMWeiLrXu" 

const api = axios.create({
    baseURL: "https://api-ds.codeverse.dev.br",
    headers: {
        "x-api-key": API_KEY
    }
})

const API_BASE_URL = "https://api-ds.codeverse.dev.br"

function imagemCompleta(url) {
    if (!url) return null
    return url.startsWith("http") ? url : `${API_BASE_URL}${url}`
}

export default function AnimesListarScreen() {
    // aq eu guardo os animes que vem da API e os estados da tela
    const [animes, setAnimes] = useState([])
    const [carregando, setCarregando] = useState(true)
    const [erro, setErro] = useState(null)
    const [busca, setBuscaTitulo] = useState("")
    const [buscaId, setBuscaId] = useState("")

    // nessa função eu busco todos os animes usando o GET
    async function buscarAnimes() {
        setCarregando(true)
        setErro(null)
        try {
            const resposta = await api.get("/api/animes", {
                params: { limit: 50 }
            })
            setAnimes(Array.isArray(resposta.data.data) ? resposta.data.data : [])
        } catch (error) {
            setErro("Não foi possivel carregar animes")
        } finally {
            setCarregando(false)
        }
    }

    // aq eu chamo a função assim que entro nessa aba
    useEffect(() => {
        buscarAnimes()
    }, []);

    return (
        <SafeAreaView style={styles.safeArea}>
            <ScrollView contentContainerStyle={styles.conteudo}>
                <View style={styles.header}>
                    <Text style={styles.tituloPagina}>Listar animes</Text>
                    <Text style={styles.subtitulo}>GET /api/animes</Text>
                </View>

                // aq eu implementei o input de busca pelo titulo
                <TextInput
                    style={styles.campoBusca}
                    value={busca}
                    onChangeText={setBuscaTitulo}
                    placeholder="Buscar anime pelo título"
                />

                // aq eu fiz outro input igual, mas para buscar pelo id
                <TextInput
                    style={styles.campoBusca}
                    value={buscaId}
                    onChangeText={setBuscaId}
                    placeholder="Buscar anime pelo id"
                    keyboardType="numeric"
                />

                {carregando && <ActivityIndicator style={{ marginVertical: 16 }} />}

                {erro && <Text style={styles.erro}>{erro}</Text>}

                // primeiro eu filtro os animes e depois uso o map para mostrar cada um
                {!carregando &&
                    animes
                        .filter((anime) =>
                            anime.title.toLowerCase().includes(busca.toLowerCase()) &&
                            (buscaId === "" || String(anime.id) === buscaId)
                        )
                        .map((anime) => (
                        <View key={anime.id} style={styles.card}>
                            {imagemCompleta(anime.imageUrl) ? (
                                <Image source={{ uri: imagemCompleta(anime.imageUrl) }} style={styles.imagem} />
                            ) : (
                                <View style={styles.imagemSemFoto} />
                            )}
                            <View style={styles.info}>
                                <Text style={styles.titulo}>{anime.title}</Text>
                                <Text style={styles.categoria}>
                                    {anime.status} · {anime.estudio}
                                </Text>
                                <Text style={styles.genero}>{anime.genero}</Text>
                            </View>
                        </View>
                        ))}
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
    campoBusca: {
        borderWidth: 1,
        borderColor: "#cbd5e1",
        borderRadius: 8,
        paddingHorizontal: 12,
        paddingVertical: 10,
        marginBottom: 8,
        backgroundColor: "white",
    },

    erro: { color: "#000653", marginTop: 12 }, 
    card: {
        flexDirection: "row", 
        gap: 12, 
        marginTop: 12, 
        backgroundColor: "white",
        borderRadius: 10,
        overflow: "hidden",
    },
    imagem: { width: 64, height: 64 }, 
    imagemSemFoto: { width: 64, height: 64, backgroundColor: "#e2e8f0" },
    info: { flex: 1, justifyContent: "center", paddingRight: 12 },
    titulo: { fontSize: 16, fontWeight: "700" },
    categoria: { fontSize: 13, color: "#64748b" },
    genero: { fontSize: 13, color: "#64748b", marginTop: 2 },
});