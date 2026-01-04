import { Column, Entity, PrimaryColumn, ManyToOne, JoinColumn, CreateDateColumn, UpdateDateColumn } from 'typeorm';
import { PageEntity } from './page.entity';

@Entity('blocks')
export class BlockEntity {
  @PrimaryColumn('uuid')
  id: string;

  @Column({ type: 'varchar', length: 50 })
  type: string;

  @Column({ type: 'jsonb', nullable: true })
  content: any;

  @Column({ type: 'jsonb', nullable: true })
  props: any;

  @Column({ type: 'int' })
  order: number;

  @Column({ type: 'uuid' })
  pageId: string;

  @ManyToOne(() => PageEntity, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'pageId' })
  page: PageEntity;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
