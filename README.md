# PredictBase Frontend Clone

A complete frontend clone of PredictBase.app - a decentralized prediction markets platform. This project recreates the original website's design, functionality, and user experience using modern web technologies.

## 🚀 Features

- **Responsive Design**: Fully responsive layout that works on desktop, tablet, and mobile devices
- **Interactive Market Cards**: Hover effects, betting buttons, and progress bars
- **Advanced Filtering**: Filter markets by status (Trending, New, Ending Soon, etc.) and categories (Sports, Crypto, Politics, etc.)
- **Real-time Search**: Search functionality to find specific markets
- **Volume Filtering**: Slider to filter markets by volume range
- **Recent Activity**: Display recent bets, claims, and market activities
- **Platform Statistics**: Comprehensive stats with interactive tabs
- **Dark Theme**: Modern dark theme matching the original design
- **Smooth Animations**: Hover effects, transitions, and micro-interactions

## 🛠 Technology Stack

- **React 18**: Modern React with hooks and functional components
- **Vite**: Fast build tool and development server
- **Tailwind CSS**: Utility-first CSS framework for styling
- **Shadcn/UI**: High-quality UI components
- **Lucide Icons**: Beautiful icon library
- **Framer Motion**: Animation library (available for future enhancements)

## 📦 Installation

1. Clone the repository:
```bash
git clone <repository-url>
cd predictbase-clone
```

2. Install dependencies:
```bash
npm install
```

3. Start the development server:
```bash
npm run dev
```

4. Open your browser and navigate to `http://localhost:5173`

## 🏗 Build for Production

To build the project for production:

```bash
npm run build
```

The built files will be in the `dist` directory.

## 📁 Project Structure

```
src/
├── components/           # React components
│   ├── ui/              # Shadcn/UI components
│   ├── Header.jsx       # Navigation header
│   ├── FilterTabs.jsx   # Filter and category tabs
│   ├── MarketCard.jsx   # Individual market card
│   ├── SearchBar.jsx    # Search functionality
│   ├── RecentActivity.jsx # Recent bets, claims, markets
│   └── PlatformStats.jsx # Platform statistics
├── data/
│   └── mockData.js      # Mock market data
├── assets/              # Static assets (images, icons)
├── App.jsx             # Main application component
├── App.css             # Custom styles and theme
└── main.jsx            # Application entry point
```

## 🎨 Design Features

### Color Scheme
- **Background**: Dark blue/black gradient (#1a1a2e to #16213e)
- **Cards**: Semi-transparent dark cards with blur effects
- **Accents**: Blue (#3b82f6), Green (#10b981), Red (#ef4444)
- **Text**: White and light gray for contrast

### Interactive Elements
- **Market Cards**: Hover animations with transform and glow effects
- **Buttons**: Gradient backgrounds with hover states
- **Progress Bars**: Animated progress indicators for predictions
- **Filters**: Active state styling with smooth transitions

### Responsive Design
- **Mobile-first**: Optimized for mobile devices
- **Flexible Grid**: Responsive grid layout for market cards
- **Adaptive Navigation**: Collapsible navigation for smaller screens

## 🔧 Customization

### Adding New Markets
Edit `src/data/mockData.js` to add new market data:

```javascript
{
  id: 16,
  title: "Your Market Title",
  category: "crypto", // sports, crypto, politics, etc.
  volume: 1000.00,
  timeRemaining: "30 days",
  status: "trending", // trending, new, ending-soon, resolved
  icon: "🚀",
  options: [
    { name: "Yes", odds: 2.5, percentage: 40.0 },
    { name: "No", odds: 1.67, percentage: 60.0 }
  ]
}
```

### Styling Modifications
- **Global styles**: Edit `src/App.css`
- **Component styles**: Use Tailwind classes in component files
- **Theme colors**: Modify CSS custom properties in `App.css`

## 📱 Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📄 License

This project is for educational and demonstration purposes. The original PredictBase design and branding belong to their respective owners.

## 🙏 Acknowledgments

- Original design inspiration from [PredictBase.app](https://predictbase.app)
- UI components from [Shadcn/UI](https://ui.shadcn.com)
- Icons from [Lucide](https://lucide.dev)
- Built with [Vite](https://vitejs.dev) and [React](https://reactjs.org)

