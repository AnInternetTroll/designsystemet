import type { Size } from '@digdir/designsystemet-react';
import type { Colors } from '@digdir/designsystemet-react/colors';

declare global {
  namespace React.JSX {
    interface IntrinsicAttributes {
      'data-size'?: Size;
      'data-color'?: Colors;
    }
  }
  namespace React {
    interface HTMLAttributes<T> {
      'data-size'?: Size;
      'data-color'?: Colors;
    }
  }
}
