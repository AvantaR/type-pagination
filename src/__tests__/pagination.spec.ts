import { Pagination } from '../pagination';

describe('Pagination', () => {
  describe('render', () => {
    it('returns second page without base url', () => {
      const items = [
        {
          id: 1,
          name: 'Test 1',
        },
        {
          id: 2,
          name: 'Test 2',
        },
        {
          id: 3,
          name: 'Test 3',
        },
      ];

      const pagination = new Pagination(items, 100, { page: 2, limit: 3 });

      const expectedPagination = {
        items: [
          {
            id: 1,
            name: 'Test 1',
          },
          {
            id: 2,
            name: 'Test 2',
          },
          {
            id: 3,
            name: 'Test 3',
          },
        ],
        links: {
          first: '?page=1&limit=3',
          last: '?page=34&limit=3',
          next: '?page=3&limit=3',
          previous: '?page=1&limit=3',
        },
        meta: {
          currentPage: 2,
          itemCount: 3,
          itemsPerPage: 3,
          totalItems: 100,
          totalPages: 34,
        },
      };

      const actualPagination = pagination.generate();

      expect(actualPagination).toStrictEqual(expectedPagination);
    });

    it('returns last page with set base url', () => {
      const items = [
        {
          id: 1,
          name: 'Test 1',
        },
      ];

      const pagination = new Pagination(items, 9, { page: 5, limit: 2 });
      pagination.setBaseUrl('http://example.com');

      const expectedPagination = {
        items: [
          {
            id: 1,
            name: 'Test 1',
          },
        ],
        links: {
          first: 'http://example.com?page=1&limit=2',
          last: 'http://example.com?page=5&limit=2',
          next: '',
          previous: 'http://example.com?page=4&limit=2',
        },
        meta: {
          currentPage: 5,
          itemCount: 1,
          itemsPerPage: 2,
          totalItems: 9,
          totalPages: 5,
        },
      };

      const actualPagination = pagination.generate();

      expect(actualPagination).toStrictEqual(expectedPagination);
    });
    it('returns pagination with filters', () => {
      const items = [
        {
          id: 1,
          name: 'Test 1',
        },
      ];

      const pagination = new Pagination(items, 9, { page: 1, limit: 2 }, { countryId: 5, name: 'Roman' });
      pagination.setBaseUrl('http://example.com');

      const expectedPagination = {
        items: [
          {
            id: 1,
            name: 'Test 1',
          },
        ],
        links: {
          first: 'http://example.com?page=1&limit=2&countryId=5&name=Roman',
          last: 'http://example.com?page=5&limit=2&countryId=5&name=Roman',
          next: 'http://example.com?page=2&limit=2&countryId=5&name=Roman',
          previous: '',
        },
        meta: {
          currentPage: 1,
          itemCount: 1,
          itemsPerPage: 2,
          totalItems: 9,
          totalPages: 5,
        },
      };

      const actualPagination = pagination.generate();

      expect(actualPagination).toStrictEqual(expectedPagination);
    });

    it('returns pagination with changed meta field labels using setMetaFieldLabel', () => {
      const items = [
        {
          id: 1,
          name: 'Test 1',
        },
      ];

      const pagination = new Pagination(items, 9, { page: 5, limit: 2 });
      pagination.setMetaFieldLabel('currentPage', 'page');
      pagination.setMetaFieldLabel('itemCount', 'items');
      pagination.setMetaFieldLabel('totalItems', 'total');
      pagination.setMetaFieldLabel('totalPages', 'pages');
      pagination.setMetaFieldLabel('itemsPerPage', 'limit');

      pagination.setBaseUrl('http://example.com');

      const expectedPagination = {
        items: [
          {
            id: 1,
            name: 'Test 1',
          },
        ],
        links: {
          first: 'http://example.com?page=1&limit=2',
          last: 'http://example.com?page=5&limit=2',
          next: '',
          previous: 'http://example.com?page=4&limit=2',
        },
        meta: {
          page: 5,
          items: 1,
          limit: 2,
          total: 9,
          pages: 5,
        },
      };

      const actualPagination = pagination.generate();

      expect(actualPagination).toStrictEqual(expectedPagination);
    });

    it('returns pagination with changed meta field labels using setMetaFieldsLables', () => {
      const items = [
        {
          id: 1,
          name: 'Test 1',
        },
      ];

      const pagination = new Pagination(items, 9, { page: 5, limit: 2 });
      pagination.setMetaFieldsLables({
        itemCount: 'items',
        totalItems: 'total',
        itemsPerPage: 'limit',
        totalPages: 'pages',
        currentPage: 'page',
      });

      pagination.setBaseUrl('http://example.com');

      const expectedPagination = {
        items: [
          {
            id: 1,
            name: 'Test 1',
          },
        ],
        links: {
          first: 'http://example.com?page=1&limit=2',
          last: 'http://example.com?page=5&limit=2',
          next: '',
          previous: 'http://example.com?page=4&limit=2',
        },
        meta: {
          page: 5,
          items: 1,
          limit: 2,
          total: 9,
          pages: 5,
        },
      };

      const actualPagination = pagination.generate();

      expect(actualPagination).toStrictEqual(expectedPagination);
    });
  });
});
