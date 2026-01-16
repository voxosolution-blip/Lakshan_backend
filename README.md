# 🥛 Lakshan Yogurt ERP System

A comprehensive, production-ready ERP system for yoghurt/dairy factory management built with React, Node.js, and PostgreSQL. This system manages the complete lifecycle from milk collection to sales, payments, and financial reporting.

---

## 📑 Table of Contents

1. [System Overview](#system-overview)
2. [Features & Modules](#features--modules)
3. [User Roles & Permissions](#user-roles--permissions)
4. [System Architecture](#system-architecture)
5. [Database Schema](#database-schema)
6. [API Documentation](#api-documentation)
7. [Frontend Pages & Components](#frontend-pages--components)
8. [System Workflows](#system-workflows)
9. [Technology Stack](#technology-stack)
10. [Installation & Setup](#installation--setup)
11. [Development Guide](#development-guide)
12. [Reporting & Analytics](#reporting--analytics)

---

## 🎯 System Overview

The Lakshan Yogurt ERP System is a complete enterprise resource planning solution designed specifically for dairy/yogurt production facilities. It manages:

- **Milk Collection**: Daily collection from farmers with payment tracking
- **Production Management**: Production planning, execution, and inventory tracking
- **Inventory Control**: Raw materials, packaging, and finished goods management
- **Sales & Distribution**: Sales transactions, salesperson management, and location tracking
- **Payment Processing**: Cash and cheque payments with tracking
- **Worker Management**: Attendance, salary calculation, and payroll
- **Financial Management**: Expenses, returns, and comprehensive reporting

---

## ✨ Features & Modules

### 1. **Authentication & User Management**

#### Features:
- JWT-based authentication
- Role-based access control (RBAC)
- User profile management
- Session management
- Secure password hashing (bcryptjs)

#### User Roles:
- **ADMIN**: Full system access
- **SALESPERSON**: Sales, payments, returns (mobile-optimized)
- **ACCOUNTANT**: Reports, payments, expenses
- **PRODUCTION**: Production, inventory management

---

### 2. **Farmers & Milk Collection Module**

#### Features:
- **Farmer Management**
  - Add, edit, delete farmers
  - Track farmer details (name, phone, address)
  - Set milk rate per liter
  - Monthly allowance tracking
  - Active/inactive status management

- **Daily Milk Collection**
  - Record daily milk collection from farmers
  - Track quantity (liters) with date and time
  - Notes and remarks
  - Collection history tracking

- **Farmer Payments**
  - Monthly payment calculation based on milk collection
  - Free products allocation to farmers
  - Payment history and reports
  - Monthly paysheet generation

- **Settings**
  - Milk price settings (per liter)
  - Free products settings for farmers
  - Monthly allowance configuration

#### Database Tables:
- `farmers` - Farmer master data
- `milk_collections` - Daily milk collection records
- `farmer_free_products` - Free products allocated to farmers
- `settings` - Milk price and other configurations

---

### 3. **Workers & Salary Management Module**

#### Features:
- **Worker Management**
  - Add, edit, delete workers
  - Worker details (name, phone, address, EPF/ETF numbers)
  - Job role assignment
  - Active/inactive status
  - Global worker settings (daily salary, EPF%, ETF%)

- **Attendance Tracking**
  - Daily attendance recording
  - Present/absent status
  - Late hours/overtime tracking
  - Attendance history

- **Salary Calculation**
  - Daily salary calculation (based on 26 working days)
  - Monthly salary computation
  - EPF (8% default) and ETF (3% default) deductions
  - Monthly bonus and late hour bonus
  - Advance payments tracking
  - Net pay calculation

- **Payroll Management**
  - Monthly payroll generation
  - Working days calculation
  - Salary breakdown (gross, deductions, net)
  - Payroll history
  - Individual paysheet generation

- **Free Products**
  - Free products allocation to workers
  - Monthly free products tracking

#### Database Tables:
- `workers` - Worker master data
- `worker_attendance` - Daily attendance records
- `worker_advances` - Advance payments
- `salary_bonus` - Monthly and late hour bonuses
- `payroll` - Monthly payroll records
- `worker_free_products` - Free products allocated

---

### 4. **Inventory Management Module**

#### Features:
- **Inventory Categories**
  - Raw Material (milk, sugar, etc.)
  - Packaging (bottles, caps, labels, etc.)
  - Finished Goods (completed products)
  - Utilities (consumables)

- **Inventory Items**
  - Add, edit, delete inventory items
  - Category assignment
  - Quantity tracking (current stock)
  - Minimum quantity alerts
  - Unit of measurement (liter, kg, piece, etc.)
  - Price tracking
  - Expiry date tracking (for perishables)

- **Stock Management**
  - Real-time stock tracking
  - Stock adjustments (increase/decrease)
  - Low stock alerts
  - Expiry alerts
  - Stock history

- **Inventory Tracking**
  - Milk inventory by date
  - Daily milk usage tracking
  - Batch tracking (for finished goods)
  - Inventory movements

#### Database Tables:
- `inventory_categories` - Category definitions
- `inventory_items` - Inventory item master data
- `inventory_batches` - Batch tracking for finished goods
- Views: `v_low_stock_alerts`, `v_expiry_alerts`

---

### 5. **Products & BOM (Bill of Materials) Module**

#### Features:
- **Product Management**
  - Add, edit, delete products
  - Product categories (Yogurt Drinks, Ice Packets, etc.)
  - Selling price management
  - Active/inactive status
  - Product description

- **Bill of Materials (BOM)**
  - Define BOM for each product
  - Link inventory items to products
  - Set required quantities per unit
  - Unit conversion support
  - BOM validation

- **Product Information**
  - Product listing
  - Product details view
  - BOM visualization
  - Cost calculation (based on BOM)

#### Database Tables:
- `products` - Product master data
- `product_bom` - Bill of Materials (product → inventory items mapping)

---

### 6. **Production Management Module**

#### Features:
- **Production Planning**
  - Daily production capacity tracking
  - Production planning by product
  - Resource allocation

- **Production Execution**
  - Record daily production
  - Product and quantity tracking
  - Batch number generation
  - Production date tracking
  - Notes and remarks
  - Production by user tracking

- **Inventory Integration**
  - Automatic inventory deduction (raw materials based on BOM)
  - Automatic inventory addition (finished goods)
  - Batch tracking for finished goods
  - Inventory batch status (available/allocated)

- **Salesperson Allocation**
  - Allocate finished goods to salespersons
  - Allocation from production or inventory stock
  - Batch number tracking
  - Quantity allocation
  - Allocation history
  - Bulk allocation support

- **Production Reports**
  - Today's production summary
  - Production history
  - Production with allocations
  - Remaining stock tracking

#### Database Tables:
- `productions` - Production records
- `salesperson_allocations` - Allocated products to salespersons
- `inventory_batches` - Batch tracking (linked to productions)
- Views: `v_daily_production_summary`, `v_salesperson_inventory`

---

### 7. **Sales & Distribution Module**

#### Features:
- **Buyer/Customer Management**
  - Add, edit, delete buyers (shops/stores)
  - Shop name, contact, address
  - Payment status tracking
  - Active/inactive status

- **Sales Transactions**
  - Create sales orders
  - Multiple products per sale
  - Quantity and pricing
  - Sales date tracking
  - Salesperson assignment
  - Payment status (pending/partial/paid)
  - Notes and remarks

- **Salesperson Management**
  - Salesperson profile
  - Location tracking (GPS coordinates)
  - Shop location mapping
  - Real-time location updates
  - Salesperson inventory (allocated stock)
  - Mobile sales interface

- **Mobile Sales (Salesperson App)**
  - Mobile-optimized sales interface
  - Create sales on-the-go
  - View allocated inventory
  - Shop management
  - Location tracking
  - Payment recording (cash/cheque)

- **Sales Reports**
  - Sales history
  - Sales by product
  - Sales by salesperson
  - Sales by date range
  - Today's sales tracking
  - Product sales analytics

#### Database Tables:
- `buyers` - Buyer/customer master data
- `sales` - Sales transaction records
- `sale_items` - Sales line items (products in each sale)
- `salesperson_locations` - GPS location tracking
- `shop_locations` - Shop location mapping

---

### 8. **Payments & Cheques Module**

#### Features:
- **Payment Processing**
  - Record payments for sales
  - Cash payments
  - Cheque payments
  - Mixed payments (cash + cheque)
  - Payment date tracking
  - Payment status (pending/completed/cancelled)

- **Cheque Management**
  - Cheque number tracking
  - Bank name
  - Cheque date
  - Return/clearance date
  - Cheque status (pending/cleared/bounced/cancelled)
  - Cheque expiry alerts
  - Cheque tracking history

- **Payment Tracking**
  - Payment history
  - Shop-wise payment history
  - Pending payments
  - Payment status updates
  - Payment notes

- **Alerts & Notifications**
  - Cheque expiry alerts
  - Pending payment alerts
  - Overdue payments

#### Database Tables:
- `payments` - Payment records
- `cheques` - Cheque details
- Views for payment analytics

---

### 9. **Returns & Replacements Module**

#### Features:
- **Return Processing**
  - Record product returns
  - Link returns to original sales
  - Product and quantity tracking
  - Return reason tracking
  - Replacement product assignment
  - Return date and processing

- **Return Tracking**
  - Return history
  - Returns by product
  - Returns by date
  - Replacement tracking

#### Database Tables:
- `returns` - Return records
- Linked to `sales` and `products`

---

### 10. **Expenses Module**

#### Features:
- **Expense Management**
  - Record operational expenses
  - Expense types (operational, maintenance, utilities, etc.)
  - Expense categories
  - Amount tracking
  - Expense date
  - Description and notes
  - Expense by user tracking

- **Expense Tracking**
  - Expense history
  - Monthly expense summary
  - Expenses by category
  - Expenses by type
  - Date range filtering

#### Database Tables:
- `expenses` - Expense records

---

### 11. **Dashboard & Analytics Module**

#### Features:
- **Admin Dashboard**
  - Total farmers count
  - Today's milk collection
  - Today's sales
  - Total revenue
  - Pending payments
  - Active products count
  - Milk collection chart (daily)
  - Product sales analytics
  - Salesperson location map
  - Cheque alerts
  - Financial statistics (gross profit, net profit)
  - Salesperson stock overview
  - Today's sales and returns

- **Salesperson Dashboard**
  - Personalized dashboard for salespersons
  - My shops
  - My inventory (allocated stock)
  - Today's sales
  - Shop locations
  - Quick sales creation

- **Analytics**
  - Sales analytics
  - Product performance
  - Salesperson performance
  - Financial metrics
  - Inventory trends

#### Database Views:
- Multiple views for dashboard data aggregation

---

### 12. **Reports Module**

#### Features:
- **Sales Reports**
  - Sales by date range
  - Total sales amount
  - Sales count
  - Sales breakdown

- **Expense Reports**
  - Expenses by date range
  - Total expenses
  - Expense breakdown
  - Monthly expenses

- **Payment Reports**
  - Payments by date range
  - Payment totals
  - Payment breakdown

- **Farmer Reports**
  - Milk collection summary
  - Farmer statistics
  - Total milk inventory

- **Custom Reports**
  - Date range filtering
  - Export capabilities
  - Report generation

---

### 13. **Settings Module**

#### Features:
- **System Settings**
  - Milk price settings
  - Worker default settings (daily salary, EPF%, ETF%)
  - Free products settings
  - Global configurations

- **Settings Management**
  - Get settings by key
  - Update settings
  - Apply settings to all entities

---

## 🔐 User Roles & Permissions

### ADMIN
**Full Access to All Modules:**
- Dashboard (full analytics)
- Milk Collection & Farmers
- Workers & Salary
- Inventory Management
- Production Management
- Sales Management
- Payments & Cheques
- Returns
- Expenses
- Reports
- Settings

### SALESPERSON
**Limited Access (Mobile-Optimized):**
- Salesperson Dashboard
- Create Sales
- View Allocated Inventory
- Shop Management
- Location Tracking
- Payment Recording
- Returns (limited)

### ACCOUNTANT
**Financial & Reporting Access:**
- Dashboard (financial metrics)
- Payments & Cheques
- Expenses
- Reports
- Financial Analytics

### PRODUCTION
**Production & Inventory Access:**
- Production Management
- Inventory Management
- Products & BOM
- Production Reports

---

## 🏗️ System Architecture

### Backend Architecture
```
backend/
├── src/
│   ├── config/          # Database configuration
│   ├── controllers/     # Business logic (14 controllers)
│   ├── middlewares/     # Auth, error handling
│   ├── routes/          # API route definitions (14 routes)
│   ├── services/        # Scheduled tasks, background jobs
│   └── utils/           # Utilities (JWT, password, seeding)
├── server.js            # Express server entry point
└── package.json
```

### Frontend Architecture
```
frontend/
├── src/
│   ├── components/      # Reusable components
│   │   ├── common/      # ProtectedRoute, LoginRoute
│   │   └── layout/      # Header, Sidebar, Footer, MainLayout
│   ├── pages/           # Page components (14+ pages)
│   ├── services/        # API service layer (14+ APIs)
│   ├── context/         # React Context (AuthContext)
│   ├── types/           # TypeScript type definitions
│   └── utils/           # Utility functions
├── App.tsx              # Main app component with routing
└── main.tsx             # Entry point
```

### Database Architecture
- **PostgreSQL** relational database
- **UUID** primary keys
- **Triggers** for updated_at timestamps
- **Views** for reporting and analytics
- **Indexes** for performance optimization
- **Foreign keys** for data integrity

---

## 🗄️ Database Schema

### Core Tables (15+ main tables)

1. **users** - System users and authentication
2. **farmers** - Farmer master data
3. **milk_collections** - Daily milk collection records
4. **workers** - Worker/employee master data
5. **worker_attendance** - Daily attendance tracking
6. **worker_advances** - Advance payments to workers
7. **salary_bonus** - Monthly and overtime bonuses
8. **payroll** - Monthly payroll records
9. **inventory_categories** - Inventory categories
10. **inventory_items** - Inventory item master data
11. **inventory_batches** - Batch tracking for finished goods
12. **products** - Product master data
13. **product_bom** - Bill of Materials
14. **productions** - Production records
15. **salesperson_allocations** - Products allocated to salespersons
16. **buyers** - Buyer/customer master data
17. **sales** - Sales transaction records
18. **sale_items** - Sales line items
19. **payments** - Payment records
20. **cheques** - Cheque details
21. **returns** - Return records
22. **expenses** - Expense records
23. **salesperson_locations** - GPS location tracking
24. **shop_locations** - Shop location mapping
25. **farmer_free_products** - Free products to farmers
26. **worker_free_products** - Free products to workers
27. **settings** - System settings

### Key Views
- `v_low_stock_alerts` - Low stock items
- `v_expiry_alerts` - Expiring items
- `v_daily_production_summary` - Daily production overview
- `v_salesperson_inventory` - Salesperson allocated inventory

---

## 📡 API Documentation

### Base URL
```
http://localhost:5000/api
```

### Authentication Endpoints
- `POST /api/auth/login` - User login
- `GET /api/auth/profile` - Get user profile

### Farmers Endpoints
- `GET /api/farmers` - Get all farmers
- `GET /api/farmers/with-today-milk` - Get farmers with today's milk
- `POST /api/farmers` - Create farmer
- `GET /api/farmers/:id` - Get farmer by ID
- `PUT /api/farmers/:id` - Update farmer
- `DELETE /api/farmers/:id` - Delete farmer
- `POST /api/farmers/milk-collection` - Add milk collection
- `GET /api/farmers/milk/total` - Get total milk inventory
- `GET /api/farmers/:id/monthly-report` - Get monthly report
- `POST /api/farmers/free-products` - Add free products

### Workers Endpoints
- `GET /api/workers` - Get all workers
- `GET /api/workers/with-today-attendance` - Get workers with today's attendance
- `POST /api/workers` - Create worker
- `GET /api/workers/:id` - Get worker by ID
- `PUT /api/workers/:id` - Update worker
- `POST /api/workers/attendance` - Add attendance
- `POST /api/workers/advance` - Add advance payment
- `POST /api/workers/free-products` - Add free products
- `POST /api/workers/salary-bonus` - Add salary bonus
- `POST /api/workers/generate-payroll` - Generate payroll
- `GET /api/workers/:id/monthly-report` - Get monthly report

### Inventory Endpoints
- `GET /api/inventory` - Get all inventory items
- `GET /api/inventory/milk/by-date` - Get milk inventory by date
- `GET /api/inventory/milk/today-usage` - Get today's milk usage
- `POST /api/inventory` - Create inventory item
- `GET /api/inventory/alerts/low-stock` - Get low stock alerts
- `GET /api/inventory/alerts/expiry` - Get expiry alerts
- `GET /api/inventory/:id` - Get inventory by ID
- `PUT /api/inventory/:id` - Update inventory
- `DELETE /api/inventory/:id` - Delete inventory
- `POST /api/inventory/:id/adjust` - Adjust stock

### Products Endpoints
- `GET /api/products` - Get all products
- `POST /api/products` - Create product
- `GET /api/products/:id` - Get product by ID
- `PUT /api/products/:id` - Update product
- `DELETE /api/products/:id` - Delete product
- `GET /api/products/:id/bom` - Get product BOM
- `POST /api/products/:id/bom` - Add BOM item
- `DELETE /api/products/:id/bom/:bomId` - Delete BOM item

### Production Endpoints
- `GET /api/production` - Get all productions
- `POST /api/production` - Create production
- `GET /api/production/today` - Get today's production
- `GET /api/production/capacity` - Get production capacity
- `POST /api/production/allocation` - Create salesperson allocation
- `GET /api/production/allocations` - Get allocations
- `GET /api/production/salesperson/inventory` - Get salesperson inventory

### Sales Endpoints
- `GET /api/sales` - Get all sales
- `POST /api/sales` - Create sale
- `GET /api/sales/:id` - Get sale by ID

### Payments Endpoints
- `GET /api/payments` - Get all payments
- `GET /api/payments/shop-wise` - Get shop-wise payments
- `POST /api/payments` - Create payment
- `GET /api/payments/pending` - Get pending payments
- `GET /api/payments/cheque-alerts` - Get cheque alerts
- `GET /api/payments/cheques/all` - Get all cheques
- `PUT /api/payments/cheques/:id/status` - Update cheque status
- `GET /api/payments/:id` - Get payment by ID

### Returns Endpoints
- `GET /api/returns` - Get all returns
- `POST /api/returns` - Create return
- `GET /api/returns/:id` - Get return by ID

### Expenses Endpoints
- `GET /api/expenses` - Get all expenses
- `POST /api/expenses` - Create expense
- `GET /api/expenses/monthly` - Get monthly expenses
- `GET /api/expenses/:id` - Get expense by ID
- `PUT /api/expenses/:id` - Update expense
- `DELETE /api/expenses/:id` - Delete expense

### Dashboard Endpoints
- `GET /api/dashboard/admin` - Get admin dashboard data
- `GET /api/dashboard/sales` - Get sales dashboard data
- `POST /api/dashboard/location` - Update salesperson location
- `GET /api/dashboard/locations` - Get all salesperson locations
- `GET /api/dashboard/milk-chart` - Get milk chart data
- `GET /api/dashboard/product-sales` - Get product sales data
- `GET /api/dashboard/salesperson-stock` - Get salesperson stock
- `GET /api/dashboard/today-sales-returns` - Get today's sales and returns

### Settings Endpoints
- `GET /api/settings/:key` - Get setting by key
- `PUT /api/settings/:key` - Update setting
- `GET /api/settings/milk-price` - Get milk price
- `PUT /api/settings/milk-price` - Update milk price

### Salesperson Endpoints
- `POST /api/salesperson/location` - Update location
- `GET /api/salesperson/location/me` - Get my location
- `GET /api/salesperson/locations/all` - Get all locations
- `GET /api/salesperson/shops` - Get my shops
- `POST /api/salesperson/shops` - Add shop
- `PUT /api/salesperson/shops/:id/location` - Update shop location
- `GET /api/salesperson/shops/:shopId/sales` - Get shop sales
- `GET /api/salesperson/inventory` - Get my inventory
- `POST /api/salesperson/sales` - Create mobile sale

### Buyer Endpoints
- `GET /api/buyers` - Get all buyers
- `GET /api/buyers/payment-status` - Get buyers with payment status
- `POST /api/buyers` - Create buyer
- `GET /api/buyers/:id` - Get buyer by ID
- `PUT /api/buyers/:id` - Update buyer
- `DELETE /api/buyers/:id` - Delete buyer

---

## 🎨 Frontend Pages & Components

### Main Pages
1. **Login** (`/login`) - User authentication
2. **Dashboard** (`/`) - Main dashboard (role-based)
3. **Milk Collection** (`/milk`) - Farmers and milk collection
4. **Milk Settings** (`/milk/settings`) - Milk price settings
5. **Farmer Free Products** (`/milk/free-products-settings`) - Free products settings
6. **Farmer Paysheet** (`/milk/paysheet/:id`) - Individual farmer paysheet
7. **Workers/Salary** (`/salary`) - Workers and salary management
8. **Worker Paysheet** (`/salary/paysheet/:id`) - Individual worker paysheet
9. **Inventory** (`/inventory`) - Inventory management
10. **Production** (`/production`) - Production management
11. **Sales** (`/sales`) - Sales transactions
12. **Returns** (`/returns`) - Product returns
13. **Payments** (`/payments`) - Payment management
14. **Cheques** (`/cheques`) - Cheque management
15. **Expenses** (`/expenses`) - Expense tracking
16. **Reports** (`/reports`) - Reports and analytics

### Key Components
- **MainLayout** - Main application layout with sidebar
- **Header** - Top navigation bar
- **Sidebar** - Left navigation menu (role-based)
- **Footer** - Footer component
- **ProtectedRoute** - Route protection based on roles
- **LoginRoute** - Login page route handler
- **SalespersonDashboard** - Specialized dashboard for salespersons

---

## 🔄 System Workflows

### 1. Milk Collection Workflow
```
Farmer Registration → Daily Milk Collection → Monthly Payment Calculation → Payment Processing
```

### 2. Production Workflow
```
Raw Material Inventory → BOM Definition → Production Planning → Production Execution → 
Finished Goods Inventory → Salesperson Allocation → Sales
```

### 3. Sales Workflow
```
Buyer Registration → Sales Order Creation → Payment (Cash/Cheque) → 
Inventory Deduction → Return Processing (if any)
```

### 4. Worker Salary Workflow
```
Worker Registration → Daily Attendance → Advance Payments → 
Salary Bonus → Payroll Generation → Payment Processing
```

### 5. Payment Workflow
```
Sale Creation → Payment Recording (Cash/Cheque) → Cheque Tracking → 
Payment Status Update → Financial Reporting
```

---

## 🛠️ Technology Stack

### Backend
- **Node.js** (v18+)
- **Express.js** - Web framework
- **PostgreSQL** - Database
- **JWT** - Authentication
- **bcryptjs** - Password hashing
- **dotenv** - Environment configuration
- **CORS** - Cross-origin resource sharing

### Frontend
- **React** (v18)
- **TypeScript** - Type safety
- **Vite** - Build tool
- **Tailwind CSS** - Styling
- **React Router** - Routing
- **Axios** - HTTP client
- **Lucide React** - Icons

### Development Tools
- **Docker** - Containerization (optional)
- **Git** - Version control
- **ESLint** - Code linting
- **PostgreSQL** - Database

---

## 🚀 Installation & Setup

### Prerequisites
- Node.js 18+ 
- PostgreSQL 12+
- npm or yarn
- Git

### 1. Database Setup

```bash
# Create database
createdb yogurt_erp

# Or using Docker (recommended)
docker-compose up -d postgres

# Run schema
psql -U postgres -d yogurt_erp -f database/schema.sql

# Run migrations (if any)
psql -U postgres -d yogurt_erp -f database/migrations/*.sql
```

### 2. Backend Setup

```bash
cd backend
npm install

# Create .env file
cp .env.example .env
# Edit .env with your database credentials:
# DB_HOST=localhost
# DB_PORT=5432
# DB_NAME=yogurt_erp
# DB_USER=postgres
# DB_PASSWORD=your_password
# JWT_SECRET=your_jwt_secret
# PORT=5000

# Seed database (create admin user)
npm run seed

# Start development server
npm run dev
```

Backend will run on `http://localhost:5000`

### 3. Frontend Setup

```bash
cd frontend
npm install

# Create .env file
echo "VITE_API_URL=http://localhost:5000/api" > .env

# Start development server
npm run dev
```

Frontend will run on `http://localhost:5173`

### 4. Default Login Credentials

After seeding:
- **Admin**: `username=admin`, `password=admin123`
- **Salesperson**: `username=sales`, `password=admin123`

---

## 📊 Reporting & Analytics

### Available Reports

1. **Sales Reports**
   - Sales by date range
   - Total sales amount
   - Sales by product
   - Sales by salesperson
   - Today's sales

2. **Expense Reports**
   - Expenses by date range
   - Monthly expenses
   - Expenses by category
   - Total expenses

3. **Payment Reports**
   - Payments by date range
   - Pending payments
   - Cheque status
   - Shop-wise payments

4. **Farmer Reports**
   - Milk collection summary
   - Monthly payment reports
   - Farmer statistics

5. **Worker Reports**
   - Attendance reports
   - Payroll reports
   - Salary summaries

6. **Inventory Reports**
   - Stock levels
   - Low stock alerts
   - Expiry alerts
   - Inventory movements

7. **Production Reports**
   - Daily production summary
   - Production history
   - Allocation reports

8. **Financial Reports**
   - Gross profit
   - Net profit
   - Revenue vs Expenses
   - Payment status

### Dashboard Analytics

- **Real-time Metrics**: Today's sales, milk collection, etc.
- **Charts**: Milk collection trends, product sales
- **Maps**: Salesperson location tracking
- **Alerts**: Cheque expiry, low stock, pending payments
- **Financial Overview**: Revenue, expenses, profit margins

---

## 🔒 Security Features

- JWT-based authentication
- Password hashing with bcryptjs
- Parameterized SQL queries (SQL injection prevention)
- Role-based access control (RBAC)
- CORS configuration
- Input validation
- Error handling middleware

---

## 📝 Development Guide

### Code Structure
- **Backend**: MVC pattern (Models, Views, Controllers)
- **Frontend**: Component-based architecture
- **Database**: Relational design with proper indexing

### Adding New Features
1. Create database tables/migrations
2. Create backend controller
3. Create API routes
4. Create frontend service
5. Create frontend page/component
6. Update routing
7. Test thoroughly

### Best Practices
- Use TypeScript for type safety
- Follow RESTful API conventions
- Implement proper error handling
- Add input validation
- Write clear comments
- Follow naming conventions

---

## 🐛 Troubleshooting

### Common Issues

1. **Database Connection Error**
   - Check PostgreSQL is running
   - Verify credentials in .env
   - Check port availability

2. **Authentication Issues**
   - Verify JWT_SECRET in .env
   - Check token expiration
   - Clear browser cache

3. **CORS Errors**
   - Verify CORS_ORIGIN in backend .env
   - Check frontend API URL

4. **Port Already in Use**
   - Change PORT in .env
   - Kill process using the port

---

## 📖 Additional Documentation

- [IMPLEMENTATION_GUIDE.md](./IMPLEMENTATION_GUIDE.md) - Detailed setup guide
- [backend/README.md](./backend/README.md) - Backend API documentation
- [frontend/README.md](./frontend/README.md) - Frontend documentation

---

## 📄 License

This project is proprietary software for internal use.

---

## 👥 Support

For setup issues or questions:
- Refer to IMPLEMENTATION_GUIDE.md for detailed instructions
- Check code comments for implementation details
- Review backend README for API documentation

---

**Built with ❤️ for efficient dairy factory management**

---

## 📌 Quick Reference

### System Flow Diagram
```
Farmers → Milk Collection → Inventory (Raw Materials)
                              ↓
                         Production (BOM)
                              ↓
                    Inventory (Finished Goods)
                              ↓
                         Sales → Payments
                              ↓
                    Returns / Replacements
                              ↓
                    Dashboard + Reports
```

### Key Features Summary
- ✅ Complete ERP system for dairy/yogurt production
- ✅ 14+ modules covering all business processes
- ✅ Role-based access control
- ✅ Real-time inventory tracking
- ✅ Production management with BOM
- ✅ Sales and distribution
- ✅ Payment processing (cash & cheque)
- ✅ Worker salary and payroll
- ✅ Comprehensive reporting
- ✅ Mobile-responsive design
- ✅ Location tracking for salespersons
- ✅ Batch tracking for traceability
- ✅ Financial analytics
- ✅ Automated calculations (salary, payments, etc.)

---

*Last Updated: 2024*
