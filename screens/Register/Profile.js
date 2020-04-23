import React, { useState, useEffect } from 'react';
import {
  StyleSheet,
  Dimensions,
  ScrollView,
  Image,
  ImageBackground,
  Platform,
} from 'react-native';
import { Block, Text, theme } from 'galio-framework';
// import { LinearGradient } from 'expo-linear-gradient';
import { StateContext, firebase } from '../../context';
import { Icon, Modal, Input, Button } from '../../components';
import { Images, materialTheme } from '../../constants';
import { useForm } from 'react-hook-form';
import styles from './styles';

export default (Profile = props => {
  const { user } = React.useContext(StateContext);
  const { popToTop } = props.navigation;
  if (user.isAnonymous) popToTop();
  const [waiting, setWaiting] = useState(false);
  const [isModalVisible, toggleModal] = useState(false);
  const [modalMess, setModalMess] = useState('');
  console.log('user', user);
  const { register, handleSubmit, setValue, errors, triggerValidation } = useForm(
    {
      defaultValues: user,
      reValidateMode: 'onBlur',
    },
  );
  useEffect(() => {
    register('name', {
      required: 'Vui lòng nhập tên!',
    });
    register('email', {
      pattern: {
        value: /^\s+$|^$|^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
        message: 'Email không hợp lệ!',
      },
    });
    register('phone', {
      pattern: {
        value: /^\s+$|^$|undefined|^(0)[0-9]{9,11}$/i,
        message: 'Số điện thoại không hợp lệ!',
      },
    });
  }, []);
  const onSubmit = data => {
    setWaiting(true);
  };
  const RenderProfile = () => {
    return [
      <Block key={0} flex>
        <ImageBackground
          source={{ uri: user.avatar || user.photoURL || Images.Profile }}
          style={styles.profileContainer}
          imageStyle={styles.profileImage}>
          <Block flex style={styles.profileDetails}>
            <Block style={styles.profileTexts}>
              <Text color="white" size={28} style={{ paddingBottom: 8 }}>
                {user.name || user.displayName || user.email}
              </Text>
              <Block row space="between">
                <Block row>
                  <Text size={16} color={materialTheme.COLORS.WARNING}>
                    <Text size={10} color={materialTheme.COLORS.WARNING}>
                      Hiệu lực đến hết ngày: 02-12-2020
                    </Text>
                  </Text>
                </Block>
                {/* <Block>
                  <Text color={theme.COLORS.MUTED} size={16}>
                    <Icon name="map-marker" family="font-awesome" color={theme.COLORS.MUTED} size={16} />
                    {` `} Los Angeles, CA
                      </Text>
                </Block> */}
              </Block>
            </Block>
            {/* <LinearGradient colors={['rgba(0,0,0,0)', 'rgba(0,0,0,1)']} style={styles.gradient} /> */}
          </Block>
        </ImageBackground>
      </Block>,
      <Block key={1} flex style={styles.options}>
        <ScrollView showsVerticalScrollIndicator={false}>
          <Block
            row
            space="between"
            style={{ paddingVertical: 16, alignItems: 'baseline' }}>
            <Text size={16}>Cập nhật thông tin</Text>
            <Text
              size={12}
              color={theme.COLORS.PRIMARY}
              onPress={() => {
                setModalMess(
                  `Goodbye, ${user.name || user.displayName || user.email}!`,
                );
                toggleModal(true);
                firebase.auth.signOut().then(() => {
                  // popToTop()
                  // Alert.alert('User signed out!')
                });
              }}>
              Đăng xuất
            </Text>
          </Block>
          <Block flex center>
            <Block style={styles.blockInput}>
              <Input
                rounded
                placeholder="Tên"
                defaultValue={user.name}
                iconContent={
                  <Icon
                    size={16}
                    color={materialTheme.COLORS.ICON}
                    name="account-circle"
                    style={styles.inputIcons}
                  />
                }
                autoFocus={true}
                id="name"
                errors={errors}
                setValue={setValue}
                triggerValidation={triggerValidation}
              />
            </Block>
            <Block style={styles.blockInput}>
              <Input
                rounded
                placeholder="Email"
                defaultValue={user.email}
                iconContent={
                  <Icon
                    size={16}
                    color={materialTheme.COLORS.ICON}
                    name="email"
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
                rounded
                placeholder="Số Điện Thoại"
                iconContent={
                  <Icon
                    size={16}
                    color={materialTheme.COLORS.ICON}
                    name="phone"
                    style={styles.inputIcons}
                  />
                }
                id="phone"
                errors={errors}
                setValue={setValue}
                triggerValidation={triggerValidation}
              />
            </Block>
            <Block style={styles.blockInput}>
              <Input
                rounded
                placeholder="Địa Chỉ"
                iconContent={
                  <Icon
                    size={16}
                    color={materialTheme.COLORS.ICON}
                    name="map-marker"
                    family="font-awesome"
                    style={styles.inputIcons}
                  />
                }
                id="address"
                errors={errors}
                setValue={setValue}
                triggerValidation={triggerValidation}
              />
            </Block>
          </Block>
          <Block middle>
            <Button
              color="pink"
              style={styles.createButton}
              onPress={!waiting ? handleSubmit(onSubmit) : () => { }}>
              {waiting ? (
                <ActivityIndicator size="small" color="white" />
              ) : (
                  <Text bold size={14} color="white">
                    Lưu thay đổi{' '}
                  </Text>
                )}
            </Button>
          </Block>
          <Modal
            message={modalMess}
            isModalVisible={isModalVisible}
            toggleModal={() => {
              toggleModal(!isModalVisible);
            }}
          />
        </ScrollView>
      </Block>,
    ];
  };
  return (
    // <Block flex style={styles.profile}>
    //   {renderProfile()}
    // </Block>
    <RenderProfile />
  );
});
