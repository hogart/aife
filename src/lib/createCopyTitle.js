const copyTitleRe = /^(.*) \(Copy( (\d*))?\)/;

export default function createCopyTitle(title) {
    const matches = copyTitleRe.exec(title);
    if (matches) {
        const [$0, originalTitle, $2, copyNumber,] = matches;
        const nextCopyNumber = (copyNumber ? parseInt(copyNumber) : 0) + 1;

        return `${originalTitle} (Copy ${nextCopyNumber})`;
    } else {
        return `${title} (Copy)`;
    }
}