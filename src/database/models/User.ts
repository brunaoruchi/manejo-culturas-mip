import { Realm } from "@realm/react";

export class User extends Realm.Object<User> {
  id: string;

  name: string;

  createdAt: Date = new Date();

  updatedAt: Date = new Date();

  static primaryKey = 'id';
  constructor(realm: Realm, id: string, name: string) {
    super(realm, { id, name });
  }
}
