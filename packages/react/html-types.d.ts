import type { Colors } from '@digdir/designsystemet-react';

declare global {
  namespace React.JSX {
    interface IntrinsicAttributes {
      'data-color'?: Colors;
    }
  }
  namespace React {
    interface HTMLAttributes<T> {
      'data-color'?: Colors;
    }
  }
}
