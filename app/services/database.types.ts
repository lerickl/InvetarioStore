export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export interface Database {
  public: {
    Tables: {
      customers: {
        Row: {
          direccion: string | null
          dni: string | null
          email: string | null
          id: string
          image_url: string | null
          name: string | null
          paywith: string | null
        }
        Insert: {
          direccion?: string | null
          dni?: string | null
          email?: string | null
          id?: string
          image_url?: string | null
          name?: string | null
          paywith?: string | null
        }
        Update: {
          direccion?: string | null
          dni?: string | null
          email?: string | null
          id?: string
          image_url?: string | null
          name?: string | null
          paywith?: string | null
        }
        Relationships: []
      }
      DataInvoice: {
        Row: {
          id: string
          id_invoice: string
          id_product: string | null
          name_product: string | null
          quantity: number | null
          subtotal: string | null
        }
        Insert: {
          id?: string
          id_invoice: string
          id_product?: string | null
          name_product?: string | null
          quantity?: number | null
          subtotal?: string | null
        }
        Update: {
          id?: string
          id_invoice?: string
          id_product?: string | null
          name_product?: string | null
          quantity?: number | null
          subtotal?: string | null
        }
        Relationships: []
      }
      invoices: {
        Row: {
          amount: number
          customer_id: string | null
          date: string
          id: string
          status: string
        }
        Insert: {
          amount: number
          customer_id?: string | null
          date?: string
          id?: string
          status: string
        }
        Update: {
          amount?: number
          customer_id?: string | null
          date?: string
          id?: string
          status?: string
        }
        Relationships: []
      }
      products: {
        Row: {
          barcode: string | null
          category: string | null
          created_at: string
          description: string | null
          id: string
          id_product: string | null
          name: string | null
          price: number | null
          stock: number | null
          units: number | null
          urlimage: string | null
        }
        Insert: {
          barcode?: string | null
          category?: string | null
          created_at?: string
          description?: string | null
          id?: string
          id_product?: string | null
          name?: string | null
          price?: number | null
          stock?: number | null
          units?: number | null
          urlimage?: string | null
        }
        Update: {
          barcode?: string | null
          category?: string | null
          created_at?: string
          description?: string | null
          id?: string
          id_product?: string | null
          name?: string | null
          price?: number | null
          stock?: number | null
          units?: number | null
          urlimage?: string | null
        }
        Relationships: []
      }
      revenue: {
        Row: {
          month: string
          revenue: number
        }
        Insert: {
          month: string
          revenue: number
        }
        Update: {
          month?: string
          revenue?: number
        }
        Relationships: []
      }
      typeuser: {
        Row: {
          created_at: string
          id: number
          id_user: string | null
          name: string | null
        }
        Insert: {
          created_at?: string
          id?: number
          id_user?: string | null
          name?: string | null
        }
        Update: {
          created_at?: string
          id?: number
          id_user?: string | null
          name?: string | null
        }
        Relationships: []
      }
      users: {
        Row: {
          email: string
          id: string
          name: string
          password: string
        }
        Insert: {
          email: string
          id?: string
          name: string
          password: string
        }
        Update: {
          email?: string
          id?: string
          name?: string
          password?: string
        }
        Relationships: []
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      [_ in never]: never
    }
    Enums: {
      [_ in never]: never
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}

export type Tables<
  PublicTableNameOrOptions extends
    | keyof (Database["public"]["Tables"] & Database["public"]["Views"])
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof (Database[PublicTableNameOrOptions["schema"]]["Tables"] &
        Database[PublicTableNameOrOptions["schema"]]["Views"])
    : never = never
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? (Database[PublicTableNameOrOptions["schema"]]["Tables"] &
      Database[PublicTableNameOrOptions["schema"]]["Views"])[TableName] extends {
      Row: infer R
    }
    ? R
    : never
  : PublicTableNameOrOptions extends keyof (Database["public"]["Tables"] &
      Database["public"]["Views"])
  ? (Database["public"]["Tables"] &
      Database["public"]["Views"])[PublicTableNameOrOptions] extends {
      Row: infer R
    }
    ? R
    : never
  : never

export type TablesInsert<
  PublicTableNameOrOptions extends
    | keyof Database["public"]["Tables"]
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicTableNameOrOptions["schema"]]["Tables"]
    : never = never
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? Database[PublicTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Insert: infer I
    }
    ? I
    : never
  : PublicTableNameOrOptions extends keyof Database["public"]["Tables"]
  ? Database["public"]["Tables"][PublicTableNameOrOptions] extends {
      Insert: infer I
    }
    ? I
    : never
  : never

export type TablesUpdate<
  PublicTableNameOrOptions extends
    | keyof Database["public"]["Tables"]
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicTableNameOrOptions["schema"]]["Tables"]
    : never = never
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? Database[PublicTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Update: infer U
    }
    ? U
    : never
  : PublicTableNameOrOptions extends keyof Database["public"]["Tables"]
  ? Database["public"]["Tables"][PublicTableNameOrOptions] extends {
      Update: infer U
    }
    ? U
    : never
  : never

export type Enums<
  PublicEnumNameOrOptions extends
    | keyof Database["public"]["Enums"]
    | { schema: keyof Database },
  EnumName extends PublicEnumNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicEnumNameOrOptions["schema"]]["Enums"]
    : never = never
> = PublicEnumNameOrOptions extends { schema: keyof Database }
  ? Database[PublicEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : PublicEnumNameOrOptions extends keyof Database["public"]["Enums"]
  ? Database["public"]["Enums"][PublicEnumNameOrOptions]
  : never
