import {stripIndent,} from 'common-tags';
import pkg from '../../package.json';

function getStartingPid(story) {
    const startingPassage = story.passages.find(({starting,}) => starting);
    if (startingPassage) {
        return startingPassage.pid;
    } else {
        return 1;
    }
}

function exportTags(tags) {
    return tags.map((tag) => tag.replace(' ', '-')).join(' ');
}

export default function exportStory(story) {
    return stripIndent`
<tw-storydata 
    name="${story.title}"
    startnode="${getStartingPid(story)}"
    creator="${pkg.name}"
    creator-version="${pkg.version}"
    ifid="${story.ifid}"
    format="Snowman"
    hidden>
    <style role="stylesheet" id="twine-user-stylesheet" type="text/twine-css">${story.styleSheet}</style>
    <script role="script" id="twine-user-script" type="text/twine-javascript">${story.script}</script>
    ${story.passages.map(exportPassage)}
</tw-storydata>`;
}

function exportPassage(passage) {
    return stripIndent`
        <tw-passagedata 
            pid="${passage.pid}" 
            name="${passage.title}" 
            tags="${exportTags(passage.tags)}"
            >${passage.text}</tw-passagedata>`;
}