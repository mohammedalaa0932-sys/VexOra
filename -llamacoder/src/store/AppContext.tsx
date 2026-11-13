import {
  createContext,
  useContext,
  useMemo,
  useReducer,
  type ReactNode,
} from "react";

export type Role =
  | "owner"
  | "manager"
  | "receptionist"
  | "housekeeping"
  | "kitchen"
  | "warehouse";

export type RoomStatus =
  | "Available"
  | "Occupied"
  | "Checkout Pending"
  | "Waiting for Cleaning"
  | "Cleaning in Progress"
  | "Waiting for Inspection"
  | "Ready for Guest";

export type RequestStatus =
  | "Pending"
  | "Approved"
  | "Preparing"
  | "Delivered"
  | "Completed"
  | "Rejected";

export type StockLevel = "Normal" | "Low Stock" | "Critical" | "Out of Stock";

export interface Room {
  id: string;
  number: string;
  type: string;
  status: RoomStatus;
  guest: string | null;
  lastCheckout: string | null;
  assignedTo: string | null;
  floor: number;
}

export interface InventoryItem {
  id: string;
  name: string;
  sku: string;
  category: string;
  quantity: number;
  minLevel: number;
  unit: string;
  unitPrice: number;
  supplier: string;
  lastUpdated: string;
}

export interface SupplyRequest {
  id: string;
  itemId: string;
  itemName: string;
  quantity: number;
  department: "Housekeeping" | "Kitchen";
  requestedBy: string;
  status: RequestStatus;
  createdAt: string;
  room?: string;
}

export interface Notification {
  id: string;
  title: string;
  department: string;
  time: string;
  priority: "Low" | "Medium" | "High";
  ref: string;
  read: boolean;
}

export interface StockMovement {
  id: string;
  itemId: string;
  itemName: string;
  type: "in" | "out";
  quantity: number;
  note: string;
  time: string;
}

interface State {
  role: Role;
  rooms: Room[];
  inventory: InventoryItem[];
  requests: SupplyRequest[];
  notifications: Notification[];
  movements: StockMovement[];
}

type Action =
  | { type: "SET_ROLE"; role: Role }
  | { type: "CHECKOUT"; roomId: string }
  | { type: "START_CLEANING"; roomId: string }
  | { type: "COMPLETE_CLEANING"; roomId: string }
  | { type: "MARK_READY"; roomId: string }
  | { type: "SUBMIT_REQUEST"; payload: Omit<SupplyRequest, "id" | "createdAt" | "status"> }
  | { type: "ADVANCE_REQUEST"; id: string; status: RequestStatus }
  | { type: "ADJUST_STOCK"; id: string; delta: number; note?: string }
  | { type: "UPDATE_ITEM"; id: string; patch: Partial<InventoryItem> }
  | { type: "MARK_NOTIFICATION_READ"; id: string }
  | { type: "MARK_ALL_READ" };

const initialRooms: Room[] = [
  { id: "r101", number: "101", type: "قياسية", status: "Occupied", guest: "أ. حسن", lastCheckout: null, assignedTo: null, floor: 1 },
  { id: "r102", number: "102", type: "قياسية", status: "Waiting for Cleaning", guest: null, lastCheckout: "09:12", assignedTo: "منى س.", floor: 1 },
  { id: "r103", number: "103", type: "ديلوكس", status: "Ready for Guest", guest: null, lastCheckout: "08:40", assignedTo: "منى س.", floor: 1 },
  { id: "r104", number: "104", type: "ديلوكس", status: "Cleaning in Progress", guest: null, lastCheckout: "09:30", assignedTo: "يارا ك.", floor: 1 },
  { id: "r201", number: "201", type: "جناح", status: "Occupied", guest: "ل. مورو", lastCheckout: null, assignedTo: null, floor: 2 },
  { id: "r202", number: "202", type: "قياسية", status: "Waiting for Inspection", guest: null, lastCheckout: "07:55", assignedTo: "يارا ك.", floor: 2 },
  { id: "r203", number: "203", type: "ديلوكس", status: "Available", guest: null, lastCheckout: "أمس", assignedTo: null, floor: 2 },
  { id: "r204", number: "204", type: "جناح", status: "Checkout Pending", guest: "ج. سميث", lastCheckout: null, assignedTo: null, floor: 2 },
  { id: "r301", number: "301", type: "قياسية", status: "Occupied", guest: "ك. علي", lastCheckout: null, assignedTo: null, floor: 3 },
  { id: "r302", number: "302", type: "ديلوكس", status: "Waiting for Cleaning", guest: null, lastCheckout: "10:05", assignedTo: "هنا ر.", floor: 3 },
  { id: "r303", number: "303", type: "جناح", status: "Ready for Guest", guest: null, lastCheckout: "08:10", assignedTo: "هنا ر.", floor: 3 },
  { id: "r304", number: "304", type: "قياسية", status: "Available", guest: null, lastCheckout: "أمس", assignedTo: null, floor: 3 },
];

