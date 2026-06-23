import { SearchIcon, XIcon } from '../ui/Icons';

function SearchBar({ searchVal, setSearchVal, lang }) {
  const isAr = lang.code === 'ar';

  return (
    <div className="relative w-full max-w-md">
      <div className={`absolute inset-y-0 flex items-center pointer-events-none ${isAr ? 'right-3' : 'left-3'}`}>
        <span className="text-gray-400">
          <SearchIcon size={18} />
        </span>
      </div>

      <input
        type="text"
        value={searchVal}
        onChange={(e) => setSearchVal(e.target.value)}
        placeholder={lang.search}
        className={`w-full py-3 bg-white text-gray-800 border border-gray-200 rounded-2xl shadow-sm text-sm font-medium transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-[#E8572A] focus:border-transparent ${
          isAr ? 'pr-10 pl-10' : 'pl-10 pr-10'
        }`}
      />

      {searchVal && (
        <button
          onClick={() => setSearchVal('')}
          className={`absolute inset-y-0 flex items-center p-1.5 rounded-full hover:bg-gray-100 transition my-2 ${
            isAr ? 'left-3' : 'right-3'
          }`}
          style={{ color: '#2A2A2A' }}
          aria-label="Clear search"
        >
          <XIcon size={14} />
        </button>
      )}
    </div>
  );
}

export default SearchBar;
