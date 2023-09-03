import axiosFile from "./axiosFile";

const pokemonApi = {
    getAll: (params) => {
        const url = '/pokemon';
        return axiosFile.get(url, { params });
    },
    getByUrl: (url) => {
        return axiosFile.get(url);
    },
    get: (id) => {
        const url = `/pokemon/${id}`;
        return axiosFile.get(url);
    }
}
export default pokemonApi;