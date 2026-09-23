import {
  PricingCategoryConfig,
  ProjectTier,
  DesignComplexity,
  TechnicalComplexity,
  IntegrationComplexity,
  DataComplexity,
  UserComplexity,
  SecurityRequirement,
  DeploymentType,
  UrgencyLevel,
  StrategicClientValue,
  RelationshipType,
  RecurringServiceItem
} from './types';

export const DEFAULT_INTERNAL_HOURLY_RATE_ETB = 650; // Melhek internal engineering cost per hour

export const PRICING_TIER_CONFIG: Record<ProjectTier, { name: string; multiplier: number; description: string }> = {
  FOUNDATION: {
    name: 'FOUNDATION',
    multiplier: 1.0,
    description: 'Simple implementation. Limited scope. Low operational risk.'
  },
  PROFESSIONAL: {
    name: 'PROFESSIONAL',
    multiplier: 1.45,
    description: 'Serious business solution. Moderate customization. Professional design and functionality.'
  },
  ADVANCED: {
    name: 'ADVANCED',
    multiplier: 2.1,
    description: 'Complex workflows. Multiple modules, data flows, and integrations. High business impact.'
  },
  ENTERPRISE: {
    name: 'ENTERPRISE',
    multiplier: 3.2,
    description: 'High operational scale. Large organization, strict security, multi-branch, high SLA requirements.'
  }
};

