import React from 'react';
import { createIconSetFromIcoMoon } from 'react-native-vector-icons';
import { Icon as GaIcon } from 'galio-framework';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import GalioConfig from '../assets/fonts/galioExtra';
const IconGalioExtra = createIconSetFromIcoMoon(GalioConfig, 'GalioExtra', 'galioExtra.ttf');


export default class IconExtra extends React.Component {
  render() {
    const { name, family, ...rest } = this.props;
    if (family === 'GalioExtra') {
      return <IconGalioExtra name={name} family={family} {...rest} />;
    }
    else
      if (family) {
        return <GaIcon name={name} family={family} {...rest} />;
      }
    return <Icon name={name} {...rest} />;
  }
}
