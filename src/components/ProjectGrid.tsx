import React from 'react';
import { GitHubRepo } from '../types/github';
import ProjectCard from './ProjectCard';

interface ProjectGridProps {
  repos: GitHubRepo[];
  loading: boolean;
}

const ProjectGrid: React.FC<ProjectGridProps> = ({ repos, loading }) => {
  if (loading) {
    return (
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
        {Array.from({ length: 6 }).map((_, index) => (
          <div
            key={index}
            className="bg-gray-800/30 p-6 rounded-xl border border-gray-700 animate-pulse"
          >
            <div className="flex items-start justify-between mb-3">
              <div className="flex-1">
                <div className="h-6 bg-gray-700 rounded-md mb-2"></div>
                <div className="h-4 bg-gray-700 rounded-md w-3/4"></div>
              </div>
              <div className="flex gap-2 ml-4">
                <div className="w-8 h-8 bg-gray-700 rounded-lg"></div>
                <div className="w-8 h-8 bg-gray-700 rounded-lg"></div>
              </div>
            </div>
            <div className="flex gap-2 mb-4">
              <div className="h-6 bg-gray-700 rounded-md w-16"></div>
              <div className="h-6 bg-gray-700 rounded-md w-20"></div>
            </div>
            <div className="flex items-center justify-between pt-4 border-t border-gray-700">
              <div className="flex items-center gap-4">
                <div className="h-4 bg-gray-700 rounded-md w-16"></div>
                <div className="h-4 bg-gray-700 rounded-md w-8"></div>
                <div className="h-4 bg-gray-700 rounded-md w-8"></div>
              </div>
              <div className="h-4 bg-gray-700 rounded-md w-24"></div>
            </div>
          </div>
        ))}
      </div>
    );
  }

  if (repos.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-16 text-center">
        <div className="text-6xl mb-4">🚀</div>
        <h3 className="text-xl font-bold text-gray-300 mb-2">No repositories found</h3>
        <p className="text-gray-500">
          No repositories match your current filters. Try adjusting your search criteria.
        </p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
      {repos.map((repo) => (
        <ProjectCard key={repo.id} repo={repo} />
      ))}
    </div>
  );
};

export default ProjectGrid;