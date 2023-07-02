import React from 'react';

import { render, screen } from '@testing-library/react';
import { Application } from '../../src/client/Application';
import { MemoryRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import { initStore } from '../../src/client/store';
import { ExampleApi } from '../../src/client/api';
import { CartApiMock, ExampleApiMock } from './mock.api';

describe(
  'Название магазина в шапке является ссылкой на главную страницу' + '\n' + 
  '//\n' + 
  'The name of the store in the header should be a link to the main page' + '\n', 
  () => {
  it(
    'Название магазина в шапке должно быть ссылкой на главную страницу' +
    ' // ' + 
    'The name of the store in the header should be a link to the home page',
    () => {
      const basename = '/';
      const api = new ExampleApiMock(basename) as unknown as ExampleApi;
      const cart = new CartApiMock();
      const store = initStore(api, cart);

      const application = (
        <MemoryRouter initialEntries={[basename]} initialIndex={0}>
            <Provider store={store}>
                <Application />
            </Provider>
        </MemoryRouter>
      );
    
    const { getByTestId } = render(application);
    const title = getByTestId("main-title");
    expect(screen.getByTestId("main-title").getAttribute('href')).toBe('/');
    expect(title.tagName).toBe('A');
    expect(title.getAttribute('href')).toBe('/');
    }
  );
});

describe(
  'Должны быть все необходимые страницы' + 
  ' // ' + 
  'There must be all the necessary pages', 
  () => {
  const basename = '/hw/store';
  const api = new ExampleApiMock(basename) as unknown as ExampleApi;
  const cart = new CartApiMock();
  const store = initStore(api, cart);  

  it(
    'В магазине должна быть следующая страница: Главная' +
    ' // ' + 
    'The store should have the following page: Home',
    () => {
      const application = (
        <MemoryRouter initialEntries={['/']} initialIndex={0}>
            <Provider store={store}>
                <Application />
            </Provider>
        </MemoryRouter>
      );
    
    render(application);
    
    const cantainerDiv = screen.getByTestId("container");
    expect(cantainerDiv.innerHTML.trim()).not.toBe('');
    }
  );

  it(
    'В магазине должна быть следующая страница: Каталог' +
    ' // ' + 
    'The store should have the following page: Catalog',
    () => {
      const application = (
        <MemoryRouter initialEntries={['/catalog']} initialIndex={0}>
            <Provider store={store}>
                <Application />
            </Provider>
        </MemoryRouter>
      );
    
    render(application);
    
    const cantainerDiv = screen.getByTestId("container");
    expect(cantainerDiv.innerHTML.trim()).not.toBe('');
    }
  );

  it(
    'В магазине должна быть следующая страница: Доставка' +
    ' // ' + 
    'The store should have the following page: Delivery',
    () => {
      const application = (
        <MemoryRouter initialEntries={['/delivery']} initialIndex={0}>
            <Provider store={store}>
                <Application />
            </Provider>
        </MemoryRouter>
      );
    
    render(application);
    
    const cantainerDiv = screen.getByTestId("container");
    expect(cantainerDiv.innerHTML.trim()).not.toBe('');
    }
  );

  it(
    'В магазине должна быть следующая страница: Контакты' +
    ' // ' + 
    'The store should have the following page: Contacts',
    () => {
      const application = (
        <MemoryRouter initialEntries={['/contacts']} initialIndex={0}>
            <Provider store={store}>
                <Application />
            </Provider>
        </MemoryRouter>
      );
    
    render(application);
    
    const cantainerDiv = screen.getByTestId("container");
    expect(cantainerDiv.innerHTML.trim()).not.toBe('');
    }
  );

  it(
    'В магазине должна быть следующая страница: Корзина' +
    ' // ' + 
    'The store should have the following page: Cart',
    () => {
      const application = (
        <MemoryRouter initialEntries={['/cart']} initialIndex={0}>
            <Provider store={store}>
                <Application />
            </Provider>
        </MemoryRouter>
      );
    
    render(application);
    
    const cantainerDiv = screen.getByTestId("container");
    expect(cantainerDiv.innerHTML.trim()).not.toBe('');
    }
  );
});
