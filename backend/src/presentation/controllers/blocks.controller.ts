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
import { BlockUseCases } from '../../application/use-cases/blocks';
import {
  CreateBlockDto,
  UpdateBlockDto,
  BlockResponseDto,
} from '../../application/dto/block.dto';

@ApiTags('Blocks')
@Controller('blocks')
export class BlocksController {
  constructor(private readonly blockUseCases: BlockUseCases) {}

  @Get('page/:pageId')
  @ApiOperation({ summary: 'ページのブロック一覧取得' })
  @ApiParam({ name: 'pageId', description: 'ページID' })
  @ApiResponse({ status: 200, type: [BlockResponseDto] })
  async findByPageId(
    @Param('pageId') pageId: string,
  ): Promise<BlockResponseDto[]> {
    return this.blockUseCases.findByPageId(pageId);
  }

  @Get(':id')
  @ApiOperation({ summary: 'ブロック取得' })
  @ApiParam({ name: 'id', description: 'ブロックID' })
  @ApiResponse({ status: 200, type: BlockResponseDto })
  @ApiResponse({ status: 404, description: 'ブロックが見つかりません' })
  async findById(@Param('id') id: string): Promise<BlockResponseDto> {
    const block = await this.blockUseCases.findById(id);
    if (!block) {
      throw new NotFoundException('ブロックが見つかりません');
    }
    return block;
  }

  @Post()
  @ApiOperation({ summary: 'ブロック作成' })
  @ApiResponse({ status: 201, type: BlockResponseDto })
  async create(@Body() dto: CreateBlockDto): Promise<BlockResponseDto> {
    return this.blockUseCases.create(dto);
  }

  @Put(':id')
  @ApiOperation({ summary: 'ブロック更新' })
  @ApiParam({ name: 'id', description: 'ブロックID' })
  @ApiResponse({ status: 200, type: BlockResponseDto })
  @ApiResponse({ status: 404, description: 'ブロックが見つかりません' })
  async update(
    @Param('id') id: string,
    @Body() dto: UpdateBlockDto,
  ): Promise<BlockResponseDto> {
    const block = await this.blockUseCases.update(id, dto);
    if (!block) {
      throw new NotFoundException('ブロックが見つかりません');
    }
    return block;
  }

  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  @ApiOperation({ summary: 'ブロック削除' })
  @ApiParam({ name: 'id', description: 'ブロックID' })
  @ApiResponse({ status: 204, description: '削除成功' })
  @ApiResponse({ status: 404, description: 'ブロックが見つかりません' })
  async delete(@Param('id') id: string): Promise<void> {
    const deleted = await this.blockUseCases.delete(id);
    if (!deleted) {
      throw new NotFoundException('ブロックが見つかりません');
    }
  }
}
