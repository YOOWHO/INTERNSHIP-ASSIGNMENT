# React Spreadsheet Assignment

An advanced spreadsheet application built with React 18, TypeScript, and Tailwind CSS. This project demonstrates modern React development practices with a focus on interactive data grid functionality.

## 🚀 Features

- **Interactive Spreadsheet Grid** - Create, edit, and manage data in a familiar spreadsheet interface
- **Real-time Updates** - Instant cell updates
- **Modern React Architecture** - Built with React 18 hooks and TypeScript
- **Responsive Design** - Works across desktop and mobile devices
- **Tailwind CSS Styling** - Clean, modern UI with utility-first CSS

## 🛠 Technologies Used

- **React 18** - Latest React with concurrent features
- **TypeScript** - Type-safe JavaScript development
- **Tailwind CSS** - Utility-first CSS framework
- **Vite** - Fast build tool and development server
- **ESLint & Prettier** - Code linting and formatting

## 📋 Prerequisites

Before running this project, make sure you have:

- Node.js (version 16 or higher)
- npm, yarn, or pnpm package manager
- Git for version control

## 🚀 Getting Started

### 1. Clone the Repository
```bash
git clone https://github.com/YOOWHO/REACT-ASSIGNMENT.git
cd REACT-ASSIGNMENT
```

### 2. Install Dependencies
```bash
npm install
# or
yarn install
# or
pnpm install
```

### 3. Start Development Server
```bash
npm run dev
# or
yarn dev
# or
pnpm dev
```

### 4. Open in Browser
Navigate to `http://localhost:5173` (or the port shown in your terminal)

## 📁 Project Structure

```
src/
├── components/          # React components
│   ├── Spreadsheet/    # Grid and cell components
│   ├── Toolbar/        # Formatting and function toolbars
│   └── common/         # Reusable UI components
├── hooks/              # Custom React hooks
├── utils/              # Utility functions
├── types/              # TypeScript type definitions
├── store/              # State management
└── styles/             # Global styles and CSS
```

## 🔧 Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build
- `npm run lint` - Run ESLint
- `npm run type-check` - Run TypeScript compiler check

## 🎯 Assignment Features

### Core Functionality
- [x] Grid-based spreadsheet interface
- [x] Cell editing and navigation
- [x] Data persistence during session
- [x] Responsive design

### Advanced Features
- [ ] Formula parsing and evaluation (not supported in this version)
- [ ] Cell references (A1, B2, etc.)
- [ ] Mathematical operations (+, -, *, /)
- [ ] Built-in functions (SUM, AVERAGE, COUNT)
- [ ] Error handling for invalid formulas

### Technical Implementation
- [x] TypeScript for type safety
- [x] Custom hooks for state management
- [x] Component composition and reusability
- [x] Modern React patterns (hooks, context)

## 🎨 UI/UX Features

- Clean, modern spreadsheet interface
- Keyboard navigation support
- Cell highlighting and selection
- Toolbar for common operations
- Responsive grid layout

## 🔍 Development Notes

### Key Components
- `Grid.tsx` - Main spreadsheet grid container
- `Cell.tsx` - Individual cell component with editing capabilities
- `useSpreadsheet.ts` - Custom hook for spreadsheet state management

### State Management
The application uses React's built-in state management with custom hooks to handle:
- Cell values
- Selection and navigation

## 🚧 Future Enhancements

- [ ] Formula support and parsing
- [ ] Range selection (A1:B5)
- [ ] More built-in functions (MIN, MAX, IF)
- [ ] Import/Export functionality (CSV, Excel)
- [ ] Charts and data visualization
- [ ] Collaborative editing
- [ ] Undo/Redo functionality

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/new-feature`)
3. Commit changes (`git commit -am 'Add new feature'`)
4. Push to branch (`git push origin feature/new-feature`)
5. Create a Pull Request

## 📝 License

This project is created for educational purposes as part of a React assignment.

## 📧 Contact

**Developer:** YOOWHO  
**Repository:** [https://github.com/YOOWHO/REACT-ASSIGNMENT](https://github.com/YOOWHO/REACT-ASSIGNMENT)

---

Built with ❤️ using React, TypeScript, and Tailwind CSS