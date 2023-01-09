import axios from 'axios';

export const baseUrl = 'http://localhost:8080';

export const createAcc = async (accData) => {
    const {data} = await axios.post(`${baseUrl}/quotes`, accData);
    return data;
}

export const getQuotes = async () => {
    const {data} = await axios.get(`${baseUrl}/quotes`);
    return data;
}
