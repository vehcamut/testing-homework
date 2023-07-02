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
const id = 0;
const url = `${baseUrl}/catalog/${id}`;


describe(
	'Вёрстка страницы товара должна адаптироваться под ширину экрана' +
	' // ' +
	'Product page layout must adapt to the width of the screen', 
	async function() {
		screenWidths.forEach((width) => {
			it(
				`Вёрстка страницы товара должна адаптироваться под ширину экрана в ${width}px` +
				' // ' +
				`Product page layout must adapt to a screen width of ${width}px`, 
				async function() {
					const productsMock = await this.browser.mock(
						`http://localhost:3000/hw/store/api/products/${id}`,
						{
							method: 'get',	
						}
					);
					productsMock.respond(mockedData);					
					await this.browser.setWindowSize(width, 1080);
					await this.browser.url(url);
					await this.browser.assertView('plain', 'body', {
						ignoreElements: 'nav[data-testid="navbar"]',
						screenshotDelay: 750,
					});
				}
			);
		})
	}
);


const mockedData = {
	"id": id,
	"name": "Namename Nameme",
	"description": "The Namename Nameme NAME007 is a namene menemana me na meme mamana mem na mem",
	"price": 1000,
	"color": "memnyj",
	"material": "memasy"
};