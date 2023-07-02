//import 'hermione';
//1920
//1400
//1200
//992
//768
//576

const screenWidths = [
	1920,
	1400 - 1,
	1200 - 1,
	992 - 1,
	769 - 1,
	576- 1,
] ;

const baseUrl = 'http://localhost:3000/hw/store';

const url = `${baseUrl}/cart`;


describe(
	'Вёрстка страницы "Корзина" с добавленными товарами должна адаптироваться под ширину экрана' +
	' // ' +
	'The layout of the "Cart" page with added products must adapt to the width of the screen', 
	async function() {
		screenWidths.forEach((width) => {
			it(
				`Вёрстка страницы "Корзина" с добавленными товарами должна адаптироваться под ширину экрана в ${width}px` +
				' // ' +
				`The layout of the "Cart" page with added products must adapt to a screen width of ${width}px`, 
				async function() {
					const productsMock = await this.browser.mock(
						"http://localhost:3000/hw/store/api/checkout",
						{
							method: 'post',	
						}
					);
					productsMock.respond({id: 666});

					const puppeteer = await this.browser.getPuppeteer();
					//await this.browser.setWindowSize(width, 1080);
					const [page] = await puppeteer.pages();
					await page.goto(baseUrl);
					
					
					await page.evaluate((mockedData) => {
							window.localStorage.setItem('example-store-cart', JSON.stringify(mockedData));
					}, mockedData);

					await page.goto(url);
					await this.browser.setWindowSize(width, 1080);
					await this.browser.assertView('plain', 'body', {
						ignoreElements: 'nav[data-testid="navbar"]',
						screenshotDelay: 750,
					});
				}
			);
		})
	}
);

describe(
	'Вёрстка страницы "Корзина" после заказа должна адаптироваться под ширину экрана' +
	' // ' +
	'The layout of the "Сart" page after ordering must adapt to the width of the screen', 
	async function() {
		screenWidths.forEach((width) => {
			it(
				`Вёрстка страницы "Корзина" после заказа должна адаптироваться под ширину экрана в ${width}px` +
				' // ' +
				`The layout of the "Сart" page after ordering must adapt to a screen width of ${width}px`, 
				async function() {
					const productsMock = await this.browser.mock(
						"http://localhost:3000/hw/store/api/checkout",
						{
							method: 'post',	
						}
					);
					productsMock.respond({id: 666});

					const puppeteer = await this.browser.getPuppeteer();
					
					const [page] = await puppeteer.pages();
					await page.goto(baseUrl);
					
					
					await page.evaluate((mockedData) => {
							window.localStorage.setItem('example-store-cart', JSON.stringify(mockedData));
					}, mockedData);

					await page.goto(url);
					await page.focus('input[id="f-name"]');
					await page.keyboard.type('Name1');
					await page.focus('input[id="f-phone"]');
					await page.keyboard.type('9569595955');
					await page.focus('textarea[id="f-address"]');
					await page.keyboard.type('My address');
					await page.click('button[data-testid="submit"]');
					await this.browser.setWindowSize(width, 1080);
					await this.browser.assertView('plain', 'body', {
						ignoreElements: 'nav[data-testid="navbar"]',
						screenshotDelay: 1000,
					});
				}
			);
		})
	}
);


const mockedData = {
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