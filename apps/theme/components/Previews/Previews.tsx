'use client';

import type { ColorMode } from '@digdir/designsystemet/color';
import cl from 'clsx/lite';
import { useThemeStore } from '../../store';

import classes from './Previews.module.css';
import { Theme1 } from './Theme1/Theme1';

type PreviewsProps = {
  themeMode: ColorMode;
  onThemeModeChange: (themeMode: ColorMode) => void;
};

export const Previews = () => {
  const theme = useThemeStore((state) => state.themePreview);
  const appearance = useThemeStore((state) => state.appearance);
  const setTheme = useThemeStore((state) => state.setThemePreview);
  const setAppearance = useThemeStore((state) => state.setAppearance);

  return (
    <>
      <div className={classes.toolbar}>
        <div className={classes.menu}>
          <button
            className={cl(
              classes.menuItem,
              'ds-focus',
              theme === 'one' &&
                appearance === 'light' &&
                classes.menuItemActive,
            )}
            onClick={() => {
              setTheme('one');
              setAppearance('light');
            }}
          >
            Tema 1 lys
          </button>
          <button
            className={cl(
              classes.menuItem,
              'ds-focus',
              theme === 'one' &&
                appearance === 'dark' &&
                classes.menuItemActive,
            )}
            onClick={() => {
              setTheme('one');
              setAppearance('dark');
            }}
          >
            Tema 1 mørk
          </button>
          <button
            className={cl(
              classes.menuItem,
              'ds-focus',
              theme === 'two' &&
                appearance === 'light' &&
                classes.menuItemActive,
            )}
            onClick={() => {
              setTheme('two');
              setAppearance('light');
            }}
          >
            Tema 2 lys
          </button>
          <button
            className={cl(
              classes.menuItem,
              'ds-focus',
              theme === 'two' &&
                appearance === 'dark' &&
                classes.menuItemActive,
            )}
            onClick={() => {
              setTheme('two');
              setAppearance('dark');
            }}
          >
            Tema 2 mørk
          </button>
        </div>
      </div>

      <div className={cl(classes.preview)} id='preview2'>
        <Theme1 />
      </div>
    </>
  );
};
