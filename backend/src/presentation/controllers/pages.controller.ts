import {
  Controller,
  Get,
  Post,
  Put,
  Delete,
  Body,
  Param,
  Query,
  NotFoundException,
  HttpCode,
  HttpStatus,
} from '@nestjs/common';
import {
  ApiTags,
  ApiOperation,
  ApiResponse,
  ApiParam,
  ApiQuery,
} from '@nestjs/swagger';
import { PageUseCases } from '../../application/use-cases/pages';
import {
  CreatePageDto,
  UpdatePageDto,
  PageResponseDto,
} from '../../application/dto/page.dto';

@ApiTags('Pages')
@Controller('pages')
export class PagesController {
  constructor(private readonly pageUseCases: PageUseCases) {}

  @Get()
  @ApiOperation({ summary: '全ページ取得' })
  @ApiResponse({ status: 200, type: [PageResponseDto] })
  async findAll(): Promise<PageResponseDto[]> {
    return this.pageUseCases.findAll();
  }

  @Get('root')
  @ApiOperation({ summary: 'ルートページ取得' })
  @ApiResponse({ status: 200, type: [PageResponseDto] })
  async findRootPages(): Promise<PageResponseDto[]> {
    return this.pageUseCases.findByParentId(null);
  }

  @Get(':id')
  @ApiOperation({ summary: 'ページ取得' })
  @ApiParam({ name: 'id', description: 'ページID' })
  @ApiResponse({ status: 200, type: PageResponseDto })
  @ApiResponse({ status: 404, description: 'ページが見つかりません' })
  async findById(@Param('id') id: string): Promise<PageResponseDto> {
    const page = await this.pageUseCases.findById(id);
    if (!page) {
      throw new NotFoundException('ページが見つかりません');
    }
    return page;
  }

  @Get(':id/children')
  @ApiOperation({ summary: '子ページ取得' })
  @ApiParam({ name: 'id', description: '親ページID' })
  @ApiResponse({ status: 200, type: [PageResponseDto] })
  async findChildren(@Param('id') id: string): Promise<PageResponseDto[]> {
    return this.pageUseCases.findByParentId(id);
  }

  @Post()
  @ApiOperation({ summary: 'ページ作成' })
  @ApiResponse({ status: 201, type: PageResponseDto })
  async create(@Body() dto: CreatePageDto): Promise<PageResponseDto> {
    return this.pageUseCases.create(dto);
  }

  @Put(':id')
  @ApiOperation({ summary: 'ページ更新' })
  @ApiParam({ name: 'id', description: 'ページID' })
  @ApiResponse({ status: 200, type: PageResponseDto })
  @ApiResponse({ status: 404, description: 'ページが見つかりません' })
  async update(
    @Param('id') id: string,
    @Body() dto: UpdatePageDto,
  ): Promise<PageResponseDto> {
    const page = await this.pageUseCases.update(id, dto);
    if (!page) {
      throw new NotFoundException('ページが見つかりません');
    }
    return page;
  }

  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  @ApiOperation({ summary: 'ページ削除' })
  @ApiParam({ name: 'id', description: 'ページID' })
  @ApiResponse({ status: 204, description: '削除成功' })
  @ApiResponse({ status: 404, description: 'ページが見つかりません' })
  async delete(@Param('id') id: string): Promise<void> {
    const deleted = await this.pageUseCases.delete(id);
    if (!deleted) {
      throw new NotFoundException('ページが見つかりません');
    }
  }
}
