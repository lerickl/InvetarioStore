export interface IProduct {
  barcode?: string | null
  category?: string | null
  created_at?: string
  description?: string | null  
  id_product?: string | null
  id?: string
  name?: string | null
  price?: number | null
  stock?: number | null
  units?: number | null
  urlimage?: string | null
}
//id_product ->contiene el id del contenedor del producto
//un producto puede contener a otro
export interface IProductRow {
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
export interface IProductEdit {
  id?: string,  
  id_product?: string | null
  name?: string| null,
  description?: string| null,
  price?: number| null,
  stock?: number | null,
  category?: string | null,
  barcode?: string| null,
  created_at?: string, 
  units?: number | null,

}