import React, { useEffect, useMemo, useState } from "react";

import { Container } from "./Dashboard.styles";
import Topbar from "../../components/topBar/Topbar";
import Text from "../../components/text/Text";
import Card from "../../components/card/Card";
import { FlatList, RefreshControl, ScrollView, View } from "react-native";
import { useAuth } from "../../hooks/Auth";
import { useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { RootStackParamList } from "../../navigation/App.stack";
import { AppContext } from "../../database/Realm";
import { Ur } from "../../database/models/Ur";
import { Mip } from "../../database/models/Mip";
import { sync } from "../../service/Sync";

const { useQuery, useRealm } = AppContext;
type DashboardNavigationProp = NativeStackNavigationProp<
  RootStackParamList,
  "Dashboard"
>;

const Dashboard: React.FC = () => {
  const navigation = useNavigation<DashboardNavigationProp>();
  const { name, signOut } = useAuth();
  const result = useQuery("Ur");
  const realm = useRealm();
  const [loading, setLoading] = useState(false);

  const urs = useMemo(
    () => result.sorted("createdAt"),
    [result]
  ) as Realm.Results<Ur & Realm.Object>;

  const resultMips = useQuery("Mip") as Realm.Results<Mip & Realm.Object>;

  const handleSync = async () => {
    setLoading(true);
    await sync(realm, resultMips);
    setLoading(false);
  };

  return (
    <Container>
      <Topbar
        title={`Bem vindo, ${name}`}
        rightButtontype="primary"
        rightButton="sign-out"
        rightButtonColor="#D14A61"
        rightButtonOnPress={() => {
          signOut();
        }}
      />

      <FlatList
        contentContainerStyle={{ padding: 16 }}
        refreshControl={
          <RefreshControl refreshing={loading} onRefresh={handleSync} />
        }
        ListHeaderComponent={
          <View style={{ alignItems: "center" }}>
            <Text
              size="large"
              value="Minhas URs"
              weight="bold"
              style={{ color: "#000", marginBottom: 16 }}
            />
          </View>
        }
        data={urs}
        renderItem={({ item }) => (
          <Card
            title={item.ownerName}
            buttonType="third"
            date={item.mips[
              item.mips.length - 1
            ].createdAt.toLocaleDateString()}
            style={{ marginBottom: 32 }}
            onPress={() => {
              navigation.navigate("UrDetails", {
                id: item.id,
              });
            }}
            titleButton="Acessar UR"
          >
            <View
              style={{
                flexDirection: "row",
                justifyContent: "space-between",
                marginBottom: 8,
              }}
            >
              <View>
                <Text size="small" value={"MESORREGIÃO"} weight="bold" />
                <Text size="small" value={item.mesoRegion} weight="medium" />
              </View>
              <View>
                <Text size="small" value="REGIÃO" weight="bold" />
                <Text size="small" value={item.region} weight="medium" />
              </View>
            </View>
            <View>
              <View>
                <Text size="small" value="MUNICÍPIO" weight="bold" />
                <Text size="small" value={item.city} weight="medium" />
              </View>
            </View>
          </Card>
        )}
      />
    </Container>
  );
};

export default Dashboard;
