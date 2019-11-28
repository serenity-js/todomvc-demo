import { endsWith, Ensure, equals } from '@serenity-js/assertions';
import { Task, WithStage } from '@serenity-js/core';
import {
    Click,
    Enter,
    ExecuteScript,
    isVisible,
    Navigate,
    Pick,
    Press,
    Target,
    Text,
    Wait,
    Website,
} from '@serenity-js/protractor';
import { by, ElementArrayFinder, ElementFinder, protractor } from 'protractor';

describe('Todo List App', () => {

    // Screenplay-style lightweight page objects

    class TodoList {
        static newTodoInput  = Target.the('"What needs to be done?" input box')
            .located(by.css('.new-todo'));

        static editTodoInput  = Target.the('"What needs to be done?" input box')
            .located(by.css('.todo-list li.editing .edit'));

        static items           = Target.all('recorded items')
            .located(by.css('.todo-list li'));

        static itemCalled = (name: string) =>
            Pick.from<ElementFinder, ElementArrayFinder>(TodoList.items)
                .where(Text, equals(name)).first()

        static filterCalled = (name: string) =>
            Target.the(`${ name } filter`).located(by.linkText(name));
    }

    class TodoListItem {
        static label = Target.the(`label`)
            .located(by.css('label'));

        static toggleButton = Target.the(`toggle button`)
            .located(by.css('input.toggle'));

        static destroyButton = Target.the(`destroy button`)
            .located(by.css('button.destroy'));

        static editItemNameInput = Target.the(`edit item name input`)
            .located(by.css('.edit'));
    }

    /*
        Play guitar
        Read a book
        Write some code

        Toggle Write some code

        Filter to show 'Active'

        Ensure only Play guitar and Read a book are present
     */
    it('allows for the list to show active items only (Screenplay Pattern)', function (this: WithStage) {
        return this.stage.theActorCalled('Jasmine').attemptsTo(
            // todo: implement with audience participation ;-)
        );
    });

    afterEach(function (this: WithStage) {
        this.stage.theActorInTheSpotlight().attemptsTo(
            ExecuteScript.sync('window.localStorage.clear()'),
        );
    });
});
