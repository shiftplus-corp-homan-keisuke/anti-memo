import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { IsString, IsOptional, IsUUID, IsInt, IsIn, Min, IsObject } from 'class-validator';

export class CreateBlockDto {
  @ApiProperty({
    description: 'ブロックタイプ',
    example: 'paragraph',
  })
  @IsString()
  type: string;

  @ApiPropertyOptional({ description: 'ブロックID (UUID)' })
  @IsOptional()
  @IsUUID()
  id?: string;

  @ApiProperty({ 
    description: 'BlockNoteコンテンツ（JSON）',
    example: [{ type: 'text', text: 'Hello', styles: {} }]
  })
  @IsOptional()
  content: any;

  @ApiPropertyOptional({ 
    description: 'BlockNoteプロパティ（JSON）',
    example: { level: 1 }
  })
  @IsOptional()
  @IsObject()
  props?: Record<string, any>;

  @ApiProperty({ description: '表示順序', example: 0 })
  @IsInt()
  @Min(0)
  order: number;

  @ApiProperty({ description: '所属ページID' })
  @IsUUID()
  pageId: string;
}

export class UpdateBlockDto {
  @ApiPropertyOptional({ description: 'ブロックタイプ' })
  @IsOptional()
  @IsString()
  type?: string;

  @ApiPropertyOptional({ description: 'BlockNoteコンテンツ（JSON）' })
  @IsOptional()
  content?: any;

  @ApiPropertyOptional({ description: 'BlockNoteプロパティ（JSON）' })
  @IsOptional()
  @IsObject()
  props?: Record<string, any>;

  @ApiPropertyOptional({ description: '表示順序' })
  @IsOptional()
  @IsInt()
  @Min(0)
  order?: number;
}

export class BlockResponseDto {
  @ApiProperty()
  id: string;

  @ApiProperty()
  type: string;

  @ApiProperty()
  content: any;

  @ApiPropertyOptional()
  props?: Record<string, any>;

  @ApiProperty()
  order: number;

  @ApiProperty()
  pageId: string;

  @ApiProperty()
  createdAt: Date;

  @ApiProperty()
  updatedAt: Date;
}
