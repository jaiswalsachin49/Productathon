# Sales Officer Registry Configuration
# Map regions to WhatsApp numbers and product specializations

# NOTE: All phone numbers must have joined Twilio sandbox first!
# Send "join <your-code>" to +1 415 523 8886 from each number

SALES_OFFICERS = {
    # Format: "REGION_CODE": {"name": "Name", "phone": "+91XXXXXXXXXX", "products": ["Product1", "Product2"]}
    
    "NORTH": {
        "name": "Rajesh Kumar",
        "phone": "+919875877807",  # Replace with actual number
        "products": ["Furnace Oil", "Bitumen", "LDO (Light Diesel Oil)"],
        "states": ["Delhi", "Punjab", "Haryana", "Himachal Pradesh", "Jammu", "Uttarakhand", "UP"]
    },
    
    "SOUTH": {
        "name": "Venkat Rao",
        "phone": "+919875877807",  # Replace with actual number
        "products": ["Furnace Oil", "MTO (Mineral Turpentine Oil)", "Hexane"],
        "states": ["Tamil Nadu", "Karnataka", "Kerala", "Andhra Pradesh", "Telangana"]
    },
    
    "EAST": {
        "name": "Amit Chatterjee",
        "phone": "+919875877807",  # Replace with actual number
        "products": ["LDO (Light Diesel Oil)", "Bitumen"],
        "states": ["West Bengal", "Odisha", "Bihar", "Jharkhand", "Assam", "Northeast"]
    },
    
    "WEST": {
        "name": "Sandeep Patil",
        "phone": "+919875877807",  # Replace with actual number
        "products": ["Furnace Oil", "Bitumen", "MTO (Mineral Turpentine Oil)"],
        "states": ["Maharashtra", "Gujarat", "Rajasthan", "Goa", "MP"]
    },
    
    # Default/Fallback
    "DEFAULT": {
        "name": "Sales Manager",
        "phone": "+919875877807",  # Your default number
        "products": [],  # All products
        "states": []  # All states
    }
}

# Auto-notification settings
AUTO_NOTIFY_ENABLED = True  # Set to False to disable auto-notifications
AUTO_NOTIFY_MIN_CONFIDENCE = 0.75  # Only notify for leads with confidence >= 75%
