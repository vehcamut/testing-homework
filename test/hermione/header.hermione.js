//import 'hermione';
//1920
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

const url = `${baseUrl}`;

describe(
	'Шапка должна адаптироваться под ширину экрана' +
	' // ' +
	'The header must adapt to the width of the screen', 
	async function() {
		screenWidths.forEach((width) => {
			it(
				`Шапка должна адаптироваться под ширину экрана в ${width}px` +
				' // ' +
				`The header must adapt to a screen width of ${width}px`, 
				async function() {
					await this.browser.url(url);
					await this.browser.setWindowSize(width, 1080);
					await this.browser.assertView('plain', 'nav[data-testid="navbar"]', {
						screenshotDelay: 100,
					});
				}
			);
		})
	}
);

describe(
	'На ширине меньше 576px навигационное меню должно скрываться за "гамбургер" и должно работать корректно' +
	' // ' +
	'On widths less than 576px the navigation menu should hide behind the "hamburger" and must work correctly', 
	async function() {
		it(
			`После нажатия на кнопку "гамбургера" в шапке, меню должно открываться` +
			' // ' +
			`After clicking on the "hamburger" button in the header, the menu must open`, 
			async function() {
				const puppeteer = await this.browser.getPuppeteer();
				await this.browser.setWindowSize(575, 1080);
				const [page] = await puppeteer.pages();
				await page.goto(url);
				await page.waitForSelector('nav[data-testid="navbar"]');
				await page.click('button[data-testid="navbar-toggler"]');
				await this.browser.assertView('plain', 'nav[data-testid="navbar"]', {
					screenshotDelay: 100,
					ignoreElements: ['div[data-testid="menu"]']
				});
			}
		);
		it(
			`При выборе элемента из меню "гамбургера" в шапке, меню должно закрываться` +
			' // ' +
			`When selecting an item from the "hamburger" menu in the header, the menu must close`, 
			async function() {
				const puppeteer = await this.browser.getPuppeteer();
				await this.browser.setWindowSize(575, 1080);
				const [page] = await puppeteer.pages();
				await page.goto(url);
				await page.waitForSelector('nav[data-testid="navbar"]');
				await page.click('button[data-testid="navbar-toggler"]');
				await page.waitForSelector('a[data-testid="nav-link"]');
				await page.click('a[data-testid="nav-link"]');
				await page.waitForSelector('nav[data-testid="navbar"]');
				await this.browser.assertView('plain', 'nav[data-testid="navbar"]', {
					screenshotDelay: 100,
				});
			}
		);
	}
);