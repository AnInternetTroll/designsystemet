import cl from 'clsx/lite';
import type { AnchorHTMLAttributes, ReactNode } from 'react';

export type SkipLinkProps = {
  /** The content to display inside the skiplink. */
  children: ReactNode;

  /** Href of an element in the DOM the skiplink should skip to. E.g #main-content */
  href: string;
} & AnchorHTMLAttributes<HTMLAnchorElement>;

export const SkipLink = ({
  children,
  className,
  ...rest
}: SkipLinkProps): JSX.Element => {
  return (
    <a className={cl('ds-skiplink', className)} {...rest}>
      <p className='ds-skiplink__content'>{children}</p>
    </a>
  );
};

SkipLink.displayName = 'SkipLink';
