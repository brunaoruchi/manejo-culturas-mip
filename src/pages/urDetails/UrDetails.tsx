import React from "react";

import { Container } from "./UrDetails.styles";
import Topbar from "../../components/topBar/Topbar";
import Text from "../../components/text/Text";
import Card from "../../components/card/Card";
import { ScrollView, View } from "react-native";
import Button from "../../components/button/Button";
import { RootStackParamList } from "../../navigation/App.stack";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { useNavigation, useRoute } from "@react-navigation/native";
import { AppContext } from "../../database/Realm";
import { Ur } from "../../database/models/Ur";
import { Realm } from "@realm/react";

const { useObject } = AppContext;

type UrDetailsNavigationProp = NativeStackNavigationProp<
  RootStackParamList,
  "UrDetails"
>;

const UrDetails: React.FC = () => {
  const navigation = useNavigation<UrDetailsNavigationProp>();
  const params = useRoute().params as { id: string };

  const ur = useObject("Ur", params.id) as Ur & Realm.Object;

  const mipsSize = ur.mips.filter(item => item.isActive).length;

  const firstDate = mipsSize === 0 ? null : ur.mips.filter(item => item.isActive)[0].sampleData.date.toLocaleDateString();
  const lastDate =
    mipsSize >= 2 ? ur.mips.filter(item => item.isActive)[mipsSize - 1].sampleData.date.toLocaleDateString() : null;

  return (
    <Container>
      <Topbar
        title="Antonio Silva"
        leftIconOnPress={() => navigation.goBack()}
      />
      <ScrollView>
        <View
          style={{
            backgroundColor: "#3c8dbc",
            paddingHorizontal: 16,
            marginBottom: 48,
          }}
        >
          <Button
            leftIcon="bug"
            type="third"
            title="Nova amostra MIP"
            style={{ top: 20 }}
            onPress={() => navigation.navigate("FormSampleData", { urId: ur.id })}
          />
        </View>

        <View style={{ paddingHorizontal: 16 }}>
          <Card
            title="Resumo"
            buttonType="secondary"
            style={{ marginBottom: 32 }}
            onPress={() => navigation.navigate("Mips", { id: ur.id })}
            titleButton="Amostras"
          >
            <View>
              <View>
                <Text size="small" value="AMOSTRAS" weight="bold" />
                <Text
                  size="small"
                  value={mipsSize.toString()}
                  weight="medium"
                />
              </View>
            </View>
            <View
              style={{
                flexDirection: "row",
                justifyContent: "space-between",
                marginBottom: 8,
              }}
            >
              <View>
                <Text size="small" value="PRIMEIRA" weight="bold" />
                <Text size="small" value={firstDate ?? "--"} weight="medium" />
              </View>
              <View>
                <Text size="small" value="ÚLTIMA" weight="bold" />
                <Text size="small" value={lastDate ?? "--"} weight="medium" />
              </View>
            </View>
          </Card>
        </View>
      </ScrollView>
    </Container>
  );
};

export default UrDetails;
