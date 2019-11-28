import { serenity, WithStage } from '@serenity-js/core';
import { defineParameterType, setDefaultTimeout, setWorldConstructor } from 'cucumber';
import { Actors } from '../../src';

setDefaultTimeout(15000);

setWorldConstructor(function (this: WithStage, { parameters }) {
    this.stage = serenity.callToStageFor(new Actors());
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
    transformer(this: WithStage, name: string) {
        return this.stage.theActorCalled(name);
    },
    name: 'actor',
});

defineParameterType({
    regexp: /he|she|they|his|her|their/,
    transformer(this: WithStage) {
        return this.stage.theActorInTheSpotlight();
    },
    name: 'pronoun',
});
