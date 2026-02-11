//* Types for the app to map with the database

// map with coffee_shops table
export type CoffeeShop = {
  id: number;
  name: string;
  district: string;
  description: string;
  latitude: number;
  longitude: number;
  image_url: string;
  phone: string;
};
