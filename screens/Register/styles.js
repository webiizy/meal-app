import {StyleSheet, Dimensions} from 'react-native';
import {theme} from 'galio-framework';
import {argonTheme, materialTheme} from '../../constants';
import {HeaderHeight} from '../../constants/utils';

const {width, height} = Dimensions.get('screen');
export default StyleSheet.create({
  registerContainer: {
    marginVertical: theme.SIZES.BASE * 0.75,
    width: width * 0.9,
    height: 'auto',
    backgroundColor: materialTheme.COLORS.DEFAULT,
    borderRadius: 4,
    shadowColor: argonTheme.COLORS.BLACK,
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowRadius: 8,
    shadowOpacity: 0.1,
    elevation: 1,
    overflow: 'hidden',
  },
  socialConnect: {
    paddingVertical: theme.SIZES.BASE,
    backgroundColor: argonTheme.COLORS.WHITE,
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderColor: '#8898AA',
  },
  socialButtons: {
    width: width * 0.3,
    height: 40,
    backgroundColor: '#fff',
    shadowColor: argonTheme.COLORS.BLACK,
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowRadius: 8,
    shadowOpacity: 0.1,
    elevation: 1,
  },
  socialTextButtons: {
    color: 'white',
    fontWeight: '800',
    fontSize: 14,
  },
  formInput: {
    paddingVertical: theme.SIZES.BASE,
  },
  blockInput: {
    width: width * 0.8,
    height: 80,
  },
  inputIcons: {
    marginRight: 12,
  },
  createButton: {
    width: width * 0.5,
    marginVertical: 15,
  },
  group: {
    paddingTop: theme.SIZES.BASE * 1.75,
  },
  profile: {
    marginTop: Platform.OS === 'android' ? -HeaderHeight : 0,
    marginBottom: -HeaderHeight * 2,
  },
  profileImage: {
    width: width,
    height: height * 0.4,
  },
  profileContainer: {
    width: width * 0.8,
    height: height * 0.4,
    opacity: 0.6,
  },
  profileDetails: {
    paddingTop: theme.SIZES.BASE * 4,
    justifyContent: 'flex-end',
    position: 'relative',
  },
  profileTexts: {
    paddingHorizontal: theme.SIZES.BASE * 2,
    paddingVertical: theme.SIZES.BASE * 2,
    zIndex: 2,
  },
  options: {
    position: 'relative',
    padding: theme.SIZES.BASE,
    marginHorizontal: theme.SIZES.BASE,
    // marginTop: -theme.SIZES.BASE * 7,
    borderTopLeftRadius: 13,
    borderTopRightRadius: 13,
    backgroundColor: theme.COLORS.WHITE,
    shadowColor: 'black',
    shadowOffset: {width: 0, height: 0},
    shadowRadius: 8,
    shadowOpacity: 0.2,
    zIndex: 2,
  },
});
