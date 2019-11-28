import { browser, by, element, protractor } from 'protractor';

describe('Todo List App', function () {

    fit('allows for the list to show active items only (test script)', async function () {
        await browser.get('/');

        await protractor.browser.wait(
            protractor.ExpectedConditions.presenceOf(element(by.css('.new-todo'))),
            2000,
        );

        expect(await protractor.browser.getTitle()).toMatch(/.*TodoMVC$/);

        await element(by.css('.new-todo')).sendKeys('Play guitar');
        await element(by.css('.new-todo')).sendKeys(protractor.Key.ENTER);

        await element(by.css('.new-todo')).sendKeys('Read a book');
        await element(by.css('.new-todo')).sendKeys(protractor.Key.ENTER);

        await element(by.css('.new-todo')).sendKeys('Write some code');
        await element(by.css('.new-todo')).sendKeys(protractor.Key.ENTER);

        await element(
            by.xpath(`//li[*[@class='view' and contains(.,'Write some code')]]//input[contains(@class,'toggle')]`),
        )
            .click();

        await element(by.linkText(`Active`))
            .click();

        await element.all(by.css('.todo-list li')).getText().then(items => {
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
