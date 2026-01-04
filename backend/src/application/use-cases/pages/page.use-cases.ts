import { Inject, Injectable } from '@nestjs/common';
import { v4 as uuidv4 } from 'uuid';
import { Page } from '../../../domain/entities/page.entity';
import type { IPageRepository } from '../../../domain/repositories/page.repository.interface';
import { PAGE_REPOSITORY } from '../../../domain/repositories/page.repository.interface';
import {
  CreatePageDto,
  UpdatePageDto,
  PageResponseDto,
} from '../../dto/page.dto';

@Injectable()
export class PageUseCases {
  constructor(
    @Inject(PAGE_REPOSITORY)
    private readonly pageRepository: IPageRepository,
  ) {}

  async findAll(): Promise<PageResponseDto[]> {
    const pages = await this.pageRepository.findAll();
    return pages.map((page) => this.toResponseDto(page));
  }

  async findById(id: string): Promise<PageResponseDto | null> {
    const page = await this.pageRepository.findById(id);
    if (!page) return null;
    return this.toResponseDto(page);
  }

  async findByParentId(parentId: string | null): Promise<PageResponseDto[]> {
    const pages = await this.pageRepository.findByParentId(parentId);
    return pages.map((page) => this.toResponseDto(page));
  }

  async create(dto: CreatePageDto): Promise<PageResponseDto> {
    const now = new Date();
    const page = new Page({
      id: uuidv4(),
      title: dto.title,
      icon: dto.icon,
      parentId: dto.parentId,
      createdAt: now,
      updatedAt: now,
    });

    const savedPage = await this.pageRepository.save(page);
    return this.toResponseDto(savedPage);
  }

  async update(id: string, dto: UpdatePageDto): Promise<PageResponseDto | null> {
    const page = await this.pageRepository.findById(id);
    if (!page) return null;

    if (dto.title !== undefined) {
      page.updateTitle(dto.title);
    }
    if (dto.icon !== undefined) {
      page.updateIcon(dto.icon);
    }
    if (dto.parentId !== undefined) {
      page.moveTo(dto.parentId);
    }

    const savedPage = await this.pageRepository.save(page);
    return this.toResponseDto(savedPage);
  }

  async delete(id: string): Promise<boolean> {
    const page = await this.pageRepository.findById(id);
    if (!page) return false;

    await this.pageRepository.delete(id);
    return true;
  }

  private toResponseDto(page: Page): PageResponseDto {
    const plain = page.toPlainObject();
    return {
      id: plain.id,
      title: plain.title,
      icon: plain.icon,
      parentId: plain.parentId,
      createdAt: plain.createdAt,
      updatedAt: plain.updatedAt,
    };
  }
}
