import axios from 'axios';
import { KnowledgeBlockData, KnowledgeBlockUserState } from './components';

const API_HOST = 'localhost:5000';

export const fetchKnowledgeBlockData = (): Promise<KnowledgeBlockData[]> => {
    return axios.get(`http://${API_HOST}/knowledge-check-blocks`)
    .then(data => data.data);
}

export const setUserState = (data: KnowledgeBlockUserState): Promise<KnowledgeBlockUserState> => {
    return axios.put(`http://${API_HOST}/user/state`, data)
    .then(data => data.data);
}

export const getUserState = (): Promise<KnowledgeBlockUserState> => {
    return axios.get(`http://${API_HOST}/user/state`)
    .then(data => data.data);
}