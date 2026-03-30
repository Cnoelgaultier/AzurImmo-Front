import api from './axiosInstance';

export interface AppartementDTO {
    numero: number;
    description: string;
    nombre: number;
    surface: number;
    batiment: { id: number; };
    contrat: { id: number; } | null;
}

export const getAppartementsDTO = async () => {
    const response = await api.get('/appartements');
    return response.data;
};