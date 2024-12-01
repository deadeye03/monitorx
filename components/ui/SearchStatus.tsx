import React from 'react';
import { SearchIcon } from './icons/SearchIcon';
import { SpinnerIcon } from './icons/SpinnerIcon';



export default function SearchStatus({ searching }: { searching: boolean }) {
  return (
    <div className="">
      {searching ? (
        <div aria-label="searching..." className="h-fit w-fit animate-spin">
          <SpinnerIcon aria-hidden="true"  width={16} height={16} className="text-white" />
        </div>
      ) : (
        <SearchIcon aria-hidden="true" width={16} height={16} className="text-white" />
      )}
    </div>
  );
}