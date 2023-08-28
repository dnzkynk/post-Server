import { Injectable } from '@nestjs/common';
import { Post, PostDocument } from './post.schema';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';

@Injectable()
export class PostService {
  constructor(@InjectModel(Post.name) private postModel: Model<PostDocument>) {}

  async getPosts() {
    try {
      return await this.postModel.find();
    } catch (error) {
      return error;
    }
  }

  async createPost(user: string, title: string, description: string) {
    try {
      return await this.postModel.create({ user, title, description });
    } catch (error) {
      return error;
    }
  }
  async uptadePost(id: any, user: string, title: string, description: string) {
    try {
      const userdata = await this.postModel.findByIdAndUpdate(id, {
        user,
        title,
        description,
      });
      userdata.save();
    } catch (error) {
      return error;
    }
  }
  async deletePost(id: any) {
    try {
      return await this.postModel.findByIdAndDelete(id);
    } catch (error) {
      return error;
    }
  }
}
