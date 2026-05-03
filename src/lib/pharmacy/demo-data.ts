import type {
  Branch,
  DashboardKpi,
  Medicine,
  Prescription,
  Sale,
  Supplier,
} from "@/lib/pharmacy/types";

export const branchData: Branch[] = [
  { id: "b1", code: "ADD-01", name: "Bole Main Branch", city: "Addis Ababa", manager: "Marta H.", status: "active", dailyRevenue: 452300, stockHealth: 93 },
  { id: "b2", code: "ADD-02", name: "CMC Branch", city: "Addis Ababa", manager: "Samuel T.", status: "active", dailyRevenue: 318100, stockHealth: 89 },
  { id: "b3", code: "ADM-03", name: "Adama Branch", city: "Adama", manager: "Netsanet K.", status: "maintenance", dailyRevenue: 221500, stockHealth: 81 },
];

export const supplierData: Supplier[] = [
  { id: "s1", name: "EthioMed Distribution", contact: "+251911120000", rating: 4.7, onTimeDelivery: 96, outstandingBalance: 128000 },
  { id: "s2", name: "Nile Pharma Import", contact: "+251944221155", rating: 4.4, onTimeDelivery: 90, outstandingBalance: 84200 },
  { id: "s3", name: "AfriCare Bio", contact: "+251977003322", rating: 4.9, onTimeDelivery: 98, outstandingBalance: 32000 },
];

export const medicineData: Medicine[] = [
  { id: "m1", sku: "MEL-AMX-500", barcode: "100001", name: "Amoxicillin 500mg", genericName: "Amoxicillin", category: "Antibiotic", dosage: "Capsule", batchNo: "B2026-044", supplier: "EthioMed Distribution", branchId: "b1", inStock: 420, reorderLevel: 120, cost: 32, price: 45, expiryDate: "2027-02-18", status: "ok" },
  { id: "m2", sku: "MEL-PRC-500", barcode: "100002", name: "Paracetamol 500mg", genericName: "Acetaminophen", category: "Analgesic", dosage: "Tablet", batchNo: "B2025-988", supplier: "Nile Pharma Import", branchId: "b1", inStock: 88, reorderLevel: 100, cost: 8, price: 12, expiryDate: "2026-09-03", status: "low" },
  { id: "m3", sku: "MEL-INS-LNT", barcode: "100003", name: "Lantus Insulin", genericName: "Insulin Glargine", category: "Diabetes", dosage: "Injection", batchNo: "B2025-771", supplier: "AfriCare Bio", branchId: "b2", inStock: 52, reorderLevel: 35, cost: 790, price: 940, expiryDate: "2026-06-11", status: "expiring" },
  { id: "m4", sku: "MEL-OMZ-20", barcode: "100004", name: "Omeprazole 20mg", genericName: "Omeprazole", category: "GI", dosage: "Capsule", batchNo: "B2024-300", supplier: "EthioMed Distribution", branchId: "b3", inStock: 0, reorderLevel: 50, cost: 20, price: 28, expiryDate: "2025-03-20", status: "expired" },
  { id: "m5", sku: "MEL-CFX-400", barcode: "100005", name: "Cefixime 400mg", genericName: "Cefixime", category: "Antibiotic", dosage: "Tablet", batchNo: "B2026-071", supplier: "Nile Pharma Import", branchId: "b2", inStock: 146, reorderLevel: 60, cost: 52, price: 69, expiryDate: "2027-01-02", status: "ok" },
];

export const prescriptionData: Prescription[] = [
  { id: "rx1", rxNumber: "RX-2026-00812", patientName: "Helen Mekonnen", doctor: "Dr. Dawit G.", medicines: ["Amoxicillin 500mg", "Paracetamol 500mg"], createdAt: "2026-05-01T09:32:00Z", refillRemaining: 1, branchId: "b1", status: "dispensed" },
  { id: "rx2", rxNumber: "RX-2026-00844", patientName: "Abel Tadesse", doctor: "Dr. Sara M.", medicines: ["Lantus Insulin"], createdAt: "2026-05-03T10:12:00Z", refillRemaining: 2, branchId: "b2", status: "pending" },
  { id: "rx3", rxNumber: "RX-2026-00845", patientName: "Ruth Kibrom", doctor: "Dr. Yonas B.", medicines: ["Omeprazole 20mg"], createdAt: "2026-05-03T11:05:00Z", refillRemaining: 0, branchId: "b3", status: "archived" },
];

export const salesData: Sale[] = [
  { id: "t1", invoiceNo: "INV-99021", cashier: "Mimi A.", branchId: "b1", customer: "Walk-in", amount: 1840, tax: 276, discount: 55, paymentMethod: "card", createdAt: "2026-05-03T07:50:00Z" },
  { id: "t2", invoiceNo: "INV-99022", cashier: "Nahom D.", branchId: "b2", customer: "Corporate", amount: 4200, tax: 630, discount: 0, paymentMethod: "insurance", createdAt: "2026-05-03T08:12:00Z" },
  { id: "t3", invoiceNo: "INV-99023", cashier: "Mimi A.", branchId: "b1", customer: "Loyalty", amount: 960, tax: 144, discount: 40, paymentMethod: "mobile_money", createdAt: "2026-05-03T09:30:00Z" },
];

export const dashboardKpis: DashboardKpi[] = [
  { title: "Daily Gross Sales", value: "ETB 991,900", delta: "+8.4% vs yesterday", trend: "up", accent: "blue" },
  { title: "Net Profit Margin", value: "22.8%", delta: "+1.3% weekly", trend: "up", accent: "emerald" },
  { title: "Critical Low Stock", value: "14 SKUs", delta: "-3 resolved", trend: "neutral", accent: "cyan" },
  { title: "Expiring in 30 Days", value: "27 batches", delta: "+6 attention needed", trend: "down", accent: "navy" },
];

export const aiInsights = [
  "Demand spike predicted for pediatric antibiotics in Bole branch over next 9 days.",
  "Insulin category margin can improve 4.2% by shifting supplier mix toward AfriCare Bio.",
  "Two cashier sessions triggered anomaly flags due to discount override patterns.",
  "Recommended auto PO: Paracetamol 500mg, 1,200 units split across ADD-01 and ADD-02.",
];
