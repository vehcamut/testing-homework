import React from 'react';

import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import { addToCart, initStore, clearCart } from '../../src/client/store';
import { ExampleApi } from '../../src/client/api';
import { CartApiMock, ExampleApiMock } from './mock.api';
import { ProductDetails } from '../../src/client/components/ProductDetails';
import events from "@testing-library/user-event";
import { Application } from '../../src/client/Application';


it(
  'Нажатие на кнопку "add-button" должно добавлять в корзину товар, который еще не в корзине' +
  ' // ' + 
  'Clicking the "add-button" button should add an item to the cart that is not yet in the cart',
  async () => {
    const api = new ExampleApiMock('') as unknown as ExampleApi;
    const cart = new CartApiMock();
    const store = initStore(api, cart);
    const application = (
      <Provider store={store} >
        <ProductDetails product={
          {
            color: 'color1',
            description: 'desc1',
            id: 1,
            material: 'mat1',
            name: 'name1',
            price: 1000,
          }
        }/>
      </Provider>
    );

    const { getByTestId } = render(application);  
    await events.click(getByTestId('add-button'));
    expect(store.getState().cart[1]?.count).toBe(1);
  }
);

it(
  'Нажатие на кнопку "add-button" должно увеличивать на 1 количество товара, который уже присутсвтует в корзине' +
  ' // ' + 
  'Clicking the "add-button" button should increase by 1 the amount of an item that is already in the cart',
  async () => {
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
      <Provider store={store} >
        <ProductDetails product={
          {
            color: 'color1',
            description: 'desc1',
            id: 1,
            material: 'mat1',
            name: 'name1',
            price: 1000,
          }
        }/>
      </Provider>
    );

    const { getByTestId } = render(application);
    await events.click(getByTestId('add-button'));
    expect(store.getState().cart[1]?.count).toBe(2);
  }
);

it(
  'Изменение товара в корзине должно отображаться в шапке' +
  ' // ' + 
  'Changing an item in the cart should be displayed in the header',
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
    
    render(application);

    const links = await screen.findAllByTestId('nav-link');
    const link = links.find((he) => he.getAttribute('href') === '/cart');

    expect(link?.innerHTML.trim()).toBe('Cart');

    store.dispatch(addToCart({
      color: 'color1',
      description: 'desc1',
      id: 1,
      material: 'mat1',
      name: 'name1',
      price: 1000,
    }));
    
    expect(link?.innerHTML.trim()).toBe('Cart (1)');

    store.dispatch(addToCart({
      color: 'color2',
      description: 'desc2',
      id: 2,
      material: 'mat2',
      name: 'name2',
      price: 2000,
    }));
    
    expect(link?.innerHTML.trim()).toBe('Cart (2)');

    store.dispatch(clearCart());

    expect(link?.innerHTML.trim()).toBe('Cart');
  }
);