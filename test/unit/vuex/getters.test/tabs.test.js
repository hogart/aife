import {tabs,} from '../../../../src/vuex/getters';
import test from 'ava';
import {fixture,} from '../../helpers/fixture';

test('tabs', (assert) => {
    assert.plan(2);

    const emptyState = fixture();
    const notEmptyState = fixture();
    notEmptyState.stories[0].opened = [
        notEmptyState.stories[0].passages[0],
        notEmptyState.stories[0].passages[1],
    ];

    assert.is(
        tabs(emptyState).length,
        0,
        'empty array when no tabs is opened'
    );

    const nonEmptyTabs = tabs(notEmptyState);

    assert.deepEqual(
        nonEmptyTabs,
        [
            {
                pid: notEmptyState.stories[0].opened[0].pid,
                title: notEmptyState.stories[0].opened[0].title,
            },
            {
                pid: notEmptyState.stories[0].opened[1].pid,
                title: notEmptyState.stories[0].opened[1].title,
            },
        ],
        'correctly extracted only needed properties'
    );
});