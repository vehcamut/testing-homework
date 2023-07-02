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

const url = `${baseUrl}/catalog`;


describe(
	'Вёрстка страницы "Каталог" должна адаптироваться под ширину экрана' +
	' // ' +
	'The layout of the "Catalog" page must adapt to the width of the screen', 
	async function() {
		screenWidths.forEach((width) => {
			it(
				`Вёрстка страницы "Каталог" должна адаптироваться под ширину экрана в ${width}px` +
				' // ' +
				`The layout of the "Catalog" page must adapt to a screen width of ${width}px`, 
				async function() {
					const productsMock = await this.browser.mock(
						"http://localhost:3000/hw/store/api/products",
						{
							method: 'get',	
						}
					);
					productsMock.respond(mockedData);					
					await this.browser.url(url);
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


const mockedData = [
	{
			"id": 0,
			"name": "Product 0",
			"price": 645
	},
	{
			"id": 1,
			"name": "Product 1",
			"price": 847
	},
	{
			"id": 2,
			"name": "Product 2",
			"price": 307
	},
	{
			"id": 3,
			"name": "Product 3",
			"price": 988
	},
	{
			"id": 4,
			"name": "Product 4",
			"price": 102
	},
	{
			"id": 5,
			"name": "Product 5",
			"price": 475
	},
	{
			"id": 6,
			"name": "Product 6",
			"price": 606
	},
	{
			"id": 7,
			"name": "Product 7",
			"price": 315
	},
	{
			"id": 8,
			"name": "Product 8",
			"price": 35
	},
	{
			"id": 9,
			"name": "Product 9",
			"price": 76
	},
	{
			"id": 10,
			"name": "Product 10",
			"price": 344
	},
	{
			"id": 11,
			"name": "Product 11",
			"price": 545
	},
	{
			"id": 12,
			"name": "Product 12",
			"price": 255
	},
];