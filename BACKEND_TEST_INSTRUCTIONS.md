# Backend Testing Instructions

## 🧪 How to Test Your Render Backend

### 1. **Run Connection Test**
\`\`\`bash
node scripts/test-backend-connection.js
\`\`\`

This will test:
- ✅ Basic connectivity to https://dec-tech.onrender.com
- ✅ Products API endpoint
- ✅ Contact API endpoint  
- ✅ Consultation API endpoint
- ✅ Image Upload API endpoint

### 2. **Test in Browser**
1. Go to `/products` page
2. Open Developer Tools (F12)
3. Check **Network** tab for API calls
4. Check **Console** for connection messages

### 3. **Upload Images to Backend**
\`\`\`bash
node scripts/upload-images-to-backend.js
\`\`\`

Or use the admin interface at `/admin`

## 🎯 Expected Results

### ✅ **Working Connection:**
- Products load from backend
- Contact forms submit successfully
- No console errors
- Network tab shows API calls to dec-tech.onrender.com

### ⚠️ **Partial Connection:**
- Products show (fallback data)
- Some APIs work, others don't
- Console shows mixed success/failure

### ❌ **No Connection:**
- Only sample products show
- Console shows "Using sample products"
- No network calls to backend

## 🔧 **Required Backend Endpoints**

Your Render backend needs these endpoints:

\`\`\`
GET  /api/products           - Return product array
POST /api/contact           - Handle contact forms
POST /api/consultation      - Handle consultation requests
POST /api/upload/image      - Handle image uploads
\`\`\`

## 📊 **Sample API Responses**

### Products API:
\`\`\`json
[
  {
    "id": 1,
    "name": "Solar Panel",
    "voltage": "12/24/48V",
    "category": "Solar Panels",
    "description": "High efficiency panel",
    "image": "/images/solar-panel.jpg",
    "features": ["21% Efficiency", "25-Year Warranty"]
  }
]
\`\`\`

### Contact API:
\`\`\`json
{
  "success": true,
  "message": "Contact form submitted successfully"
}
\`\`\`

## 🚀 **Next Steps**

1. **Run the tests** to see current status
2. **Check which APIs are missing** on your backend
3. **Upload images** to your backend storage
4. **Update product data** to use backend images
