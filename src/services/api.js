import axios from "axios";

const api = axios.create({
    baseURL: "https://viacep.com.br/ws/" // rota
});

export default api; // exportar para poder usar