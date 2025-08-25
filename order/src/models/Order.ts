export interface Order {
  id: string;
  productId: string;
  quantity: number;
  status: "PENDING" | "CONFIRMED" | "CANCELLED";
  createdAt: Date;
}