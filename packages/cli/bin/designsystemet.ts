#!/usr/bin/env node
import fs from 'node:fs/promises';
import path from 'node:path';
import type { CssColor } from '@adobe/leonardo-contrast-colors';
import { Argument, createCommand, program } from '@commander-js/extra-typings';
import chalk from 'chalk';
import * as R from 'ramda';
import { z } from 'zod';

import { fromError } from 'zod-validation-error';
import { convertToHex } from '../src/colors/index.js';
import migrations from '../src/migrations/index.js';
import { buildTokens } from '../src/tokens/build.js';
import { createTokens } from '../src/tokens/create.js';
import { writeTokens } from '../src/tokens/write.js';

const createTokensJsonSchema = z.object({
  outDir: z.string().optional(),
  themes: z.record(
    z.object({
      colors: z.object({
        main: z.record(z.string().transform(convertToHex)),
        support: z.record(z.string().transform(convertToHex)),
        neutral: z.string().transform(convertToHex),
      }),
      typography: z.object({
        fontFamily: z.string(),
      }),
    }),
  ),
});
type CreateTokensJsonSchema = z.infer<typeof createTokensJsonSchema>;

const finalCreateTokensSchema = createTokensJsonSchema.required();
type FinalCreateTokensSchema = z.infer<typeof finalCreateTokensSchema>;

program.name('designsystemet').description('CLI for working with Designsystemet').showHelpAfterError();

function makeTokenCommands() {
  const tokenCmd = createCommand('tokens');
  const DEFAULT_TOKENSDIR = './design-tokens';
  const DEFAULT_FONT = 'Inter';
  const DEFAULT_THEME_NAME = 'theme';

  tokenCmd
    .command('build')
    .description('Build Designsystemet tokens')
    .option('-t, --tokens <string>', `Path to ${chalk.blue('design-tokens')}`, DEFAULT_TOKENSDIR)
    .option('-o, --out <string>', `Output directory for built ${chalk.blue('design-tokens')}`, './dist/tokens')
    .option('-p, --preview', 'Generate preview token.ts files', false)
    .option('--verbose', 'Enable verbose output', false)
    .action((opts) => {
      const tokens = typeof opts.tokens === 'string' ? opts.tokens : DEFAULT_TOKENSDIR;
      const out = typeof opts.out === 'string' ? opts.out : './dist/tokens';
      const preview = opts.preview;
      const verbose = opts.verbose;
      console.log(`Building tokens in ${chalk.green(tokens)}`);
      return buildTokens({ tokens, out, preview, verbose });
    });

  tokenCmd
    .command('create')
    .description('Create Designsystemet tokens')
    .option('-m, --main-colors <name:hex...>', `Main colors`, parseColorValues)
    .option('-s, --support-colors <name:hex...>', `Support colors`, parseColorValues)
    .option('-n, --neutral-color <hex>', `Neutral hex color`, convertToHex)
    .option(
      '-w, --write [string]',
      `Output directory for created ${chalk.blue('design-tokens')} (default: "${DEFAULT_TOKENSDIR}")`,
    )
    .option('-f, --font-family <string>', `Font family (default: "${DEFAULT_FONT}")`)
    .option('--theme <string>', `Theme name (default: "${DEFAULT_THEME_NAME}")`)
    .option('--json <string>', 'Path to JSON file with settings', parseJsonConfig)
    .action(async (opts) => {
      const propsFromJson = await opts.json;
      const shouldWrite = Boolean(opts.write);

      // Check that we're not creating themes with different color names.
      // For the themes' modes to work in Figma and when building css, the color names must be consistent
      const themeColors = Object.values(propsFromJson?.themes ?? {}).map(
        (x) => new Set([...R.keys(x.colors.main), ...R.keys(x.colors.support)]),
      );
      if (!R.all(R.equals(R.__, themeColors[0]), themeColors)) {
        console.error(
          chalk.redBright('When using --json option, all themes must have the same custom color names, but we found:'),
        );
        const themeNames = R.keys(propsFromJson?.themes ?? {});
        themeColors.forEach((colors, index) => {
          const colorNames = Array.from(colors);
          console.log(`  - ${themeNames[index]}: ${colorNames.join(', ')}`);
        });
        console.log();
        process.exit(1);
      }

      /*
       * Create final props from defaults, json file and command-line options
       */

      const defaultProps: Partial<CreateTokensJsonSchema> = {
        outDir: DEFAULT_TOKENSDIR,
      };

      const noUndefined = R.reject(R.isNil);
      const propsFromOpts = noUndefined({
        outDir: typeof opts.write === 'string' ? opts.write : undefined,
        themes: propsFromJson?.themes
          ? undefined
          : {
              [opts.theme ?? DEFAULT_THEME_NAME]: {
                colors: noUndefined({
                  main: opts.mainColors,
                  support: opts.supportColors,
                  neutral: opts.neutralColor,
                }),
                typography: noUndefined({
                  fontFamily: opts.fontFamily ?? DEFAULT_FONT,
                }),
              },
            },
      });

      const mergedConfig = R.mergeDeepRight(R.mergeDeepRight(defaultProps, propsFromJson ?? {}), propsFromOpts);

      let props: FinalCreateTokensSchema;
      try {
        props = finalCreateTokensSchema.parse(mergedConfig);
      } catch (err) {
        console.error(chalk.redBright('Invalid config after combining defaults, json config and options'));
        const validationError = makeFriendlyError(err);
        console.error(validationError.toString());
        process.exit(1);
      }

      console.log(`Creating tokens with configuration ${chalk.green(JSON.stringify(props, null, 2))}`);

      /*
       * Create and (optionally) write tokens for each theme
       */
      for (const [themeName, theme] of Object.entries(props.themes)) {
        const tokens = createTokens({ themeName, ...theme });
        if (shouldWrite) {
          await writeTokens({ writeDir: props.outDir, tokens, themeName, colors: theme.colors });
        }
      }
    });

  return tokenCmd;
}

