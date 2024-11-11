import type { Color } from '@digdir/designsystemet-react/colors';
export type Size = 'sm' | 'md' | 'lg';

export type PortalProps = {
  /**
   * Portals the floating element outside of the app root and into the body.
   * @see https://floating-ui.com/docs/floatingportal
   * @default false
   */
  portal?: boolean;
};

export type DefaultProps = {
  'data-size'?: Size;
  'data-color'?: Color;
};
