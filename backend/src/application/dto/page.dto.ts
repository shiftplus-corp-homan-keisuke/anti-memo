import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { IsString, IsOptional, IsUUID } from 'class-validator';

export class CreatePageDto {
  @ApiProperty({ description: 'ページタイトル', example: '新しいページ' })
  @IsString()
  title: string;

  @ApiPropertyOptional({ description: 'ページアイコン', example: '📝' })
  @IsOptional()
  @IsString()
  icon?: string;

  @ApiPropertyOptional({ description: '親ページID' })
  @IsOptional()
  @IsUUID()
  parentId?: string;
}

export class UpdatePageDto {
  @ApiPropertyOptional({ description: 'ページタイトル' })
  @IsOptional()
  @IsString()
  title?: string;

  @ApiPropertyOptional({ description: 'ページアイコン' })
  @IsOptional()
  @IsString()
  icon?: string;

  @ApiPropertyOptional({ description: '親ページID' })
  @IsOptional()
  @IsUUID()
  parentId?: string;
}

export class PageResponseDto {
  @ApiProperty()
  id: string;

  @ApiProperty()
  title: string;

  @ApiPropertyOptional()
  icon?: string;

  @ApiPropertyOptional()
  parentId?: string;

  @ApiProperty()
  createdAt: Date;

  @ApiProperty()
  updatedAt: Date;
}
