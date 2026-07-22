export type Screen = 'landing' | 'repair' | 'catalog' | 'dashboard' | 'checkout';

export type Language = 'en' | 'ar';

export type Currency = 'USD' | 'DZD';

export interface Wilaya {
  code: string;
  nameEn: string;
  nameAr: string;
}

export interface Product {
  id: string;
  name: string;
  category: 'smartphones' | 'refurbished' | 'parts' | 'tools';
  brand: 'Apple' | 'Samsung' | 'Google' | 'Other';
  condition: 'New' | 'Refurbished' | 'Certified A+' | 'Pre-Owned' | 'OEM Quality' | 'Pro Toolset' | 'High Cap';
  specEn: string;
  specAr: string;
  priceUsd: number;
  rating: number;
  image: string;
  images?: string[];
  warrantyMonths?: number;
}

export interface CartItem {
  product: Product;
  quantity: number;
}

export interface Order {
  id: string;
  customerName: string;
  customerPhone: string;
  wilayaCode: string;
  address: string;
  paymentMethod: 'cod' | 'baridimob';
  items: {
    productId: string;
    productName: string;
    priceUsd: number;
    quantity: number;
  }[];
  totalUsd: number;
  status: 'pending' | 'shipped' | 'delivered';
  date: string;
}

export interface RepairTicket {
  id: string;
  device: string;
  deviceType: 'smartphone' | 'tablet' | 'watch' | 'laptop' | 'other';
  customer: string;
  wilayaCode: string;
  status: 'diagnostic' | 'waiting' | 'completed';
  technician: string;
}

export interface InventoryAlert {
  id: string;
  partName: string;
  stock: number;
  criticalLimit: number;
}
