import test from 'ava';
import {stripIndents, stripIndent,} from 'common-tags';
import {
    picklePassage,
    unpicklePassage,
    picklePassages,
    unpickleStory,
    pickleStory,
} from '../../../src/lib/pickle';

const testPassage0 = {
    title: 'Twisty little passages',
    text: 'They\'re incredibly all alike.',
    tags: [],
    pid: 0,
};

const testPassage1 = {
    title: 'Big cave',
    text: stripIndent`
        Biggest cave ever.
        You wonder if you can fit here your mom.`,
    tags: ['tag', 'lol, another tag',],
    pid: 1,
};

const testStory = {
    title: 'Best story ever!',
    ifid: 'some-fake-ifid',
    passages: [testPassage0, testPassage1,],
};

const testPassage0Pickled = stripIndent`
    == Twisty little passages (0)

    They're incredibly all alike.`;

const testPassage1Pickled = stripIndent`
    == Big cave (1)
    #tag #lol, another tag
    Biggest cave ever.
    You wonder if you can fit here your mom.`;

const testPickledPassages = stripIndents`
    ${testPassage0Pickled}
    =========================================================
    ${testPassage1Pickled}
`;

const testPickledStory = stripIndents`
    = Best story ever! {some-fake-ifid}

    ${testPickledPassages}
`;

test('pickle/picklePassage', (assert) => {
    assert.plan(2);

    const pickled = picklePassage(testPassage0);
    assert.is(
        pickled,
        testPassage0Pickled,
        'Pickled passage without tags correctly'
    );

    const pickledExtraSpicy = picklePassage(testPassage1);
    assert.is(
        pickledExtraSpicy,
        testPassage1Pickled,
        'Pickled passage with tags correctly'
    );
});

test('pickle/unpicklePassage', (assert) => {
    assert.plan(2);

    const unpickled = unpicklePassage(testPassage0Pickled);
    assert.deepEqual(
        unpickled,
        testPassage0,
        'Un-pickled passage without tags correctly'
    );

    const unpickledExtraSpicy = unpicklePassage(testPassage1Pickled);
    assert.deepEqual(
        unpickledExtraSpicy,
        testPassage1,
        'un-pickled passage with tags correctly'
    );
});

test('pickle/picklePassages', (assert) => {
    assert.plan(1);

    const pickledPassages = picklePassages(testStory.passages);

    assert.is(
        pickledPassages,
        testPickledPassages,
        'Correct passages pickled successfully'
    );
});

test('pickle/unpickleStory', (assert) => {
    assert.plan(2);

    const unpickledStory = unpickleStory(testPickledStory);
    assert.deepEqual(
        unpickledStory,
        testStory,
        'Correct story unpickled successfully'
    );

    const twoWayTestStory = unpickleStory(pickleStory(testStory));
    assert.deepEqual(
        twoWayTestStory,
        testStory,
        'Correctly pickled/unpickled story'
    );
});