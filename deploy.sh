#!/bin/bash

echo "🚀 DEC Tech Website Deployment Script"
echo "======================================"

# Check if git is initialized
if [ ! -d ".git" ]; then
    echo "📁 Initializing Git repository..."
    git init
fi

# Add all files
echo "📦 Adding files to Git..."
git add .

# Create commit
echo "💾 Creating commit..."
git commit -m "Deploy: DEC Tech Solar Solutions Website - Production Ready

✅ Features included:
- Complete responsive website
- Backend integration with Render
- Battery calculator tool
- Product catalog with fallback data
- Contact and consultation forms
- Admin panel for image management
- Comprehensive error handling
- Mobile-optimized design

🔧 Technical stack:
- Next.js 15 with App Router
- TypeScript for type safety
- Tailwind CSS for styling
- shadcn/ui components
- Lucide React icons
- Render backend integration

🌐 Ready for production deployment to Vercel"

echo "✅ Commit created successfully!"
echo ""
echo "🔗 Next steps:"
echo "1. Create a GitHub repository named 'dec-tech-website'"
echo "2. Run: git remote add origin https://github.com/yourusername/dec-tech-website.git"
echo "3. Run: git push -u origin main"
echo "4. Go to vercel.com and import your repository"
echo "5. Set environment variable: NEXT_PUBLIC_API_URL=https://dec-tech.onrender.com"
echo ""
echo "🎉 Your DEC Tech website will be live!"
