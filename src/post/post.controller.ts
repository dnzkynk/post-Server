import { Controller, Get, Post, Body, Param, Delete } from '@nestjs/common';
import { PostService } from './post.service';

@Controller('post')
export class PostController {
  constructor(private readonly postService: PostService) {}

  @Get('getPosts')
  async getPosts() {
    try {
      const posts = await this.postService.getPosts();
      return { status: 'OK', posts };
    } catch (error) {
      return { status: 'Error', message: error.message };
    }
  }

  @Post('createPost')
  async createPost(@Body() body) {
    const { user, title, description } = body;
    try {
      const post = await this.postService.createPost(user, title, description);
      return { status: 'OK', post };
    } catch (error) {
      return { status: 'Error', message: error.message };
    }
  }

  @Post('update/:id')
  async updatePost(@Param('id') id: any, @Body() body) {
    const { user, title, description } = body;
    try {
      const updatedPost = await this.postService.uptadePost(
        id,
        user,
        title,
        description,
      );
      return { status: 'OK', updatedPost };
    } catch (error) {
      return { status: 'Error', message: error.message };
    }
  }

  @Delete('delete/:id')
  async deletePost(@Param('id') id: any) {
    try {
      await this.postService.deletePost(id);
      return { status: 'OK', message: 'Post deleted successfully' };
    } catch (error) {
      return { status: 'Error', message: error.message };
    }
  }
}