export const PRICING_CATEGORIES: PricingCategoryConfig[] = [
  {
    id: 'website',
    name: 'Website',
    division: 'Melhek Digital & AI Labs',
    basePriceETB: 35000,
    description: 'Corporate business website, landing page, show-case portfolio, or digital presence system.',
    commonObjectives: [
      'Build online presence',
      'Generate leads',
      'Improve customer experience',
      'Showcase products & services',
      'SEO & Search Authority'
    ],
    defaultScope: [
      { id: 'web-resp-design', name: 'Professional Responsive Design', category: 'Website', basePriceETB: 8000, description: 'Tailored modern UI with mobile optimization' },
      { id: 'web-homepage', name: 'Homepage Layout & Hero Animation', category: 'Website', basePriceETB: 5000, description: 'High impact initial landing presentation' },
      { id: 'web-about-services', name: 'About & Services Pages', category: 'Website', basePriceETB: 6000, description: 'Comprehensive organization information' },
      { id: 'web-portfolio-products', name: 'Portfolio / Products Showcase', category: 'Website', basePriceETB: 8000, description: 'Visual gallery or product catalog' },
      { id: 'web-contact-maps', name: 'Contact Forms & Location Maps', category: 'Website', basePriceETB: 4000, description: 'Interactive contact desk and Google Maps' },
      { id: 'web-blog-faq', name: 'Blog / News & FAQ Engine', category: 'Website', basePriceETB: 7000, description: 'Article publisher and answer accordion' },
      { id: 'web-seo-foundation', name: 'SEO Foundation & Speed Tuning', category: 'Website', basePriceETB: 6000, description: 'Meta tags, sitemaps, structural schema, & performance' },
      { id: 'web-multi-lang', name: 'Multi-Language Support (Amharic/English)', category: 'Website', basePriceETB: 12000, description: 'Dual language toggle and localization' },
      { id: 'web-whatsapp-social', name: 'WhatsApp & Social Media Sync', category: 'Website', basePriceETB: 3500, description: 'Direct messaging and social click-throughs' },
      { id: 'web-cms', name: 'Content Management System (CMS)', category: 'Website', basePriceETB: 15000, description: 'Self-service editing panel for company staff' },
      { id: 'web-analytics', name: 'Analytics & Visitor Tracking', category: 'Website', basePriceETB: 5000, description: 'Google Analytics & conversion funnel tracking' },
      { id: 'web-ai-chatbot', name: 'AI Lead Capture Chatbot', category: 'Website', basePriceETB: 20000, description: 'Automated 24/7 lead qualification bot' }
    ]
  },
  {
    id: 'business-management-system',
    name: 'Business Management System',
    division: 'Melhek Hospitality & Business Systems',
    basePriceETB: 120000,
    description: 'Custom ERP/BMS for retail, pharmacy, supermarket, gym, or operational governance.',
    commonObjectives: [
      'Automate operations',
      'Manage inventory',
      'Manage sales',
      'Manage employees',
      'Reduce manual work',
      'Improve management visibility'
    ],
    defaultScope: [
      { id: 'bms-auth-roles', name: 'Authentication & Role-Based Access', category: 'Management', basePriceETB: 15000, description: 'Multi-user roles (Admin, Cashier, Manager, Staff)' },
      { id: 'bms-dashboard', name: 'Executive Analytics Dashboard', category: 'Management', basePriceETB: 18000, description: 'Real-time sales, inventory, and revenue charts' },
      { id: 'bms-customer-mgmt', name: 'Customer Database & Accounts', category: 'Management', basePriceETB: 12000, description: 'Profiles, purchase history, and credit records' },
      { id: 'bms-inventory-stock', name: 'Inventory & Stock Reorder Engine', category: 'Management', basePriceETB: 25000, description: 'SKUs, stock alerts, batches, and reorder levels' },
      { id: 'bms-pos-checkout', name: 'Point of Sale (POS) Cashier Checkout', category: 'Management', basePriceETB: 30000, description: 'Rapid register checkout, receipts, & sales logging' },
      { id: 'bms-barcode-printing', name: 'Barcode Scanner & Thermal Printing', category: 'Management', basePriceETB: 12000, description: 'Hardware integration for labels and print receipts' },
      { id: 'bms-supplier-purchases', name: 'Suppliers & Purchase Order System', category: 'Management', basePriceETB: 18000, description: 'Supplier invoices, receiving, and stock incoming' },
      { id: 'bms-financial-reports', name: 'Financial Summaries & Expense Logs', category: 'Management', basePriceETB: 20000, description: 'Profit/loss metrics, daily balance, and expense tracking' },
      { id: 'bms-multi-branch', name: 'Multi-Branch Synchronization', category: 'Management', basePriceETB: 45000, description: 'Consolidated database across multiple physical store locations', dependsOn: ['bms-auth-roles'] },
      { id: 'bms-audit-logs', name: 'System Audit Logs & Activity History', category: 'Management', basePriceETB: 14000, description: 'Tamper-proof log of user actions and inventory adjustments' },
      { id: 'bms-data-migration', name: 'Legacy Data Import & Migration', category: 'Management', basePriceETB: 22000, description: 'Cleaning and loading existing Excel/CSV files' }
    ]
  },
  {
    id: 'hospitality-system',
    name: 'Hospitality System',
    division: 'Melhek Hospitality & Business Systems',
    basePriceETB: 150000,
    description: 'Hotel Property Management System (PMS), guest booking, restaurant QR ordering, and room controls.',
    commonObjectives: [
      'Increase bookings',
      'Improve customer experience',
      'Automate operations',
      'Manage employees',
      'Centralize business data'
    ],
    defaultScope: [
      { id: 'hosp-room-mgmt', name: 'Room Inventory & Pricing Matrix', category: 'Hospitality', basePriceETB: 20000, description: 'Room types, seasonal rates, & status tracker' },
      { id: 'hosp-res-calendar', name: 'Reservation Calendar & Booking Desk', category: 'Hospitality', basePriceETB: 35000, description: 'Visual interactive timeline of check-ins and availability' },
      { id: 'hosp-checkin-checkout', name: 'Front Desk Check-in / Check-out', category: 'Hospitality', basePriceETB: 18000, description: 'Guest folio management, ID recording, & billing' },
      { id: 'hosp-housekeeping', name: 'Housekeeping & Maintenance Tracker', category: 'Hospitality', basePriceETB: 15000, description: 'Room cleaning statuses and maintenance alerts' },
      { id: 'hosp-rest-sync', name: 'Restaurant & Bar POS Integration', category: 'Hospitality', basePriceETB: 30000, description: 'Room charges from restaurant/bar to room bill' },
      { id: 'hosp-guest-portal', name: 'Guest Web Portal / Direct Booking Engine', category: 'Hospitality', basePriceETB: 45000, description: 'Online room reservations and pre-arrival requests' },
      { id: 'hosp-occupancy-analytics', name: 'Occupancy & RevPAR Analytics', category: 'Hospitality', basePriceETB: 22000, description: 'Management reporting on revenue per available room' },
      { id: 'hosp-multi-branch', name: 'Multi-Hotel Property Support', category: 'Hospitality', basePriceETB: 60000, description: 'Chain management across hotel properties' }
    ]
  },
  {
    id: 'ai-solution',
    name: 'AI Solution',
    division: 'Melhek Digital & AI Labs',
    basePriceETB: 90000,
    description: 'Knowledge-base chatbots, RAG pipelines, AI document processing, and operational AI assistants.',
    commonObjectives: [
      'AI automation',
      'Reduce manual work',
      'Improve customer experience',
      'Automate operations',
      'Generate leads'
    ],
    defaultScope: [
      { id: 'ai-custom-chatbot', name: 'Custom AI Customer Support Chatbot', category: 'AI', basePriceETB: 25000, description: '24/7 web bot trained on business FAQs' },
      { id: 'ai-rag-kb', name: 'RAG Knowledge-Base System', category: 'AI', basePriceETB: 45000, description: 'Vector store search over company PDFs and manuals' },
      { id: 'ai-lead-qualifier', name: 'AI Lead Qualification Engine', category: 'AI', basePriceETB: 30000, description: 'Automated intent parsing and lead scoring' },
      { id: 'ai-doc-processor', name: 'AI Document Processing & OCR', category: 'AI', basePriceETB: 50000, description: 'Extracting data from invoices, IDs, and forms' },
      { id: 'ai-analytics-insights', name: 'AI Business Analytics & Trends', category: 'AI', basePriceETB: 40000, description: 'Automated natural language reports on sales data' },
      { id: 'ai-workflow-automation', name: 'Custom AI Script & Task Automation', category: 'AI', basePriceETB: 35000, description: 'Automated content parsing and email responses' }
    ]
  },
  {
    id: 'ecommerce',
    name: 'E-commerce',
    division: 'Melhek Digital & AI Labs',
    basePriceETB: 75000,
    description: 'Online store, digital storefront, local payment gateways, product catalog, and delivery tracking.',
    commonObjectives: [
      'Generate leads',
      'Manage sales',
      'Improve customer experience',
      'Manage inventory',
      'Build online presence'
    ],
    defaultScope: [
      { id: 'ecom-catalog-search', name: 'Product Catalog, Search & Filters', category: 'E-commerce', basePriceETB: 20000, description: 'Multi-category catalog with dynamic search' },
      { id: 'ecom-cart-checkout', name: 'Shopping Cart & Secure Checkout', category: 'E-commerce', basePriceETB: 22000, description: 'Frictionless order placement process' },
      { id: 'ecom-eth-payment', name: 'Local Payment Integration (Telebirr/CBE Birr)', category: 'E-commerce', basePriceETB: 30000, description: 'Direct mobile wallet payment webhooks' },
      { id: 'ecom-customer-accounts', name: 'Customer Accounts & Order History', category: 'E-commerce', basePriceETB: 15000, description: 'Logins, saved addresses, and status history' },
      { id: 'ecom-inventory-sync', name: 'E-commerce Inventory Manager', category: 'E-commerce', basePriceETB: 18000, description: 'Stock deduction on order placement' },
      { id: 'ecom-admin-orders', name: 'Merchant Order Processing Desk', category: 'E-commerce', basePriceETB: 25000, description: 'Fulfillment workflow, receipts, & status updates' },
      { id: 'ecom-coupons-discounts', name: 'Coupons & Promotional Engine', category: 'E-commerce', basePriceETB: 12000, description: 'Discount codes and seasonal promotions' }
    ]
  },
  {
    id: 'web-application',
    name: 'Web Application',
    division: 'Melhek Digital & AI Labs',
    basePriceETB: 85000,
    description: 'Custom SaaS app, client portal, interactive web dashboard, or workflow engine.',
    commonObjectives: [
      'Automate operations',
      'Centralize business data',
      'Improve customer experience',
      'Reduce manual work'
    ],
    defaultScope: [
      { id: 'webapp-auth-jwt', name: 'Secure Authentication & Session Desk', category: 'Web App', basePriceETB: 15000, description: 'Email/Password, OTP, and session security' },
      { id: 'webapp-dashboard', name: 'Interactive Dynamic Dashboard', category: 'Web App', basePriceETB: 25000, description: 'User-specific metrics and action tiles' },
      { id: 'webapp-crud-engine', name: 'Custom Data Tables & CRUD Forms', category: 'Web App', basePriceETB: 30000, description: 'Structured record creation and management' },
      { id: 'webapp-notifications', name: 'In-App & Email/SMS Notifications', category: 'Web App', basePriceETB: 16000, description: 'Automated alert trigger engine' },
      { id: 'webapp-file-mgmt', name: 'Secure File Storage & Document Hub', category: 'Web App', basePriceETB: 20000, description: 'Upload, cloud storage, and view permissions' },
      { id: 'webapp-export-reports', name: 'PDF / Excel Data Exporter', category: 'Web App', basePriceETB: 14000, description: 'One-click document report generation' }
    ]
  },
  {
    id: 'erp-enterprise',
    name: 'ERP / Enterprise System',
    division: 'Melhek Enterprise Solutions',
    basePriceETB: 250000,
    description: 'Full enterprise resource planning covering multi-department operations, HR, finance, and supply chain.',
    commonObjectives: [
      'Centralize business data',
      'Improve management visibility',
      'Digital transformation',
      'Risk reduction',
      'Automate operations'
    ],
    defaultScope: [
      { id: 'erp-core-auth', name: 'Enterprise Identity & SSO Hub', category: 'ERP', basePriceETB: 35000, description: 'Centralized access control and single sign-on' },
      { id: 'erp-financial-ledger', name: 'General Ledger & Chart of Accounts', category: 'ERP', basePriceETB: 60000, description: 'Double-entry accounting and financial compliance' },
      { id: 'erp-hr-payroll', name: 'HR, Attendance & Ethiopian Payroll Engine', category: 'ERP', basePriceETB: 50000, description: 'Employee records, attendance, tax deductions, & payslips' },
      { id: 'erp-procurement', name: 'Procurement & Vendor Management', category: 'ERP', basePriceETB: 45000, description: 'RFQs, purchase orders, approval matrix, & vendor ratings' },
      { id: 'erp-inventory-wh', name: 'Multi-Warehouse Inventory Control', category: 'ERP', basePriceETB: 55000, description: 'Warehouse transfers, stock valuation, & lot tracking' },
      { id: 'erp-exec-bi', name: 'Executive BI & Profitability Suite', category: 'ERP', basePriceETB: 40000, description: 'Company-wide analytics and departmental KPIs' }
    ]
  },
  {
    id: 'business-automation',
    name: 'Business Automation',
    division: 'Melhek Digital & AI Labs',
    basePriceETB: 65000,
    description: 'Workflow scripts, API connectors, webhooks, automated document generation, and task scripts.',
    commonObjectives: [
      'Automate operations',
      'Reduce manual work',
      'Cost reduction',
      'Operational Efficiency'
    ],
    defaultScope: [
      { id: 'auto-script-engine', name: 'Automated Task Execution Engine', category: 'Automation', basePriceETB: 20000, description: 'Cron/scheduled task routines for business data' },
      { id: 'auto-api-bridge', name: 'API Integration Bridge', category: 'Automation', basePriceETB: 25000, description: 'Connecting legacy software with modern web systems' },
      { id: 'auto-pdf-gen', name: 'Automated Invoice & Document Generator', category: 'Automation', basePriceETB: 18000, description: 'PDF creation from database triggers' },
      { id: 'auto-sms-telegram', name: 'Telegram Bot & SMS Alert System', category: 'Automation', basePriceETB: 22000, description: 'Instant notification sending to staff or clients' }
    ]
  },
  {
    id: 'mobile-application',
    name: 'Mobile Application',
    division: 'Melhek Digital & AI Labs',
    basePriceETB: 110000,
    description: 'Cross-platform iOS and Android mobile app for field staff, customers, or internal operations.',
    commonObjectives: [
      'Improve customer experience',
      'Build online presence',
      'Automate operations',
      'Manage customers'
    ],
    defaultScope: [
      { id: 'mob-cross-platform', name: 'Flutter / React Native Mobile Engine', category: 'Mobile', basePriceETB: 35000, description: 'Dual build for Android and iOS' },
      { id: 'mob-push-notif', name: 'Push Notification Engine', category: 'Mobile', basePriceETB: 15000, description: 'FCM push alerts and user messaging' },
      { id: 'mob-offline-sync', name: 'Offline Storage & Sync Engine', category: 'Mobile', basePriceETB: 30000, description: 'Local database caching and server sync upon reconnect' },
      { id: 'mob-location-maps', name: 'GPS & Location Tracking', category: 'Mobile', basePriceETB: 20000, description: 'Driver / field staff location tracking' }
    ]
  },
  {
    id: 'custom-digital-platform',
    name: 'Custom Digital Platform',
    division: 'Melhek Digital & AI Labs',
    basePriceETB: 130000,
    description: 'Tailored multi-portal ecosystem, marketplace, or high-concurrency custom application.',
    commonObjectives: [
      'Digital transformation',
      'Centralize business data',
      'Revenue Growth',
      'Scalability'
    ],
    defaultScope: [
      { id: 'plat-multi-portal', name: 'Multi-Tenant Portal Framework', category: 'Platform', basePriceETB: 40000, description: 'Dedicated views for Customers, Vendors, and Admins' },
      { id: 'plat-payment-gateway', name: 'Multi-Payment Settlement Engine', category: 'Platform', basePriceETB: 35000, description: 'Integrating Telebirr, CBE Birr, Chapa, and Cards' },
      { id: 'plat-realtime-sockets', name: 'Real-Time WebSockets Engine', category: 'Platform', basePriceETB: 30000, description: 'Instant live data stream updates without page refresh' }
    ]
  },
  {
    id: 'infrastructure-networking',
    name: 'Infrastructure / Networking',
    division: 'Melhek Infrastructure & Cloud',
    basePriceETB: 80000,
    description: 'Cloud server setup, local network architecture, database replication, and server hardening.',
    commonObjectives: [
      'Risk reduction',
      'Operational Efficiency',
      'Centralize business data',
      'Scalability'
    ],
    defaultScope: [
      { id: 'infra-cloud-setup', name: 'VPS / Cloud Server Setup & Hardening', category: 'Infrastructure', basePriceETB: 25000, description: 'Linux server config, firewall, Nginx, & SSL' },
      { id: 'infra-db-replication', name: 'Database Clustering & Backup Sync', category: 'Infrastructure', basePriceETB: 35000, description: 'Failover database replication and scheduled snapshots' }
    ]
  },
  {
    id: 'cybersecurity',
    name: 'Cybersecurity',
    division: 'Melhek Enterprise Solutions',
    basePriceETB: 95000,
    description: 'Vulnerability assessment, code penetration testing, database field encryption, and audit preparedness.',
    commonObjectives: [
      'Risk reduction',
      'Centralize business data',
      'Management Visibility'
    ],
    defaultScope: [
      { id: 'sec-pentest', name: 'Application Vulnerability Assessment', category: 'Security', basePriceETB: 35000, description: 'OWASP Top 10 security audit and report' },
      { id: 'sec-field-enc', name: 'Database Field-Level Encryption', category: 'Security', basePriceETB: 30000, description: 'Protecting sensitive PII and financial records at rest' }
    ]
  },
  {
    id: 'digital-transformation',
    name: 'Digital Transformation',
    division: 'Melhek Enterprise Solutions',
    basePriceETB: 140000,
    description: 'End-to-end organizational technology overhaul, workflow digitizing, staff training, and strategy.',
    commonObjectives: [
      'Digital transformation',
      'Operational Efficiency',
      'Cost Reduction',
      'Revenue Growth'
    ],
    defaultScope: [
      { id: 'dt-audit-roadmap', name: 'Digital Maturity Audit & Strategy Blueprint', category: 'Transformation', basePriceETB: 40000, description: 'Comprehensive audit of current manual processes' },
      { id: 'dt-staff-training', name: 'Staff Training & Change Management', category: 'Transformation', basePriceETB: 30000, description: 'On-site training sessions and operational handbooks' }
    ]
  },
  {
    id: 'other-custom',
    name: 'Other / Custom',
    division: 'Melhek Enterprise Solutions',
    basePriceETB: 60000,
    description: 'Specialized technology engagement customized according to exact business specifications.',
    commonObjectives: [
      'Digital Presence',
      'Operational Efficiency',
      'Custom Solution'
    ],
    defaultScope: [
      { id: 'custom-scope-item', name: 'Custom Technical Deliverable', category: 'Custom', basePriceETB: 30000, description: 'Tailored technical milestone based on discovery' }
    ]
  }
];

