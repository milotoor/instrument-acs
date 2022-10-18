import { execSync } from 'child_process';
import dirTree, { DirectoryTree } from 'directory-tree';
import { DateTime } from 'luxon';
import path from 'path';

import { ACS } from '../lib';

type Letter = ACS.Task.Letter;
type Number = ACS.Section.Number;
type UpdateType = string;
type TaskUpdates = Record<Letter, UpdateType>;
type SectionUpdates = Record<Number, { updated: UpdateType; tasks: TaskUpdates }>;

/**
 * Retrieves the date of the last commit involving the file or directory at `path`. `--format=%cD`
 * requests the commit date in RFC2822 style, which provides a convenient way to load it into luxon.
 * As of October 17, 2022, this is the only usage of luxon in the entire site, but there is no TTFB
 * penalty incurred (as a result of larger bundle size) because this is only executed at build time.
 */
function getLastUpdateForPath(path: string): UpdateType {
  const dateStr = String(execSync(`git log -1 --format=%cD "${path}"`));
  const date = DateTime.fromRFC2822(dateStr);
  return date.toLocaleString(DateTime.DATE_FULL);
}

function getLastUpdateForTask({ name, path }: DirectoryTree) {
  const letter = name.match(/([A-E])/)![1] as Letter;
  return [letter, getLastUpdateForPath(path)] as const;
}

function getLastUpdatesForSection({ children, name, path }: DirectoryTree) {
  const number = parseInt(name.match(/([1-8])/)![1]) as Number;
  const tasks = children!.filter((child) => child.name.match(/[A-E]-/));
  return [
    number,
    {
      updated: getLastUpdateForPath(`${path}/index.tsx`),
      tasks: Object.fromEntries(tasks.map(getLastUpdateForTask)) as TaskUpdates,
    },
  ] as const;
}

/**
 * Retrieves the date that each file in the `pages` directory was last updated. This is displayed
 * in the app's top bar.
 */
export function getLastUpdates(pathToRoot: string = '.') {
  const tree = dirTree('pages');
  const sections = tree!.children!.filter((child) => child.name.match(/\d-/));
  return Object.fromEntries(sections.map(getLastUpdatesForSection)) as SectionUpdates;
}
