import React from 'react';
import { User as GitUser, Star, GitFork, Users, MapPin, Link as LinkIcon } from 'lucide-react';
import { GitHubUser } from '../types/github';

interface HeaderProps {
  user: GitHubUser | null;
  totalStars: number;
  totalForks: number;
}

const Header: React.FC<HeaderProps> = ({ user, totalStars, totalForks }) => {
  if (!user) return null;

  const formatDate = (dateString: string) => {
    return new Date(dateString).getFullYear();
  };

  return (
    <header className="relative overflow-hidden bg-gradient-to-r from-gray-900 via-gray-800 to-gray-900 p-8 rounded-2xl border border-gray-700 shadow-2xl">
      <div className="absolute inset-0 bg-gradient-to-r from-blue-500/10 via-purple-500/10 to-teal-500/10"></div>
      
      <div className="relative z-10 flex flex-col md:flex-row items-center gap-6">
        <div className="relative">
          <img
            src={user.avatar_url}
            alt={user.name || user.login}
            className="w-24 h-24 rounded-full border-4 border-gradient-to-r from-blue-400 to-teal-400 shadow-lg"
          />
          <div className="absolute -bottom-2 -right-2 bg-green-500 w-6 h-6 rounded-full border-2 border-gray-900 animate-pulse"></div>
        </div>
        
        <div className="flex-1 text-center md:text-left">
          <h1 className="text-4xl font-bold bg-gradient-to-r from-blue-400 via-purple-400 to-teal-400 bg-clip-text text-transparent">
            {user.name || user.login}
          </h1>
          <p className="text-gray-300 text-lg mt-2 font-mono">@{user.login}</p>
          {user.bio && (
            <p className="text-gray-400 mt-2 max-w-2xl">{user.bio}</p>
          )}
          
          <div className="flex flex-wrap items-center gap-4 mt-4 text-sm text-gray-400">
            {user.location && (
              <div className="flex items-center gap-1">
                <MapPin size={16} />
                <span>{user.location}</span>
              </div>
            )}
            {user.company && (
              <div className="flex items-center gap-1">
                <GitUser size={16} />
                <span>{user.company}</span>
              </div>
            )}
            {user.blog && (
              <a
                href={user.blog.startsWith('http') ? user.blog : `https://${user.blog}`}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-1 hover:text-blue-400 transition-colors"
              >
                <LinkIcon size={16} />
                <span>Website</span>
              </a>
            )}
            <div className="flex items-center gap-1">
              <span>Coding since {formatDate(user.created_at)}</span>
            </div>
          </div>
        </div>
        
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-center">
          <div className="bg-gray-800/50 p-4 rounded-lg border border-gray-700">
            <div className="text-2xl font-bold text-blue-400 font-mono">{user.public_repos}</div>
            <div className="text-xs text-gray-400 mt-1">Repositories</div>
          </div>
          <div className="bg-gray-800/50 p-4 rounded-lg border border-gray-700">
            <div className="text-2xl font-bold text-yellow-400 font-mono">{totalStars}</div>
            <div className="text-xs text-gray-400 mt-1">Total Stars</div>
          </div>
          <div className="bg-gray-800/50 p-4 rounded-lg border border-gray-700">
            <div className="text-2xl font-bold text-purple-400 font-mono">{totalForks}</div>
            <div className="text-xs text-gray-400 mt-1">Total Forks</div>
          </div>
          <div className="bg-gray-800/50 p-4 rounded-lg border border-gray-700">
            <div className="text-2xl font-bold text-green-400 font-mono">{user.followers}</div>
            <div className="text-xs text-gray-400 mt-1">Followers</div>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;