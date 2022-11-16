import { Furniture } from "./Furniture";

export interface House{
    houseId: number;
    squareFeet: number;
    name: string;
    furnitureList: Array<Furniture>;
}