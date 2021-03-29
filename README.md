# type-pagination

Type-Pagination is simple pagination library for TypeScript.

# Install

Depending on what package manager do you use:

```
yarn add type-pagination
```

or

```
npm install type-pagination
```

# How to use

Import Pagination class from package

```Typescript
import { Pagination } from 'type-pagination';
```

Create new intance of Pagination class. First parametr contains array of items, second one total items number. Third parameter holds PaginationOptions object, with options – page and limit.

```Typescript

const items = [
  {
    id: 1,
    name: 'Item 1',
  },
  {
    id: 2,
    name: 'Item 2',
  },
  {
    id: 3,
    name: 'Item 3',
  },
]

const pagination = new Pagination(items, 14, { page: 1, limit: 3 });
```

To render pagination, use `render` method.

```Typescript
pagination.render();
```

Example output:

```Typescript
{
  items: [
    { id: 1, name: 'Item 1' },
    { id: 2, name: 'Item 2' },
    { id: 3, name: 'Item 3' }
  ],
  meta: {
    itemCount: 3,
    totalItems: 14,
    itemsPerPage: 3,
    totalPages: 5,
    currentPage: 1
  },
  links: {
    first: '?page=1&limit=3',
    next: '?page=2&limit=3',
    previous: '',
    last: '?page=5&limit=3'
  }
}
```

If you would like to add your own base url, use `setBaseUrl` method:

```Typescript
pagination.setBaseUrl('http://example.com');
```

Output with set base url:

```Typescript
{
  items: [
    { id: 1, name: 'Item 1' },
    { id: 2, name: 'Item 2' },
    { id: 3, name: 'Item 3' }
  ],
  meta: {
    itemCount: 3,
    totalItems: 14,
    itemsPerPage: 3,
    totalPages: 5,
    currentPage: 1
  },
  links: {
    first: 'http://example.com?page=1&limit=3',
    next: 'http://example.com?page=2&limit=3',
    previous: '',
    last: 'http://example.com?page=5&limit=3'
  }
}
```

It is possible to chain methods e.g.:

```Typescript
pagination
  .setBaseUrl('http://example.com')
  .generate();
```
