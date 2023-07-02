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
    const products = await api.getProducts();
    
    expect(new Set(products.data?.map((p) => p.id)).size).toBe(products.data?.length);

    for (let i = 0; i < products.data.length; i++) {

      const prod = products.data[i];

      expect(prod).toBeDefined();
      expect(prod?.name).toBeDefined();
      expect(+prod?.id).not.toBeNaN();
      expect(+prod?.price).not.toBeNaN();

      const { data: curProd } = await api.getProductById(+prod.id);

      expect(+curProd?.id).toBe(+prod.id);
      expect(curProd?.name).toBe(prod.name);
      expect(+curProd?.price).toBe(+prod.price);

      expect(curProd?.color).toBeDefined();
      expect(curProd?.description).toBeDefined();
      expect(curProd?.material).toBeDefined();
    }
  }
);
