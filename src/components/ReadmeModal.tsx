import React, { useState, useEffect } from 'react';
import { X, FileText, Loader2, AlertCircle } from 'lucide-react';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';

interface ReadmeModalProps {
  isOpen: boolean;
  onClose: () => void;
  repoName: string;
  repoOwner: string;
  defaultBranch: string;
}

const ReadmeModal: React.FC<ReadmeModalProps> = ({
  isOpen,
  onClose,
  repoName,
  repoOwner,
  defaultBranch,
}) => {
  const [readmeContent, setReadmeContent] = useState<string>('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (isOpen && repoName && repoOwner) {
      fetchReadme();
    }
  }, [isOpen, repoName, repoOwner, defaultBranch]);

  const fetchReadme = async () => {
    setLoading(true);
    setError(null);
    
    try {
      // Try different README file names
      const readmeFiles = ['README.md', 'readme.md', 'Readme.md', 'README.MD'];
      let content = '';
      
      for (const filename of readmeFiles) {
        try {
          const response = await fetch(
            `https://api.github.com/repos/${repoOwner}/${repoName}/contents/${filename}`
          );
          
          if (response.ok) {
            const data = await response.json();
            if (data.content) {
              content = atob(data.content);
              break;
            }
          }
        } catch (err) {
          // Continue to next filename
          continue;
        }
      }
      
      if (!content) {
        throw new Error('README file not found');
      }
      
      setReadmeContent(content);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to fetch README');
    } finally {
      setLoading(false);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm">
      <div className="relative w-full max-w-4xl max-h-[90vh] bg-gray-900 rounded-xl border border-gray-700 shadow-2xl overflow-hidden">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-gray-700 bg-gray-800/50">
          <div className="flex items-center gap-3">
            <FileText className="text-blue-400" size={24} />
            <div>
              <h2 className="text-xl font-bold text-white font-mono">
                {repoOwner}/{repoName}
              </h2>
              <p className="text-gray-400 text-sm">README.md</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-2 text-gray-400 hover:text-white hover:bg-gray-700 rounded-lg transition-colors"
          >
            <X size={20} />
          </button>
        </div>

        {/* Content */}
        <div className="overflow-y-auto max-h-[calc(90vh-120px)]">
          {loading ? (
            <div className="flex items-center justify-center py-16">
              <div className="flex items-center gap-3 text-gray-400">
                <Loader2 className="animate-spin" size={20} />
                <span>Loading README...</span>
              </div>
            </div>
          ) : error ? (
            <div className="flex flex-col items-center justify-center py-16 text-center">
              <AlertCircle className="text-red-400 mb-4" size={48} />
              <h3 className="text-lg font-semibold text-red-400 mb-2">
                Failed to Load README
              </h3>
              <p className="text-gray-400 mb-4">{error}</p>
              <button
                onClick={fetchReadme}
                className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors"
              >
                Try Again
              </button>
            </div>
          ) : (
            <div className="p-6">
              <div className="prose prose-invert prose-blue max-w-none">
                <ReactMarkdown
                  remarkPlugins={[remarkGfm]}
                  components={{
                    // Custom components for better styling
                    h1: ({ children }) => (
                      <h1 className="text-3xl font-bold text-white mb-6 pb-3 border-b border-gray-700">
                        {children}
                      </h1>
                    ),
                    h2: ({ children }) => (
                      <h2 className="text-2xl font-bold text-white mt-8 mb-4 pb-2 border-b border-gray-700">
                        {children}
                      </h2>
                    ),
                    h3: ({ children }) => (
                      <h3 className="text-xl font-bold text-white mt-6 mb-3">
                        {children}
                      </h3>
                    ),
                    p: ({ children }) => (
                      <p className="text-gray-300 mb-4 leading-relaxed">
                        {children}
                      </p>
                    ),
                    code: ({ inline, children }) =>
                      inline ? (
                        <code className="bg-gray-800 text-blue-400 px-2 py-1 rounded text-sm font-mono">
                          {children}
                        </code>
                      ) : (
                        <code className="block bg-gray-800 text-gray-300 p-4 rounded-lg overflow-x-auto font-mono text-sm">
                          {children}
                        </code>
                      ),
                    pre: ({ children }) => (
                      <pre className="bg-gray-800 border border-gray-700 rounded-lg overflow-x-auto mb-4">
                        {children}
                      </pre>
                    ),
                    a: ({ href, children }) => (
                      <a
                        href={href}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-blue-400 hover:text-blue-300 underline transition-colors"
                      >
                        {children}
                      </a>
                    ),
                    ul: ({ children }) => (
                      <ul className="list-disc list-inside text-gray-300 mb-4 space-y-1">
                        {children}
                      </ul>
                    ),
                    ol: ({ children }) => (
                      <ol className="list-decimal list-inside text-gray-300 mb-4 space-y-1">
                        {children}
                      </ol>
                    ),
                    li: ({ children }) => (
                      <li className="text-gray-300">{children}</li>
                    ),
                    blockquote: ({ children }) => (
                      <blockquote className="border-l-4 border-blue-500 pl-4 italic text-gray-400 mb-4">
                        {children}
                      </blockquote>
                    ),
                    table: ({ children }) => (
                      <div className="overflow-x-auto mb-4">
                        <table className="min-w-full border border-gray-700 rounded-lg">
                          {children}
                        </table>
                      </div>
                    ),
                    th: ({ children }) => (
                      <th className="border border-gray-700 px-4 py-2 bg-gray-800 text-white font-semibold text-left">
                        {children}
                      </th>
                    ),
                    td: ({ children }) => (
                      <td className="border border-gray-700 px-4 py-2 text-gray-300">
                        {children}
                      </td>
                    ),
                  }}
                >
                  {readmeContent}
                </ReactMarkdown>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ReadmeModal;