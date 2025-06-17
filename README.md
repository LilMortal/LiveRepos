# 🔥 LiveRepos

[![GitHub stars](https://img.shields.io/github/stars/LilMortal/LiveRepos?style=social)](https://github.com/LilMortal/LiveRepos/stargazers)
[![GitHub forks](https://img.shields.io/github/forks/LilMortal/LiveRepos?style=social)](https://github.com/LilMortal/LiveRepos/network)
[![GitHub issues](https://img.shields.io/github/issues/LilMortal/LiveRepos)](https://github.com/LilMortal/LiveRepos/issues)
[![GitHub license](https://img.shields.io/github/license/LilMortal/LiveRepos)](https://github.com/LilMortal/LiveRepos/blob/main/LICENSE)
[![Build Status](https://img.shields.io/github/workflow/status/LilMortal/LiveRepos/CI)](https://github.com/LilMortal/LiveRepos/actions)

**LiveRepos** is a powerful, real-time repository management and monitoring platform that provides developers with live insights into their GitHub repositories. Track repository activities, monitor code changes, analyze contribution patterns, and stay updated with your projects in real-time.

## 🚀 Features

### 📊 **Real-Time Monitoring**
- **Live Activity Feed**: Watch repository activities as they happen
- **Real-Time Notifications**: Get instant alerts for commits, issues, and pull requests
- **Live Statistics**: Dynamic repository metrics and analytics
- **Branch Monitoring**: Track branch activities and merges in real-time

### 📈 **Advanced Analytics**
- **Contribution Insights**: Detailed contributor analysis and patterns
- **Code Quality Metrics**: Track code health and technical debt
- **Performance Tracking**: Monitor repository performance over time
- **Trend Analysis**: Identify development trends and patterns

### 🔧 **Repository Management**
- **Multi-Repository Dashboard**: Manage multiple repositories from one interface
- **Automated Workflows**: Set up custom automation for repository tasks
- **Team Collaboration**: Enhanced collaboration tools for development teams
- **Integration Hub**: Connect with popular development tools and services

### 🎯 **Developer Experience**
- **Intuitive Interface**: Clean, modern UI designed for developers
- **Customizable Dashboards**: Personalize your workspace and views
- **Mobile Responsive**: Access your repositories on any device
- **Dark/Light Mode**: Choose your preferred viewing experience

## 📋 Table of Contents

- [Installation](#installation)
- [Quick Start](#quick-start)
- [Configuration](#configuration)
- [API Reference](#api-reference)
- [Features](#features)
- [Architecture](#architecture)
- [Contributing](#contributing)
- [License](#license)
- [Support](#support)

## 🛠️ Installation

### Prerequisites

Before getting started, ensure you have the following installed:

- **Node.js** (v16.0 or higher)
- **npm** or **yarn** package manager
- **Git** version control system
- **GitHub Personal Access Token** (for API access)

### Method 1: NPM Installation

```bash
# Install globally
npm install -g liverepos

# Or install locally
npm install liverepos
```

### Method 2: Clone from Source

```bash
# Clone the repository
git clone https://github.com/LilMortal/LiveRepos.git
cd LiveRepos

# Install dependencies
npm install

# Build the project
npm run build
```

### Method 3: Docker Installation

```bash
# Pull the Docker image
docker pull lilmortal/liverepos:latest

# Run the container
docker run -p 3000:3000 -e GITHUB_TOKEN=your_token_here lilmortal/liverepos:latest
```

## 🚀 Quick Start

### 1. **Initial Setup**

```bash
# Initialize LiveRepos
liverepos init

# Configure GitHub authentication
liverepos auth --token your_github_token
```

### 2. **Add Your First Repository**

```bash
# Add a repository to monitor
liverepos add-repo username/repository-name

# Or add multiple repositories
liverepos add-repo username/repo1 username/repo2 username/repo3
```

### 3. **Start the Dashboard**

```bash
# Launch the web interface
liverepos start

# Or run in development mode
npm run dev
```

### 4. **Access the Interface**

Open your browser and navigate to:
- **Local**: `http://localhost:3000`
- **Production**: Your configured domain

## ⚙️ Configuration

### Environment Variables

Create a `.env` file in your project root:

```bash
# GitHub Configuration
GITHUB_TOKEN=your_personal_access_token
GITHUB_USERNAME=your_github_username

# Database Configuration
DATABASE_URL=mongodb://localhost:27017/liverepos
REDIS_URL=redis://localhost:6379

# Server Configuration
PORT=3000
NODE_ENV=production
SESSION_SECRET=your_session_secret

# WebSocket Configuration
WEBSOCKET_PORT=3001
ENABLE_REALTIME=true

# Notification Settings
SLACK_WEBHOOK_URL=your_slack_webhook
DISCORD_WEBHOOK_URL=your_discord_webhook
EMAIL_SERVICE_API_KEY=your_email_service_key

# Analytics
GOOGLE_ANALYTICS_ID=your_ga_id
MIXPANEL_TOKEN=your_mixpanel_token
```

### Configuration File

Create a `liverepos.config.js` file:

```javascript
module.exports = {
  // Repository Settings
  repositories: [
    {
      name: 'username/repo-name',
      branch: 'main',
      notifications: true,
      analytics: true
    }
  ],
  
  // Dashboard Settings
  dashboard: {
    theme: 'dark', // 'light' or 'dark'
    refreshInterval: 30000, // 30 seconds
    maxActivities: 100,
    showPrivateRepos: false
  },
  
  // Notification Settings
  notifications: {
    enabled: true,
    channels: ['web', 'email', 'slack'],
    events: ['commits', 'issues', 'pull_requests', 'releases']
  },
  
  // Analytics Settings
  analytics: {
    enabled: true,
    retention: '30d',
    trackingEvents: ['page_views', 'repository_visits', 'user_actions']
  }
};
```

## 📚 API Reference

### Authentication

```javascript
// Initialize the API client
const LiveRepos = require('liverepos');
const client = new LiveRepos({
  token: 'your_github_token',
  baseURL: 'https://api.liverepos.com'
});
```

### Repository Operations

```javascript
// Get repository information
const repo = await client.getRepository('username/repo-name');

// Get real-time activities
const activities = await client.getActivities('username/repo-name', {
  limit: 50,
  since: '2025-01-01T00:00:00Z'
});

// Subscribe to real-time updates
client.subscribe('username/repo-name', (data) => {
  console.log('New activity:', data);
});

// Get repository statistics
const stats = await client.getStatistics('username/repo-name', {
  period: '30d',
  metrics: ['commits', 'contributors', 'issues']
});
```

### WebSocket Events

```javascript
// Connect to WebSocket
const socket = io('ws://localhost:3001');

// Listen for repository events
socket.on('repository:activity', (data) => {
  console.log('New repository activity:', data);
});

socket.on('repository:commit', (data) => {
  console.log('New commit:', data);
});

socket.on('repository:issue', (data) => {
  console.log('New issue:', data);
});

socket.on('repository:pull_request', (data) => {
  console.log('New pull request:', data);
});
```

### REST API Endpoints

```bash
# Get repository list
GET /api/repositories

# Get specific repository
GET /api/repositories/:owner/:repo

# Get repository activities
GET /api/repositories/:owner/:repo/activities

# Get repository statistics
GET /api/repositories/:owner/:repo/stats

# Get contributors
GET /api/repositories/:owner/:repo/contributors

# Get commit history
GET /api/repositories/:owner/:repo/commits

# Get issues
GET /api/repositories/:owner/:repo/issues

# Get pull requests
GET /api/repositories/:owner/:repo/pulls
```

## 🏗️ Architecture

### System Overview

```
┌─────────────────┐    ┌─────────────────┐    ┌─────────────────┐
│   GitHub API    │    │   LiveRepos     │    │   Dashboard     │
│                 │◄──►│   Backend       │◄──►│   Frontend      │
│                 │    │                 │    │                 │
└─────────────────┘    └─────────────────┘    └─────────────────┘
                              │
                              ▼
                       ┌─────────────────┐
                       │   Database      │
                       │   (MongoDB)     │
                       └─────────────────┘
                              │
                              ▼
                       ┌─────────────────┐
                       │   Cache         │
                       │   (Redis)       │
                       └─────────────────┘
```

### Technology Stack

#### Frontend
- **React** - UI library for building user interfaces
- **TypeScript** - Type-safe JavaScript
- **Tailwind CSS** - Utility-first CSS framework
- **Chart.js** - Data visualization library
- **Socket.IO Client** - Real-time communication

#### Backend
- **Node.js** - JavaScript runtime environment
- **Express.js** - Web application framework
- **TypeScript** - Type-safe JavaScript
- **Socket.IO** - Real-time bidirectional communication
- **Bull Queue** - Job queue for background processing

#### Database & Storage
- **MongoDB** - Document-based database
- **Redis** - In-memory data structure store
- **GitHub API** - Repository data source

#### DevOps & Deployment
- **Docker** - Containerization platform
- **GitHub Actions** - CI/CD pipeline
- **PM2** - Process manager for Node.js
- **Nginx** - Web server and reverse proxy

### Project Structure

```
LiveRepos/
├── 📁 src/
│   ├── 📁 components/           # React components
│   │   ├── 📁 common/          # Shared components
│   │   ├── 📁 dashboard/       # Dashboard components
│   │   ├── 📁 repository/      # Repository components
│   │   └── 📁 charts/          # Chart components
│   ├── 📁 pages/               # Application pages
│   ├── 📁 hooks/               # Custom React hooks
│   ├── 📁 services/            # API services
│   ├── 📁 utils/               # Utility functions
│   └── 📁 types/               # TypeScript type definitions
├── 📁 server/
│   ├── 📁 controllers/         # Route controllers
│   ├── 📁 middleware/          # Express middleware
│   ├── 📁 models/              # Database models
│   ├── 📁 routes/              # API routes
│   ├── 📁 services/            # Business logic
│   ├── 📁 utils/               # Server utilities
│   └── 📁 websocket/           # WebSocket handlers
├── 📁 docs/                    # Documentation
├── 📁 tests/                   # Test files
├── 📁 docker/                  # Docker configuration
├── 📁 scripts/                 # Build and deployment scripts
├── 📄 package.json             # Dependencies and scripts
├── 📄 tsconfig.json            # TypeScript configuration
├── 📄 tailwind.config.js       # Tailwind CSS configuration
├── 📄 docker-compose.yml       # Docker Compose configuration
└── 📄 README.md                # This file
```

## 🔧 Development

### Setup Development Environment

```bash
# Clone the repository
git clone https://github.com/LilMortal/LiveRepos.git
cd LiveRepos

# Install dependencies
npm install

# Copy environment variables
cp .env.example .env

# Start development servers
npm run dev:all
```

### Available Scripts

```bash
# Development
npm run dev              # Start development server
npm run dev:client       # Start client development server
npm run dev:server       # Start server development server
npm run dev:all          # Start both client and server

# Building
npm run build            # Build for production
npm run build:client     # Build client only
npm run build:server     # Build server only

# Testing
npm run test             # Run all tests
npm run test:client      # Run client tests
npm run test:server      # Run server tests
npm run test:e2e         # Run end-to-end tests

# Linting and Formatting
npm run lint             # Run ESLint
npm run lint:fix         # Fix ESLint issues
npm run format           # Format code with Prettier

# Database
npm run db:migrate       # Run database migrations
npm run db:seed          # Seed database with sample data
npm run db:reset         # Reset database
```

### Docker Development

```bash
# Build and run with Docker Compose
docker-compose up --build

# Run in detached mode
docker-compose up -d

# View logs
docker-compose logs -f

# Stop services
docker-compose down
```

## 📊 Usage Examples

### Basic Repository Monitoring

```javascript
// Monitor a single repository
const repo = await client.addRepository('facebook/react');

// Set up real-time notifications
repo.on('commit', (commit) => {
  console.log(`New commit by ${commit.author}: ${commit.message}`);
});

repo.on('issue', (issue) => {
  console.log(`New issue: ${issue.title}`);
});
```

### Advanced Analytics

```javascript
// Get comprehensive repository analytics
const analytics = await client.getAnalytics('microsoft/vscode', {
  timeRange: '6m',
  metrics: [
    'commit_frequency',
    'contributor_activity',
    'issue_resolution_time',
    'pull_request_metrics',
    'code_quality_trends'
  ]
});

// Generate custom reports
const report = await client.generateReport('microsoft/vscode', {
  type: 'weekly',
  includeCharts: true,
  exportFormat: 'pdf'
});
```

### Team Collaboration

```javascript
// Set up team dashboard
const team = await client.createTeam('my-dev-team');

// Add team repositories
await team.addRepositories([
  'myorg/frontend-app',
  'myorg/backend-api',
  'myorg/mobile-app'
]);

// Configure team notifications
await team.configureNotifications({
  channels: ['slack', 'email'],
  events: ['critical_issues', 'deployment_failures', 'security_alerts']
});
```

## 🧪 Testing

### Running Tests

```bash
# Run all tests
npm test

# Run tests with coverage
npm run test:coverage

# Run tests in watch mode
npm run test:watch

# Run specific test suite
npm run test -- --grep "Repository"
```

### Test Structure

```
tests/
├── 📁 unit/                    # Unit tests
│   ├── 📁 components/         # Component tests
│   ├── 📁 services/           # Service tests
│   └── 📁 utils/              # Utility tests
├── 📁 integration/            # Integration tests
│   ├── 📁 api/                # API endpoint tests
│   └── 📁 database/           # Database tests
├── 📁 e2e/                    # End-to-end tests
│   ├── 📁 dashboard/          # Dashboard flow tests
│   └── 📁 repository/         # Repository feature tests
└── 📁 fixtures/               # Test data and fixtures
```

## 🚀 Deployment

### Production Deployment

```bash
# Build for production
npm run build

# Start production server
npm start

# Or use PM2 for process management
pm2 start ecosystem.config.js
```

### Docker Deployment

```bash
# Build production image
docker build -t liverepos:latest .

# Run production container
docker run -d \
  --name liverepos \
  -p 80:3000 \
  -e NODE_ENV=production \
  -e GITHUB_TOKEN=your_token \
  liverepos:latest
```

### Environment-Specific Configurations

#### Development
```bash
NODE_ENV=development
DEBUG=liverepos:*
LOG_LEVEL=debug
```

#### Staging
```bash
NODE_ENV=staging
LOG_LEVEL=info
ENABLE_ANALYTICS=false
```

#### Production
```bash
NODE_ENV=production
LOG_LEVEL=error
ENABLE_CLUSTERING=true
REDIS_CLUSTER_MODE=true
```

## 🤝 Contributing

We welcome contributions from the community! Whether it's bug fixes, new features, documentation improvements, or feedback, your contributions help make LiveRepos better for everyone.

### How to Contribute

1. **Fork the Repository**
   ```bash
   git fork https://github.com/LilMortal/LiveRepos.git
   ```

2. **Create a Feature Branch**
   ```bash
   git checkout -b feature/amazing-feature
   ```

3. **Make Your Changes**
   - Write clean, documented code
   - Add tests for new functionality
   - Ensure all tests pass

4. **Commit Your Changes**
   ```bash
   git commit -m "feat: add amazing feature"
   ```

5. **Push to Your Fork**
   ```bash
   git push origin feature/amazing-feature
   ```

6. **Open a Pull Request**
   - Provide a clear description of your changes
   - Reference any related issues
   - Include screenshots for UI changes

### Development Guidelines

#### Code Style
- Follow the existing code style and conventions
- Use TypeScript for type safety
- Write meaningful commit messages using conventional commits
- Keep functions small and focused
- Add JSDoc comments for public APIs

#### Testing Requirements
- Write unit tests for new functions and components
- Add integration tests for API endpoints
- Include end-to-end tests for major features
- Maintain or improve code coverage

#### Documentation
- Update README.md for new features
- Add JSDoc comments for new functions
- Include code examples in documentation
- Update API documentation for endpoint changes

### Issue Reporting

When reporting issues, please include:
- **Environment**: OS, Node.js version, browser
- **Steps to Reproduce**: Clear, numbered steps
- **Expected Behavior**: What should happen
- **Actual Behavior**: What actually happens
- **Screenshots**: If applicable
- **Error Messages**: Full error messages and stack traces

## 📜 License

This project is licensed under the **MIT License** - see the [LICENSE](LICENSE) file for details.

### License Summary
- ✅ **Commercial use** - Use in commercial projects
- ✅ **Modification** - Modify the source code
- ✅ **Distribution** - Distribute the software
- ✅ **Private use** - Use privately
- ❌ **Warranty** - No warranty provided
- ❌ **Liability** - No liability assumed

## 🆘 Support & Help

### Getting Help

- 📖 **Documentation**: Check our [comprehensive docs](https://liverepos.dev/docs)
- 💬 **Discussions**: Join our [GitHub Discussions](https://github.com/LilMortal/LiveRepos/discussions)
- 🐛 **Issues**: Report bugs via [GitHub Issues](https://github.com/LilMortal/LiveRepos/issues)
- 📧 **Email**: Contact us at support@liverepos.dev

### Community

- 🌟 **Star** the repository if you find it helpful
- 👀 **Watch** for updates and new releases
- 🍴 **Fork** to contribute your improvements
- 📢 **Share** with others who might benefit

### Roadmap

#### Q2 2025
- [ ] GitHub Enterprise support
- [ ] Advanced security scanning
- [ ] Custom webhook integrations
- [ ] Mobile app for iOS/Android

#### Q3 2025
- [ ] GitLab and Bitbucket support
- [ ] AI-powered code insights
- [ ] Team productivity analytics
- [ ] Advanced notification rules

#### Q4 2025
- [ ] Multi-cloud deployment options
- [ ] Advanced reporting and exports
- [ ] Plugin ecosystem
- [ ] Enterprise SSO integration

## 🙏 Acknowledgments

Special thanks to:
- **GitHub API** for providing comprehensive repository data
- **Open Source Community** for inspiration and contributions
- **Contributors** who help improve LiveRepos
- **Users** who provide valuable feedback and suggestions

---

<div align="center">

### 🌟 **Stay Connected with Your Repositories** 🌟

**Made with ❤️ by [LilMortal](https://github.com/LilMortal)**

[⭐ Star on GitHub](https://github.com/LilMortal/LiveRepos) • 
[📖 Documentation](https://liverepos.dev) • 
[💬 Community](https://github.com/LilMortal/LiveRepos/discussions) • 
[🐛 Report Bug](https://github.com/LilMortal/LiveRepos/issues)

*Keep your repositories alive and thriving! 🚀*

</div>

---

*Last updated: June 2025*
