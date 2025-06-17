import React, { useState } from 'react';
import { Star, GitFork, ExternalLink, Calendar, Code, Globe, FileText } from 'lucide-react';
import { GitHubRepo } from '../types/github';
import ReadmeModal from './ReadmeModal';

interface ProjectCardProps {
  repo: GitHubRepo;
}

const ProjectCard: React.FC<ProjectCardProps> = ({ repo }) => {
  const [showReadme, setShowReadme] = useState(false);

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric',
    });
  };

  const getLanguageColor = (language: string | null) => {
    const colors: { [key: string]: string } = {
      JavaScript: '#f1e05a',
      TypeScript: '#2b7489',
      Python: '#3572A5',
      Java: '#b07219',
      'C++': '#f34b7d',
      C: '#555555',
      'C#': '#239120',
      PHP: '#4F5D95',
      Ruby: '#701516',
      Go: '#00ADD8',
      Rust: '#dea584',
      Swift: '#ffac45',
      Kotlin: '#F18E33',
      Dart: '#00B4AB',
      HTML: '#e34c26',
      CSS: '#1572B6',
      Shell: '#89e051',
      Vue: '#2c3e50',
      React: '#61dafb',
    };
    return colors[language || ''] || '#8b5cf6';
  };

  return (
    <>
      <div className="group relative bg-gradient-to-br from-gray-800/50 to-gray-900/50 p-6 rounded-xl border border-gray-700 hover:border-blue-500/50 transition-all duration-300 hover:shadow-2xl hover:shadow-blue-500/10 backdrop-blur-sm">
        <div className="absolute inset-0 bg-gradient-to-br from-blue-500/5 to-purple-500/5 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
        
        <div className="relative z-10">
          <div className="flex items-start justify-between mb-3">
            <div className="flex-1">
              <h3 className="text-xl font-bold text-white group-hover:text-blue-400 transition-colors duration-200 font-mono">
                {repo.name}
              </h3>
              {repo.description && (
                <p className="text-gray-400 text-sm mt-2 line-clamp-2 leading-relaxed">
                  {repo.description}
                </p>
              )}
            </div>
            
            <div className="flex gap-2 ml-4">
              <button
                onClick={() => setShowReadme(true)}
                className="p-2 bg-gray-700 rounded-lg hover:bg-purple-600 transition-colors duration-200 group"
                title="View README"
              >
                <FileText size={16} className="text-gray-300 group-hover:text-white" />
              </button>
              <a
                href={repo.html_url}
                target="_blank"
                rel="noopener noreferrer"
                className="p-2 bg-gray-700 rounded-lg hover:bg-blue-600 transition-colors duration-200 group"
                title="View Repository"
              >
                <ExternalLink size={16} className="text-gray-300 group-hover:text-white" />
              </a>
              {repo.homepage && (
                <a
                  href={repo.homepage}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-2 bg-gray-700 rounded-lg hover:bg-green-600 transition-colors duration-200 group"
                  title="Live Demo"
                >
                  <Globe size={16} className="text-gray-300 group-hover:text-white" />
                </a>
              )}
            </div>
          </div>
          
          <div className="flex flex-wrap gap-2 mb-4">
            {repo.topics.slice(0, 3).map((topic) => (
              <span
                key={topic}
                className="px-2 py-1 bg-gray-700/50 text-gray-300 text-xs rounded-md border border-gray-600"
              >
                {topic}
              </span>
            ))}
            {repo.topics.length > 3 && (
              <span className="px-2 py-1 bg-gray-700/50 text-gray-400 text-xs rounded-md border border-gray-600">
                +{repo.topics.length - 3} more
              </span>
            )}
          </div>
          
          <div className="flex items-center justify-between pt-4 border-t border-gray-700">
            <div className="flex items-center gap-4 text-sm text-gray-400">
              {repo.language && (
                <div className="flex items-center gap-2">
                  <div
                    className="w-3 h-3 rounded-full"
                    style={{ backgroundColor: getLanguageColor(repo.language) }}
                  ></div>
                  <span className="font-mono">{repo.language}</span>
                </div>
              )}
              
              <div className="flex items-center gap-1">
                <Star size={14} />
                <span className="font-mono">{repo.stargazers_count}</span>
              </div>
              
              <div className="flex items-center gap-1">
                <GitFork size={14} />
                <span className="font-mono">{repo.forks_count}</span>
              </div>
            </div>
            
            <div className="flex items-center gap-1 text-xs text-gray-500">
              <Calendar size={12} />
              <span>Updated {formatDate(repo.updated_at)}</span>
            </div>
          </div>
        </div>
      </div>

      <ReadmeModal
        isOpen={showReadme}
        onClose={() => setShowReadme(false)}
        repoName={repo.name}
        repoOwner={repo.full_name.split('/')[0]}
        defaultBranch={repo.default_branch}
      />
    </>
  );
};

export default ProjectCard;