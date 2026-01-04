import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { BlockEntity } from '../database/entities/block.entity';
import { Block } from '../../domain/entities/block.entity';
import { IBlockRepository } from '../../domain/repositories/block.repository.interface';

@Injectable()
export class BlockRepository implements IBlockRepository {
  constructor(
    @InjectRepository(BlockEntity)
    private readonly repository: Repository<BlockEntity>,
  ) {}

  async findByPageId(pageId: string): Promise<Block[]> {
    const entities = await this.repository.find({
      where: { pageId },
      order: { order: 'ASC' },
    });
    return entities.map((entity) => this.toDomain(entity));
  }

  async findById(id: string): Promise<Block | null> {
    const entity = await this.repository.findOne({ where: { id } });
    if (!entity) return null;
    return this.toDomain(entity);
  }

  async save(block: Block): Promise<Block> {
    const plain = block.toPlainObject();
    const entity = this.repository.create({
      id: plain.id,
      type: plain.type,
      content: plain.content,
      props: plain.props,
      order: plain.order,
      pageId: plain.pageId,
      createdAt: plain.createdAt,
      updatedAt: plain.updatedAt,
    });
    const saved = await this.repository.save(entity);
    return this.toDomain(saved);
  }

  async delete(id: string): Promise<void> {
    await this.repository.delete(id);
  }

  async deleteByPageId(pageId: string): Promise<void> {
    await this.repository.delete({ pageId });
  }

  private toDomain(entity: BlockEntity): Block {
    return new Block({
      id: entity.id,
      type: entity.type,
      content: entity.content,
      props: entity.props,
      order: entity.order,
      pageId: entity.pageId,
      createdAt: entity.createdAt,
      updatedAt: entity.updatedAt,
    });
  }
}