export const COMPLEXITY_MODIFIERS = {
  design: {
    Standard: { multiplier: 1.0, costETB: 0 },
    Professional: { multiplier: 1.15, costETB: 8000 },
    Premium: { multiplier: 1.3, costETB: 18000 },
    'Highly Custom': { multiplier: 1.5, costETB: 35000 }
  } as Record<DesignComplexity, { multiplier: number; costETB: number }>,

  technical: {
    Low: { score: 1, multiplier: 1.0, costETB: 0 },
    Medium: { score: 3, multiplier: 1.2, costETB: 12000 },
    High: { score: 5, multiplier: 1.45, costETB: 28000 },
    'Very High': { score: 8, multiplier: 1.75, costETB: 50000 }
  } as Record<TechnicalComplexity, { score: number; multiplier: number; costETB: number }>,

  integration: {
    None: { score: 0, multiplier: 1.0, costETB: 0 },
    Basic: { score: 2, multiplier: 1.15, costETB: 10000 },
    Multiple: { score: 4, multiplier: 1.35, costETB: 25000 },
    Advanced: { score: 7, multiplier: 1.6, costETB: 48000 }
  } as Record<IntegrationComplexity, { score: number; multiplier: number; costETB: number }>,

  data: {
    Simple: { score: 0, costETB: 0 },
    'Existing data migration': { score: 2, costETB: 15000 },
    'Large dataset': { score: 4, costETB: 28000 },
    'Complex migration': { score: 6, costETB: 45000 }
  } as Record<DataComplexity, { score: number; costETB: number }>,

  user: {
    'Single user': { score: 0, multiplier: 1.0 },
    'Small team': { score: 1, multiplier: 1.1 },
    'Multi-role': { score: 3, multiplier: 1.25 },
    'Multi-branch': { score: 5, multiplier: 1.45 },
    Enterprise: { score: 8, multiplier: 1.7 }
  } as Record<UserComplexity, { score: number; multiplier: number }>,

  security: {
    Standard: { score: 1, costETB: 0 },
    Enhanced: { score: 2, costETB: 12000 },
    High: { score: 4, costETB: 25000 },
    Enterprise: { score: 7, costETB: 48000 }
  } as Record<SecurityRequirement, { score: number; costETB: number }>,

  deployment: {
    'Standard deployment': { costETB: 0 },
    'Custom infrastructure': { costETB: 15000 },
    'Advanced deployment': { costETB: 35000 }
  } as Record<DeploymentType, { costETB: number }>
};