const initialInventory: InventoryItem[] = [
  { id: "i1", name: "مناشف الحمام", sku: "HK-TWL-01", category: "الإشراف الداخلي", quantity: 120, minLevel: 150, unit: "قطعة", unitPrice: 45, supplier: "نيل تكستايلز", lastUpdated: "اليوم 09:40" },
  { id: "i2", name: "مناديل ورقية", sku: "HK-TIS-02", category: "الإشراف الداخلي", quantity: 100, minLevel: 150, unit: "علبة", unitPrice: 18, supplier: "القاهرة للورق", lastUpdated: "اليوم 08:15" },
  { id: "i3", name: "زجاجات شامبو", sku: "HK-SHM-03", category: "مستلزمات الضيافة", quantity: 340, minLevel: 200, unit: "قطعة", unitPrice: 12, supplier: "بيوتي سبلاي", lastUpdated: "أمس" },
  { id: "i4", name: "زيت الطهي", sku: "KT-OIL-04", category: "المطبخ", quantity: 8, minLevel: 20, unit: "لتر", unitPrice: 90, supplier: "فريش فودز", lastUpdated: "اليوم 07:50" },
  { id: "i5", name: "حبوب القهوة", sku: "KT-COF-05", category: "المطبخ", quantity: 0, minLevel: 10, unit: "كجم", unitPrice: 320, supplier: "روست هاوس", lastUpdated: "اليوم 06:30" },
  { id: "i6", name: "أغطية الأسرّة", sku: "HK-BED-06", category: "الإشراف الداخلي", quantity: 210, minLevel: 120, unit: "قطعة", unitPrice: 130, supplier: "نيل تكستايلز", lastUpdated: "منذ يومين" },
  { id: "i7", name: "سائل غسيل الأطباق", sku: "KT-DSH-07", category: "المطبخ", quantity: 45, minLevel: 30, unit: "لتر", unitPrice: 55, supplier: "كلين برو", lastUpdated: "أمس" },
  { id: "i8", name: "ورق التواليت", sku: "HK-TPR-08", category: "الإشراف الداخلي", quantity: 60, minLevel: 200, unit: "لفة", unitPrice: 9, supplier: "القاهرة للورق", lastUpdated: "اليوم 09:10" },
];

const initialRequests: SupplyRequest[] = [
  { id: "REQ-1042", itemId: "i1", itemName: "مناشف الحمام", quantity: 10, department: "Housekeeping", requestedBy: "منى س.", status: "Pending", createdAt: "اليوم 09:45", room: "102" },
  { id: "REQ-1041", itemId: "i4", itemName: "زيت الطهي", quantity: 5, department: "Kitchen", requestedBy: "الشيف كريم", status: "Preparing", createdAt: "اليوم 08:20" },
  { id: "REQ-1040", itemId: "i3", itemName: "زجاجات شامبو", quantity: 30, department: "Housekeeping", requestedBy: "يارا ك.", status: "Delivered", createdAt: "اليوم 07:10", room: "104" },
  { id: "REQ-1039", itemId: "i8", itemName: "ورق التواليت", quantity: 50, department: "Housekeeping", requestedBy: "هنا ر.", status: "Completed", createdAt: "أمس 18:30", room: "302" },
  { id: "REQ-1038", itemId: "i5", itemName: "حبوب القهوة", quantity: 3, department: "Kitchen", requestedBy: "الشيف كريم", status: "Rejected", createdAt: "أمس 16:00" },
];

