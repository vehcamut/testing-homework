import '@testing-library/jest-dom'
import React from 'react';

import { queryByTestId, render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import { addToCart, initStore, checkoutComplete } from '../../src/client/store';
import { ExampleApi } from '../../src/client/api';
import { CartApiMock, ExampleApiMock } from './mock.api';
import events from "@testing-library/user-event";
import { Application } from '../../src/client/Application';
import { Provider } from 'react-redux';
import { Cart } from '../../src/client/pages/Cart';
import { FormProps } from '../../src/client/components/Form';

function MockedForm({ onSubmit }: FormProps) {
  const onClick = () => {
    onSubmit({
      address: 'My address',
      name: 'Say my name',
      phone: '9536256145',
    })
  }
  return <button onClick={onClick} data-testid="submit1">Checkout</button>;
}
jest.mock("../../src/client/components/Form", () => {
  return {
    Form: MockedForm,
  }
});

it(
  'Cсылка на каталог НЕ должна показываться при НЕ пустой корзине' +
  ' // ' + 
  'The link to the catalog must not be shown when the cart is not empty',
  async () => {
    const api = new ExampleApiMock('') as unknown as ExampleApi;
    const cart = new CartApiMock();
    cart.setState({
      0: {
        count: 1,
        name: 'name1',
        price: 1000,
      }
    });
    const store = initStore(api, cart);
    const application = (
      <MemoryRouter initialEntries={['/cart']} initialIndex={0}>
        <Provider store={store} >
          <Application />
        </Provider>
      </MemoryRouter>
    );
    render(application);
    expect(screen.queryByTestId('link-to-catalog')).not.toBeInTheDocument();
  }
);

it(
  'Cсылка на каталог должна показываться при пустой корзине' +
  ' // ' + 
  'The link to the catalog must be shown when the cart is empty',
  async () => {
    const api = new ExampleApiMock('') as unknown as ExampleApi;
    const cart = new CartApiMock();
    cart.setState({});
    const store = initStore(api, cart);
    const application = (
      <MemoryRouter initialEntries={['/cart']} initialIndex={0}>
        <Provider store={store} >
          <Application />
        </Provider>
      </MemoryRouter>
    );
    render(application);
    expect((await screen.findByTestId('link-to-catalog'))?.getAttribute('href')).toBe('/catalog');
  }
);

it(
  'Таблица и форма заказа должны показываться при наличии товаров в карзине' +
  ' // ' + 
  'The table and the order form must be displayed if there are products in the cart',
  async () => {
    const api = new ExampleApiMock('') as unknown as ExampleApi;
    const cart = new CartApiMock();
    cart.setState({
      0: {
        count: 1,
        name: 'name1',
        price: 1000,
      }
    });
    const store = initStore(api, cart);
    const application = (
      <MemoryRouter initialEntries={['/cart']} initialIndex={0}>
        <Provider store={store} >
          <Application />
        </Provider>
      </MemoryRouter>
    );
    render(application);
    expect(screen.queryByTestId('order-table')).toBeInTheDocument();
    expect(screen.queryByTestId('order-from')).toBeInTheDocument();
    expect(screen.queryByTestId('order-clear')).toBeInTheDocument();
  }
);

it(
  'Таблица и форма заказа НЕ должны показываться при отсутствии товаров в карзине' +
  ' // ' + 
  'The table and the order form must NOT be displayed if there are no products in the cart',
  async () => {
    const api = new ExampleApiMock('') as unknown as ExampleApi;
    const cart = new CartApiMock();
    cart.setState({});
    const store = initStore(api, cart);
    const application = (
      <MemoryRouter initialEntries={['/cart']} initialIndex={0}>
        <Provider store={store} >
          <Application />
        </Provider>
      </MemoryRouter>
    );
    render(application);
    expect(screen.queryByTestId('order-table')).not.toBeInTheDocument();
    expect(screen.queryByTestId('order-from')).not.toBeInTheDocument();
    expect(screen.queryByTestId('order-clear')).not.toBeInTheDocument();
  }
);

it(
  'Товары должны корректно показываться в таблице' +
  ' // ' + 
  'Goods must be displayed correctly in the table',
  async () => {
    const api = new ExampleApiMock('') as unknown as ExampleApi;
    const cart = new CartApiMock();
    const mockedCart: Record<number, {name: string, count: number, price: number}> = {
      0: {
        name:"Product 0", 
        count: 1,
        price: 1000,
      },
      1: {
        name:"Product 1", 
        count: 5,
        price: 500,
      },
      2: {
        name:"Product 2", 
        count: 7,
        price: 111,
      }
    };
    let total = 0; 
    for (let p in mockedCart) {
      total += mockedCart[p].count * mockedCart[p].price;
    }

    cart.setState(mockedCart);
    const store = initStore(api, cart);
    const application = (
      <MemoryRouter initialEntries={['/cart']} initialIndex={0}>
        <Provider store={store} >
          <Application />
        </Provider>
      </MemoryRouter>
    );
    render(application);
    const tableRows = await screen.findAllByTestId(/order-table-row-[\d]+/);
    expect(tableRows.length).toBe(3);
    for (let i = 0; i < 3; i++) {
      expect(queryByTestId(tableRows[i], 'row-name')?.innerHTML.trim()).toBe(mockedCart[i].name);
      expect(queryByTestId(tableRows[i], 'row-price')?.innerHTML.trim()).toBe(`\$${mockedCart[i].price}`);
      expect(queryByTestId(tableRows[i], 'row-count')?.innerHTML.trim()).toBe(`${mockedCart[i].count}`);
      expect(queryByTestId(tableRows[i], 'row-total')?.innerHTML.trim()).toBe(`\$${mockedCart[i].price * mockedCart[i].count}`);
    }
    expect(screen.getByTestId('total')?.innerHTML.trim()).toBe(`\$${total}`);
  }
);

it(
  'Нажатие на кнопку очистки должно очищать корзину' +
  ' // ' + 
  'Pressing the clear button must clear the cart',
  async () => {
    const api = new ExampleApiMock('') as unknown as ExampleApi;
    const cart = new CartApiMock();
    const mockedCart: Record<number, {name: string, count: number, price: number}> = {
      0: {
        name:"Product 0", 
        count: 1,
        price: 1000,
      },
      1: {
        name:"Product 1", 
        count: 5,
        price: 500,
      },
      2: {
        name:"Product 2", 
        count: 7,
        price: 111,
      }
    };

    cart.setState(mockedCart);
    const store = initStore(api, cart);
    const application = (
      <MemoryRouter initialEntries={['/cart']} initialIndex={0}>
        <Provider store={store} >
          <Application />
        </Provider>
      </MemoryRouter>
    );
    render(application);
    await events.click(screen.getByTestId('order-clear'));
    expect(store.getState().cart).toStrictEqual({});
  }
);

it(
  'После нажатие кнопки "Checkout" в форме должен успешно оформляться заказ' +
  ' // ' + 
  'After pressing the "Checkout" button in the form, the order should be completed successfully',
  async () => {
    const api = new ExampleApiMock('') as unknown as ExampleApi;
    const cart = new CartApiMock();
    const mockedCart: Record<number, {name: string, count: number, price: number}> = {
      0: {
        name:"Product 0", 
        count: 1,
        price: 1000,
      },
      1: {
        name:"Product 1", 
        count: 5,
        price: 500,
      },
      2: {
        name:"Product 2", 
        count: 7,
        price: 111,
      }
    };

    cart.setState(mockedCart);
    const store = initStore(api, cart);

    
    const application = (
      <MemoryRouter initialEntries={['/cart']} initialIndex={0}>
        <Provider store={store} >
          <Cart />
        </Provider>
      </MemoryRouter>
    );
    render(application);
    await events.click(screen.getByTestId('submit1'));
    expect(screen.queryByTestId('success-message')).toBeInTheDocument();
    expect(screen.queryByTestId('order-counter')?.innerHTML).toBe("1");
  }
);

it(
  'Сообщение об успешном заказе должно быть видно только, если корзина пуста и имеется оформленный заказ' +
  ' // ' + 
  'The message about successful order should be visible only if the cart is empty and there is a completed order',
  async () => {
    const api = new ExampleApiMock('') as unknown as ExampleApi;
    const cart = new CartApiMock();
    cart.setState({});
    const store = initStore(api, cart);
    const application = (
      <MemoryRouter initialEntries={['/cart']} initialIndex={0}>
        <Provider store={store} >
          <Cart />
        </Provider>
      </MemoryRouter>
    );
    render(application);
    expect(screen.queryByTestId('success-message')).not.toBeInTheDocument();
    store.dispatch(checkoutComplete(1));
    expect(screen.queryByTestId('success-message')).toBeInTheDocument();
    store.dispatch(addToCart({
      color: 'color1',
      description: 'desc1',
      id: 1,
      material: 'mat1',
      name: 'name1',
      price: 1000,
    }));
    expect(screen.queryByTestId('success-message')).not.toBeInTheDocument();
  }
);



