import { Ensure, equals } from '@serenity-js/assertions';
import { Actor, WithStage } from '@serenity-js/core';
import { StartLocalServer, StopLocalServer } from '@serenity-js/local-server';
import { After, Given, Then, When } from 'cucumber';
import { FilterItems, RecordedItems, Start, ToggleItem } from '../../src';

Given('{actor} has a todo list containing: {items}', (actor: Actor, items: string[]) => actor.attemptsTo(
    StartLocalServer.onRandomPort(),
    Start.withAListContaining(...items),
));

When('{pronoun} has/have toggled the item called: {}', (actor: Actor, item: string) => actor.attemptsTo(
    ToggleItem.called(item),
));

When('{pronoun} filter/filters his/her/their list to show only {word} items', (actor: Actor, filter: string) => actor.attemptsTo(
    FilterItems.toShow(filter),
));

Then('{pronoun} todo list should contain: {items}', (actor: Actor, items: string[]) => actor.attemptsTo(
    Ensure.that(RecordedItems(), equals(items)),
));

After(function (this: WithStage) {
    return this.stage.theActorInTheSpotlight().attemptsTo(
        StopLocalServer.ifRunning(),
    );
});
