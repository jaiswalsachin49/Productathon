export const MOCK_LEADS = [
    {
        id: '1',
        companyName: 'Apex Textiles Ltd.',
        industry: 'Textiles',
        location: 'Surat, Gujarat',
        matchScore: 92,
        status: 'New',
        summary: 'New manufacturing unit commissioning in Q3 2025.',
        products: ['Furnace Oil', 'LDO'],
        contact: {
            name: 'Rajesh Kumar',
            role: 'Procurement Manager',
            phone: '+919876543210',
            email: 'procurement@apextextiles.com',
        },
        signals: [
            { type: 'News', text: 'Apex Textiles announces ₹500cr expansion plan.' },
            { type: 'Job', text: 'Hiring Boiler Operators in Surat.' },
        ],
        explainability: [
            'Explicit mention of "New Boiler Commissioning"',
            'High growth signal in News API',
            'Located in HPCL West Zone service area'
        ],
        requirements: {
            volume: '300 KL / Month',
            frequency: 'Monthly',
            tankage: 'Under Construction'
        },
        notes: [],
    },
    {
        id: '2',
        companyName: 'Novel Power Plant',
        industry: 'Power',
        location: 'Raipur, Chhattisgarh',
        matchScore: 88,
        status: 'New',
        summary: 'Coal linkage issues reported; likely shifting to captive power.',
        products: ['LSHS', 'Furnace Oil'],
        contact: {
            name: 'Amit Singh',
            role: 'Plant Head',
            phone: '+919876543211',
            email: 'amit.singh@novelpower.com',
        },
        signals: [
            { type: 'Tender', text: 'Requirement for 500KL Furnace Oil per month.' },
        ],
        explainability: [
            'Matched Tender ID: GEM/2025/B/123456',
            'Keyword match "Captive Power Plant"',
            'Urgency: High (Tender closing in 5 days)'
        ],
        requirements: {
            volume: '500 KL / Month',
            frequency: 'Spot Purchase',
            tankage: 'Available (2000 KL)'
        },
        notes: [],
    },
    {
        id: '3',
        companyName: 'Coastal Chemicals',
        industry: 'Chemicals',
        location: 'Visakhapatnam, AP',
        matchScore: 75,
        status: 'Accepted',
        summary: 'Routine procurement of solvents for new batch processing.',
        products: ['Hexane', 'Solvent 1425'],
        contact: {
            name: 'Priya Sharma',
            role: 'Purchase Officer',
            phone: '+919876543212',
            email: 'purchase@coastalchem.com',
        },
        signals: [
            { type: 'Website', text: 'Updated product catalog with solvent-based products.' },
        ],
        explainability: [
            'Inferred from product catalog update',
            'Existing customer lookalike'
        ],
        requirements: {
            volume: '50 KL / Quarter',
            frequency: 'Quarterly',
            tankage: 'Barrels'
        },
        notes: ['Called on Monday, asked to send quote.'],
    },
    {
        id: '4',
        companyName: 'Reddy Infra Projects',
        industry: 'Construction',
        location: 'Hyderabad, Telangana',
        matchScore: 45,
        status: 'Rejected',
        summary: 'Road construction project awarded.',
        products: ['Bitumen'],
        contact: {
            name: 'K. Reddy',
            role: 'Director',
            phone: '+919876543213',
            email: 'info@reddyinfra.com',
        },
        signals: [
            { type: 'News', text: 'Won NHAI contract for 50km road.' },
        ],
        explainability: [
            'Keyword match "Road Construction"',
            'Low confidence on contact details'
        ],
        requirements: {
            volume: 'Unknown',
            frequency: 'project-based',
            tankage: 'None'
        },
        notes: ['Not interested in bulk purchase.'],
    }
];