const initialNotifications: Notification[] = [
  { id: "n1", title: "الغرفة 204 جاهزة للإشراف الداخلي", department: "الاستقبال", time: "منذ دقيقتين", priority: "High", ref: "الغرفة 204", read: false },
  { id: "n2", title: "طلب الإشراف الداخلي 10 مناشف حمام", department: "الإشراف الداخلي", time: "منذ 12 دقيقة", priority: "Medium", ref: "REQ-1042", read: false },
  { id: "n3", title: "المطبخ أبلغ عن نقص في زيت الطهي", department: "المطبخ", time: "منذ 40 دقيقة", priority: "High", ref: "REQ-1041", read: false },
  { id: "n4", title: "مخزون المناديل أقل من الحد الأدنى", department: "المخزون", time: "منذ ساعة", priority: "High", ref: "HK-TIS-02", read: true },
  { id: "n5", title: "طلب مخزون في انتظار الموافقة", department: "المخزن", time: "منذ ساعتين", priority: "Medium", ref: "REQ-1042", read: true },
];

const initialMovements: StockMovement[] = [
  { id: "m1", itemId: "i3", itemName: "زجاجات شامبو", type: "out", quantity: 30, note: "تم التسليم للإشراف الداخلي (REQ-1040)", time: "اليوم 07:15" },
  { id: "m2", itemId: "i8", itemName: "ورق التواليت", type: "out", quantity: 50, note: "تم التسليم للإشراف الداخلي (REQ-1039)", time: "أمس 18:35" },
  { id: "m3", itemId: "i6", itemName: "أغطية الأسرّة", type: "in", quantity: 100, note: "أمر شراء PO-2201", time: "منذ يومين" },
  { id: "m4", itemId: "i4", itemName: "زيت الطهي", type: "in", quantity: 20, note: "إعادة تخزين من فريش فودز", time: "منذ 3 أيام" },
];

const initialState: State = {
  role: "owner",
  rooms: initialRooms,
  inventory: initialInventory,
  requests: initialRequests,
  notifications: initialNotifications,
  movements: initialMovements,
};

export function stockLevel(item: InventoryItem): StockLevel {
  if (item.quantity <= 0) return "Out of Stock";
  if (item.quantity < item.minLevel * 0.5) return "Critical";
  if (item.quantity < item.minLevel) return "Low Stock";
  return "Normal";
}

