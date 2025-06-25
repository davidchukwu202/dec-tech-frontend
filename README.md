# DEC Tech Solar Solutions Website

A modern, responsive website for DEC Tech Solar Solutions built with Next.js 15, TypeScript, and Tailwind CSS.

![DEC Tech Logo](./public/images/dec-tech-logo.png)

## 🌟 Features

- 🌟 Modern, responsive design
- ⚡ Fast performance with Next.js 15
- 🎨 Beautiful UI with Tailwind CSS and shadcn/ui
- 📱 Mobile-first responsive design
- 🔧 Battery calculator tool
- 📞 Contact forms with backend integration
- 🛍️ Product catalog
- 📋 Consultation booking system

## 🏗️ Tech Stack

- **Framework**: Next.js 15 (App Router)
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **UI Components**: shadcn/ui
- **Icons**: Lucide React
- **Backend**: Render (https://dec-tech.onrender.com)
- **Deployment**: Vercel

## 🚀 Quick Start

### Prerequisites
- Node.js 18+ 
- npm or yarn

### Installation

1. **Clone the repository:**
\`\`\`bash
git clone https://github.com/yourusername/dec-tech-website.git
cd dec-tech-website
\`\`\`

2. **Install dependencies:**
\`\`\`bash
npm install
\`\`\`

3. **Set up environment variables:**
\`\`\`bash
# Backend API URL - Your Render Backend
NEXT_PUBLIC_API_URL=https://dec-tech.onrender.com
\`\`\`

4. **Update your backend URL in `.env.local`:**
\`\`\`bash
NEXT_PUBLIC_API_URL=https://your-render-backend.onrender.com
\`\`\`

5. **Run the development server:**
\`\`\`bash
npm run dev
\`\`\`

6. **Open [http://localhost:3000](http://localhost:3000)** to view the website.

## 🧪 Testing Backend Connection

### Test your Render backend:
\`\`\`bash
npm run test:backend
\`\`\`

### Upload images to backend:
\`\`\`bash
npm run upload:images
\`\`\`

## 📁 Project Structure

\`\`\`
dec-tech-website/
├── app/                    # Next.js App Router
│   ├── about/             # About page
│   ├── admin/             # Admin panel
│   ├── calculator/        # Battery calculator
│   ├── contact/           # Contact page
│   ├── consultation/      # Consultation booking
│   ├── products/          # Products catalog
│   ├── globals.css        # Global styles
│   ├── layout.tsx         # Root layout
│   └── page.tsx           # Home page
├── components/            # React components
│   ├── ui/               # shadcn/ui components
│   ├── about.tsx         # About page component
│   ├── calculator.tsx    # Calculator component
│   ├── contact.tsx       # Contact form
│   ├── consultation.tsx  # Consultation form
│   ├── home.tsx          # Homepage component
│   ├── image-manager.tsx # Image upload manager
│   ├── layout.tsx        # Site layout
│   └── products.tsx      # Products component
├── public/               # Static assets
│   ├── images/          # Company images
│   └── favicon.ico      # Site favicon
├── scripts/              # Utility scripts
│   ├── test-backend-connection.js
│   └── upload-images-to-backend.js
├── .env.example          # Environment variables template
├── .env.local           # Local environment (not in git)
├── tailwind.config.js   # Tailwind configuration
└── README.md            # This file
\`\`\`

## 🔌 Backend API Integration

The website is designed to work with a backend API. Expected endpoints:

### Products API
- `GET /api/products` - Fetch all products
- Response format:
\`\`\`json
[
  {
    "id": 1,
    "name": "Product Name",
    "voltage": "12/24/48V",
    "category": "Solar Panels",
    "description": "Product description",
    "image": "image_url",
    "features": ["feature1", "feature2"]
  }
]
\`\`\`

### Contact API
- `POST /api/contact` - Submit contact form
- Request format:
\`\`\`json
{
  "name": "John Doe",
  "email": "john@example.com",
  "phone": "+1234567890",
  "subject": "Solar Installation",
  "message": "Message content",
  "type": "general_contact" | "product_inquiry"
}
\`\`\`

### Consultation API
- `POST /api/consultation` - Submit consultation request
- Request format:
\`\`\`json
{
  "name": "John Doe",
  "phone": "+1234567890",
  "location": "City, State",
  "notes": "Project requirements"
}
\`\`\`

### Image Upload API
- `POST /api/upload/image` - Upload product images

## 🎨 Pages Overview

### 🏠 **Home Page** (`/`)
- Hero section with call-to-action
- Quick battery calculator
- Product showcase
- Customer testimonials
- Company statistics

### 📋 **About Page** (`/about`)
- Company history and mission
- Team information
- Certifications and awards
- Timeline of achievements

### 🛍️ **Products Page** (`/products`)
- Complete product catalog
- Category filtering
- Search functionality
- Product inquiry forms

### 🔧 **Calculator Page** (`/calculator`)
- Interactive battery calculator
- System voltage selection
- Battery type comparison
- Detailed results

### 📞 **Contact Page** (`/contact`)
- Contact form
- Company information
- Location map
- Business hours

### 👥 **Consultation Page** (`/consultation`)
- Consultation booking form
- Service overview
- Process explanation

### ⚙️ **Admin Page** (`/admin`)
- Image upload manager
- Backend testing tools
- System administration

## 🚀 Deployment

### Deploy to Vercel:

1. **Push to GitHub:**
\`\`\`bash
git add .
git commit -m "Initial commit"
git push origin main
\`\`\`

2. **Connect to Vercel:**
   - Go to [vercel.com](https://vercel.com)
   - Import your GitHub repository
   - Set environment variable: `NEXT_PUBLIC_API_URL`
   - Deploy

3. **Set Environment Variables in Vercel:**
   - Go to Project Settings → Environment Variables
   - Add: `NEXT_PUBLIC_API_URL` = `https://dec-tech.onrender.com`

### Deploy Backend to Render:
- Your backend is already deployed at: https://dec-tech.onrender.com
- Make sure it has the required API endpoints

## 🔧 Development Scripts

\`\`\`bash
npm run dev          # Start development server
npm run build        # Build for production
npm run start        # Start production server
npm run lint         # Run ESLint
npm run type-check   # TypeScript type checking
npm run test:backend # Test backend connection
npm run upload:images # Upload images to backend
\`\`\`

## 🎯 Key Features

### ⚡ **Battery Calculator**
- Calculate required battery capacity
- Support for different battery types
- Multiple system voltages (12V/24V/48V)
- Real-time calculations

### 🛍️ **Smart Product Catalog**
- Fallback to sample data if backend unavailable
- Category filtering and search
- Responsive product cards
- Contact forms for each product

### 📱 **Responsive Design**
- Mobile-first approach
- Works on all screen sizes
- Touch-friendly interface
- Fast loading times

### 🔗 **Backend Integration**
- Graceful fallback when backend unavailable
- Error handling and retry logic
- Image upload capabilities
- Form submissions

## 🛠️ Customization

### Update Company Information:
- Edit contact details in `components/layout.tsx`
- Update company info in `components/about.tsx`
- Replace logo in `public/images/dec-tech-logo.png`

### Add New Products:
- Update sample products in `components/products.tsx`
- Add product images to `public/images/`
- Configure backend API to return new products

### Modify Styling:
- Update brand colors in `tailwind.config.js`
- Modify global styles in `app/globals.css`
- Customize components in `components/` directory

## 📞 Support

- **Email**: dectechenergy@gmail.com
- **Phone**: +234 7040818138
- **Website**: https://dec-tech.onrender.com

## 📄 License

This project is proprietary and confidential to DEC Tech Solar Solutions.

---

**Built with ❤️ by DEC Tech Team**
