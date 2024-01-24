export interface IProduct {
  id?: string,
  name?: string| null,
  price?: number| null,
  barcode?: string| null,
  quantity?: number | null,
  created_at?: string, 
}
export interface IProductEdit {
  id?: string,
  name?: string| null,
  description?: string| null,
  price?: number| null,
  stock?: number | null,
  category?: string | null,
  barcode?: string| null,
  created_at?: string, 

}