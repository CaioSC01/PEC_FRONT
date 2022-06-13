import axios from 'axios';

// Armazenando o endereço da API
const apiUrl = "http://localhost:8000/api" 

export const postsService = () => {

    // Função para listar os posts 
    async list(){
        const enpoint = apiUrl + "/posts"
        return axios.get(enpoint)
    },

    // Função para recuperar dados de um post específico
    async getOne(postId: string){
        const enpoint = apiUrl + "/posts/" + postId
        return axios.get(enpoint)
    },

    // Função para criar um novo post
    async create(data: any){
        const enpoint = apiUrl + "/posts"
        return axios.post(enpoint, data)
    },

    // Função para editar um post específico
    async edit(data: any, postId: string){
        const enpoint = apiUrl + "/posts/" + postId
        return axios.put(enpoint, data)
    },

    // Função para exluir um post específico
    async delete(postId: string){
        const enpoint = apiUrl + "/posts/" + postId
        return axios.delete(enpoint)
    },


}
