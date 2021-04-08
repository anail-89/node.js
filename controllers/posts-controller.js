const Post = require('../models/posts');
class PostCtrl{ 
	async getById(id){
        return Post.findById(id).populate({
            path: 'author'});

	}
	async getAll(){
        return Post.find().populate({
            path: 'author',
            select: 'name username -_id'}); 
    
	}
	async add(data){

        const post = new Post();
            post.title = data.title;
            post.desc = data.desc;
            post.author = data.author;

        return post.save();
	}
	async update(data){
        const post = await Post.findById(data.postId);
          
                post.title = data.title;
                post.desc = data.desc;
                post.author = data.author;

        return post.save();
	}
	async delete(data){
        const post = await Post.findById(data.id);
            return post.remove();

	}
}

module.exports = new PostCtrl();