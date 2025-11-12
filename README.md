# HumanWallet Example

A modern Web3 application demonstrating the capabilities of HumanWallet with React, Wagmi, and Viem. This monorepo showcases passwordless authentication using passkeys, multi-chain support, staking functionality, and account abstraction features.

## 🚀 Features

- **Passkey Authentication**: Secure, passwordless login using biometric authentication
- **Multi-Chain Support**: Switch between Ethereum, Polygon, and Sepolia networks
- **Staking Demo**: Interactive staking interface with bundle and step-by-step approaches
- **Account Abstraction**: Gasless transactions powered by account abstraction (coming soon)
- **Social Recovery**: Secure wallet recovery through trusted contacts (coming soon)
- **Modern UI**: Built with Tailwind CSS v4 and Radix UI components
- **Type-Safe**: Full TypeScript support throughout the project

## 📦 Project Structure

This is a monorepo managed with `pnpm` and `Turbo`:

```
humanwallet-example/
├── apps/
│   └── react-wagmi/          # Main React application
│       ├── src/
│       │   ├── components/   # UI components
│       │   ├── contracts/    # Smart contract ABIs and addresses
│       │   ├── hooks/        # Custom React hooks
│       │   ├── pages/        # Application pages
│       │   └── wagmi/        # Wagmi configuration
│       └── package.json
├── packages/
│   └── ui/                   # Shared UI component library
│       ├── src/
│       │   └── components/   # Reusable components (buttons, cards, etc.)
│       └── package.json
├── package.json              # Root package.json
├── pnpm-workspace.yaml       # pnpm workspace configuration
├── turbo.json                # Turbo build configuration
└── Makefile                  # Convenient build commands
```

## 📋 Prerequisites

Before you begin, ensure you have the following installed:

- **Node.js**: v18.0.0 or higher
- **pnpm**: v10.20.0 or higher (specified in `packageManager` field)

To install pnpm globally:

```bash
npm install -g pnpm@10.20.0
```

Or use Corepack (recommended):

```bash
corepack enable
corepack prepare pnpm@10.20.0 --activate
```

## 🔧 Installation

1. **Clone the repository**:

```bash
git clone <repository-url>
cd humanwallet-example
```

2. **Install dependencies**:

Using the Makefile:
```bash
make install
```

Or directly with pnpm:
```bash
pnpm install
```

This will install all dependencies for the root, apps, and packages workspaces.

## 🏃‍♂️ Running the Project

### Development Mode

To run the React Wagmi app in development mode:

**Using Makefile** (recommended):
```bash
make dev-react-wagmi
```

**Or directly with pnpm**:
```bash
pnpm --filter react-wagmi run dev
```

The application will start at `http://localhost:5173` (default Vite port).

### Running All Workspaces

To run all workspaces simultaneously:

```bash
make dev
# or
pnpm dev
```

## 🏗️ Building the Project

### Build the React Wagmi App

**Using Makefile**:
```bash
make build-react-wagmi
```

**Or directly with pnpm**:
```bash
pnpm --filter react-wagmi run build
```

### Build All Workspaces

```bash
make build
# or
pnpm build
```

Build output will be in `apps/react-wagmi/dist/`.

### Preview Production Build

After building, you can preview the production build:

```bash
cd apps/react-wagmi
pnpm preview
```

## 🧪 Development Commands

### Linting

Run ESLint across all workspaces:

```bash
make lint
# or
pnpm lint
```

### Type Checking

Run TypeScript type checking:

```bash
make typecheck
# or
pnpm typecheck
```

### Formatting

Format code with Prettier:

```bash
make format
# or
pnpm format
```

### Cleaning

Clean build artifacts:

```bash
make clean
```

Clean dependencies and build artifacts:

```bash
make clean-deps
```

Fresh install (clean + install):

```bash
make fresh-install
```

## 🌐 Available Pages

Once the application is running, you can access:

- **Home** (`/`): Landing page with feature overview
- **Staking Demo** (`/staking-demo`): Interactive staking interface
- **Multi-Chain** (`/multi-chain`): Network switching and cross-chain management
- **Passkey Authentication** (`/passkey-authentication`): Biometric authentication demo

## 🛠️ Technology Stack

### Frontend
- **React 19**: UI framework
- **React Router 7**: Client-side routing
- **Vite 7**: Build tool and dev server
- **Tailwind CSS 4**: Utility-first CSS framework
- **TypeScript 5**: Type safety

### Web3
- **Wagmi 2**: React hooks for Ethereum
- **Viem 2**: TypeScript interface for Ethereum
- **@humanwallet/connector**: HumanWallet integration
- **@tanstack/react-query**: Async state management

### UI Components
- **Radix UI**: Accessible component primitives
- **Lucide React**: Icon library
- **Sonner**: Toast notifications

### Build Tools
- **Turbo**: Monorepo build system
- **pnpm**: Fast, disk space efficient package manager
- **ESLint**: Code linting
- **Prettier**: Code formatting

## 📚 Key Dependencies

- `@humanwallet/connector` (^1.3.13): HumanWallet integration
- `wagmi` (^2.17.0): React hooks for Web3
- `viem` (^2.37.6): Ethereum library
- `react` (^19.1.1): UI framework
- `@tailwindcss/vite` (^4.1.12): Tailwind CSS v4 with Vite

## 🔍 Smart Contract Integration

The project includes smart contract interactions for:

- **Staking**: Token staking functionality
- **ERC-20 Tokens**: Token approvals and transfers

Contract ABIs are located in `apps/react-wagmi/src/contracts/abis/`.

## 🎨 UI Components

The shared UI library (`@examples/ui`) includes:

- Buttons, Cards, Dialogs
- Forms and Inputs
- Navigation components
- Data display components (Tables, Charts)
- Feedback components (Alerts, Toasts)
- And more...

## 🐛 Troubleshooting

### Port Already in Use

If port 5173 is already in use, you can specify a different port:

```bash
cd apps/react-wagmi
pnpm dev -- --port 3000
```

### Build Errors

If you encounter build errors, try a fresh install:

```bash
make fresh-install
```

### Type Errors

Make sure all workspaces are built:

```bash
make build
```

## 📝 Environment Variables

The project uses Vite's environment variable system. Create a `.env` file in `apps/react-wagmi/` if needed:

```env
# Example environment variables
VITE_WALLET_CONNECT_PROJECT_ID=your_project_id
```

## 🤝 Contributing

1. Fork the repository
2. Create your feature branch: `git checkout -b feat/amazing-feature`
3. Commit your changes: `git commit -m 'feat: add amazing feature'`
4. Push to the branch: `git push origin feat/amazing-feature`
5. Open a Pull Request

## 📄 License

This project is licensed under the ISC License.

## 🔗 Resources

- [HumanWallet Documentation](https://docs.humanwallet.com)
- [Wagmi Documentation](https://wagmi.sh)
- [Viem Documentation](https://viem.sh)
- [React Router Documentation](https://reactrouter.com)
- [Tailwind CSS v4 Documentation](https://tailwindcss.com)


