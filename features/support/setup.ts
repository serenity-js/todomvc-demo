import { actorCalled, actorInTheSpotlight, engage, serenity, WithStage } from '@serenity-js/core';
import { defineParameterType, setDefaultTimeout, setWorldConstructor } from 'cucumber';
import { Actors } from '../../src';

setDefaultTimeout(15000);

setWorldConstructor(function ({ parameters }) {
    engage(new Actors());
});

defineParameterType({
    regexp: /(.*)/,
    transformer(items: string) {
        return items.split(',').map(item => item.trim());
    },
    name: 'items',
});

defineParameterType({
    regexp: /[A-Z][a-z]+/,
    transformer(name: string) {
        return actorCalled(name);
    },
    name: 'actor',
});

defineParameterType({
    regexp: /he|she|they|his|her|their/,
    transformer() {
        return actorInTheSpotlight();
    },
    name: 'pronoun',
});
