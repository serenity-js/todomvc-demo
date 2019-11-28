import { browser, by, element, protractor } from 'protractor';

describe('Todo List App', function () {

    // Page Object(s) style

    const TodoListApp = {
        open: async () => {
            await browser.get('/');
            await protractor.browser.wait(
                protractor.ExpectedConditions.presenceOf(element(by.css('.new-todo'))),
                2000,
            );
            expect(await protractor.browser.getTitle()).toMatch(/.*TodoMVC$/);
        },

        recordItemCalled: async (itemName: string) => {
            await element(by.css('.new-todo')).sendKeys(itemName);
            await element(by.css('.new-todo')).sendKeys(protractor.Key.ENTER);
        },

        completeItemCalled: async (itemName: string) => {
            await element(
                by.xpath(`//li[*[@class='view' and contains(.,'${ itemName }')]]//input[contains(@class,'toggle')]`),
            )
                .click();
        },

        filterToShowActiveItemsOnly: async () => {
            await element(by.linkText(`Active`))
                .click();
        },

        recordedItems: async () => {
            return element.all(by.css('.todo-list li')).getText();
        },
    };

    it('allows for the list to show active items only (Page Objects)', async function () {
        await TodoListApp.open();

        await TodoListApp.recordItemCalled('Play guitar');
        await TodoListApp.recordItemCalled('Read a book');
        await TodoListApp.recordItemCalled('Write some code');

        await TodoListApp.completeItemCalled('Write some code');

        await TodoListApp.filterToShowActiveItemsOnly();

        await TodoListApp.recordedItems().then(items => {
            expect(items).toEqual([
                'Play guitar',
                'Read a book',
            ]);
        });
    });

    afterEach(async () => {
        await browser.executeScript(`window.localStorage.clear()`);
    });
});
