import React from 'react';

import { render } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import { addToCart, initStore } from '../../src/client/store';
import { ExampleApi } from '../../src/client/api';
import { CartApiMock, ExampleApiMock } from './mock.api';
import { Application } from '../../src/client/Application';

it(
  'Содержимое корзины должно сохраняться между перезагрузками страницы' +
  ' // ' + 
  'The contents of the cart should be saved between page reloads',
  async () => {
    const api = new ExampleApiMock('') as unknown as ExampleApi;
    const cart = new CartApiMock();
    cart.setState({});

    let store = initStore(api, cart);

    const application = (
      <MemoryRouter initialEntries={['/']} initialIndex={0}>
        <Provider store={store} >
          <Application />
        </Provider>
      </MemoryRouter>
    );
    
    const { rerender } = render(application);

    expect(cart.getState()).toStrictEqual({});

    store.dispatch(addToCart({
      color: 'color1',
      description: 'desc1',
      id: 1,
      material: 'mat1',
      name: 'name1',
      price: 1000,
    }));

    const result = store.getState().cart;
    rerender(application);
    
    expect(cart.getState()).toStrictEqual(
      result
    );
  }
);
