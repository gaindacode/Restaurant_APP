import React, { forwardRef } from 'react';
import { Search as SearchIcon, X, Loader2 } from 'lucide-react';

interface SearchBarProps {
  value?: string;
  onChange?: (value: string) => void;
  onClear?: () => void;
  placeholder?: string;
  loading?: boolean;
  inputRef?: React.Ref<HTMLInputElement>;
}

export const SearchBar = forwardRef<HTMLInputElement, SearchBarProps>(({
  value,
  onChange,
  onClear,
  placeholder = "Search restaurants or locations...",
  loading = false,
  inputRef
}, _ref) => {
  return (
    <div className="relative">
      <SearchIcon className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
      <input
        ref={inputRef}
        type="text"
        value={value}
        onChange={(e) => onChange?.(e.target.value)}
        placeholder={placeholder}
        className="w-full pl-10 pr-10 py-3 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-yellow-500 focus:border-transparent shadow-sm"
      />
      {value && (
        <div className="absolute right-3 top-1/2 -translate-y-1/2 flex items-center">
          {loading ? (
            <Loader2 className="w-5 h-5 text-gray-400 animate-spin" />
          ) : (
            <button
              onClick={() => {
                if (onChange) onChange('');
                onClear?.();
              }}
              className="p-1 hover:bg-gray-100 rounded-full"
              aria-label="Clear search"
            >
              <X className="w-4 h-4 text-gray-400" />
            </button>
          )}
        </div>
      )}
    </div>
  );
});