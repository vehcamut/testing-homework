Это мое решение домашнего задания ШРИ "Тестирование"

## Предисловие

ПРИВЕТ!

Если ты здесь, то тебе выпала участь проверять мое решение! Я рад видеть тебя в своем уютненьком репозитории!

<img src="https://img.freepik.com/free-vector/cute-cat-sitting-on-book-stack-cartoon-icon-illustration-animal-education-icon-isolated-flat-cartoon-style_138676-3108.jpg?w=740&t=st=1687765106~exp=1687765706~hmac=f9f763667068cb7c914a95b59aea8750aa4a3d2c8d578111273ede2f6db24cb3">

~~(это вроде как надо для использования картинки не обращай внимание (<a href="https://ru.freepik.com/free-vector/cute-cat-sitting-on-book-stack-cartoon-icon-illustration-animal-education-icon-isolated-flat-cartoon-style_13851657.htm#query=%D0%BA%D0%BE%D1%82%20%D0%B2%20%D0%BE%D1%87%D0%BA%D0%B0%D1%85&position=6&from_view=search&track=ais">Изображение от catalyststuff</a> на Freepik))~~


## Это описание задачи
# Домашнее задание: Автотесты

Вам дано приложение — интернет магазин. С его помощью можно смотреть каталог товаров, добавлять товары в корзину и оформлять заказы.

Форкните этот репозиторий и напишите тесты, проверяющие правильность работы продуктовых сценариев. Проверяйте сценарии модульными/интеграционными тестами, на свое усмотрение.

Главный критерий проверки — автотесты должны находить баги. Дополнительный критерий — на каждый баг должно падать небольшое количество тестов (не больше 1-2).

## Функциональные требования

**Общие требования: &check;**
- &#x2611; вёрстка должна адаптироваться под ширину экрана (hermione / e2e)
- &#x2611; в шапке отображаются ссылки на страницы магазина, а также ссылка на корзину (nestjs)
- &#x2611; название магазина в шапке должно быть ссылкой на главную страницу (nestjs)
- &#x2611; на ширине меньше 576px навигационное меню должно скрываться за "гамбургер" (hermione / e2e)
  - &#x2611; при выборе элемента из меню "гамбургера", меню должно закрываться (hermione / e2e)

**Страницы: &check;**
- &#x2611; в магазине должны быть страницы: главная, каталог, условия доставки, контакты (nestjs)
- &#x2611; страницы главная, условия доставки, контакты должны иметь статическое содержимое (hermione / e2e)
  - &#x2611; то что страница статичная мы можем проверить, когда будем проверять, что страница адаптируется под ширину экрана (hermione / e2e)

**Каталог: &check;**
- &#x2611; в каталоге должны отображаться товары, список которых приходит с сервера (nestjs)
- &#x2611; для каждого товара в каталоге отображается название, цена и ссылка на страницу с подробной информацией о товаре
- &#x2611; на странице с подробной информацией отображаются: название товара, его описание, цена, цвет, материал и кнопка "добавить в корзину"
- &#x2611; если товар уже добавлен в корзину, в каталоге и на странице товара должно отображаться сообщение об этом
- &#x2611; если товар уже добавлен в корзину, повторное нажатие кнопки "добавить в корзину" должно увеличивать его количество
- &#x2611; содержимое корзины должно сохраняться между перезагрузками страницы

**Корзина: &check;**
- &#x2611; в шапке рядом со ссылкой на корзину должно отображаться количество не повторяющихся товаров в ней
- &#x2611; в корзине должна отображаться таблица с добавленными в нее товарами
- &#x2611; для каждого товара должны отображаться название, цена, количество , стоимость, а также должна отображаться общая сумма заказа
- &#x2611; в корзине должна быть кнопка "очистить корзину", по нажатию на которую все товары должны удаляться
- &#x2611; если корзина пустая, должна отображаться ссылка на каталог товаров

## ВАЖНОЕ

- Версия ноды: 16.20.1. Для переключения можно использовать nvm (Node Version Manager).
- На виндовс должен быть масштаб 100%
- Когда гермиона первый раз делает тесты надо выбрать эталонные скриншоты. После утверждения повторь тесты и при наличии расхождений выбери правильный вариант.
## Как запустить

```sh
# установите зависимости
npm ci

# соберите клиентский код приложения
npm run build

# запустите сервер
npm run start

# запустите гермиону (для установления образцов скриншотов)
npm run test:e2e:gui
```

После этого можете открыть приложение в браузере по адресу http://localhost:3000/hw/store

## Как проверять

Вы можете запускать приложение с параметром `bug id`, который может принимать значение от 1 до 10. Каждое из значений `bug id` добавляет в работу приложения какой-то баг. Проверьте, что без параметра `bug id` все тесты проходят, а для каждого значения `bug id` падают 1-2 теста.

Как передать `bug id`:
- при запуске интеграционных тестов передавайте значение в параметре запроса, например, http://localhost:3000/hw/store/catalog/0?bug_id=9
- при запуске модульных тестов передавайте значение в переменной окружения `BUG_ID`, например, `BUG_ID=1 npm run test`

