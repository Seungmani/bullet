// basic
import React, { useEffect, useState, useCallback, useContext } from "react";
import { StyleSheet, Text, View, TextInput, Pressable, ScrollView } from "react-native";

// install
import axios from "axios";
import { useNavigation } from "@react-navigation/native";
import BouncyCheckbox from "react-native-bouncy-checkbox";
import { Ionicons } from "@expo/vector-icons";
import { API_URL } from "@env";
const URL = API_URL;

// component
import BasicButton from "../components/Button";

export default function SignUp() {
  const [id, setId] = useState("");
  const [password, setPassword] = useState("");
  const [checkPassword, setCheckPassword] = useState("");
  const [showPass, setShowPass] = useState(true);
  const [name, setName] = useState("");

  const navigation = useNavigation();

  // 검사
  const [errorId, setErrorId] = useState("");
  const [errorPassword, setErrorPassword] = useState("");
  const [errorCheckPassword, setErrorCheckPassword] = useState("");

  useEffect(() => {
    setId("");
    setPassword("");
    setCheckPassword("");
    setShowPass(false);
    setName("");
  }, []);

  // ID 형식 확인
  const idForm = (e) => {
    setErrorId("이메일이 올바르지 않습니다.");
    if (e.includes("@")) {
      let be = e.split("@")[0];
      let af = e.split("@")[1];
      if (be === "" || af === "") {
        setErrorId("이메일이 올바르지 않습니다.");
      } else {
        setErrorId("");
      }
    }
    setId(e);
  };

  // 비밀번호 형식 확인
  const passwordForm = (e) => {
    if (e) {
      if (e !== checkPassword) {
        setErrorCheckPassword("비밀번호가 다릅니다.");
      } else {
        setErrorCheckPassword("");
      }
      setErrorPassword("");
    } else {
      setErrorPassword("비밀번호를 입력해주세요");
    }
    setPassword(e);
  };

  // 비밀번호 같은지 확인
  const equalPassword = (e) => {
    if (e === password) {
      setErrorCheckPassword("");
    } else {
      setErrorCheckPassword("비밀번호가 다릅니다.");
    }
    setCheckPassword(e);
  };

  // 회원가입

  const checkSignUp = async () => {
    console.log("회원가입");
    if (id === "" || password === "") {
      alert("아이디와 비밀번호를 입력해 주세요");
    } else {
      const data = {
        email: id,
        password: password,
        username: name,
      };
      try {
        await axios
          .post(`${URL}/user/signup/`, data)
          .then(function (response) {
            // console.log("checkSignUp", response.data);
            alert("회원가입을 축하드립니다.");
            navigation.navigate("Login");
          })
          .catch(function (error) {
            alert("에러발생");
            console.log(error);
            throw error;
          });
      } catch (error) {
        console.log(error);
        throw error;
      }
    }
  };

  return (
    <View style={{ ...styles.container }}>
        <View style={{width:'80%', marginLeft:'10%', marginTop:'20%'}}>
            <ScrollView style={{height:"70%", marginBottom:20}}>
                <View style={{ ...styles.textContainer}}>
                    <Pressable style={{ position: "absolute", left: 10 }}
                    onPress={() => {
                        navigation.navigate("Login");
                    }}
                    >
                        <Ionicons name="arrow-back-sharp" size={40} color="black" />
                    </Pressable>
                    <Text style={{ ...styles.mainText }}>회원가입</Text>
                </View>
                <View style={{ ...styles.inputTextContainer }}>
                    <Text style={{ ...styles.formText }}>이메일</Text>
                    <TextInput style={{ ...styles.inputText }}
                    placeholder="이메일을 입력하세요." autoCapitalize="none"
                    placeholderTextColor="#888" value={id} onChangeText={idForm} autoCorrect={false} keyboardType="email-address"
                    />
                    {errorId !== "" ? (
                        <Text style={{ ...styles.errorText }}>{errorId}</Text>
                        ) 
                        : null
                    }

                    <Text style={{ ...styles.formText }}>비밀번호</Text>

                    <TextInput style={{ ...styles.inputText }} placeholder="비밀번호을 입력하세요."
                    autoCapitalize="none"  placeholderTextColor="#888"  autoCorrect={false}  secureTextEntry={!showPass ? true : false}
                    value={password} onChangeText={passwordForm} textContentType="password"
                    />
                    {errorPassword !== "" ? (
                        <Text style={{ ...styles.errorText }}>{errorPassword}</Text>
                        ) 
                    : null}

                    <Text style={{ ...styles.formText }}>비밀번호 확인</Text>
                    <TextInput style={{ ...styles.inputText }} placeholder="비밀번호을 입력하세요."
                    autoCapitalize="none" placeholderTextColor="#888" autoCorrect={false}
                    secureTextEntry={!showPass ? true : false} value={checkPassword} onChangeText={equalPassword} textContentType="password"
                    />
                    {errorCheckPassword !== "" ? (
                        <Text style={{ ...styles.errorText }}>{errorCheckPassword}</Text>
                        ) 
                    : null}

                    <BouncyCheckbox
                    style={{ paddingLeft: 10, marginBottom: 20 }} textStyle={{ textDecorationLine: "none" }}
                    size={20} fillColor="black" unfillColor="#FFFFFF" text="비밀번호 보기"
                    iconStyle={{ borderColor: "red", marginTop: 5, color: "black" }} onPress={() => setShowPass(!showPass)}
                    />

                    <Text style={{ ...styles.formText }}>이름</Text>

                    <TextInput style={{ ...styles.inputText }}
                    placeholder="이름을 입력하세요." autoCapitalize="none" placeholderTextColor="#888"
                    value={name} onChangeText={(text) => setName(text)} autoCorrect={false}
                    />
                </View>
            </ScrollView>
            <View style={{ ...styles.buttonContainer }}>
                <BasicButton text="가입하기" bg="black" marginBottom={0}
                    textColor="white" onPressEvent={checkSignUp}
                />
            </View>
        </View>
    </View>
  );
}
const styles = StyleSheet.create({
  container: {
    backgroundColor: "white",
    height: "100%",
  },
  textContainer: {
    flexDirection: "row",

    justifyContent: "center",
    alignItems: "center",
    marginBottom: 20,
  },
  mainText: {
    fontSize: 30,
  },
  inputTextContainer: {
  },
  formText: {
    fontSize: 18,
    marginBottom: 5,
    paddingHorizontal: 10,
  },
  errorText: {
    marginBottom: 10,
    color: "red",
    paddingHorizontal: 10,
  },
  inputText: {
    width: "100%",
    borderWidth: 1,
    borderRadius: 10,
    borderColor: "#888",

    paddingHorizontal: 10,
    paddingVertical: 10,

    fontSize: 20,
    color: "#888",
    marginBottom: 5,
  },
  buttonContainer: {
    width: "100%",
  },
});
