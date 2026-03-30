import api from './axiosInstance';

export interface BatimentDTO {
    id: number;
    adresse: string;
    ville: string;
}

export interface LocataireDTO {
    id: number;
    nom: string;
    prenom: string;
    email: string;
    tel: number;
}

export const getBatimentsDTO = async (): Promise<BatimentDTO[]> => {
    const response = await api.get('/batiments');
    return response.data;
};


export const getLocatairesByBatimentId = async (batimentId: number): Promise<LocataireDTO[]> => {
    const response = await api.get(`/batiments/${batimentId}/locataires`);
    return response.data;
};