program.addCommand(makeTokenCommands());

program
  .command('migrate')
  .description('run a Designsystemet migration')
  .addArgument(new Argument('[migration]', 'Available migrations').choices(Object.keys(migrations)))
  .option('-l --list', 'List available migrations')
  .option('-g --glob <glob>', 'Glob for files upon which to apply the migration', './**/*.(tsx|css)')
  .action((migrationKey, opts) => {
    const { glob, list } = opts;

    if (list) {
      for (const key of Object.keys(migrations)) {
        console.log(key);
      }
    } else if (migrationKey) {
      const migration = migrations[migrationKey as keyof typeof migrations];
      if (!migration) {
        console.error('Migration not found!');
        throw 'Aborting';
      }

      console.log(`Applying migration ${chalk.blue(migrationKey)} with glob: ${chalk.green(glob)}`);
      migration?.(glob)
        .then(() => console.log(`Migration ${chalk.blue(migrationKey)} finished`))
        .catch((error) => console.log(error));
    } else {
      console.log('Migrate: please specify a migration name or --list');
    }
  });

await program.parseAsync(process.argv);

async function parseJsonConfig(jsonPath: string) {
  const resolvedPath = path.resolve(process.cwd(), jsonPath);
  const jsonFile = await fs.readFile(resolvedPath, { encoding: 'utf-8' });
  try {
    return await createTokensJsonSchema.parseAsync(JSON.parse(jsonFile));
  } catch (err) {
    console.error(chalk.redBright(`Invalid json config in ${jsonPath}`));
    const validationError = makeFriendlyError(err);
    console.error(validationError.toString());
    process.exit(1);
  }
}

function makeFriendlyError(err: unknown) {
  return fromError(err, {
    messageBuilder: (issues) =>
      issues
        .map((issue) => {
          const issuePath = issue.path.join('.');
          return `  - ${chalk.red(issuePath)}: ${issue.message} (${chalk.dim(issue.code)})`;
        })
        .join('\n'),
  });
}

function parseColorValues(value: string, previous: Record<string, CssColor> = {}): Record<string, CssColor> {
  const [name, hex] = value.split(':');
  previous[name] = convertToHex(hex);
  return previous;
}
