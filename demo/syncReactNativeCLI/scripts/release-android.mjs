#!/usr/bin/env node
/**
 * Build a release APK and upload it to Firebase App Distribution.
 *
 *   node scripts/release-android.mjs [options]
 *
 *   --notes "..."      Release notes. Defaults to the latest git commit subject.
 *   --groups a,b       Tester groups to distribute to. Defaults to "aerosync".
 *                      Pass --groups "" to upload without notifying anyone.
 *   --testers a@b.com  Individual tester emails.
 *   --abis a,b         ABIs to build. Defaults to the gradle.properties value.
 *   --skip-build       Upload the existing APK without rebuilding.
 *   --build-only       Build the APK and stop, without uploading.
 *   --dry-run          Build and print the upload command, but don't upload.
 *
 * Auth comes from the Firebase CLI (`firebase login`), or from FIREBASE_TOKEN /
 * GOOGLE_APPLICATION_CREDENTIALS in CI.
 */
import { spawnSync } from 'node:child_process';
import { existsSync, statSync } from 'node:fs';
import { dirname, join, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';

const appRoot = resolve(dirname(fileURLToPath(import.meta.url)), '..');
const androidDir = join(appRoot, 'android');
const apkPath = join(
  androidDir,
  'app/build/outputs/apk/release/app-release.apk'
);

// Firebase app "syncReactNativeCLI" (com.syncreactnativecli) in project aerosync-sdk.
const APP_ID =
  process.env.FIREBASE_ANDROID_APP_ID ||
  '1:979235669832:android:b86c9ce2846bf67b1b957d';

// CLI alias of the tester group, not its display name ("Aerosync").
// `firebase appdistribution:group:list` shows the aliases.
const DEFAULT_GROUPS = 'aerosync';

const args = process.argv.slice(2);
const flag = (name) => args.includes(`--${name}`);
const value = (name) => {
  const i = args.indexOf(`--${name}`);
  return i !== -1 ? args[i + 1] : undefined;
};

const isWindows = process.platform === 'win32';

// Windows needs shell: true, because gradlew.bat and firebase.cmd are batch files
// that Node refuses to exec directly. The shell re-splits the command line on
// whitespace, so anything containing a space (an absolute path, release notes) has
// to be quoted. Node 24 deprecates passing an args array alongside shell: true, so
// on Windows the whole line is assembled and quoted here and passed as one string.
const quote = (part) => (/\s/.test(part) ? `"${part}"` : part);

function run(command, commandArgs, options = {}) {
  const result = isWindows
    ? spawnSync([command, ...commandArgs].map(quote).join(' '), {
        stdio: 'inherit',
        shell: true,
        ...options,
      })
    : spawnSync(command, commandArgs, {
        stdio: 'inherit',
        ...options,
      });
  if (result.error) {
    throw result.error;
  }
  if (result.status !== 0) {
    process.exit(result.status ?? 1);
  }
}

// git is a real executable on every platform, so this needs no shell.
function capture(command, commandArgs) {
  const result = spawnSync(command, commandArgs, {
    encoding: 'utf8',
    cwd: appRoot,
  });
  return result.status === 0 ? result.stdout.trim() : '';
}

const notes =
  value('notes') || capture('git', ['log', '-1', '--pretty=%s']) || 'Release build';
// --groups "" opts out of distributing to anyone.
const groups =
  value('groups') ?? process.env.FIREBASE_TESTER_GROUPS ?? DEFAULT_GROUPS;
const testers = value('testers') || process.env.FIREBASE_TESTERS;
const abis = value('abis');

if (!flag('skip-build')) {
  const gradlew = join(androidDir, isWindows ? 'gradlew.bat' : 'gradlew');
  const gradleArgs = ['assembleRelease'];
  if (abis) {
    gradleArgs.push(`-PreactNativeArchitectures=${abis}`);
  }
  console.log(`\n> Building release APK${abis ? ` for ${abis}` : ''}...\n`);
  run(gradlew, gradleArgs, { cwd: androidDir });
}

if (!existsSync(apkPath)) {
  console.error(`\nAPK not found at ${apkPath}`);
  console.error('Run without --skip-build, or build it first.');
  process.exit(1);
}

const sizeMb = (statSync(apkPath).size / 1024 / 1024).toFixed(1);
console.log(`\n> APK ready: ${apkPath} (${sizeMb} MB)`);

if (flag('build-only')) {
  process.exit(0);
}

const distributeArgs = [
  'appdistribution:distribute',
  apkPath,
  '--app',
  APP_ID,
  '--release-notes',
  notes,
];
if (groups) {
  distributeArgs.push('--groups', groups);
}
if (testers) {
  distributeArgs.push('--testers', testers);
}

if (flag('dry-run')) {
  console.log('\n> Dry run, would execute:\n');
  console.log(`  firebase ${distributeArgs.join(' ')}\n`);
  process.exit(0);
}

if (!groups && !testers) {
  console.log(
    '\n> No --groups or --testers given: uploading the release without notifying anyone.'
  );
}

console.log(`\n> Uploading to Firebase App Distribution...\n`);
run('firebase', distributeArgs, { cwd: appRoot });
console.log('\n> Done.\n');
