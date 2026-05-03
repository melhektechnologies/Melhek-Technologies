export type AppRole =
  | "SUPER_ADMIN"
  | "OWNER"
  | "PHARMACIST"
  | "CASHIER"
  | "INVENTORY_MANAGER"
  | "ACCOUNTANT"
  | "SUPPLIER"
  | "STAFF";

export interface Branch {
  id: string;
  code: string;
  name: string;
  city: string;
  manager: string;
  status: "active" | "maintenance";
  dailyRevenue: number;
  stockHealth: number;
}

export interface Medicine {
  id: string;
  sku: string;
  barcode: string;
  name: string;
  genericName: string;
  category: string;
  dosage: string;
  batchNo: string;
  supplier: string;
  branchId: string;
  inStock: number;
  reorderLevel: number;
  cost: number;
  price: number;
  expiryDate: string;
  status: "ok" | "low" | "expiring" | "expired";
}

export interface Prescription {
  id: string;
  rxNumber: string;
  patientName: string;
  doctor: string;
  medicines: string[];
  createdAt: string;
  refillRemaining: number;
  branchId: string;
  status: "pending" | "dispensed" | "archived";
}

export interface Sale {
  id: string;
  invoiceNo: string;
  cashier: string;
  branchId: string;
  customer: string;
  amount: number;
  tax: number;
  discount: number;
  paymentMethod: "cash" | "card" | "mobile_money" | "insurance";
  createdAt: string;
}

export interface Supplier {
  id: string;
  name: string;
  contact: string;
  rating: number;
  onTimeDelivery: number;
  outstandingBalance: number;
}

export interface DashboardKpi {
  title: string;
  value: string;
  delta: string;
  trend: "up" | "down" | "neutral";
  accent: "blue" | "cyan" | "emerald" | "navy";
}
