const axios = require('axios');

const baseURL = 'http://localhost:8000/naves';

export const cadastrarNave = async (nave) => {
  try {
    const response = await axios.post(baseURL, nave);
    console.log('Nave cadastrada:', response.data);
  } catch (error) {
    console.error('Erro ao cadastrar a nave:', error.response ? error.response.data : error.message);
  }
};

export const listarNaves = async () => {
  try {
    const response = await axios.get(baseURL);
    return response.data;
  } catch (error) {
    console.error('Erro ao listar as naves:', error.response ? error.response.data : error.message);
  }
};

export const removerNave = async (id) => {
  try {
    const response = await axios.delete(`${baseURL}/${id}`);
    console.log('Nave removida:', response.data);
  } catch (error) {
    console.error('Erro ao remover a nave:', error.response ? error.response.data : error.message);
  }
};