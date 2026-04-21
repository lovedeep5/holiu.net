export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[];

export interface Database {
  public: {
    Tables: {
      products: {
        Row: {
          id: string;
          slug: string;
          name_en: string;
          name_de: string | null;
          description_en: string | null;
          description_de: string | null;
          category: string;
          price: number;
          currency: string;
          stripe_price_id: string | null;
          file_path: string | null;
          thumbnail_url: string | null;
          featured: boolean;
          published: boolean;
          created_at: string;
        };
        Insert: Omit<Database["public"]["Tables"]["products"]["Row"], "id" | "created_at">;
        Update: Partial<Database["public"]["Tables"]["products"]["Insert"]>;
        Relationships: [];
      };
      profiles: {
        Row: {
          id: string;
          email: string;
          full_name: string | null;
          role: string;
          created_at: string;
        };
        Insert: Omit<Database["public"]["Tables"]["profiles"]["Row"], "created_at">;
        Update: Partial<Database["public"]["Tables"]["profiles"]["Insert"]>;
        Relationships: [];
      };
      orders: {
        Row: {
          id: string;
          stripe_session_id: string;
          customer_email: string;
          user_id: string | null;
          status: "pending" | "paid" | "failed";
          created_at: string;
        };
        Insert: Omit<Database["public"]["Tables"]["orders"]["Row"], "id" | "created_at">;
        Update: Partial<Database["public"]["Tables"]["orders"]["Insert"]>;
        Relationships: [];
      };
      order_items: {
        Row: {
          id: string;
          order_id: string;
          product_id: string;
          price_paid: number;
        };
        Insert: Omit<Database["public"]["Tables"]["order_items"]["Row"], "id">;
        Update: Partial<Database["public"]["Tables"]["order_items"]["Insert"]>;
        Relationships: [];
      };
      download_tokens: {
        Row: {
          id: string;
          token: string;
          order_item_id: string;
          product_id: string;
          email: string;
          expires_at: string;
          used: boolean;
          created_at: string;
        };
        Insert: Omit<Database["public"]["Tables"]["download_tokens"]["Row"], "id" | "created_at">;
        Update: Partial<Database["public"]["Tables"]["download_tokens"]["Insert"]>;
        Relationships: [];
      };
      leads: {
        Row: {
          id: string;
          name: string | null;
          email: string;
          message: string | null;
          source: string | null;
          created_at: string;
        };
        Insert: Omit<Database["public"]["Tables"]["leads"]["Row"], "id" | "created_at">;
        Update: Partial<Database["public"]["Tables"]["leads"]["Insert"]>;
        Relationships: [];
      };
    };
    Views: Record<string, never>;
    Functions: Record<string, never>;
    Enums: Record<string, never>;
    CompositeTypes: Record<string, never>;
  };
}

export type Product = Database["public"]["Tables"]["products"]["Row"];
export type Order = Database["public"]["Tables"]["orders"]["Row"];
export type OrderItem = Database["public"]["Tables"]["order_items"]["Row"];
export type DownloadToken = Database["public"]["Tables"]["download_tokens"]["Row"];
export type Lead = Database["public"]["Tables"]["leads"]["Row"];
export type Profile = Database["public"]["Tables"]["profiles"]["Row"];
