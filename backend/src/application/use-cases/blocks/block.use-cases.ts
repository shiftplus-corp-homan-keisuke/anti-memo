import { Inject, Injectable } from '@nestjs/common';
import { v4 as uuidv4 } from 'uuid';
import { Block } from '../../../domain/entities/block.entity';
import type { IBlockRepository } from '../../../domain/repositories/block.repository.interface';
import { BLOCK_REPOSITORY } from '../../../domain/repositories/block.repository.interface';
import {
  CreateBlockDto,
  UpdateBlockDto,
  BlockResponseDto,
} from '../../dto/block.dto';

@Injectable()
export class BlockUseCases {
  constructor(
    @Inject(BLOCK_REPOSITORY)
    private readonly blockRepository: IBlockRepository,
  ) {}

  async findByPageId(pageId: string): Promise<BlockResponseDto[]> {
    const blocks = await this.blockRepository.findByPageId(pageId);
    return blocks.map((block) => this.toResponseDto(block));
  }

  async findById(id: string): Promise<BlockResponseDto | null> {
    const block = await this.blockRepository.findById(id);
    if (!block) return null;
    return this.toResponseDto(block);
  }

  async create(dto: CreateBlockDto): Promise<BlockResponseDto> {
    const now = new Date();
    const block = new Block({
      id: dto.id || uuidv4(),
      type: dto.type,
      content: dto.content,
      props: dto.props,
      order: dto.order,
      pageId: dto.pageId,
      createdAt: now,
      updatedAt: now,
    });

    const savedBlock = await this.blockRepository.save(block);
    return this.toResponseDto(savedBlock);
  }

  async update(id: string, dto: UpdateBlockDto): Promise<BlockResponseDto | null> {
    const block = await this.blockRepository.findById(id);
    if (!block) return null;

    if (dto.type !== undefined) {
      block.updateType(dto.type);
    }
    if (dto.content !== undefined) {
      block.updateContent(dto.content);
    }
    if (dto.props !== undefined) {
      block.updateProps(dto.props);
    }
    if (dto.order !== undefined) {
      block.updateOrder(dto.order);
    }

    const savedBlock = await this.blockRepository.save(block);
    return this.toResponseDto(savedBlock);
  }

  async delete(id: string): Promise<boolean> {
    const block = await this.blockRepository.findById(id);
    if (!block) return false;

    await this.blockRepository.delete(id);
    return true;
  }

  async deleteByPageId(pageId: string): Promise<void> {
    await this.blockRepository.deleteByPageId(pageId);
  }

  private toResponseDto(block: Block): BlockResponseDto {
    const plain = block.toPlainObject();
    return {
      id: plain.id,
      type: plain.type,
      content: plain.content,
      props: plain.props,
      order: plain.order,
      pageId: plain.pageId,
      createdAt: plain.createdAt,
      updatedAt: plain.updatedAt,
    };
  }
}
