const Post = require("../modals/posts");
const fs = require("fs");
const Admin = require("../modals/Admin")

module.exports = class API {


    //fetch all posts
    static async fetchAllPost(req, res) {
        try {
            const posts = await Post.find();
            console.log(posts)
            res.status(200).json(posts);
        } catch (err) {
            res.status(404).json({ message: err.message });
        }
    }


     //fetch by id of posts
    static async fetchPostbyId(req, res) {
        const id = req.params.id;
            try {
                const posts = await Post.find();
                let post = posts.filter(p => p.title === id )
                let category = post[0].category
                let relatedPosts = posts.filter(p => p.category == category)
                let related = relatedPosts.filter(p => p._id !== post[0]._id)
                console.log(related)
                let obj = {
                    post: post,
                    relatedPosts: related
                           }
                res.status(200).json(obj);
            } catch(err) {
                res.status(404).json({ message: err.message });
            }
    }

     static async fetchPostbyCategory(req,res) {
         const id = req.params.category
         try {
            const Posts = await Post.find();
            let CategoryPosts = Posts.filter(p => p.category === id )
            res.status(200).json(CategoryPosts);
        } catch(err) {
            res.status(404).json({ message: err.message });
        }
     }
     //create a post
     static async createPost(req, res) {
        const post = req.body;
        const image = post.image
        try {
            await Post.create(post);
            res.status(201).json({message: 'post created'})
    } catch(err) {
        res.status(400).json({message: err.message });
    }
 }


     //update a post
     static async updatePost(req, res) {
        const id = req.params.id;
        let new_image = "";
        if(req.file) {
            new_image = req.file.filename;
        try {
            fs.unlinkSync('./uploads/' + req.body.old_image);
        } catch(err) {
            console.log(err);
        }
    } else {
        new_image = req.body.old_image;
    }
    const newPost = req.body;
    newPost.image = new_image;

    try {
        await Post.findByIdAndUpdate(id, newPost);
        res.status(200).json({message: "post updated"});
    } catch(err) {
        res.status(404).json({message: err.message});
    }
}


     //delete a post
     static async deletePost(req, res) {
        const id = req.params.id;
        try {
            const result = await Post.findByIdAndDelete(id);
            if(result.image != '') {
                try {
                    fs.unlinkSync('./uploads/' + result.image);
                } catch (err) {
                    console.log(err)
                }
            }
            res.status(200).json({message : 'post deleted'})
        } catch(err){
            res.status(404).json({message : err.message});
        }
    }

    static async adminLogin(req,res) {
        try {
            const email = req.body.email;
            const password = req.body.password;
            console.log(email,password)
            const admin = await Admin.findByCredentials(email, password)
            if (admin === null) {
              return res
                .status(401)
                .json("Invalid Credentials");
            }
            res.status(200).json({ admin });
          } catch (err) {
            res.status(400).json("Incorrect Password");
          }
    }
};