import { Block } from '../entities/block.entity';

export interface IBlockRepository {
  findByPageId(pageId: string): Promise<Block[]>;
  findById(id: string): Promise<Block | null>;
  save(block: Block): Promise<Block>;
  delete(id: string): Promise<void>;
  deleteByPageId(pageId: string): Promise<void>;
}

export const BLOCK_REPOSITORY = Symbol('BLOCK_REPOSITORY');
