const localhost = 'http://localhost:3000';
const ingredient = '[class^=IngredientItem_item__]';
const constructor = '[class^=BurgerConstructor_list__]';
const modal = '[class^=Modal_modal__]';
const modalCloseBtn = '[class^=Modal_closeIcon__]';

const ingredients = {
  bun: 'булка',
  sauce: 'соус',
  fillet: 'филе',
}

const features = {
  calories: 'Калории, ккал',
  proteins: 'Белки, г',
  fat: 'Жиры, г',
  carbohydrates: 'Углеводы, г',
};

// Cypress-тесты для страницы "Конструктор"
describe('Страница "Конструктор"', function () {
  beforeEach(() => { cy.visit(localhost) });

  it('Открывается страница "Конструктор"', function () {
    cy.contains('Соберите бургер');
  });
});

describe('Перетаскивание ингредиентов', function () {
  beforeEach(() => { cy.visit(localhost) });

  it('Перетаскивание ингредиентов в конструктор', function () {
    cy.get(constructor).as('constructor');

    for (const [key, value] of Object.entries(ingredients)) {
      cy.get(ingredient).contains(value, { matchCase: false }).as(key);
      cy.get(`@${key}`).trigger('dragstart');

      cy.get('@constructor').trigger('dragover');
      cy.get('@constructor').trigger('drop');
    }
  });
});

describe('Модальное окно с описанием ингредиента', function () {
  beforeEach(() => { cy.visit(localhost) });

  it('Открытие модального окна с описанием ингредиента', function () {
    cy.get(ingredient).first().as('ingredient');
    cy.get('@ingredient').click();

    cy.contains('Детали ингредиента');

    for (const [_, feature] of Object.entries(features)) {
      cy.contains(feature);
    }
  });

  it('Закрытие модального окна с описанием ингредиента' , function () {
    cy.get(ingredient).first().as('ingredient');
    cy.get('@ingredient').click();

    cy.get(modalCloseBtn).click();
    cy.get(modal).should('not.exist');
  })
}); 