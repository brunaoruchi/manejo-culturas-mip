import { Realm } from "@realm/react";

export class PestFloatation extends Realm.Object<PestFloatation> {
  id: string;

  pragues!: Realm.List<PragueAverage>;

  latitude: number;

  longitude: number;

  createdAt: Date = new Date();

  updatedAt: Date = new Date();

  static primaryKey = "id";
  constructor(
    realm: Realm,
    id: string,
    pragues:  { pragueId: string; average: number }[],
    latitude: number,
    longitude: number
  ) {
    super(realm, { id, pragues, latitude, longitude });
  }
}

export class PragueAverage extends Realm.Object<PragueAverage> {
  pragueId: string; 

  average: number;

  constructor(
    realm: Realm,
    pragueId: string,
    average: number,
    
  ) {
    super(realm, { pragueId, average });
  }
}
