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
    try {
        const { title, body } = req.body;
        const blog = await Blog.findById(req.params.id);

        if (!blog) {
            return res.status(404).json({ error: 'Blog not found' });
        }

        blog.title = title;
        blog.body = body;
        await blog.save();

        res.status(200).json({ message: 'Blog updated successfully' });
    } catch (error) {
        console.error('Error updating blog:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
}

async function DeleteBlog(req, res){
    try {
        const blog = await Blog.findById(req.params.id);

        if (!blog) {
            return res.status(404).json({ error: 'Blog not found' });
        }


        await Blog.findByIdAndDelete(req.params.id);
        res.status(200).json({ message: 'Blog deleted successfully' });
    } catch (error) {
        console.error('Error deleting blog:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
}

module.exports = {PostBlog, GetBlogs, GetBlogById, UpdateBlog, DeleteBlog}