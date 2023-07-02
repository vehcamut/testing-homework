import { CartState, CheckoutFormData, CheckoutResponse, Product, ProductShortInfo } from "../../src/common/types";

export class ExampleApiMock {
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
    return await new Promise<{data: CheckoutResponse}>((resolve, reject) => {
      resolve(
        {
          data: {
            id: 1,
          },
        },        
      )
    });
  }
}


export let localStorageMock = "{}";

export class CartApiMock {
  getState(): CartState {
      try {
          const json = localStorageMock;
          return JSON.parse(json) as CartState || {};
      } catch {
          return {};
      }
  }

  setState(cart: CartState) {
    localStorageMock = JSON.stringify(cart);
  }
}