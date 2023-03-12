import { Realm } from "@realm/react";
import { PestFloatation } from "./PestFlotation";
import { SampleData } from "./SampleData";

export class Mip extends Realm.Object<Mip> {
  id: string;

  sampleData!: SampleData;

  pestFlotations: Realm.List<PestFloatation>;

  isActive: boolean;

  isOnServer: boolean;

  isDirty: boolean;

  createdAt: Date = new Date();

  updatedAt: Date = new Date();

  static primaryKey = "id";

  constructor(
    realm: Realm,
    id: string,
    sampleData: SampleData,
    pestFlotations: PestFloatation[],
    isOnServer: boolean,
    isDirty: boolean,
    isActive = true,
  ) {
    super(realm, { id, sampleData, pestFlotations, isOnServer, isDirty, isActive });
  }
}
