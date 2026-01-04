import {
  Entity,
  PrimaryColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  OneToMany,
  ManyToOne,
  JoinColumn,
} from 'typeorm';
import { BlockEntity } from './block.entity';

@Entity('pages')
export class PageEntity {
  @PrimaryColumn('uuid')
  id: string;

  @Column({ type: 'varchar', length: 255 })
  title: string;

  @Column({ type: 'varchar', length: 50, nullable: true })
  icon: string | null;

  @Column({ type: 'uuid', nullable: true })
  parentId: string | null;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @OneToMany(() => BlockEntity, (block) => block.page, { cascade: true })
  blocks: BlockEntity[];

  @ManyToOne(() => PageEntity, { nullable: true, onDelete: 'CASCADE' })
  @JoinColumn({ name: 'parentId' })
  parent: PageEntity | null;

  @OneToMany(() => PageEntity, (page) => page.parent)
  children: PageEntity[];
}
