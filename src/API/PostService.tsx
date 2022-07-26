import axios from "axios"

export default class PostService {
    static async getMessage() {
        try {
            const response = await (await axios.get('https://jsonplaceholder.typicode.com/posts')).data
            response.map((item: any, index: number)=>{
            return item.id = Number(new Date()) + index
            })
            return response
        } catch(error) {
            console.log(error)
        }
    }
}