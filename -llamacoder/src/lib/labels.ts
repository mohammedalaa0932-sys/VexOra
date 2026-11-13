import type { Role, RoomStatus, RequestStatus, StockLevel } from "@/store/AppContext";

export const roleLabels: Record<Role, string> = {
  owner: "مالك الفندق",
  manager: "مدير الفندق",
  receptionist: "موظف الاستقبال",
  housekeeping: "فريق الإشراف الداخلي",
  kitchen: "فريق المطبخ",
  warehouse: "أمين المخزن",
};

export const roleShortLabels: Record<Role, string> = {
  owner: "المالك",
  manager: "المدير",
  receptionist: "الاستقبال",
  housekeeping: "الإشراف الداخلي",
  kitchen: "المطبخ",
  warehouse: "المخزن",
};

export const roomStatusLabels: Record<RoomStatus, string> = {
  "Available": "متاحة",
  "Occupied": "مشغولة",
  "Checkout Pending": "بانتظار المغادرة",
  "Waiting for Cleaning": "بانتظار التنظيف",
  "Cleaning in Progress": "جارٍ التنظيف",
  "Waiting for Inspection": "بانتظار الفحص",
  "Ready for Guest": "جاهزة للنزيل",
};

export const requestStatusLabels: Record<RequestStatus, string> = {
  Pending: "قيد الانتظار",
  Approved: "تمت الموافقة",
  Preparing: "قيد التحضير",
  Delivered: "تم التسليم",
  Completed: "مكتمل",
  Rejected: "مرفوض",
};

export const stockLevelLabels: Record<StockLevel, string> = {
  Normal: "طبيعي",
  "Low Stock": "مخزون منخفض",
  Critical: "حرج",
  "Out of Stock": "نفد المخزون",
};

export const priorityLabels: Record<"Low" | "Medium" | "High", string> = {
  Low: "منخفضة",
  Medium: "متوسطة",
  High: "عالية",
};

export const departmentLabels: Record<string, string> = {
  Housekeeping: "الإشراف الداخلي",
  Kitchen: "المطبخ",
  Reception: "الاستقبال",
  Warehouse: "المخزن",
  Inventory: "المخزون",
};