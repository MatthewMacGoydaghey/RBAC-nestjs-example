import { PartialType } from "@nestjs/mapped-types";
import { ArticleDTO } from "./ArticleDTO";


export class UpdArticleDTO extends PartialType(ArticleDTO) {}