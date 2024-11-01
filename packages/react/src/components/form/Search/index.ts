import { Search as SearchRoot } from './Search';
import { SearchButton } from './SearchButton';
import { SearchClear } from './SearchClear';
import { SearchInput } from './SearchInput';

export const Search = Object.assign(SearchRoot, {
  Clear: SearchClear,
  Button: SearchButton,
  Input: SearchInput,
});

Search.Clear.displayName = 'Search.Clear';
Search.Button.displayName = 'Search.Button';
Search.Input.displayName = 'Search.Input';

export type { SearchProps } from './Search';
export type { SearchButtonProps } from './SearchButton';
export type { SearchClearProps } from './SearchClear';
export { SearchClear, SearchButton, SearchInput };
