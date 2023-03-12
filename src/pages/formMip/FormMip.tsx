import React, { useState } from "react";

import { Container } from "./FormMip.styles";
import Topbar from "../../components/topBar/Topbar";
import { useNavigation, useRoute } from "@react-navigation/native";
import { ScrollView } from "react-native-gesture-handler";
import Card from "../../components/card/Card";
import { Modal, View } from "react-native";
import Input from "../../components/input/Input";
import Button from "../../components/button/Button";
import ItemList from "../../components/itemList/ItemList";
import RoundedButton from "../../components/roundedButton/RoundedButton";
import Text from "../../components/text/Text";
import { AppContext } from "../../database/Realm";
import { Prague } from "../../database/models/Prague";
import { Mip } from "../../database/models/Mip";
import uuid from "react-native-uuid";
import {
  PestFloatation,
  PragueAverage,
} from "../../database/models/PestFlotation";
const { useQuery, useObject, useRealm } = AppContext;

const FormMip: React.FC = () => {
  const navigation = useNavigation();
  const { mipId, id } = useRoute().params as { mipId: string; id?: string };
  const [showModal, setShowModal] = useState(false);
  const realm = useRealm();
  const pragues = useQuery("Prague") as Realm.Results<Prague & Realm.Object>;
  const mip = useObject("Mip", mipId) as Mip & Realm.Object;
  const pestFlotation = id
    ? (useObject("PestFloatation", id) as PestFloatation & Realm.Object)
    : null;

  console.log(pestFlotation);

  const getAverage = (pragueId: string) => {
    console.log(pestFlotation.pragues);
    const index = pestFlotation.pragues.findIndex(
      (id) => id.pragueId === pragueId
    );

    if (index >= 0) {
      return pestFlotation.pragues[index].average;
    }

    return 0;
  };

  const [info, setInfo] = useState(
    pragues.map((prague) => ({
      prague,
      average: pestFlotation ? getAverage(prague.id) : 0,
    }))
  );

  const [openedPrague, setOpenedPrague] = useState<{
    label: string;
    average: number;
    index: number;
  } | null>(null);

  return (
    <Container>
      <Topbar
        title="Campo 1"
        leftIconOnPress={() => navigation.goBack()}
        rightButtontype="fourth"
        rightButton={pestFlotation ? "trash" : undefined}
        rightButtonColor="#fff"
        rightButtonOnPress={() => {
          realm.write(() => {
            mip.isDirty = true;
            realm.delete(pestFlotation);
          });
          navigation.goBack();
        }}
      />
      <View style={{ flex: 1, padding: 16 }}>
        <Card title="Selecione a praga:" style={{ flex: 1 }}>
          <Input type="search" placeholder="Buscar por praga" />

          <View style={{ flex: 1 }}>
            <ScrollView
              style={{ flex: 1 }}
              showsVerticalScrollIndicator={false}
              contentContainerStyle={{
                flexGrow: 1,
                paddingTop: 8,
                paddingBottom: 32,
              }}
            >
              {info.map((item, index) => (
                <ItemList
                  key={item.prague.id}
                  title={`${item.prague.name} (${item.prague.cientificName})`}
                  average={item.average}
                  onPress={() => {
                    setOpenedPrague({
                      label: `${item.prague.name} (${item.prague.cientificName})`,
                      average: item.average,
                      index,
                    });
                    setShowModal(true);
                  }}
                  style={{ marginBottom: 8 }}
                />
              ))}
            </ScrollView>
          </View>

          <View
            style={{ flexDirection: "row", justifyContent: "space-around" }}
          >
            <Button title="Cancelar" type="secondary" style={{ flex: 1 }} />
            <Button
              title="Concluído"
              type="third"
              style={{ flex: 1, marginLeft: 16 }}
              onPress={() => {
                realm.write(() => {
                  const newPragues: any = [];

                  info.forEach((item) => {
                    if (item.average) {
                      const prague = new PragueAverage(
                        realm,
                        item.prague.id,
                        item.average
                      );

                      newPragues.push(prague);
                    }
                  });

                  mip.isDirty = true;

                  if (pestFlotation) {
                    pestFlotation.pragues = newPragues;
                  } else {
                    const newPestFlotation = new PestFloatation(
                      realm,
                      uuid.v4() as string,
                      newPragues,
                      0,
                      0
                    );
                    mip.pestFlotations.push(newPestFlotation);
                  }
                });

                navigation.goBack();
              }}
            />
          </View>
        </Card>
      </View>

      <Modal visible={showModal} transparent style={{ flex: 1 }}>
        <View style={{ backgroundColor: "#00000050", flex: 1 }}>
          <View
            style={{
              backgroundColor: "#ECF0F5",
              marginTop: 160,
              marginHorizontal: 16,
            }}
          >
            <View style={{ padding: 16, backgroundColor: "#3c8dbc" }}>
              <Text
                size="large"
                value={openedPrague?.label ?? "0"}
                weight="bold"
                style={{ color: "#fff" }}
              />
            </View>

            <Text
              size="medium"
              value="Digite a média encontrada: "
              weight="bold"
              style={{ color: "#000", padding: 16 }}
            />

            <Input
              type="default"
              value={openedPrague?.average.toString() ?? "0"}
              onChangeText={(text) => {
                setOpenedPrague((old) => ({ ...old, average: Number(text) }));
              }}
              keyboardType="decimal-pad"
              placeholder="0,00"
              viewStyle={{ marginHorizontal: 16 }}
            />

            <View
              style={{
                flexDirection: "row",
                justifyContent: "space-between",
                marginHorizontal: 32,
                padding: 16,
              }}
            >
              <RoundedButton
                icon="close"
                iconColor="white"
                type="fourth"
                size="xlarge"
                onPress={() => setShowModal(false)}
              />
              <RoundedButton
                icon="check"
                iconColor="white"
                type="third"
                size="xlarge"
                onPress={() => {
                  setInfo((old) => {
                    const newArr = [...old];
                    if (!openedPrague) return;
                    newArr[openedPrague.index].average = openedPrague.average;

                    return newArr;
                  });
                  setShowModal(false);
                }}
              />
            </View>
          </View>
        </View>
      </Modal>
    </Container>
  );
};

export default FormMip;
