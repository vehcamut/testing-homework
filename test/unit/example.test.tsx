import React from 'react';

import { render } from '@testing-library/react';
import { Application } from '../../src/client/Application';
import { BrowserRouter, MemoryRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import { initStore } from '../../src/client/store';
import { CartState, CheckoutFormData, CheckoutResponse, Product, ProductShortInfo } from '../../src/common/types';
import { ExampleApi } from '../../src/client/api';
//import { ExampleApi } from '../../src/client/api';


export class ExampleApiPlug {
  constructor(private readonly basename: string) {

  }

  async getProducts() {
    return await new Promise<ProductShortInfo[]>((resolve, reject) => {
      resolve([
        {
          id: 1,
          name: 'pord1',
          price: 1000,
        },
        {
          id: 2,
          name: 'pord2',
          price: 2000,
        }
      ])
    })
  }

  async getProductById(id: number) {
    return await new Promise<Product>((resolve, reject) => {
      resolve(
        {
          id: id,
          name: `pord${id}`,
          price: +`${id}000`,
          color: `color${id}`,
          description: `product${id}`,
          material: `material${id}`,
        },
      )
    });
  }

  async checkout(form: CheckoutFormData, cart: CartState) {
    return await new Promise<CheckoutResponse>((resolve, reject) => {
      resolve(
        {
          id: 1,
        },
      )
    });
  }
}

let localStoragePlug = "{}";
export class CartApi {
  getState(): CartState {
      try {
          const json = localStoragePlug;
          //JSON.stringify(localStoragePlug);
          //const json = '{"0":{"name":"Licensed Car","count":1,"price":811}}';
          return JSON.parse(json) as CartState || {};
      } catch {
          return {};
      }
  }

  setState(cart: CartState) {
    localStoragePlug = JSON.stringify(cart);
    //localStorage.setItem(LOCAL_STORAGE_CART_KEY, JSON.stringify(cart));
  }
}

describe(
  'Название магазина в шапке должно быть ссылкой на главную страницу' + '\n' + 
  '//\n' + 
  'The name of the store in the header should be a link to the main page' + '\n', 
  () => {
  it(
    'Название магазина в шапке должно быть ссылкой на главную страницу' +
    ' // ' + 
    'The name of the store in the header should be a link to the main page',
    () => {
      const basename = '/hw/store';
      const api = new ExampleApiPlug(basename) as unknown as ExampleApi;
      const cart = new CartApi();
      const store = initStore(api, cart);

      const application = (
        <MemoryRouter initialEntries={[basename]} initialIndex={0}>
            <Provider store={store}>
                <Application />
            </Provider>
        </MemoryRouter>
        // <BrowserRouter basename={basename}>
        //   <Provider store={store}>
        //     <Application />
        //   </Provider>
        // </BrowserRouter>
      );
    
    const { getByTestId } = render(application);
    const title = getByTestId("main-title");
    // const result = {isAnchor: title.tagName === 'A', href: title.getAttribute('href')};
    expect(title.tagName).toBe('A');
    expect(title.getAttribute('href')).toBe('/');
      // const app = <Application />;
      // const { container } = render(app);
      // console.log(container.outerHTML);
      // expect(container.textContent).toBe('example');
    
    }
  );
});
