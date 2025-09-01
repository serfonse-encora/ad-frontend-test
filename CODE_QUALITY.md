# Code Quality & Linting Setup

This project includes a comprehensive code quality setup for clean, consistent code across the entire codebase.

## 🔧 Tools Installed

### ESLint Configuration

- **ESLint**: JavaScript/TypeScript linting
- **Next.js ESLint config**: Next.js specific rules
- **Import plugin**: Import order and organization
- **Unused imports plugin**: Automatic removal of unused imports
- **Prettier integration**: Code formatting integration

### Prettier Configuration

- **Prettier**: Code formatting and style consistency
- **Prettier ESLint integration**: Seamless integration with ESLint

### Testing Framework

- **Jest**: JavaScript testing framework
- **React Testing Library**: React component testing utilities
- **Jest DOM**: Custom Jest matchers for DOM testing

### Git Hooks

- **Husky**: Git hooks management
- **Lint-staged**: Run linters on git staged files

## 📜 Available Scripts

### Development Scripts

```bash
npm run dev          # Start development server
npm run build        # Build for production
npm run start        # Start production server
```

### Code Quality Scripts

```bash
npm run lint              # Run ESLint
npm run lint:fix          # Run ESLint with auto-fix
npm run lint:strict       # Run ESLint with zero warnings allowed
npm run format            # Format code with Prettier
npm run format:check      # Check if code is formatted
npm run type-check        # Run TypeScript type checking
npm run code-quality      # Run all quality checks
npm run code-quality:fix  # Run all quality fixes
```

### Testing Scripts

```bash
npm test              # Run all tests
npm run test:watch    # Run tests in watch mode
npm run test:coverage # Run tests with coverage report
```

### Pre-commit Script

```bash
npm run pre-commit    # Run quality checks + tests (used by git hooks)
```

## 🎯 ESLint Rules Enforced

### Code Quality Rules

- **No console/debugger**: Warnings for console.log, errors for debugger
- **Prefer modern syntax**: const over var, arrow functions, template literals
- **No unused variables/imports**: Automatic detection and removal
- **Consistent imports**: Organized import order with proper grouping
- **Error prevention**: No eval, no script URLs, no implied eval

### Code Style Rules

- **Consistent formatting**: Handled by Prettier integration
- **Curly braces**: Required for all control structures
- **Equality checks**: Strict equality (===) required
- **Object patterns**: Prefer destructuring and object shorthand

### Import Organization

Imports are automatically organized in this order:

1. Built-in Node.js modules
2. External packages
3. Internal modules
4. Parent directory imports
5. Sibling directory imports
6. Index file imports

## 🎨 Prettier Configuration

### Style Settings

- **Semicolons**: Always required
- **Quotes**: Single quotes for strings, single quotes for JSX
- **Line width**: 80 characters
- **Indentation**: 2 spaces
- **Trailing commas**: ES5 compatible
- **Bracket spacing**: Enabled

## 🔄 Git Hooks (Pre-commit)

Every commit automatically runs:

1. **Lint-staged**: Lints and formats only staged files
2. **Tests**: Runs all tests to ensure nothing is broken

### Pre-commit Process

1. Stages files for commit
2. Runs ESLint with auto-fix on staged JS/TS files
3. Runs Prettier on staged files
4. Runs all tests
5. If any step fails, commit is blocked

## 📁 Configuration Files

### `.eslintrc.json`

Main ESLint configuration with rules for:

- Code quality enforcement
- Import organization
- TypeScript support
- Jest environment support

### `.prettierrc.json`

Prettier configuration for consistent formatting

### `.prettierignore`

Files and directories to exclude from Prettier formatting

### `jest.config.js`

Jest testing framework configuration with Next.js support

### `jest.setup.js`

Jest setup file for testing utilities

### `.husky/pre-commit`

Git pre-commit hook configuration

### `.vscode/settings.json`

VS Code editor settings for optimal development experience

### `.vscode/extensions.json`

Recommended VS Code extensions for the project

## 🚀 Getting Started

1. **Install dependencies**: `npm install`
2. **Run quality check**: `npm run code-quality`
3. **Fix issues automatically**: `npm run code-quality:fix`
4. **Run tests**: `npm test`

## 🎯 VS Code Integration

Install recommended extensions:

- **ESLint**: Real-time linting
- **Prettier**: Code formatting
- **Tailwind CSS IntelliSense**: CSS class suggestions
- **TypeScript**: Enhanced TypeScript support

### Automatic Actions

- **Format on save**: Enabled
- **Fix ESLint issues on save**: Enabled
- **Organize imports on save**: Enabled

## 📝 Best Practices

### Code Writing

1. Always run `npm run code-quality` before committing
2. Use meaningful variable and function names
3. Write tests for new components
4. Keep functions small and focused
5. Use TypeScript types appropriately

### Git Workflow

1. Commit messages should be clear and descriptive
2. Pre-commit hooks will ensure code quality
3. All tests must pass before merging
4. Use feature branches for new features

## 🐛 Troubleshooting

### Common Issues

#### ESLint conflicts

```bash
# Clear ESLint cache
npm run lint -- --cache-location .eslintcache --cache
```

#### Prettier formatting issues

```bash
# Re-format all files
npm run format
```

#### Test failures

```bash
# Run tests in watch mode to debug
npm run test:watch
```

#### Dependency conflicts

```bash
# Install with legacy peer deps
npm install --legacy-peer-deps
```

This setup ensures consistent, high-quality code across the entire project while providing an excellent developer experience!
