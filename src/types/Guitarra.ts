export type Guitarra = {
  id: number;
  name: string;
  image: string;
  description: string;
  price: number;
  cantidad?: number;
};

export type CartItem = Guitarra & {
  cantidad: number;
};

export type GuitarID = Guitarra["id"];
