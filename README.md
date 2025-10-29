# WhizClub - Learning Platform for Government Jobs

WhizClub is a modern platform designed to help learners prepare for government jobs, especially AP Police exams. Built with cutting-edge web technology, it provides comprehensive study materials, previous year papers, and exam analysis.

## 🚀 Features

### Core Features
- **Comprehensive Learning Paths**: Career-focused learning paths designed for government job preparation
- **Previous Year Papers**: Access to previous year exam papers and questions
- **Cutoff Analysis**: Detailed cutoff marks analysis for various exams
- **Performance Analytics**: Track your progress and performance
- **Study Materials**: Curated content for exam preparation
- **Course Resources**: Comprehensive resources for AP Police Constable and Sub-Inspector exams

### Modern Technology Stack
- **Next.js 14**: Latest React framework with App Router
- **TypeScript**: Type-safe development
- **Tailwind CSS**: Utility-first styling with custom design system
- **Prisma**: Modern database ORM with PostgreSQL
- **Framer Motion**: Smooth animations and transitions

## 🛠️ Technology Stack

### Frontend
- **Framework**: Next.js 14 with App Router
- **Language**: TypeScript
- **Styling**: Tailwind CSS with custom components
- **Animations**: Framer Motion
- **UI Components**: Custom component library
- **State Management**: Zustand
- **Forms**: React Hook Form with Zod validation

### Backend
- **Runtime**: Node.js
- **Database**: PostgreSQL with Prisma ORM
- **API**: Next.js API Routes

### DevOps & Deployment
- **Package Manager**: npm
- **Linting**: ESLint with TypeScript support
- **Formatting**: Prettier
- **Version Control**: Git
- **Deployment**: Self-hosted VPS
- **Monitoring**: Custom analytics

## 🚀 Getting Started

### Prerequisites
- Node.js 18+ 
- PostgreSQL database

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/whizclub/whiz-git.git
   cd whizclub
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Set up environment variables**
   ```bash
   cp env.example .env.local
   ```
   
   Fill in your environment variables:
   ```env
   # Database
   DATABASE_URL="postgresql://username:password@localhost:5432/whiz_club"
   ```

4. **Set up the database**
   ```bash
   npx prisma generate
   npx prisma db push
   ```

5. **Run the development server**
   ```bash
   npm run dev
   ```

6. **Open your browser**
   Navigate to [http://localhost:3000](http://localhost:3000)

## 📱 PWA Features

WhizClub is a Progressive Web App with the following features:

- **Offline Support**: Study materials and mock tests available offline
- **Install Prompt**: Install the app on your device for native-like experience
- **Push Notifications**: Get notified about exam updates and study reminders
- **Background Sync**: Sync progress across devices
- **Fast Loading**: Optimized performance with service workers

## 🎯 Supported Exams

- **AP Police Constable**: Complete preparation materials and previous year papers
- **AP Sub-Inspector**: Comprehensive study resources and exam analysis
- **Cutoff Analysis**: Detailed cutoff marks for various police exams

## 🏗️ Project Structure

```
whizclub/
├── src/
│   ├── app/                    # Next.js 14 App Router
│   │   ├── api/               # API routes
│   │   ├── auth/              # Authentication pages
│   │   ├── dashboard/         # Dashboard pages
│   │   └── globals.css        # Global styles
│   ├── components/            # React components
│   │   ├── ui/                # Reusable UI components
│   │   ├── layout/            # Layout components
│   │   └── landing/           # Landing page components
│   ├── lib/                   # Utility functions
│   └── types/                 # TypeScript type definitions
├── prisma/                    # Database schema and migrations
├── public/                    # Static assets
├── package.json               # Dependencies and scripts
├── tailwind.config.js         # Tailwind configuration
├── next.config.js             # Next.js configuration
└── tsconfig.json              # TypeScript configuration
```

## 🧪 Testing

```bash
# Run tests
npm run test

# Run tests in watch mode
npm run test:watch

# Run tests with coverage
npm run test:coverage
```

## 📦 Deployment

### VPS Deployment (Self-Hosted)

For complete deployment instructions, see:
- **HOSTINGER_VPS_COMPLETE_DEPLOYMENT.md** - Full deployment guide
- **HOSTINGER_ALMALINUX_QUICK_START.md** - Quick reference

**Quick Steps:**
1. SSH into your VPS server
2. Clone repository: `git clone https://github.com/whizclub/whiz-git.git`
3. Setup PostgreSQL database
4. Configure environment variables
5. Build and start with PM2

```bash
# Build the application
npm run build

# Start production server
npm start
```

## 🤝 Contributing

We welcome contributions! Please see our [Contributing Guidelines](CONTRIBUTING.md) for details.

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🆘 Support

- **Documentation**: See `HOSTINGER_VPS_COMPLETE_DEPLOYMENT.md` for deployment guide
- **Repository**: https://github.com/whizclub/whiz-git.git
- **Issues**: [GitHub Issues](https://github.com/whizclub/whiz-git/issues)

## 🙏 Acknowledgments

- Next.js team for the amazing framework
- Tailwind CSS for the utility-first CSS framework
- All contributors and beta testers

## 📊 Roadmap

- [ ] Mobile app (React Native)
- [ ] Video-based learning
- [ ] Live classes integration
- [ ] Multi-language support
- [ ] Advanced analytics dashboard

---

Made with ❤️ by the WhizClub Team
