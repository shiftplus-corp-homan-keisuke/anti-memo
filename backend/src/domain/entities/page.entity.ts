// ドメインエンティティ: Page
export interface PageProps {
  id: string;
  title: string;
  icon?: string;
  parentId?: string;
  createdAt: Date;
  updatedAt: Date;
}

export class Page {
  private readonly _id: string;
  private _title: string;
  private _icon?: string;
  private _parentId?: string;
  private readonly _createdAt: Date;
  private _updatedAt: Date;

  constructor(props: PageProps) {
    this._id = props.id;
    this._title = props.title;
    this._icon = props.icon;
    this._parentId = props.parentId;
    this._createdAt = props.createdAt;
    this._updatedAt = props.updatedAt;
  }

  get id(): string {
    return this._id;
  }

  get title(): string {
    return this._title;
  }

  get icon(): string | undefined {
    return this._icon;
  }

  get parentId(): string | undefined {
    return this._parentId;
  }

  get createdAt(): Date {
    return this._createdAt;
  }

  get updatedAt(): Date {
    return this._updatedAt;
  }

  updateTitle(title: string): void {
    this._title = title;
    this._updatedAt = new Date();
  }

  updateIcon(icon: string): void {
    this._icon = icon;
    this._updatedAt = new Date();
  }

  moveTo(parentId: string | undefined): void {
    this._parentId = parentId;
    this._updatedAt = new Date();
  }

  toPlainObject(): PageProps {
    return {
      id: this._id,
      title: this._title,
      icon: this._icon,
      parentId: this._parentId,
      createdAt: this._createdAt,
      updatedAt: this._updatedAt,
    };
  }
}
