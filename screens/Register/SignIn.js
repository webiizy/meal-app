import React, { useState, useEffect } from "react";
import {
    ScrollView,
    ImageBackground,
    Dimensions,
    StatusBar,
    KeyboardAvoidingView,
    Alert,
    ActivityIndicator,
    View
} from "react-native";
import { Block, Text, theme } from "galio-framework";
import { useForm } from "react-hook-form";
import { Button, Icon, Input, Card, Modal } from "../../components";
import { materialTheme, Images } from "../../constants";
import { StateContext, firebase } from "../../context";
import styles from "./styles"
const { width, height } = Dimensions.get("screen");

const SignIn = props => {
    const { navigate } = props.navigation;
    const [waiting, setWaiting] = useState(false);
    const { register, handleSubmit, setValue, errors, triggerValidation } = useForm();
    const { user } = React.useContext(StateContext);
    const [isModalVisible, toggleModal] = useState(false)
    const [modalMess, setModalMess] = useState('');
    const onSubmit = data => {
        setWaiting(true)
        firebase.getDocument("users", data.email.removeDiacritics(), (doc => {
            console.log("doc", doc._data)
            if (doc.exists)
                firebase.auth.signInWithEmailAndPassword(data.email, data.password).then(function (user) {
                    // Alert.alert("Welcome!")
                    setModalMess(`Welcome, ${doc._data.name || doc._data.email}!`)
                    toggleModal(true)
                    setWaiting(false)
                }, function (error) {
                    setWaiting(false)
                    setModalMess("SignIn FAIL", error.message)
                    toggleModal(true)
                });
            else {
                setWaiting(false)
                setModalMess("Cannot find this user!")
                toggleModal(true)
            }
        }))
    }

    useEffect(() => {
        register("email", {
            required: "Vui lòng nhập email",
            pattern: {
                value: /^\s+$|^$|^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
                message: "Email không hợp lệ"
            }
        })
        register("password", {
            required: "Vui lòng nhập mật khẩu",
            minLength: {
                value: 6,
                message: "Mạt khẩu quá ngắn"
            }
        })
    }, [])

    const onLoginHandle = ((error, user) => {
        setWaiting(false)
        if (error) {
            if (error.code === 'auth/account-exists-with-different-credential') {
                setModalMess(`Email: ${error.email} already in use to login with ${error.provider}!`)
                toggleModal(true)
            } else {
                console.log("Api call error", error);
                setModalMess(`Cannot login: ${error}`)
                toggleModal(true)
            }
        } else {
            setModalMess(`Welcome, ${user.displayName || user.email}!`)
            toggleModal(true)
        }
    })
    const RenderSignIn = () => {
        return (
            <ImageBackground
                source={Images.RegisterBackground}
                style={{ width, height: "auto", zIndex: 1 }} >
                <Block flex center>
                    <Block style={styles.registerContainer}>
                        <Block flex={0.25} middle style={styles.socialConnect}>
                            <Text color="#8898AA" size={12}>
                                Đăng nhập với mạng xã hội </Text>
                            <Block row style={{ marginTop: theme.SIZES.BASE }}>
                                <Button style={{ ...styles.socialButtons, marginRight: 30, backgroundColor: theme.COLORS.FACEBOOK }}
                                    onPress={waiting ? () => { } : () => {
                                        setWaiting(true)
                                        firebase.loginWithFaceBook(onLoginHandle)
                                    }}>
                                    <Block row>
                                        <Icon
                                            name="logo-facebook"
                                            family="Ionicon"
                                            size={15}
                                            color={"white"}
                                            style={{ marginTop: 3, marginRight: 5 }}
                                        />
                                        <Text style={styles.socialTextButtons}>FACEBOOK</Text>
                                    </Block>
                                </Button>
                                <Button style={{ ...styles.socialButtons, backgroundColor: materialTheme.COLORS.ERROR }}
                                    onPress={waiting ? () => { } : () => {
                                        setWaiting(true)
                                        firebase.loginWithGoogle(onLoginHandle)
                                    }}>
                                    <Block row>
                                        <Icon
                                            name="logo-google"
                                            family="Ionicon"
                                            size={15}
                                            color={"white"}
                                            style={{ marginTop: 3, marginRight: 5 }}
                                        />
                                        <Text style={styles.socialTextButtons}>GOOGLE</Text>
                                    </Block>
                                </Button>
                            </Block>
                        </Block>
                        <Block flex style={styles.formInput}>
                            <Block flex={0.17} middle>
                                <Text color="#8898AA" size={12}>
                                    Hoặc đăng nhập với email </Text>
                            </Block>
                            <Block flex center>
                                <KeyboardAvoidingView
                                    style={{ flex: 1, marginTop: theme.SIZES.BASE * 0.75 }}
                                    behavior="padding"
                                    enabled
                                >
                                    <Block style={styles.blockInput} >
                                        <Input
                                            rounded
                                            placeholder="Email"
                                            iconContent={
                                                <Icon
                                                    size={16}
                                                    color={materialTheme.COLORS.ICON}
                                                    name="email"
                                                    // family="ArgonExtra"
                                                    style={styles.inputIcons}
                                                />
                                            }
                                            id="email"
                                            errors={errors}
                                            setValue={setValue}
                                            triggerValidation={triggerValidation}
                                        />
                                    </Block>
                                    <Block style={styles.blockInput}>
                                        <Input
                                            password
                                            placeholder="Password"
                                            rounded
                                            viewPass
                                            iconContent={
                                                <Icon
                                                    size={16}
                                                    color={materialTheme.COLORS.ICON}
                                                    name="lock"
                                                    family="font-awesome"
                                                    style={styles.inputIcons}
                                                />
                                            }
                                            id="password"
                                            errors={errors}
                                            setValue={setValue}
                                            triggerValidation={triggerValidation}
                                        />
                                    </Block>
                                    <Text
                                        color={materialTheme.COLORS.PINK}
                                        size={12}
                                        onPress={() => Alert.alert('Chờ update')}
                                        style={{ alignSelf: 'flex-end', lineHeight: theme.SIZES.FONT }}
                                    >  Bạn đã quên mật khẩu?  </Text>
                                    <Block middle>
                                        <Button color="pink" round style={styles.createButton} onPress={waiting ? () => { } : handleSubmit(onSubmit)}>
                                            {waiting ? <ActivityIndicator size="small" color="white" /> :
                                                <Text bold size={14} color="white">
                                                    Sign In </Text>}
                                        </Button>

                                        <Block row center>
                                            <Text color="#8898AA" size={12}>
                                                Bạn chưa có tài khoản? </Text>
                                            <Text
                                                size={12}
                                                color={materialTheme.COLORS.PINK}
                                                onPress={() => navigate('Sign Up')}>
                                                Đăng ký ngay!  </Text>
                                        </Block>
                                    </Block>

                                </KeyboardAvoidingView>
                            </Block>
                            {/* <Button title="Show modal" onPress={() => { toggleModal(!isModalVisible) }} /> */}
                        </Block>
                    </Block>
                </Block>

            </ImageBackground>
        )
    }
    return (
        <Block flex center>
            {/* <StatusBar hidden /> */}
            <ScrollView
                showsVerticalScrollIndicator={false}>
                <RenderSignIn />
            </ScrollView>
            <Modal message={modalMess} isModalVisible={isModalVisible} toggleModal={() => { toggleModal(!isModalVisible) }} />
        </Block>
    );
}


export default SignIn;