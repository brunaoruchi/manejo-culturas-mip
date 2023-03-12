import React, { useCallback, useRef, useState } from "react";
import { View } from "react-native";

import MapView, { Marker, Polygon } from "react-native-maps";
import { Container } from "./MipDetails.styles";
import Topbar from "../../components/topBar/Topbar";
import {
  useFocusEffect,
  useIsFocused,
  useNavigation,
  useRoute,
} from "@react-navigation/native";
import { ScrollView } from "react-native-gesture-handler";
import Card from "../../components/card/Card";
import Icon from "../../components/icon/Icon";
import Text from "../../components/text/Text";
import Button from "../../components/button/Button";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { RootStackParamList } from "../../navigation/App.stack";
import { AppContext } from "../../database/Realm";
import { Mip } from "../../database/models/Mip";
import { SampleData } from "../../database/models/SampleData";
const { useObject, useRealm } = AppContext;

type MipDetailsNavigationProp = NativeStackNavigationProp<
  RootStackParamList,
  "MipDetails"
>;

const MipDetails: React.FC = () => {
  const navigation = useNavigation<MipDetailsNavigationProp>();
  const params = useRoute().params as { id: string };
  const realm = useRealm();

  const mip = useObject("Mip", params.id) as Mip & Realm.Object;
  const sampleData = useObject("SampleData", mip.sampleData.id) as SampleData &
    Realm.Object;

  const ref = useRef<any>(null);
  return (
    <Container>
      <Topbar
        title="Revisão"
        leftIconOnPress={() => navigation.goBack()}
        rightButtontype="fourth"
        rightButton="trash"
        rightButtonColor="#fff"
        rightButtonOnPress={() => {
          realm.write(() => {
            if (mip.isOnServer) {
              mip.isActive = false;
              mip.isDirty = true;
            } else {
              realm.delete(mip);
            }
          });
          navigation.goBack();
        }}
      />
      <ScrollView
        contentContainerStyle={{
          flexGrow: 1,
          padding: 16,
        }}
      >
        <Card
          style={{ height: 200}}
          title="Dados de amostragem"
          leftIconOnPress={() => {
            navigation.navigate("FormSampleData", {
              id: mip.sampleData.id,
              mipId: mip.id
            });
          }}
        >
          <View
            style={{
              alignItems: "center",
              justifyContent: "center",
              flexDirection: "row",
            }}
          >
            <Icon
              name="calendar"
              size="large"
              color="#000"
              style={{ marginRight: 24 }}
            />
            <Text
              size="large"
              value={sampleData.date.toLocaleDateString()}
              weight="bold"
              style={{ color: "#777" }}
            />
          </View>
          <View
            style={{
              flexDirection: "row",
              alignItems: "center",
              justifyContent: "space-between",
              marginTop: 16,
              marginHorizontal: 32,
            }}
          >
            <View style={{ alignItems: "center" }}>
              <Text
                size="large"
                value={sampleData.stage}
                weight="bold"
                style={{ color: "#777" }}
              />
              <Text size="large" value="Cultura" weight="bold" />
            </View>
            <View style={{ alignItems: "center" }}>
              <Text
                size="large"
                value={sampleData.defoliation.toString()}
                weight="bold"
                style={{ color: "#777" }}
              />
              <Text size="large" value="Desfolha" weight="bold" />
            </View>
          </View>
        </Card>

        <Card title="Flutuação das Pragas" style={{ flex: 1, marginTop: 16 }}>
          <Button
            title="Adicionar"
            type="third"
            onPress={() =>
              navigation.navigate("FormMip", {
                mipId: mip.id,
              })
            }
          />

          {/* <MapView
            style={{ width: '100%', height: 180, marginTop: 16 }}
            ref={ref}
            onMapReady={() =>
              ref.current.fitToCoordinates(
                [
                  { latitude: 50, longitude: 50 },
                  { latitude: 51, longitude: 51 },
                  { latitude: 51, longitude: 49 },
                ],
                {
                  edgePadding: {
                    bottom: 25,
                    left: 25,
                    right: 25,
                    top: 25,
                  },
                }
              )
            }
          >
            <Marker
              coordinate={{ latitude: 50, longitude: 50 }}
              title="Campo 1"
              pinColor="#3c8dbc"
            />
            <Marker
              coordinate={{ latitude: 51, longitude: 51 }}
              title="Campo 2"
              pinColor="#3c8dbc"
            />
            <Marker
              coordinate={{ latitude: 51, longitude: 49 }}
              pinColor="#3c8dbc"
              title="Campo 3"
            />
            <Polygon
              coordinates={[
                { latitude: 50, longitude: 50 },
                { latitude: 51, longitude: 51 },
                { latitude: 51, longitude: 49 },
              ]}
            />
          </MapView> */}
          {mip.pestFlotations.map((item, index) => (
            <Button
              key={item.id}
              title={`Campo ${(index + 1).toString()}`}
              type="fourth"
              style={{ marginTop: 16 }}
              onPress={() =>
                navigation.navigate("FormMip", {
                  mipId: mip.id,
                  id: item.id,
                })
              }
            />
          ))}
        </Card>
      </ScrollView>
    </Container>
  );
};

export default MipDetails;
