import { createRealmContext } from "@realm/react";
import { User } from "./models/User";
import { SampleData } from "./models/SampleData";
import { Prague } from "./models/Prague";
import { PestFloatation, PragueAverage } from "./models/PestFlotation";
import { Mip } from "./models/Mip";
import { Ur } from "./models/Ur";

// export const getRealm = () => {
//   const realm = Realm.open({
//     path: "realm-files/myrealm",
//     schema: [User, SampleData, Prague, PestFloatation, Mip, Ur],
//   });
//   return realm;
// };'w

export const AppContext = createRealmContext({
  schema: [User, SampleData, Prague, PestFloatation, Mip, Ur, PragueAverage],
});
