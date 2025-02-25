const mongoose = require('mongoose');
const Schema = mongoose.Schema;
   
const blogScheme = new Schema(
    {
        title: { type: String, required: true },
        body: { type: String, required: true },
        author: { type: String, required: true }
    },
    {
        timestamps: true
    }
);

const Blog = mongoose.model("blog", blogScheme);

async function PostBlog(req, res){
    if(!req.body) return res.status(400).json({error: "no body provided"});

    const {title, body, author} = req.body;

    if (!title){
        return res.status(400).json({error: "title is not provided"});
    }else if (!body){
        return res.status(400).json({error: "body is not provided"});
    }else if (!author){
        return res.status(400).json({error: "author is not provided"});
    }

    const blog = new Blog(
        {   
            title: title, 
            body: body, 
            author: author
        })

    await blog.save()
    res.sendStatus(201)
}

async function GetBlogs(req, res) {
    const blogs = await Blog.find({})
    res.json(blogs)
}

async function GetBlogById(req, res) {
    const id = req.params.id;
    const blog = await Blog.findById(id);
    if (blog) res.json(blog)
    else res.status(400).json({error: "Blog does not exist"})  
}

async function UpdateBlog(req, res){
    const id = req.params.id;
    const blog = await Blog.findById(id);
    if (!blog) res.status(400).json({ error: "Blog does not exist"})
    
    const {title, body, author} = req.body;

    if (!title){
        return res.status(400).json({error: "title is not provided"});
    }else if (!body){
        return res.status(400).json({error: "body is not provided"});
    }else if (!author){
        return res.status(400).json({error: "author is not provided"});
    }


    if (blog.title == title && blog.body == body && blog.author == author){
        return res.status(400).json({ error: "No changes were made" })
    }

    await Blog.updateOne({_id: id}, {$set: {title, body, author}})
    
    res.json({message: "Blog updated successfully"})
}

async function DeleteBlog(req, res){
    const id = req.params.id
    const blog = Blog.findById(id)
    if (!blog) return res.status(400).json({error: "blog does not exist"})
    
    await Blog.deleteOne({_id: id})
    res.json({message: "blog deleted successfully"})
}

module.exports = {PostBlog, GetBlogs, GetBlogById, UpdateBlog, DeleteBlog}