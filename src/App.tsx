import React, { useState, useMemo } from 'react';
import { RefreshCw, Github, Terminal, Zap } from 'lucide-react';
import { useGitHubData } from './hooks/useGitHubData';
import Header from './components/Header';
import FilterBar from './components/FilterBar';
import ProjectGrid from './components/ProjectGrid';
import LoadingSpinner from './components/LoadingSpinner';

function App() {
  const { repos, user, loading, error, refetch } = useGitHubData();
  const [selectedLanguage, setSelectedLanguage] = useState('');
  const [sortBy, setSortBy] = useState<'updated' | 'stars' | 'name'>('updated');

  const { filteredRepos, languages, totalStats } = useMemo(() => {
    // Filter by language
    let filtered = repos.filter(repo => 
      selectedLanguage === '' || repo.language === selectedLanguage
    );

    // Sort repositories
    filtered.sort((a, b) => {
      switch (sortBy) {
        case 'stars':
          return b.stargazers_count - a.stargazers_count;
        case 'name':
          return a.name.localeCompare(b.name);
        case 'updated':
        default:
          return new Date(b.updated_at).getTime() - new Date(a.updated_at).getTime();
      }
    });

    // Get unique languages
    const uniqueLanguages = Array.from(
      new Set(repos.map(repo => repo.language).filter(Boolean))
    ).sort() as string[];

    // Calculate total stats
    const totalStars = repos.reduce((sum, repo) => sum + repo.stargazers_count, 0);
    const totalForks = repos.reduce((sum, repo) => sum + repo.forks_count, 0);

    return {
      filteredRepos: filtered,
      languages: uniqueLanguages,
      totalStats: { totalStars, totalForks }
    };
  }, [repos, selectedLanguage, sortBy]);

  if (error) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 flex items-center justify-center p-4">
        <div className="text-center">
          <div className="text-6xl mb-4">⚠️</div>
          <h2 className="text-2xl font-bold text-red-400 mb-2">Failed to Load GitHub Data</h2>
          <p className="text-gray-400 mb-6">{error}</p>
          <button
            onClick={refetch}
            className="inline-flex items-center gap-2 px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-medium transition-colors duration-200"
          >
            <RefreshCw size={18} />
            Try Again
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 text-white">
      {/* Custom cursor styles */}
      <style jsx global>{`
        * {
          cursor: url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjQiIGhlaWdodD0iMjQiIHZpZXdCb3g9IjAgMCAyNCAyNCIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KPHBhdGggZD0iTTEyIDJDNi40NzcgMiAyIDYuNDc3IDIgMTJDMiAxNy41MjMgNi40NzcgMjIgMTIgMjJDMTcuNTIzIDIyIDIyIDE3LjUyMyAyMiAxMkMyMiA2LjQ3NyAxNy41MjMgMiAxMiAyWk0xNy41IDE1Ljc1TDE2IDEySDEzLjVWMTBIMTZMMTcuNSA2LjI1TDYuNSA4LjI1TDggMTJIMTAuNVYxNEg4TDYuNSAxNy43NUwxNy41IDE1Ljc1WiIgZmlsbD0iIzMzODVmZiIvPgo8L3N2Zz4K'), auto;
        }
        
        a, button {
          cursor: url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjQiIGhlaWdodD0iMjQiIHZpZXdCb3g9IjAgMCAyNCAyNCIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KPHBhdGggZD0iTTEyIDJDNi40NzcgMiAyIDYuNDc3IDIgMTJDMiAxNy41MjMgNi40NzcgMjIgMTIgMjJDMTcuNTIzIDIyIDIyIDE3LjUyMyAyMiAxMkMyMiA2LjQ3NyAxNy41MjMgMiAxMiAyWk0xNy41IDE1Ljc1TDE2IDEySDEzLjVWMTBIMTZMMTcuNSA2LjI1TDYuNSA4LjI1TDggMTJIMTAuNVYxNEg4TDYuNSAxNy43NUwxNy41IDE1Ljc1WiIgZmlsbD0iIzEwYjk4MSIvPgo8L3N2Zz4K'), pointer;
        }
      `}</style>

      <div className="container mx-auto px-4 py-8 max-w-7xl">
        {/* Top Navigation */}
        <nav className="flex items-center justify-between mb-8">
          <div className="flex items-center gap-3">
            <div className="flex items-center gap-2 text-2xl font-bold">
              <Github className="text-blue-400" size={28} />
              <span className="bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
                DevPortfolio
              </span>
            </div>
            <div className="hidden md:flex items-center gap-1 text-sm text-gray-400 font-mono bg-gray-800/50 px-3 py-1 rounded-full border border-gray-700">
              <Terminal size={14} />
              <span>Live Sync Active</span>
              <Zap size={14} className="text-yellow-400 animate-pulse" />
            </div>
          </div>
          
          <button
            onClick={refetch}
            disabled={loading}
            className="inline-flex items-center gap-2 px-4 py-2 bg-gray-800 hover:bg-gray-700 border border-gray-600 rounded-lg font-medium transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed group"
          >
            <RefreshCw size={16} className={`group-hover:rotate-180 transition-transform duration-500 ${loading ? 'animate-spin' : ''}`} />
            <span className="hidden sm:inline">Refresh</span>
          </button>
        </nav>

        {/* Header with User Info */}
        <Header 
          user={user} 
          totalStars={totalStats.totalStars} 
          totalForks={totalStats.totalForks} 
        />

        {/* Main Content */}
        <main className="mt-8 space-y-8">
          {loading && !repos.length ? (
            <LoadingSpinner />
          ) : (
            <>
              {/* Filter Bar */}
              <FilterBar
                languages={languages}
                selectedLanguage={selectedLanguage}
                sortBy={sortBy}
                onLanguageChange={setSelectedLanguage}
                onSortChange={setSortBy}
              />

              {/* Results Summary */}
              <div className="flex items-center justify-between">
                <div className="text-gray-300">
                  <span className="font-mono text-blue-400 text-lg font-bold">
                    {filteredRepos.length}
                  </span>
                  <span className="ml-2">
                    {filteredRepos.length === 1 ? 'repository' : 'repositories'}
                  </span>
                  {selectedLanguage && (
                    <span className="ml-2 text-gray-400">
                      in <span className="text-purple-400 font-mono">{selectedLanguage}</span>
                    </span>
                  )}
                </div>
                
                <div className="text-sm text-gray-400 font-mono">
                  Last updated: {new Date().toLocaleTimeString()}
                </div>
              </div>

              {/* Projects Grid */}
              <ProjectGrid repos={filteredRepos} loading={loading} />
            </>
          )}
        </main>

        {/* Footer */}
        <footer className="mt-16 text-center text-gray-500 text-sm">
          <p className="font-mono">
            Built with ❤️ using React, TypeScript & GitHub API
          </p>
          <p className="mt-2">
            Auto-syncs every 5 minutes • Last sync: {new Date().toLocaleString()}
          </p>
        </footer>
      </div>
    </div>
  );
}

export default App;