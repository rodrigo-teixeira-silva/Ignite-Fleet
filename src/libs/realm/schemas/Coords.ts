import { RealmProvider } from "@realm/react";

export type CoordsSchemeprops ={
    latitude: number;
    longitude: number;
    timestamp: number;
}

export class coords extends Realm.Object<coords>{
    latitude!: number;
    longitude!: number;
    timestamp!: number;

static generate({ latitude, longitude, timestamp}: CoordsSchemeprops){
    return {
        latitude,
        longitude, 
        timestamp
    }
  }

  static schema = {
    name:'Coords',
    embedded: true,
    properties: {
        latitude: 'float',
        longitude: 'float', 
        timestamp: 'float',
     }
   }
} 