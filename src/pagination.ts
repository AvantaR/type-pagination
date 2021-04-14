import { MetaFieldsLabels } from './meta.fields.labels';

const DEFAULT_PAGE = 1;
const DEFAULT_LIMIT = 50;

export class Pagination<T> implements IPagination<T> {
  private baseUrl = '';
  private page: number;
  private limit: number;
  private lastPage: number;
  private metaFieldsLabels: MetaFieldsLabels;

  constructor(
    private items: T[],
    private total: number,
    private options?: Partial<PaginationOptions>,
    private filters?: PaginationFilter,
  ) {
    this.page = this.options?.page ?? DEFAULT_PAGE;
    this.limit = this.options?.limit ?? DEFAULT_LIMIT;
    this.lastPage = Math.ceil(this.total / this.limit);
    this.metaFieldsLabels = this.options?.metaFieldsLabels ?? new MetaFieldsLabels();
  }

  generate(): Paginated<T> {
    return {
      items: this.items,
      meta: {
        [this.metaFieldsLabels.itemCount]: this.items.length,
        [this.metaFieldsLabels.totalItems]: this.total,
        [this.metaFieldsLabels.itemsPerPage]: this.limit,
        [this.metaFieldsLabels.totalPages]: this.lastPage,
        [this.metaFieldsLabels.currentPage]: this.page,
      },
      links: {
        first: this.getLink(1),
        next: this.getLink(this.getNextPage()),
        previous: this.getLink(this.getPreviousPage()),
        last: this.getLink(this.lastPage),
      },
    };
  }

  setBaseUrl(url: string): this {
    this.baseUrl = url;

    return this;
  }

  setMetaFieldsLables(fields: MetaFieldsLabels): this {
    this.metaFieldsLabels = fields;

    return this;
  }

  setMetaFieldLabel(field: MetaFieldKey, name: string): this {
    this.metaFieldsLabels[field] = name;

    return this;
  }

  private getLink(page: Nullable<number>): string {
    if (!page) {
      return '';
    }

    return `${this.baseUrl}?page=${page}&limit=${this.limit}${this.getFiltersAsQueryParams()}`;
  }

  private getPreviousPage(): Nullable<number> {
    return this.page > 1 ? this.page - 1 : null;
  }

  private getNextPage(): Nullable<number> {
    return this.page < this.lastPage ? this.page + 1 : null;
  }

  private getFiltersAsQueryParams(): string {
    return this.filters ? '&' + new URLSearchParams(this.filters).toString() : '';
  }
}

type MetaFieldKey = keyof MetaFieldsLabels;

type Nullable<T> = T | null | undefined;

export type PaginationFilter = Record<string, any>;

export type PaginationOptions = {
  page: number;
  limit: number;
  metaFieldsLabels: MetaFieldsLabels;
};

export type Paginated<T> = {
  items: T[];
  meta: Record<string, number>;
  links: {
    first: string;
    previous: string;
    next: string;
    last: string;
  };
};

interface IPagination<T> {
  generate(): Paginated<T>;
}
