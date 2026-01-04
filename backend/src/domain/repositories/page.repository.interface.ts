import { Page } from '../entities/page.entity';

export interface IPageRepository {
  findAll(): Promise<Page[]>;
  findById(id: string): Promise<Page | null>;
  findByParentId(parentId: string | null): Promise<Page[]>;
  save(page: Page): Promise<Page>;
  delete(id: string): Promise<void>;
}

export const PAGE_REPOSITORY = Symbol('PAGE_REPOSITORY');
