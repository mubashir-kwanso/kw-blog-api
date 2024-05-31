import { Resolver, Mutation, Args } from '@nestjs/graphql';
import { UseGuards } from '@nestjs/common';
import { GqlAccessTokenGuard } from 'src/auth/guards';
import { CurrentUserPayload } from 'src/auth/decorators';
import { TokenPayload } from 'src/auth/types/jwt.types';
import { CreateBlogPostInput } from './dto';
import { BlogPost } from './entities';
import { BlogPostService } from './blog-post.service';

@Resolver(() => BlogPost)
export class BlogPostResolver {
  constructor(private readonly blogPostService: BlogPostService) {}

  @Mutation(() => BlogPost)
  @UseGuards(GqlAccessTokenGuard)
  createBlogPost(
    @CurrentUserPayload() currentUserPayload: TokenPayload,
    @Args('createBlogPostInput') createBlogPostInput: CreateBlogPostInput,
  ): Promise<BlogPost> {
    return this.blogPostService.createBlogPost(
      currentUserPayload,
      createBlogPostInput,
    );
  }
}
