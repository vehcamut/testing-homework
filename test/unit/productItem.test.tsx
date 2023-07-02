import React from 'react';

import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import { initStore } from '../../src/client/store';
import { ExampleApi } from '../../src/client/api';
import { CartApiMock, ExampleApiMock } from './mock.api';
import { ProductItem } from '../../src/client/components/ProductItem';

it(
  'На элементе "ProductItem" должна присутствовать ссылка на станицу конкретного товара' +
  ' // ' + 
  'The "ProductItem" element must contain a link to the page of the specific product',
  async () => {
    const api = new ExampleApiMock('') as unknown as ExampleApi;
    const cart = new CartApiMock();
    const store = initStore(api, cart);
    const application = (
      <MemoryRouter initialEntries={['/catalog']} initialIndex={0}>
        <Provider store={store} >
          <ProductItem product={
            {
              id: 1,
              name: 'name1',
              price: 1000,
            }
          }/>
        </Provider>
      </MemoryRouter>
    );
  
    render(application);
    expect((await screen.findByTestId('link-to-prod'))?.getAttribute('href')).toBe(`/catalog/${1}`);
  }
);