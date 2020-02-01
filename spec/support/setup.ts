import { engage } from '@serenity-js/core';
import { Actors } from '../../src';

beforeEach(function () {
    this.stage = engage(new Actors());
});