export const COMMERCIAL_MODIFIERS = {
  urgency: {
    Normal: { multiplier: 1.0 },
    Priority: { multiplier: 1.2 },
    Urgent: { multiplier: 1.4 }
  } as Record<UrgencyLevel, { multiplier: number }>,

  strategicValue: {
    Low: { multiplier: 0.95 },
    Moderate: { multiplier: 1.0 },
    High: { multiplier: 1.15 },
    Strategic: { multiplier: 1.3 }
  } as Record<StrategicClientValue, { multiplier: number }>,

  relationship: {
    'New Client': { modifierPct: 0 },
    'Returning Client': { modifierPct: -0.05 },
    'Strategic Partner': { modifierPct: -0.1 }
  } as Record<RelationshipType, { modifierPct: number }>
};

export const DEFAULT_RECURRING_SERVICES: RecurringServiceItem[] = [
  { id: 'rec-hosting', name: 'Managed Cloud Hosting & SSL', cycle: 'Monthly', priceETB: 2500, description: 'High availability VPS, daily server management, and SSL renewal', selected: true },
  { id: 'rec-maint', name: 'Standard Technical Maintenance', cycle: 'Monthly', priceETB: 4000, description: 'Bug fixes, dependency updates, and minor code adjustments', selected: true },
  { id: 'rec-backup', name: 'Database Off-Site Backups', cycle: 'Monthly', priceETB: 1500, description: 'Automated encrypted off-site cloud backups every 24 hours', selected: true },
  { id: 'rec-support-sla', name: 'Priority Tech Support SLA (24hr response)', cycle: 'Monthly', priceETB: 6000, description: 'Dedicated engineer desk and priority issue resolution', selected: false },
  { id: 'rec-sec-monitor', name: 'Security Auditing & Monitoring', cycle: 'Monthly', priceETB: 5000, description: 'Automated firewall monitoring and intrusion prevention', selected: false },
  { id: 'rec-ai-api', name: 'AI API Gateway & Token Pool', cycle: 'Monthly', priceETB: 8000, description: 'Melhek managed AI API infrastructure quota', selected: false }
];
