import React from "react";

import { Container } from "./Mips.styles";
import Topbar from "../../components/topBar/Topbar";
import Text from "../../components/text/Text";
import Card from "../../components/card/Card";
import { FlatList, ScrollView, View } from "react-native";
import { RootStackParamList } from "../../navigation/App.stack";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { useNavigation, useRoute } from "@react-navigation/native";
import { AppContext } from "../../database/Realm";
import { Ur } from "../../database/models/Ur";
const { useObject } = AppContext;

type MipsNavigationProp = NativeStackNavigationProp<RootStackParamList, "Mips">;

const Mips: React.FC = () => {
  const navigation = useNavigation<MipsNavigationProp>();
  const params = useRoute().params as { id: string };

  const ur = useObject("Ur", params.id) as Ur & Realm.Object;

  const mips = ur.mips.sorted("sampleData.date").filter(item => item.isActive);

  return (
    <Container>
      <Topbar
        title="Amostras"
        leftIconOnPress={() => {
          navigation.goBack();
        }}
      />
      <FlatList
        contentContainerStyle={{ padding: 16 }}
        data={mips}
        renderItem={({ item }) => (
          <Card
            date={item.sampleData.date.toLocaleDateString()}
            buttonType="third"
            style={{ marginBottom: 32 }}
            onPress={() => {
              console.log(item.id)
              navigation.navigate("MipDetails", { id: item.id });
            }}
            titleButton="Amostras"
          >
            <View style={{ marginBottom: 8 }}>
              <View>
                <Text size="small" value="ESTÁDIO DA CULTURA" weight="bold" />
                <Text size="small" value={item.sampleData.stage} weight="medium" />
              </View>
            </View>
            <View>
              <View>
                <Text size="small" value="% DE DESFOLHA" weight="bold" />
                <Text size="small" value={item.sampleData.defoliation.toString()} weight="medium" />
              </View>
            </View>
          </Card>
        )}
      />
    </Container>
  );
};

export default Mips;
