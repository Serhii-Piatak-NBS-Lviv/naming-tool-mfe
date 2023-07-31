import axios from "axios";

axios.defaults.withCredentials = true;

export async function fetchData(url) {
const { data } = await axios.get(url);
    return data;
};