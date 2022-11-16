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

  public addHouse(squareFeet: number, name: string): Observable<House>{
    return this.http.post<House>(this.server+"/house",{squareFeet:squareFeet, name:name} )
  }

  public getAllHouses(): Observable<Array<House>>{
    return this.http.get<Array<House>>(this.server+"/house");
  }

  public getMaxSquareFootage(num: number): number{
    let sqfeet=0;
    this.http.get<number>(this.server+"/house/max/"+num).subscribe(data=>{sqfeet=data;});
    return sqfeet;
  }

  public addFurniture(squareFeet: number, name: string, houseId: number): Observable<Furniture>{
    return this.http.post<Furniture>(this.server+"/furniture/"+houseId, {squareFeet:squareFeet, name:name})
  }

  public ofFurnitureType(name:string): number{
    let occurences=0;
    this.http.get<number>(this.server+"/furniture"+name).subscribe(data=>{occurences=data;});
    return occurences;
  }



}
