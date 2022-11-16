import { House } from "./House";

export interface Furniture {
    furnitureId :number ;
    squareFeet: number;
    name: string;
    house: House;
}