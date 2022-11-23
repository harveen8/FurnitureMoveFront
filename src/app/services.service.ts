import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Furniture } from './Furniture';
import { House } from './House';

@Injectable({
  providedIn: 'root'
})
export class ServicesService {
  constructor(public http: HttpClient) { }

  public server: string="http://localhost:8054"

  public getHouseById(num: number): Observable<House>{
    return this.http.get<House>(this.server+"house/"+num);
  }

  public addHouse(squareFeet: number, name: string){
     this.http.post<House>(this.server+"/house",{squareFeet:squareFeet, name:name}).subscribe(data=>{console.log(data);});
  }

  public getAllHouses(): Observable<Array<House>>{
    return this.http.get<Array<House>>(this.server+"/house");
  }

  public getMaxSquareFootage(num: number): Observable<number>{
    return this.http.get<number>(this.server+"/house/max/"+num);
  }

  public addFurniture(squareFeet: number, name: string, houseId: number){
     this.http.post<Furniture>(this.server+"/furniture/"+houseId, {squareFeet:squareFeet, name:name}).subscribe(data=>{console.log(data);});
  }

  public ofFurnitureType(name:string): Observable<number>{

   return this.http.get<number>(this.server+"/furniture/"+name);
  }



}
