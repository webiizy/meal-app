import React from 'react';
import { withNavigation } from '@react-navigation/compat';
import { TouchableOpacity, StyleSheet, Platform, Dimensions } from 'react-native';
import { Button, Block, NavBar, Input, Text, theme } from 'galio-framework';
import { StateContext, firebase } from "../context";
import Icon from './Icon';
import materialTheme from '../constants/Theme';

const { height, width } = Dimensions.get('window');
const iPhoneX = () => Platform.OS === 'ios' && (height === 812 || width === 812 || height === 896 || width === 896);

const ChatButton = ({ isWhite, style, navigation }) => (
  <TouchableOpacity style={[styles.button, style]} onPress={() => { }}>
    <Icon
      family="GalioExtra"
      size={16}
      name="chat-33"
      color={theme.COLORS[isWhite ? 'WHITE' : 'ICON']}
    />
    <Block middle style={styles.notify} />
  </TouchableOpacity >
);

const BasketButton = ({ isWhite, style, navigation }) => (
  <TouchableOpacity style={[styles.button, style]} onPress={() => navigation.navigate('Basket')}>
    <Icon
      family="GalioExtra"
      size={16}
      name="basket-simple"
      color={theme.COLORS[isWhite ? 'WHITE' : 'ICON']}
    />
    <Block middle style={styles.notify} />
  </TouchableOpacity>
);

const SearchButton = ({ isWhite, style, navigation }) => (
  <TouchableOpacity style={[styles.button, style]} onPress={() => { }}>
    <Icon
      size={16}
      family="entypo"
      name="magnifying-glass"
      color={theme.COLORS[isWhite ? 'WHITE' : 'ICON']}
    />
  </TouchableOpacity >
);

const Header = (props) => {
  const { white, title, navigation, back, tabTitleLeft, tabTitleRight, search, tabs, transparent } = props;
  const { user } = React.useContext(StateContext);
  const handleLeftPress = () => {
    // console.log("navigation", user)
    return (back ? navigation.goBack() : null
      //  navigation.openDrawer()
    );
  }

  const renderRight = () => {

    // return (  <BasketButton key='basket-search' navigation={navigation} isWhite={white} />);
    switch (title) {
      case 'Notification':
      case 'Sign In':
      case 'Sign Up':
      case 'Settings':
        return;
      default:

        return user.isAnonymous ? null : (<BasketButton key='basket-search' navigation={navigation} isWhite={white} />);
    }
  }

  const renderSearch = () => {
    return (
      <Input
        right
        color="black"
        style={styles.search}
        placeholder="Tìm kiếm"
        onFocus={() => { }}
        iconContent={<Icon size={16} color={theme.COLORS.MUTED} name="magnifying-glass" family="entypo" />}
      />
    )
  }

  const renderTabs = () => {

    return (
      <Block row style={styles.tabs}>
        <Button shadowless style={[styles.tab, styles.divider]} onPress={() => { }}>
          <Block row middle>
            <Icon name="grid" family="feather" style={{ paddingRight: 8 }} />
            <Text size={16} style={styles.tabTitle}>{tabTitleLeft || 'Categories'}</Text>
          </Block>
        </Button>
        <Button shadowless style={styles.tab} onPress={() => { }}>
          <Block row middle>
            <Icon size={16} name="camera-18" family="GalioExtra" style={{ paddingRight: 8 }} />
            <Text size={16} style={styles.tabTitle}>{tabTitleRight || 'Best Deals'}</Text>
          </Block>
        </Button >
      </Block >
    )
  }

  const renderHeader = () => {
    if (search || tabs) {
      return (
        <Block center>
          {search ? renderSearch() : null}
          {tabs ? renderTabs() : null}
        </Block>
      )
    }
    return null;
  }

  // const { routeName } = navigation.state;
  const noShadow = ["Search", "Categories", "Deals", "Pro", "Profile"].includes(title);
  const headerStyles = [
    !noShadow ? styles.shadow : null,
    transparent ? { backgroundColor: 'rgba(0,0,0,0)' } : null,
  ];

  return (
    <Block style={headerStyles}>
      <NavBar
        back={back}
        title={title}
        style={styles.navbar}
        transparent={transparent}
        right={renderRight()}
        rightStyle={{ alignItems: 'center' }}
        leftStyle={{ flex: 0.3, paddingTop: 2 }}
        leftIconName={(back ? 'chevron-left' : 'navicon')}
        leftIconColor={white ? theme.COLORS.WHITE : theme.COLORS.ICON}
        titleStyle={[
          styles.title,
          { color: theme.COLORS[white ? 'WHITE' : 'ICON'] },
        ]}
        onLeftPress={handleLeftPress}
      />
      {renderHeader()}
    </Block>
  );

}

export default withNavigation(Header);

const styles = StyleSheet.create({
  button: {
    padding: 10,
    position: 'relative',
  },
  title: {
    width: '100%',
    fontSize: 16,
    fontWeight: 'bold',
  },
  navbar: {
    paddingVertical: 0,
    // paddingBottom: theme.SIZES.BASE,
    // paddingTop: theme.SIZES.BASE,
    zIndex: 5,
    // height: 50
  },
  shadow: {
    backgroundColor: theme.COLORS.WHITE,
    shadowColor: 'black',
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 6,
    shadowOpacity: 0.2,
    elevation: 3,
  },
  notify: {
    backgroundColor: materialTheme.COLORS.LABEL,
    borderRadius: 4,
    height: theme.SIZES.BASE / 2,
    width: theme.SIZES.BASE / 2,
    position: 'absolute',
    top: 8,
    right: 8,
  },
  header: {
    backgroundColor: theme.COLORS.WHITE,
  },
  divider: {
    borderRightWidth: 0.3,
    borderRightColor: theme.COLORS.MUTED,
  },
  search: {
    height: 48,
    width: width - 32,
    marginHorizontal: 16,
    borderWidth: 1,
    borderRadius: 3,
  },
  tabs: {
    marginBottom: 24,
    marginTop: 10,
    elevation: 4,
  },
  tab: {
    backgroundColor: theme.COLORS.TRANSPARENT,
    width: width * 0.50,
    borderRadius: 0,
    borderWidth: 0,
    height: 24,
    elevation: 0,
  },
  tabTitle: {
    lineHeight: 19,
    fontWeight: '300'
  },
})