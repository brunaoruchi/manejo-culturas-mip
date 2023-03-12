import { Realm } from "@realm/react";
import { Mip } from "./Mip";

export class Ur extends Realm.Object<Ur> {
  id: string;

  mesoRegion: string;

  region: string;

  city: string;

  ownerName: string;

  mips: Realm.List<Mip>;

  createdAt: Date = new Date();

  updatedAt: Date = new Date();

  static primaryKey = 'id';
  constructor(
    realm: Realm,
    id: string,
    mesoRegion: string,
    region: string,
    city: string,
    ownerName: string,
    mips: Mip[]
  ) {
    super(realm, { id, mesoRegion, region, city, ownerName, mips });
  }
}
