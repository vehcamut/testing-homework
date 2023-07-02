import React from 'react';

import { render } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import { initStore } from '../../src/client/store';
import { ExampleApi } from '../../src/client/api';
import { CartApiMock, ExampleApiMock } from './mock.api';
import { CartBadge } from '../../src/client/components/CartBadge';
it(
  'Элемент cartBadge для товара в корзине должен показываться' +
  ' // ' + 
  'The cartBadge element for an item in the cart should show',
  () => {
    const api = new ExampleApiMock('') as unknown as ExampleApi;
    const cart = new CartApiMock();
    cart.setState({
      1: {
        count: 1,
        price: 1000,
        name: 'name1',
      }
    })
    const store = initStore(api, cart);
    const application = (
      <MemoryRouter initialEntries={['/']} initialIndex={0}>
          <Provider store={store} >
            <CartBadge id={1}/>
          </Provider>
      </MemoryRouter>
    );
  
    const { queryByTestId } = render(application);
    expect(queryByTestId("cart-badge")).not.toBe(null); 
  }
);

it(
  'Элемент cartBadge для товара НЕ в корзине НЕ должен показываться' +
  ' // ' + 
  'The cartBadge element for an item NOT in the cart should NOT be shown',
  () => {
    const api = new ExampleApiMock('') as unknown as ExampleApi;
    const cart = new CartApiMock();
    cart.setState({
      1: {
        count: 1,
        price: 1000,
        name: 'name1',
      }
    })
    const store = initStore(api, cart);
    const application = (
      <MemoryRouter initialEntries={['/']} initialIndex={0}>
          <Provider store={store} >
            <CartBadge id={5}/>
          </Provider>
      </MemoryRouter>
    );
  
    const { queryByTestId } = render(application);
    expect(queryByTestId("cart-badge")).toBe(null); 
  }
);