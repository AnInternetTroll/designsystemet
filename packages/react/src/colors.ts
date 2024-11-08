/**
 * Base interface for available colors in the design system.
 * The CLI will generate augmentations of this interface to allow
 * type safety of custom color names.
 */
// biome-ignore lint/suspicious/noEmptyInterface: used for interface augmentation
export interface CustomColors {}

export type StateColors = 'info' | 'success' | 'warning' | 'danger';

export type Color = 'neutral' | keyof CustomColors | StateColors;
