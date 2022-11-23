import { Component, OnInit } from '@angular/core';
import { House } from '../House';
import { ServicesService } from '../services.service';

@Component({
  selector: 'app-house',
  templateUrl: './house.component.html',
  styleUrls: ['./house.component.css']
})
export class HouseComponent implements OnInit {

  constructor(public serv: ServicesService) { }

  houseList:Array<House>=[];

  houseName: string="";
  houseSize: number=0;
  message1: string="";

  furnitureName: string="";
  furnitureSize: number=0;
  message2: string="";

  furnitureSearch: string="";
  message3: string="";

  ngOnInit(): void {
    this.serv.getAllHouses().subscribe(data=>{this.houseList=data})
  }

  addHouse(){
    if(this.houseName!="" && this.houseSize!=0){
      this.serv.addHouse(this.houseSize,this.houseName);
      this.message1=this.houseName+" with size " + this.houseSize+ "sqft added!";
      this.houseName="";
      this.houseSize=0;
    }else{
      this.message1="Please fill parameters correctly!"
    }
    this.serv.getAllHouses().subscribe(data=>{this.houseList=data})
    this.serv.getAllHouses().subscribe(data=>{this.houseList=data})
    this.serv.getAllHouses().subscribe(data=>{this.houseList=data})
  }

  addFurniture(){
    if(this.furnitureName!="" && this.furnitureSize!=0){
      let houseId = Number((<HTMLSelectElement>document.getElementById("houseSearch")).value);
      this.serv.getMaxSquareFootage(houseId).subscribe(maxSqLeft=>{
        if(this.furnitureSize<=maxSqLeft){
          this.serv.addFurniture(this.furnitureSize,this.furnitureName, houseId);
          this.serv.getHouseById(houseId).subscribe(data=>{
            this.message2=this.furnitureName+ "with size "+this.furnitureSize+ "sqft added to house "+data.name+"!";
          })
        }else{
          this.message2="Furniture size too large!";
        }
      })
    }else{
      this.message2="Please fill parameters correctly!"
    }

  }

  searchFurniture(){
    if(this.furnitureSearch!=""){
      this.serv.ofFurnitureType(this.furnitureSearch).subscribe(nums=>{
        this.message3="There are "+nums+" of type "+this.furnitureSearch+"."
      })
    }
  }

}
