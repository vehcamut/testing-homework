/**
 * @jest-environment-options {"url": "http://localhost:3000"}
 */

import { ExampleApi } from '../../../src/client/api';

const baseUrl = 'http://localhost:3000/hw/store';

it(
  'Данные продуктов должны корректно загружаться с внешнего API' +
  ' // ' + 
  'Product data must be loaded correctly from external API',
  async () => {
    const api = new ExampleApi(baseUrl);
    const {data: {id: firstId}} = await api.checkout(
      {
        address: 'Нагорья друуда',
        name: 'Грозодел',
        phone: '2569546592',
      },
      {}
    );
    expect(firstId).toBeDefined();
    const {data: {id: secondId}} = await api.checkout(
      {
        address: 'Нагорья друуда',
        name: 'Грозодел',
        phone: '2569546592',
      },
      {}
    );
    expect(secondId).toBe(firstId + 1);
  }
);
