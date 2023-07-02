import axios, { AxiosStatic } from "axios";
import { ExampleApi } from "../../src/client/api";
import { CartState, CheckoutFormData, CheckoutResponse, Product, ProductShortInfo } from "../../src/common/types";

interface AxiosMock extends AxiosStatic {
  mockResolvedValue: Function
  mockRejectedValue: Function
}


jest.mock("axios");
const mockedAxios = axios as AxiosMock;

export class ExampleApiMock extends ExampleApi {
  constructor(basename: string) {
    super(basename);
  }

  async getProducts() {
    //const thisApi = this as ExampleApi;
    mockedAxios.mockResolvedValue([
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
    return await mockedAxios.get<ProductShortInfo[]>(`${this.basename}/api/products`);
  // }));
    // return await new Promise<ProductShortInfo[]>((resolve, reject) => {
    //   resolve([
    //     {
    //       id: 1,
    //       name: 'pord1',
    //       price: 1000,
    //     },
    //     {
    //       id: 2,
    //       name: 'pord2',
    //       price: 2000,
    //     }
    //   ])
    // })
  }

  async getProductById(id: number) {
    mockedAxios.mockResolvedValue([
      {
        id: id,
        name: `pord${id}`,
        price: +`${id}000`,
        color: `color${id}`,
        description: `product${id}`,
        material: `material${id}`,
      },
    ])
    return await mockedAxios.get<Product>(`${this.basename}/api/products/${id}`);
    // return await new Promise<Product>((resolve, reject) => {
    //   resolve(
    //     {
    //       id: id,
    //       name: `pord${id}`,
    //       price: +`${id}000`,
    //       color: `color${id}`,
    //       description: `product${id}`,
    //       material: `material${id}`,
    //     },
    //   )
    // });
  }

  async checkout(form: CheckoutFormData, cart: CartState) {
    // return await new Promise<CheckoutResponse>((resolve, reject) => {
    //   resolve(
    //     {
    //       id: 1,
    //     },
    //   )
    // });
    mockedAxios.mockResolvedValue([
      {
        id: 1,
      },
    ])
  return await mockedAxios.post<CheckoutResponse>(`${this.basename}/api/checkout`, { form, cart });
  }
}


export let localStorageMock = "{}";

export class CartApiMock {
  getState(): CartState {
      try {
          const json = localStorageMock;
          //JSON.stringify(localStoragePlug);
          //const json = '{"0":{"name":"Licensed Car","count":1,"price":811}}';
          return JSON.parse(json) as CartState || {};
      } catch {
          return {};
      }
  }

  setState(cart: CartState) {
    localStorageMock = JSON.stringify(cart);
    //localStorage.setItem(LOCAL_STORAGE_CART_KEY, JSON.stringify(cart));
  }
}