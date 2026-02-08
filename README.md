# 🛢️ HPCL B2B Lead Intelligence Agent

> An AI-powered autonomous system for discovering, analyzing, and managing B2B sales leads from web sources. Built for HPCL's industrial fuel and chemical sales teams.

![Project Status](https://img.shields.io/badge/Status-Production%20Ready-brightgreen)
![Python](https://img.shields.io/badge/Python-3.12+-blue)
![Next.js](https://img.shields.io/badge/Next.js-16+-black)
![React Native](https://img.shields.io/badge/React%20Native-Expo-blue)

---

## 📋 Table of Contents

- [Overview](#-overview)
- [Features](#-features)
- [Architecture](#-architecture)
- [Tech Stack](#-tech-stack)
- [Project Structure](#-project-structure)
- [Quick Start](#-quick-start)
- [Environment Variables](#-environment-variables)
- [API Documentation](#-api-documentation)
- [User Credentials](#-user-credentials)
- [Demo](#-demo)

---

## 🎯 Overview

The **HPCL B2B Lead Intelligence Agent** is an end-to-end solution that:

1. **Autonomously discovers** potential B2B customers from news articles, tender notices, and industry publications
2. **Extracts and enriches** company information using AI-powered analysis
3. **Infers product needs** for industrial fuels (Furnace Oil, Bitumen, LDO, etc.)
4. **Scores and prioritizes** leads based on signal quality and source trust
5. **Notifies sales teams** via WhatsApp with actionable intelligence
6. **Provides dashboards** for managers and field officers across web and mobile

---

## ✨ Features

### 🤖 AI-Powered Lead Discovery
- Multi-source monitoring (Google News, Bing News, Tender Aggregators)
- Automated keyword-based search every 30 minutes
- Smart entity extraction using regex and AI patterns
- Groq LLM integration for intelligent analysis and recommendations

### 📊 Sales Manager Dashboard
- Executive overview with KPIs (revenue, pipeline, conversion rates)
- Team performance analytics and regional insights
- Lead management and assignment workflows
- Officers management and monitoring

### 📱 Mobile App (Sales Officers)
- Real-time lead notifications
- Lead details with AI-generated recommendations
- Status updates from the field
- Deep linking support for quick access

### 💬 WhatsApp Integration
- Automated high-priority lead alerts
- Daily summary notifications
- Both mobile app and web links included
- Region-based officer routing

### 🔐 Role-Based Access
- **Sales Manager**: Full dashboard access, team management, analytics
- **Sales Officer**: Lead viewing, status updates, field reporting

---

## 🏗️ Architecture

```
┌─────────────────────────────────────────────────────────────────────┐
│                        DATA SOURCES                                  │
│  ┌──────────────┐  ┌──────────────┐  ┌──────────────┐               │
│  │ Google News  │  │  Bing News   │  │   Tenders    │               │
│  └──────┬───────┘  └──────┬───────┘  └──────┬───────┘               │
└─────────┼─────────────────┼─────────────────┼───────────────────────┘
          │                 │                 │
          ▼                 ▼                 ▼
┌─────────────────────────────────────────────────────────────────────┐
│                     BACKEND (FastAPI)                                │
│  ┌─────────────────┐  ┌─────────────────┐  ┌─────────────────┐     │
│  │   Ingestion     │──│  Intelligence   │──│   Lead Router   │     │
│  │   Multi-Source  │  │  Groq AI + NLP  │  │  Region-Based   │     │
│  └─────────────────┘  └─────────────────┘  └─────────────────┘     │
│                              │                      │                │
│  ┌─────────────────┐  ┌─────────────────┐  ┌─────────────────┐     │
│  │   SQLite DB     │  │   WhatsApp      │  │   Scheduler     │     │
│  │   SQLModel ORM  │  │   Twilio API    │  │   APScheduler   │     │
│  └─────────────────┘  └─────────────────┘  └─────────────────┘     │
└─────────────────────────────────────────────────────────────────────┘
          │                                           │
          ▼                                           ▼
┌─────────────────────┐                 ┌─────────────────────────────┐
│   WEB FRONTEND      │                 │      MOBILE APP             │
│   (Next.js)         │                 │   (React Native/Expo)       │
│                     │                 │                             │
│ • Sales Manager     │                 │ • Lead Notifications        │
│ • Executive View    │                 │ • Lead Details              │
│ • Officers          │                 │ • Status Updates            │
│ • Team Leads        │                 │ • Deep Linking              │
│ • Performance       │                 │                             │
└─────────────────────┘                 └─────────────────────────────┘
```

---

## 🛠️ Tech Stack

| Component | Technology |
|-----------|------------|
| **Backend** | FastAPI, SQLModel, SQLite, APScheduler |
| **AI/ML** | Groq LLM (Llama 3.3 70B), Regex NLP |
| **Frontend** | Next.js 16, React 19, Recharts |
| **Mobile** | React Native, Expo |
| **Notifications** | Twilio WhatsApp API |
| **Data Sources** | Google News RSS, Bing News, Tender APIs |

---

## 📁 Project Structure

```
Productathon/
├── backend/                    # FastAPI Backend
│   ├── app/
│   │   ├── main.py            # Application entry point
│   │   ├── database.py        # Database configuration
│   │   ├── scheduler.py       # APScheduler setup
│   │   ├── config/            # Configuration files
│   │   │   └── sales_officers.py  # Regional officer mapping
│   │   ├── ingestion/         # Data collection modules
│   │   │   ├── multi_source_monitor.py
│   │   │   ├── news_monitor.py
│   │   │   └── tender_monitor.py
│   │   ├── models/            # SQLModel schemas
│   │   │   ├── user.py, lead.py, company.py, etc.
│   │   ├── routers/           # API endpoints
│   │   │   ├── auth.py, leads.py, ingestion.py, etc.
│   │   └── services/          # Business logic
│   │       ├── intelligence.py    # Lead scoring & analysis
│   │       ├── groq_intelligence.py  # AI recommendations
│   │       ├── whatsapp.py        # Twilio integration
│   │       └── lead_router.py     # Regional routing
│   ├── requirements.txt
│   └── run.py
│
├── frontend/                   # Next.js Web Application
│   ├── src/
│   │   ├── app/
│   │   │   ├── sales-manager/    # Manager dashboard pages
│   │   │   ├── sales-officer/    # Officer pages
│   │   │   ├── executive/        # Executive overview
│   │   │   ├── login/            # Authentication
│   │   │   └── role-selection/   # Role selection page
│   │   ├── components/           # Reusable UI components
│   │   ├── context/              # React context (Auth)
│   │   ├── services/             # API client
│   │   └── styles/               # Theme and styling
│   └── package.json
│
└── mobile/                     # React Native Mobile App
    ├── src/
    │   ├── screens/             # App screens
    │   │   ├── LeadsListScreen.js
    │   │   ├── LeadDetailsScreen.js
    │   │   ├── LoginScreen.js
    │   │   └── ProfileScreen.js
    │   ├── components/          # UI components
    │   └── services/            # API client
    ├── App.js                   # Navigation & deep linking
    └── package.json
```

---

## 🚀 Quick Start

### Prerequisites

- Python 3.12+
- Node.js 18+
- npm or yarn

### 1️⃣ Backend Setup

```bash
cd backend

# Create virtual environment
python3 -m venv venv
source venv/bin/activate  # Windows: venv\Scripts\activate

# Install dependencies
pip install -r requirements.txt

# Configure environment (see Environment Variables section)
cp .env.example .env

# Run the server
python run.py
```

The backend will:
- ✅ Create the SQLite database
- ✅ Seed default users and officers
- ✅ Start the ingestion scheduler (every 30 minutes)
- ✅ Begin initial data ingestion

**API Available at:** http://localhost:8000

### 2️⃣ Frontend Setup

```bash
cd frontend

# Install dependencies
npm install --legacy-peer-deps

# Run development server
npm run dev
```

**Web App Available at:** http://localhost:3000

### 3️⃣ Mobile App Setup

```bash
cd mobile

# Install dependencies
npm install

# Start Expo development server
npx expo start
```

Scan the QR code with Expo Go app on your phone.

---

## 🔐 Environment Variables

### Backend (.env)

```env
# Groq AI (for intelligent lead analysis)
GROQ_API_KEY=your_groq_api_key

# Twilio WhatsApp Integration
TWILIO_ACCOUNT_SID=your_twilio_sid
TWILIO_AUTH_TOKEN=your_twilio_token
TWILIO_WHATSAPP_NUMBER=whatsapp:+14155238886
WHATSAPP_RECIPIENT=whatsapp:+91XXXXXXXXXX
```

### Mobile (.env)

```env
EXPO_PUBLIC_API_URL=http://your-backend-ip:8000
```

---

## 📚 API Documentation

Once the backend is running:

- **Swagger UI**: http://localhost:8000/docs
- **ReDoc**: http://localhost:8000/redoc

### Key Endpoints

| Endpoint | Method | Description |
|----------|--------|-------------|
| `/auth/login` | POST | User authentication |
| `/auth/officers` | GET | List all sales officers |
| `/leads/` | GET | List leads (filterable) |
| `/leads/{id}` | GET | Get lead details |
| `/leads/{id}` | PATCH | Update lead status |
| `/ingestion/trigger` | POST | Manual data ingestion |
| `/analytics/dashboard` | GET | Dashboard statistics |
| `/whatsapp/notify/{lead_id}` | POST | Send WhatsApp alert |

---

## 👤 User Credentials

### Sales Manager
- **Email:** rajesh.kumar@hpcl.in
- **Password:** Manager@123

### Sales Officers
| Name | Region | Email | Password |
|------|--------|-------|----------|
| Priya Sharma | NORTH | priya.sharma@hpcl.in | Officer@123 |
| Venkat Rao | SOUTH | venkat.rao@hpcl.in | Officer@123 |
| Amit Chatterjee | EAST | amit.chatterjee@hpcl.in | Officer@123 |
| Sandeep Patil | WEST | sandeep.patil@hpcl.in | Officer@123 |

---

## 🎬 Demo

### Web Application Flow
1. Visit http://localhost:3000
2. Select role (Sales Manager or Sales Officer)
3. Login with credentials
4. Explore dashboard, leads, and analytics

### Mobile App Flow
1. Login with officer credentials
2. View assigned leads
3. Check AI-generated recommendations
4. Update lead status

### WhatsApp Notifications
High-priority leads (>75% confidence) automatically trigger WhatsApp alerts with:
- Company details
- Product recommendations
- Confidence score
- Direct links to web and mobile app

---

## 👥 Team UrbanIQ

| **Sachin Jaiswal** |
| **Vansh Sharma** | 
| **Lakshya Bapna** |
| **Kushal Sarkar** |

Built with ❤️ for **Productathon 2026**

---

## 📄 License

MIT License - See LICENSE file for details
