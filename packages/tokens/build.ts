// eslint-disable-next-line @typescript-eslint/no-var-requires
import { noCase } from 'change-case';
import StyleDictionary from 'style-dictionary';
import type { Config, TransformedToken } from 'style-dictionary';
import { registerTransforms } from '@tokens-studio/sd-transforms';

registerTransforms(StyleDictionary);

type Brands = 'Altinn' | 'Digdir' | 'Tilsynet';
const brands: Brands[] = ['Digdir', 'Tilsynet', 'Altinn'];
const prefix = 'fds';
const basePxFontSize = 16;
/**
 * Transforms `level1.level2.another_level` to `level1-level2-another_level`
 * This maintains hierarchy distinction (i.e. underscore is not a hierarchy level separator)
 */
StyleDictionary.registerTransform({
  name: 'name/cti/hierarchical-kebab',
  type: 'name',
  transformer: (token, options) => {
    return noCase([options?.prefix].concat(token.path).join('-'), {
      delimiter: '-',
      stripRegexp: /[^A-Z0-9_]+/gi,
    });
  },
});

StyleDictionary.registerTransform({
  name: 'typography/shorthand',
  type: 'value',
  transitive: true,
  matcher: (token) => token.type === 'typography',
  transformer: (token) => {
    const { value } = token;
    return `${value.fontWeight} ${value.fontSize}/${value.lineHeight} '${value.fontFamily}'`;
  },
});

/**
 * Transform fontSizes from px to rem
 */
StyleDictionary.registerTransform({
  name: 'pxToRem',
  type: 'value',
  transitive: true,
  matcher: (token) => ['fontSizes'].includes(token.type),
  transformer: (token, options) =>
    options?.basePxFontSize
      ? token.value / options.basePxFontSize + 'rem'
      : token.value,
});

const excludeSource = (token: TransformedToken) =>
  !token.filePath.includes('Core.json');

const getStyleDictionaryConfig = (
  brand: Brands,
  targetFolder = 'dist',
): Config => {
  const tokensPath = '../../design-tokens';
  const destinationPath = `${targetFolder}/${brand.toLowerCase()}`;

  return {
    include: [
      `${tokensPath}/Brand/${brand}.json`,
      `${tokensPath}/Base/Semantic.json`,
    ],
    source: [`${tokensPath}/Base/Core.json`],
    platforms: {
      js: {
        basePxFontSize,
        transforms: [
          'name/cti/camel',
          'typography/shorthand',
          'pxToRem',
          'ts/resolveMath',
          'ts/size/lineheight',
        ],
        transformGroup: 'js',
        files: [
          {
            destination: `${destinationPath}/tokens.cjs.js`,
            format: 'javascript/module-flat',
            filter: excludeSource,
          },
          {
            destination: `${destinationPath}/tokens.esm.js`,
            format: 'javascript/es6',
            filter: excludeSource,
          },
          {
            destination: `${destinationPath}/tokens.d.ts`,
            format: 'typescript/es6-declarations',
            filter: excludeSource,
          },
        ],
      },
      css: {
        prefix,
        basePxFontSize,
        transforms: [
          'name/cti/hierarchical-kebab',
          'typography/shorthand',
          'pxToRem',
          'ts/resolveMath',
          'ts/size/lineheight',
        ],
        files: [
          {
            destination: `${destinationPath}/tokens.css`,
            format: 'css/variables',
            filter: excludeSource,
          },
        ],
      },
    },
  };
};

console.log('Build started...');

brands.map((brand) => {
  console.log('\n==============================================');
  console.log(`\nProcessing: ${brand}`);

  const extendedStyleDictionary = StyleDictionary.extend(
    getStyleDictionaryConfig(brand, 'dist'),
  );

  extendedStyleDictionary.buildAllPlatforms();

  console.log('\nEnd processing');
});

console.log('\n==============================================');
console.log('\nBuild completed!');
