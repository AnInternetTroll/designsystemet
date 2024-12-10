import * as R from 'ramda';
import type { CssColor } from './types.js';

import chroma from 'chroma-js';
import { luminance } from './luminance.js';
import type {
  ColorInfo,
  ColorMode,
  ColorNumber,
  GeneratedColorTheme,
  GlobalColors,
  ThemeGenType,
  ThemeInfo,
} from './types.js';
import { getColorNameFromNumber, getLightnessFromHex, getLuminanceFromLightness } from './utils.js';

export const baseColors: Record<GlobalColors, CssColor> = {
  blue: '#0A71C0',
  green: '#068718',
  orange: '#B8581D',
  purple: '#663299',
  red: '#C01B1B',
  yellow: '#D4B12F',
};

/**
 * Generates a color scale based on a base color and a color mode.
 *
 * @param color The base color that is used to generate the color scale
 * @param colorScheme The color scheme to generate a scale for
 */
export const generateScaleForColor = (color: CssColor, colorScheme: ColorMode): ColorInfo[] => {
  const baseColors = getBaseColors(color, colorScheme);
  const luminanceValues = luminance[colorScheme];

  // Create the color scale based on the luminance values. The chroma().luminance function uses RGB interpolation by default.
  const outputArray: ColorInfo[] = Object.entries(luminanceValues).map(([key, value], index) => ({
    name: key,
    hex: chroma(color).luminance(value).hex() as CssColor,
    number: (index + 1) as ColorNumber,
  }));

  // Create the special colors with HSLuv lightness rather than relative luminance for better color perception
  const specialColors = [
    { hex: baseColors.baseDefault, number: 9 },
    { hex: baseColors.baseHover, number: 10 },
    { hex: baseColors.baseActive, number: 11 },
    { hex: getContrastDefault(baseColors.baseDefault), number: 14 },
    { hex: getContrastSubtle(baseColors.baseDefault), number: 15 },
  ];

  // Add the special colors to the output array
  for (const { hex, number } of specialColors) {
    outputArray[number - 1] = {
      hex: hex as CssColor,
      number: number as ColorNumber,
      name: getColorNameFromNumber(number as ColorNumber),
    };
  }

  return outputArray;
};

/**
 * Generates a color theme based on a base color. Light, Dark and Contrast scales are included.
 *
 * @param color The base color that is used to generate the color theme
 */
export const generateThemeForColor = (color: CssColor): ThemeInfo => ({
  light: generateScaleForColor(color, 'light'),
  dark: generateScaleForColor(color, 'dark'),
  contrast: generateScaleForColor(color, 'contrast'),
});

/**
 * Generates a complete theme for a set of colors.
 *
 * @param colors Which colors to generate the theme for
 * @param contrastMode The contrast mode to use
 * @returns
 */
export const generateColorTheme = ({ colors }: ThemeGenType): GeneratedColorTheme => ({
  main: R.map(generateThemeForColor, colors.main),
  support: R.map(generateThemeForColor, colors.support),
  neutral: generateThemeForColor(colors.neutral),
});

/**
 * Generates a color theme for the global colors. Light, Dark and Contrast scales are included.
 *
 */
export const generateGlobalColors = (): Record<GlobalColors, ThemeInfo> => {
  return R.mapObjIndexed(generateThemeForColor, baseColors);
};

/**
 * Returns the base colors for a color and color scheme.
 *
 * @param color The base color as a hex string
 * @param colorScheme The color scheme to generate the base colors for
 * @returns
 */
const getBaseColors = (color: CssColor, colorScheme: ColorMode) => {
  let colorLightness = getLightnessFromHex(color);
  if (colorScheme !== 'light') {
    colorLightness = colorLightness <= 30 ? 70 : 100 - colorLightness;
  }

  const modifier = colorLightness <= 30 || (colorLightness >= 49 && colorLightness <= 65) ? -8 : 8;
  const calculateLightness = (base: number, mod: number) => base - mod;

  return {
    baseDefault: chroma(color).luminance(getLuminanceFromLightness(colorLightness)).hex() as CssColor,
    baseHover: chroma(color)
      .luminance(getLuminanceFromLightness(calculateLightness(colorLightness, modifier)))
      .hex() as CssColor,
    baseActive: chroma(color)
      .luminance(getLuminanceFromLightness(calculateLightness(colorLightness, modifier * 2)))
      .hex() as CssColor,
  };
};

/**
 * Creates the Base Contrast Default color
 *
 * @param baseColor The base color
 */
export const getContrastDefault = (color: CssColor) =>
  chroma.contrast(color, '#ffffff') >= chroma.contrast(color, '#000000') ? '#ffffff' : '#000000';

/**
 * Creates the Base Contrast Subtle color
 *
 * @param color The base color
 */
export const getContrastSubtle = (color: CssColor): string => {
  const contrastWhite = chroma.contrast(color, '#ffffff');
  const contrastBlack = chroma.contrast(color, '#000000');
  const lightness = getLightnessFromHex(color);
  const modifier = lightness <= 40 || lightness >= 60 ? 60 : 50;
  const targetLightness = contrastWhite >= contrastBlack ? lightness + modifier : lightness - modifier;

  return chroma(color).luminance(getLuminanceFromLightness(targetLightness)).hex();
};

/**
 * Returns the css variable for a color.
 *
 * @param colorType The type of color
 * @param colorNumber The number of the color
 */
export const getCssVariable = (colorType: string, colorNumber: ColorNumber) => {
  return `--ds-color-${colorType}-${getColorNameFromNumber(colorNumber).toLowerCase().replace(/\s/g, '-')}`;
};
