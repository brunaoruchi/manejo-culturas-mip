import { Realm } from "@realm/react";

export class Prague extends Realm.Object<Prague> {
  id: string;

  name!: string;

  cientificName!: string;

  createdAt: Date = new Date();

  updatedAt: Date = new Date();

  static primaryKey = 'id';
  constructor(realm: Realm, id: string, name: string, cientificName: string) {
    super(realm, { id, name, cientificName });
  }
}
