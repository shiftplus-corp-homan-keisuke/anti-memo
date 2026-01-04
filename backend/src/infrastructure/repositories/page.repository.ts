import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, IsNull } from 'typeorm';
import { Page } from '../../domain/entities/page.entity';
import { IPageRepository } from '../../domain/repositories/page.repository.interface';
import { PageEntity } from '../database/entities/page.entity';

@Injectable()
export class PageRepository implements IPageRepository {
  constructor(
    @InjectRepository(PageEntity)
    private readonly repository: Repository<PageEntity>,
  ) {}

  async findAll(): Promise<Page[]> {
    const entities = await this.repository.find({
      order: { createdAt: 'DESC' },
    });
    return entities.map((e) => this.toDomain(e));
  }

  async findById(id: string): Promise<Page | null> {
    const entity = await this.repository.findOne({ where: { id } });
    if (!entity) return null;
    return this.toDomain(entity);
  }

  async findByParentId(parentId: string | null): Promise<Page[]> {
    const entities = await this.repository.find({
      where: { parentId: parentId ?? IsNull() },
      order: { createdAt: 'DESC' },
    });
    return entities.map((e) => this.toDomain(e));
  }

  async save(page: Page): Promise<Page> {
    const plain = page.toPlainObject();
    const entity = this.repository.create({
      id: plain.id,
      title: plain.title,
      icon: plain.icon ?? null,
      parentId: plain.parentId ?? null,
      createdAt: plain.createdAt,
      updatedAt: plain.updatedAt,
    });
    const saved = await this.repository.save(entity);
    return this.toDomain(saved);
  }

  async delete(id: string): Promise<void> {
    await this.repository.delete(id);
  }

  private toDomain(entity: PageEntity): Page {
    return new Page({
      id: entity.id,
      title: entity.title,
      icon: entity.icon ?? undefined,
      parentId: entity.parentId ?? undefined,
      createdAt: entity.createdAt,
      updatedAt: entity.updatedAt,
    });
  }
}
