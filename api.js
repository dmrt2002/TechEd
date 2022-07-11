import axios from 'axios';
const url = "http://localhost:5000/api/posts";

export default class API {
    // to get all the posts from the server
    static async getAllPost() {
        const res = await axios.get(url);
        return res.data;
    }
    // to get single  posts from the server
    static async getPostbyID(title, category) {
        console.log(title)
        const res = await axios.get(`${url}/${title}`)
        return res.data;
    }
    static async getPostbyCategory(title) {
        console.log(title)
        const res = await axios.get(`${url}/category/${title}`)
        return res.data;
    }
    // to add a post to database
    static async AddPost(post) {
        const res = await axios.post(url , post);
        return res;
    }
    // to update a post in the database
       static async UpdatePost(id,post) {
        const res = await axios.patch(`${url}/${id}` , post);
        return res.data;
    }
     // to delete a post
     static async deletePost(id) {
        const res = await axios.delete(`${url}/${id}`);
        return res.data;
    }
}