import type { AppRole } from "@/lib/pharmacy/types";

const roleMatrix: Record<AppRole, string[]> = {
  SUPER_ADMIN: ["*"],
  OWNER: [
    "dashboard:read",
    "inventory:manage",
    "sales:manage",
    "prescriptions:manage",
    "finance:read",
    "branches:manage",
    "reports:export",
    "settings:manage",
  ],
  PHARMACIST: ["dashboard:read", "inventory:read", "prescriptions:manage", "sales:read"],
  CASHIER: ["dashboard:read", "sales:manage", "prescriptions:read"],
  INVENTORY_MANAGER: ["dashboard:read", "inventory:manage", "suppliers:manage", "reports:read"],
  ACCOUNTANT: ["dashboard:read", "finance:read", "reports:export"],
  SUPPLIER: ["supplier:portal"],
  STAFF: ["dashboard:read"],
};

export function can(role: AppRole, permission: string) {
  const permissions = roleMatrix[role] ?? [];
  return permissions.includes("*") || permissions.includes(permission);
}

export function enforceRole<T>(role: AppRole, permission: string, payload: T): T {
  if (!can(role, permission)) {
    throw new Error(`Permission denied: ${role} cannot ${permission}`);
  }
  return payload;
}
