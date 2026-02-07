# B2B Lead Intelligence Agent - Backend

FastAPI backend that autonomously discovers B2B leads from web sources (News & Tenders) and generates actionable intelligence.

## 🚀 Quick Start

### Prerequisites

- Python 3.12+
- pip

### 1. Setup Virtual Environment

```bash
cd backend
python3 -m venv venv
source venv/bin/activate  # On Windows: venv\Scripts\activate
```

### 2. Install Dependencies

```bash
pip install -r requirements.txt
```

### 3. Run the Server

```bash
python run.py
```

The server will automatically:

- ✅ Create the database (`database.db`)
- ✅ Initialize all tables
- ✅ Start the ingestion scheduler (runs every 30 minutes)

### 4. Trigger First Ingestion

```bash
curl -X POST "http://127.0.0.1:8000/ingestion/trigger" \
  -H "Content-Type: application/json" \
  -d '["new manufacturing plant India", "boiler commissioning India"]'
```

### 5. View Generated Leads

```bash
python show_data.py
```

## 📚 API Endpoints

### Leads Management

- **`GET /leads/`** - List all leads (supports filtering by `status`, `product_id`)
- **`GET /leads/{id}`** - Get detailed lead information
- **`PATCH /leads/{id}`** - Update lead status/notes

### Companies

- **`GET /companies/`** - List all extracted companies
- **`GET /companies/{id}`** - Get company details

### Ingestion

- **`POST /ingestion/trigger`** - Manually trigger data ingestion

### Health Check

- **`GET /health`** - Server health status

## 🧠 How It Works

1. **Data Discovery**: Monitors Google News, Bing News, and Tender aggregators for relevant signals
2. **Intelligence Processing**:
   - Extracts company names using regex patterns
   - Infers relevant products (Furnace Oil, Bitumen, LDO, etc.)
   - Generates confidence scores
3. **Lead Generation**: Creates actionable leads with `NEW` status
4. **Continuous Learning**: Scheduler runs every 30 minutes to discover new opportunities

## 📁 Project Structure

```
backend/
├── app/
│   ├── main.py                 # FastAPI app entry point
│   ├── database.py             # Database configuration
│   ├── scheduler.py            # APScheduler setup
│   ├── models/                 # SQLModel schemas
│   │   ├── company.py
│   │   ├── lead.py
│   │   ├── product.py
│   │   ├── signal.py
│   │   └── source.py
│   ├── routers/                # API endpoints
│   │   ├── ingestion.py
│   │   ├── leads.py
│   │   └── companies.py
│   ├── services/               # Business logic
│   │   └── intelligence.py    # Entity resolution & product inference
│   └── ingestion/              # Data collection
│       ├── multi_source_monitor.py
│       ├── news_monitor.py
│       └── tender_monitor.py
├── database.db                 # SQLite database (auto-created)
├── show_data.py               # CLI tool to view data
└── requirements.txt
```

## 🔧 Troubleshooting

### No data after ingestion?

- Check logs: The server prints detailed ingestion logs
- Verify internet connection: The system fetches live data from RSS feeds

### Database errors?

- Delete `database.db` and restart the server - it will be recreated automatically

### Scheduler not running?

- Check server startup logs for "Scheduler started" message
- The scheduler runs every 30 minutes automatically

## 🛠️ Development

### View Database Contents

```bash
python show_data.py
```

### Initialize Production Database

```bash
python init_production_db.py
```

## 📝 Environment Variables (Optional)

Currently, the backend uses SQLite with no external dependencies. In future versions, you may add:

- API keys for premium data sources
- Database connection strings for PostgreSQL
- WhatsApp/Twilio credentials

---

**Built for Productathon** 🚀
