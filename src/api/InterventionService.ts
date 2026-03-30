import api from './axiosInstance';

export interface InterventionDTO{
    id: number;
    libelle: string;
}

export const getInterventionDTO = async (): Promise<InterventionDTO[]> => {
    const response = await api.get('/interventions');
    return response.data;
}