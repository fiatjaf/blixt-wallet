import React, { useEffect } from "react";
import { StyleSheet, View, Clipboard } from "react-native";
import { Body, Text, Header, Container, H1, H3, Right, Left, Button, Title, Icon, Toast } from "native-base";
import { NavigationScreenProp } from "react-navigation";

import { blixtTheme } from "../../../native-base-theme/variables/commonColor";
import { useStoreState, useStoreActions } from "../../state/store";
import QrCode from "../../components/QrCode";

interface IOnChainInfoProps {
  navigation: NavigationScreenProp<{}>;
}
export const OnChainInfo = ({ navigation }: IOnChainInfoProps) => {
  const getBalance = useStoreActions((store) => store.onChain.getBalance);
  const getAddress = useStoreActions((store) => store.onChain.getAddress);
  const balance = useStoreState((store) => store.onChain.balance);
  const address = useStoreState((store) => store.onChain.address);

  useEffect(() => {
    (async () => {
      await getBalance(undefined);
      await getAddress({});
    })();
  }, []);

  if (!address) {
    return (<></>);
  }

  const onGeneratePress = async () => await getAddress({
    forceNew: true,
  });

  const onWithdrawPress = () => navigation.navigate("Withdraw");

  const onBtcAddressPress = () => {
    Clipboard.setString(address);
    Toast.show({
      text: "Copied to clipboard.",
      type: "warning",
    });
  };

  return (
    <Container>
      <Header iosBarStyle="light-content" translucent={false}>
        <Left>
          <Button transparent={true} onPress={() => navigation.navigate("Main")}>
            <Icon name="arrow-back" />
          </Button>
        </Left>
        <Body>
          <Title>Bitcoin</Title>
        </Body>
        <Right>
          <Button transparent={true} onPress={() => navigation.navigate("OnChainTransactionLog")}>
            <Icon type="AntDesign" name="bars" />
          </Button>
        </Right>
      </Header>
      <View style={style.container}>
        <View style={style.fundsInfo}>
          <H1 style={{ textAlign: "center" }}>
            On-chain funds:{"\n"}
            {balance.toString()} Satoshi
          </H1>
        </View>
        <View style={style.qrContainer}>
          <View style={style.qrInner}>
            <H3 style={style.sendBitcoinsLabel}>Send Bitcoin on-chain to this address:</H3>
            <QrCode data={address} />
            <Text style={style.address} numberOfLines={1} lineBreakMode="middle" onPress={onBtcAddressPress}>
              {address}
            </Text>
          </View>
          <View style={style.buttons}>
            <Button style={style.button} block={true} primary={true} onPress={onGeneratePress}>
              <Text>Generate new address</Text>
            </Button>
            <Button style={[style.button, { marginBottom: 0 }]} block={true} primary={true} onPress={onWithdrawPress}>
              <Text>Withdraw coins</Text>
            </Button>
          </View>
        </View>
      </View>
    </Container>
  );
};

const style = StyleSheet.create({
  container: {
    flex: 1,
  },
  fundsInfo: {
    flex: 1,
    width: "100%",
    justifyContent: "center",
    alignItems: "center",
  },
  qrContainer: {
    flex: 4,
    paddingTop: 10,
    paddingLeft: 24,
    paddingRight: 24,
    paddingBottom: 24,
    justifyContent: "space-between",
    alignItems: "center",
    width: "100%",
  },
  qrInner: {
    flex: 1,
    width: "100%",
    alignItems: "center",
  },
  sendBitcoinsLabel: {
    marginBottom: 8,
  },
  address: {
    paddingTop: 6,
    paddingRight: 18,
    paddingBottom: 20,
    paddingLeft: 18,
  },
  buttons: {
    width: "100%",
  },
  button: {
    marginBottom: 12,
  },
});

export default OnChainInfo;