function reducer(state: State, action: Action): State {
  switch (action.type) {
    case "SET_ROLE":
      return { ...state, role: action.role };
    case "CHECKOUT": {
      const room = state.rooms.find((r) => r.id === action.roomId);
      if (!room) return state;
      const time = new Date().toLocaleTimeString("ar-EG", { hour: "2-digit", minute: "2-digit" });
      return {
        ...state,
        rooms: state.rooms.map((r) =>
          r.id === action.roomId
            ? { ...r, status: "Waiting for Cleaning", guest: null, lastCheckout: time, assignedTo: "منى س." }
            : r
        ),
        notifications: [
          {
            id: `n${Date.now()}`,
            title: `الغرفة ${room.number} جاهزة للإشراف الداخلي`,
            department: "الاستقبال",
            time: "الآن",
            priority: "High",
            ref: `الغرفة ${room.number}`,
            read: false,
          },
          ...state.notifications,
        ],
      };
    }
    case "START_CLEANING":
      return {
        ...state,
        rooms: state.rooms.map((r) =>
          r.id === action.roomId ? { ...r, status: "Cleaning in Progress" } : r
        ),
      };
    case "COMPLETE_CLEANING":
      return {
        ...state,
        rooms: state.rooms.map((r) =>
          r.id === action.roomId ? { ...r, status: "Waiting for Inspection" } : r
        ),
      };
    case "MARK_READY":
      return {
        ...state,
        rooms: state.rooms.map((r) =>
          r.id === action.roomId ? { ...r, status: "Ready for Guest" } : r
        ),
      };
    case "SUBMIT_REQUEST": {
      const id = `REQ-${1043 + state.requests.length}`;
      const req: SupplyRequest = { ...action.payload, id, createdAt: "الآن", status: "Pending" };
      return {
        ...state,
        requests: [req, ...state.requests],
        notifications: [
          {
            id: `n${Date.now()}`,
            title: `${req.department === "Kitchen" ? "المطبخ" : "الإشراف الداخلي"} طلب ${req.quantity} ${req.itemName}`,
            department: req.department === "Kitchen" ? "المطبخ" : "الإشراف الداخلي",
            time: "الآن",
            priority: "Medium",
            ref: id,
            read: false,
          },
          ...state.notifications,
        ],
      };
    }
    case "ADVANCE_REQUEST": {
      const req = state.requests.find((r) => r.id === action.id);
      if (!req) return state;
      const next = state.requests.map((r) =>
        r.id === action.id ? { ...r, status: action.status } : r
      );
      let inventory = state.inventory;
      let movements = state.movements;
      if (action.status === "Delivered") {
        inventory = state.inventory.map((it) =>
          it.id === req.itemId
            ? { ...it, quantity: Math.max(0, it.quantity - req.quantity), lastUpdated: "الآن" }
            : it
        );
        movements = [
          {
            id: `m${Date.now()}`,
            itemId: req.itemId,
            itemName: req.itemName,
            type: "out",
            quantity: req.quantity,
            note: `تم التسليم إلى ${req.department === "Kitchen" ? "المطبخ" : "الإشراف الداخلي"} (${req.id})`,
            time: "الآن",
          },
          ...state.movements,
        ];
      }
      return { ...state, requests: next, inventory, movements };
    }
    case "ADJUST_STOCK": {
      const item = state.inventory.find((i) => i.id === action.id);
      if (!item) return state;
      const inventory = state.inventory.map((it) =>
        it.id === action.id
          ? { ...it, quantity: Math.max(0, it.quantity + action.delta), lastUpdated: "الآن" }
          : it
      );
      const movements: StockMovement[] = [
        {
          id: `m${Date.now()}`,
          itemId: item.id,
          itemName: item.name,
          type: action.delta >= 0 ? "in" : "out",
          quantity: Math.abs(action.delta),
          note: action.note ?? "تعديل يدوي",
          time: "الآن",
        },
        ...state.movements,
      ];
      return { ...state, inventory, movements };
    }
    case "UPDATE_ITEM":
      return {
        ...state,
        inventory: state.inventory.map((it) =>
          it.id === action.id ? { ...it, ...action.patch, lastUpdated: "الآن" } : it
        ),
      };
    case "MARK_NOTIFICATION_READ":
      return {
        ...state,
        notifications: state.notifications.map((n) =>
          n.id === action.id ? { ...n, read: true } : n
        ),
      };
    case "MARK_ALL_READ":
      return {
        ...state,
        notifications: state.notifications.map((n) => ({ ...n, read: true })),
      };
    default:
      return state;
  }
}

interface Ctx extends State {
  dispatch: React.Dispatch<Action>;
}

const AppContext = createContext<Ctx | null>(null);

export function AppProvider({ children }: { children: ReactNode }) {
  const [state, dispatch] = useReducer(reducer, initialState);
  const value = useMemo(() => ({ ...state, dispatch }), [state]);
  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
}

export function useApp() {
  const ctx = useContext(AppContext);
  if (!ctx) throw new Error("useApp must be used within AppProvider");
  return ctx;
}