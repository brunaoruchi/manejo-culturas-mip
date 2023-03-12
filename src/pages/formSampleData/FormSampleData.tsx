import React, { useState } from "react";

import { ButtonStyled, Buttons, Container } from "./FormSampleData.styles";
import Topbar from "../../components/topBar/Topbar";
import { useNavigation, useRoute } from "@react-navigation/native";
import { RootStackParamList } from "../../navigation/App.stack";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import Card from "../../components/card/Card";
import Button from "../../components/button/Button";
import Input from "../../components/input/Input";
import Picker from "../../components/picker/Picker";
import Text from "../../components/text/Text";
import { ScrollView, View } from "react-native";
import { Realm } from "@realm/react";
import { AppContext } from "../../database/Realm";
import { Ur } from "../../database/models/Ur";
import { SampleData } from "../../database/models/SampleData";
import { Mip } from "../../database/models/Mip";
import uuid from "react-native-uuid";
import DateTimePicker, {
  DateTimePickerAndroid,
} from "@react-native-community/datetimepicker";

const { useObject, useRealm } = AppContext;

type FormSampleDataNavigationProp = NativeStackNavigationProp<
  RootStackParamList,
  "FormSampleData"
>;

const FormSampleData: React.FC = () => {
  const navigation = useNavigation<FormSampleDataNavigationProp>();
  const params = useRoute().params as { id?: string; urId?: string, mipId?: string };
  const ur = params.urId
    ? (useObject("Ur", params.urId) as Ur & Realm.Object)
    : null;
  const sampleData = params.id
    ? (useObject("SampleData", params.id) as SampleData & Realm.Object)
    : null;
    const mip =  params.mipId ? useObject("Mip", params.mipId) as Mip & Realm.Object : null;

  const realm = useRealm();
  const [date, setDate] = useState(sampleData ? sampleData.date : new Date());
  const [stage, setStage] = useState(sampleData ? sampleData.stage : "R0");
  const [defoliation, setDefoliation] = useState(
    sampleData ? sampleData.defoliation : 0
  );
  const [showOtherValue, setShowOtherValue] = useState(
    sampleData
      ? sampleData.defoliation !== 0 &&
          sampleData.defoliation !== 1 &&
          sampleData.defoliation !== 5
      : false
  );

  const onChange = (event, selectedDate) => {
    const currentDate = selectedDate;
    setDate(currentDate);
  };

  const showMode = (currentMode) => {
    DateTimePickerAndroid.open({
      value: date,
      onChange,
      mode: currentMode,
      is24Hour: true,
    });
  };

  const showDatepicker = () => {
    showMode("date");
  };

  return (
    <Container>
      <Topbar
        buttonTopOnPress={() => navigation.goBack()}
        title="Dados de amostragem"
      />
      <ScrollView
        contentContainerStyle={{
          flexGrow: 1,
          padding: 16,
        }}
      >
        <Card
          title="Selecione a data da coleta:"
          style={{ flex: 1, marginBottom: 32 }}
        >
          <Button
            style={{ flex: 1 }}
            type="fourth"
            rightIcon="calendar"
            title={date.toLocaleDateString()}
            onPress={showDatepicker}
          />
        </Card>

        <Card
          title="Selecione o estádio de cultura:"
          style={{ flex: 1, marginBottom: 32 }}
        >
          <Picker
            selectedValue={stage}
            onValueChange={(value) => {
              setStage(value.toString());
            }}
            values={[
              "R0",
              "R1",
              "R2",
              "R3",
              "R4",
              "V0",
              "V1",
              "V2",
              "V3",
              "V4",
            ]}
          />
        </Card>

        <Card title="% de desfolha:" style={{ flex: 1, marginBottom: 32 }}>
          <View>
            <Buttons>
              <ButtonStyled
                active={defoliation === 0}
                onPress={() => {
                  setShowOtherValue(false);
                  setDefoliation(0);
                }}
                style={{ borderTopLeftRadius: 8, borderBottomLeftRadius: 8 }}
              >
                <Text size="medium" weight="bold" value={`0%`} />
              </ButtonStyled>
              <ButtonStyled
                active={defoliation === 1}
                onPress={() => {
                  setShowOtherValue(false);
                  setDefoliation(1);
                }}
              >
                <Text size="medium" weight="bold" value={`1%`} />
              </ButtonStyled>
              <ButtonStyled
                active={defoliation === 5}
                onPress={() => {
                  setShowOtherValue(false);
                  setDefoliation(5);
                }}
              >
                <Text size="medium" weight="bold" value={`5%`} />
              </ButtonStyled>
              <ButtonStyled
                active={false}
                onPress={() => {
                  setShowOtherValue(true);
                }}
                style={{ borderBottomRightRadius: 8, borderTopRightRadius: 8 }}
              >
                <Text size="medium" weight="bold" value="Outro valor" />
              </ButtonStyled>
            </Buttons>
            {showOtherValue && (
              <Input
                type="default"
                placeholder="Digite um valor de desfolha"
                viewStyle={{ marginTop: 16 }}
                value={defoliation.toString()}
                keyboardType="decimal-pad"
                onChangeText={(newValue) => {
                  setDefoliation(Number(newValue));
                }}
              />
            )}
          </View>
        </Card>

        <Button
          style={{ flex: 1 }}
          type="third"
          title="Concluído"
          onPress={() => {
            realm.write(() => {
              if (params.id) {
                sampleData.date = date;
                sampleData.stage = stage;
                sampleData.defoliation = defoliation;
                mip.isDirty = true;
                navigation.goBack();
              } else {
                const newSampleData = new SampleData(
                  realm,
                  uuid.v4() as string,
                  date,
                  stage,
                  defoliation
                );
                const mip = new Mip(
                  realm,
                  uuid.v4() as string,
                  newSampleData,
                  [],
                  false,
                  true
                );
                ur.mips.push(mip);
                navigation.replace("MipDetails", { id: mip.id });
              }
            });
          }}
        />
      </ScrollView>
    </Container>
  );
};

export default FormSampleData;
