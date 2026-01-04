import { v4 as uuidv4 } from 'uuid';

export type BlockType =
  | 'paragraph'
  | 'heading1'
  | 'heading2'
  | 'heading3'
  | 'bulletList'
  | 'numberedList'
  | 'todo'
  | 'quote'
  | 'code'
  | 'divider';

export interface BlockProps {
  id: string;
  type: string;
  content: any; // BlockNoteのcontent配列
  props?: Record<string, any>; // BlockNoteのprops
  order: number;
  pageId: string;
  createdAt: Date;
  updatedAt: Date;
}

export class Block {
  private readonly id: string;
  private type: string;
  private content: any;
  private props?: Record<string, any>;
  private order: number;
  private readonly pageId: string;
  private readonly createdAt: Date;
  private updatedAt: Date;

  constructor(props: BlockProps) {
    this.id = props.id;
    this.type = props.type;
    this.content = props.content;
    this.props = props.props;
    this.order = props.order;
    this.pageId = props.pageId;
    this.createdAt = props.createdAt;
    this.updatedAt = props.updatedAt;
  }

  static create(params: {
    type: string;
    content: any;
    props?: Record<string, any>;
    order: number;
    pageId: string;
  }): Block {
    const now = new Date();
    return new Block({
      id: uuidv4(),
      type: params.type,
      content: params.content,
      props: params.props,
      order: params.order,
      pageId: params.pageId,
      createdAt: now,
      updatedAt: now,
    });
  }

  updateType(type: string): void {
    this.type = type;
    this.updatedAt = new Date();
  }

  updateContent(content: any): void {
    this.content = content;
    this.updatedAt = new Date();
  }

  updateProps(props: Record<string, any>): void {
    this.props = props;
    this.updatedAt = new Date();
  }

  updateOrder(order: number): void {
    this.order = order;
    this.updatedAt = new Date();
  }

  toPlainObject(): BlockProps {
    return {
      id: this.id,
      type: this.type,
      content: this.content,
      props: this.props,
      order: this.order,
      pageId: this.pageId,
      createdAt: this.createdAt,
      updatedAt: this.updatedAt,
    };
  }
}
