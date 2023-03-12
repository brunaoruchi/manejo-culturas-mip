import React, { useEffect, useState } from "react";
import { Image } from "react-native";
import Logo from "../../../assets/logo.png";
import * as Progress from "react-native-progress";

import { Container } from "./InitialLoading.styles";
import { useAuth } from "../../hooks/Auth";
import { AppContext } from "../../database/Realm";
import { Prague } from "../../database/models/Prague";
import { SampleData } from "../../database/models/SampleData";
import { PestFloatation } from "../../database/models/PestFlotation";
import { Ur } from "../../database/models/Ur";
import { Mip } from "../../database/models/Mip";
import uuuid from "react-native-uuid";
import { sync } from "../../service/Sync";

const { useRealm, useQuery } = AppContext;

const InitialLoading: React.FC = () => {
  const { setFlagFirstLoadCompleted } = useAuth();
  const [progress, setProgress] = useState(0);
  const realm = useRealm();

  const result = useQuery("Mip") as Realm.Results<Mip & Realm.Object>;
  
  const handleSync = async () => {
    await sync(realm, result, (value: number) => {
      setProgress(value);
    });
  };

  useEffect(() => {
    handleSync();
    // Deletar esse write inteiro
    realm.write(() => {
      const prague1 = new Prague(
        realm,
        uuuid.v4() as string,
        "Praga 1",
        "Praga Cientifica 1"
      );
      const prague2 = new Prague(
        realm,
        uuuid.v4() as string,
        "Praga 2",
        "Praga Cientifica 2"
      );
      const prague3 = new Prague(
        realm,
        uuuid.v4() as string,
        "Praga 3",
        "Praga Cientifica 3"
      );
      const sampleData1 = new SampleData(
        realm,
        uuuid.v4() as string,
        new Date(),
        "V4",
        10
      );
      const pestFloatation1 = new PestFloatation(
        realm,
        uuuid.v4() as string,
        [
          { pragueId: prague1.id, average: 2 },
          { pragueId: prague3.id, average: 5 },
        ],
        0,
        0
      );
      const pestFloatation2 = new PestFloatation(
        realm,
        uuuid.v4() as string,
        [
          { pragueId: prague1.id, average: 2 },
          { pragueId: prague2.id, average: 10 },
        ],
        0.1,
        0.1
      );
      const pestFloatation3 = new PestFloatation(
        realm,
        uuuid.v4() as string,
        [],
        0.1,
        -0.1
      );
      const mip = new Mip(
        realm,
        uuuid.v4() as string,
        sampleData1,
        [pestFloatation1, pestFloatation2, pestFloatation3],
        true,
        false
      );
      new Ur(
        realm,
        uuuid.v4() as string,
        "Meso Region",
        "Region",
        "City",
        "Owner Name",
        [mip]
      );
    });
    //deletar
    setTimeout(() => {
      setProgress(100);
    }, 3000);
  }, []);

  useEffect(() => {
    if (progress === 100) {
      setFlagFirstLoadCompleted();
    }
  }, [progress]);

  return (
    <Container>
      <Image
        source={Logo}
        style={{ width: 375, height: 196, marginTop: 64 }}
        resizeMode="contain"
      />

      <Progress.Circle
        style={{ marginBottom: 100 }}
        progress={progress}
        size={280}
        showsText
        thickness={12}
        color="#519143"
      />
    </Container>
  );
};

export default InitialLoading;
