import React from 'react';
import { Filter, Code, Clock, Star } from 'lucide-react';

interface FilterBarProps {
  languages: string[];
  selectedLanguage: string;
  sortBy: 'updated' | 'stars' | 'name';
  onLanguageChange: (language: string) => void;
  onSortChange: (sort: 'updated' | 'stars' | 'name') => void;
}

const FilterBar: React.FC<FilterBarProps> = ({
  languages,
  selectedLanguage,
  sortBy,
  onLanguageChange,
  onSortChange,
}) => {
  const sortOptions = [
    { value: 'updated', label: 'Recently Updated', icon: Clock },
    { value: 'stars', label: 'Most Stars', icon: Star },
    { value: 'name', label: 'Alphabetical', icon: Code },
  ];

  return (
    <div className="flex flex-col md:flex-row gap-4 p-6 bg-gray-800/30 rounded-xl border border-gray-700 backdrop-blur-sm">
      <div className="flex items-center gap-2">
        <Filter size={20} className="text-gray-400" />
        <span className="text-gray-300 font-medium">Filter & Sort</span>
      </div>
      
      <div className="flex flex-col md:flex-row gap-4 flex-1">
        <div className="flex flex-wrap gap-2">
          <button
            onClick={() => onLanguageChange('')}
            className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-200 ${
              selectedLanguage === ''
                ? 'bg-blue-500 text-white shadow-lg shadow-blue-500/25'
                : 'bg-gray-700 text-gray-300 hover:bg-gray-600'
            }`}
          >
            All Languages
          </button>
          {languages.map((language) => (
            <button
              key={language}
              onClick={() => onLanguageChange(language)}
              className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-200 ${
                selectedLanguage === language
                  ? 'bg-blue-500 text-white shadow-lg shadow-blue-500/25'
                  : 'bg-gray-700 text-gray-300 hover:bg-gray-600'
              }`}
            >
              {language}
            </button>
          ))}
        </div>
        
        <div className="flex gap-2 ml-auto">
          {sortOptions.map(({ value, label, icon: Icon }) => (
            <button
              key={value}
              onClick={() => onSortChange(value as 'updated' | 'stars' | 'name')}
              className={`flex items-center gap-2 px-4 py-2 rounded-full text-sm font-medium transition-all duration-200 ${
                sortBy === value
                  ? 'bg-purple-500 text-white shadow-lg shadow-purple-500/25'
                  : 'bg-gray-700 text-gray-300 hover:bg-gray-600'
              }`}
            >
              <Icon size={16} />
              <span className="hidden sm:inline">{label}</span>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};

export default FilterBar;