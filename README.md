# B2B Lead Intelligence Agent

An autonomous AI system that discovers B2B sales leads from web sources (News & Tenders) and generates actionable intelligence for industrial fuel/chemical sales teams.

## 🎯 What It Does

- **Discovers** potential customers from news articles and tender notices
- **Extracts** company names and project details automatically
- **Infers** product needs (Furnace Oil, Bitumen, LDO, etc.)
- **Scores** leads based on signal quality and source trust
- **Learns** continuously by running every 30 minutes

## 🏗️ Architecture

### Backend (FastAPI + SQLite)

- **Data Ingestion**: Multi-source monitoring (Google News, Bing News, Tenders)
- **Intelligence Layer**: Entity resolution, product inference, lead scoring
- **API**: RESTful endpoints for lead management
- **Scheduler**: Automated discovery every 30 minutes

### Frontend (Next.js)

- Lead inbox and dashboard
- Company profiles
- Feedback loop for continuous learning

## 🚀 Quick Start

### Backend Setup

```bash
cd backend
python3 -m venv venv
source venv/bin/activate
pip install -r requirements.txt
python run.py
```

See [backend/README.md](backend/README.md) for detailed setup instructions.

### Frontend Setup

```bash
cd frontend
npm install
npm run dev
```

## 📊 Key Features

✅ **Autonomous Discovery** - No manual searching required  
✅ **Smart Entity Extraction** - Identifies companies from unstructured text  
✅ **Product Intelligence** - Maps signals to relevant products  
✅ **Confidence Scoring** - Prioritizes high-quality leads  
✅ **Source Trust Tracking** - Learns which sources produce good leads  
✅ **Feedback Loop** - Improves over time based on sales team input

## 🛠️ Tech Stack

- **Backend**: FastAPI, SQLModel, SQLite, APScheduler
- **Frontend**: Next.js, React, TailwindCSS
- **Data Sources**: Google News RSS, Bing News API, Tender Aggregators
- **NLP**: Regex-based entity extraction (with scope for LLM integration)

## 📝 API Documentation

Once the server is running, visit:

- **Swagger UI**: http://localhost:8000/docs
- **ReDoc**: http://localhost:8000/redoc

## 🤝 Contributing

This is a hackathon project built for Productathon. Feel free to fork and extend!

## 📄 License

MIT License - see LICENSE file for details

---

**Built with ❤️ for Productathon**
