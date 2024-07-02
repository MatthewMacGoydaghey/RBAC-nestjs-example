import { Body, Controller, Delete, Get, Inject, Param, ParseIntPipe, Post, Put, UseGuards} from '@nestjs/common';
import { ArticlesService } from './articles.service';
import { User } from 'src/lib/decorators/currentUser';
import { ArticleDTO } from 'src/lib/DTO/articles/ArticleDTO';
import { UserDTO } from 'src/lib/DTO/auth/UserDTO';
import { UpdArticleDTO } from 'src/lib/DTO/articles/UpdateArticleDTO';
import { SetAccessInfo } from '../../RBAC-nestjs/src/decorators';
import { RBACGuard } from '../../RBAC-nestjs/src/rbacGuard';

@Controller('articles')
export class ArticlesController {
  constructor(
    private readonly ArticlesService: ArticlesService
  ) {}

  @SetAccessInfo({
    resource: 'articles',
    action: 'read'
  })
  @UseGuards(RBACGuard)
  @Get()
  getArticles() {
    return this.ArticlesService.getArticles()
  }


  @SetAccessInfo({
    resource: 'articles',
    action: 'read'
  })
  @UseGuards(RBACGuard)
  @Get(':id')
  getArticle(@Param('id', ParseIntPipe) id: number) {
    return this.ArticlesService.getArticle(id)
  }


  @SetAccessInfo({
    resource: 'articles',
    action: 'create'
  })
  @UseGuards(RBACGuard)
  @Post()
  createArticle(@Body() body: ArticleDTO, @User() user: UserDTO) {
    return this.ArticlesService.createArticle(body, user)
  }


  @SetAccessInfo({
    resource: 'articles',
    action: 'update'
  })
  @UseGuards(RBACGuard)
  @Put(':id')
  updateArticle(@Param('id', ParseIntPipe) id: number, @Body() updatedArticle: UpdArticleDTO, @User() user: UserDTO) {
    return this.ArticlesService.updateArticle(id, updatedArticle, user)
  }


  @SetAccessInfo({
    resource: 'articles',
    action: 'delete'
  })
  @UseGuards(RBACGuard)
  @Delete(':id')
  deleteArticle(@Param('id', ParseIntPipe) id: number, @User() user: UserDTO) {
return this.ArticlesService.deleteArticle(id, user)
  }
}
