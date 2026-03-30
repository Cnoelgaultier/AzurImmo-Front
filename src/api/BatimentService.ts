import api from './axiosInstance';

export interface BatimentDTO {
    id: number;
    adresse: string;
    ville: string;
}

export const getBatimentsDTO = async (): Promise<BatimentDTO[]> => {
    const response = await api.get('/batiments');
    return response.data;
};