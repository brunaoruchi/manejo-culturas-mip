import { Realm } from "@realm/react";
import uuid from "react-native-uuid";

export class SampleData extends Realm.Object<SampleData> {
  id : string;

  date!: Date;

  stage!: string;

  defoliation!: number;

  createdAt: Date = new Date();

  updatedAt: Date = new Date();

  static primaryKey = 'id';
  constructor(realm: Realm, id: string, date: Date, stage: string, defoliation: number) {
    super(realm, { id, date, stage, defoliation });
  }
}
