//import 'hermione';
//1920
//1200
//992
//768
//576

const screenWidths = [
	1920,
	1200 - 1,
	1400 - 1,
	992 - 1,
	769 - 1,
	576- 1,
] ;

const baseUrl = 'http://localhost:3000/hw/store';

const url = `${baseUrl}/delivery`;

describe(
	'Вёрстка страницы "Доставка" должна адаптироваться под ширину экрана' +
	' // ' +
	'The layout of the "Delivery" page must adapt to the width of the screen', 
	async function() {
		screenWidths.forEach((width) => {
			it(
				`Вёрстка страницы "Доставка" должна адаптироваться под ширину экрана в ${width}px` +
				' // ' +
				`The layout of the "Delivery" page must adapt to a screen width of ${width}px`, 
				async function() {
					await this.browser.url(url);
					await this.browser.setWindowSize(width, 1080);
					//await this.browser.assertView('plain', 'div[data-testid="container"]');
					await this.browser.assertView('plain', 'body', {
						ignoreElements: 'nav[data-testid="navbar"]',
						screenshotDelay: 100,
					});
				}
			);
		})
	}
);