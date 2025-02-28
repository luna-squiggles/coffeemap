
export interface CoffeeShop {
  id: string;
  name: string;
  x: number;
  y: number;
  address: string;
  laptopFriendly: string;
  wifiSpeed: string;
  wifiStatus: string;
  vibe?: number;
  description?: string;
  outletCount?: string;
  quietness?: number;
  imageUrl?: string;
  addressUrl?: string;
  websiteUrl?: string;
  openingHours?: string;
}

export interface PopupPosition {
  x: number;
  y: number;
}
