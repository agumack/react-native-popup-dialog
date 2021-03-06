// flow

import React, { PropTypes, Component } from 'react';
import { Dimensions } from 'react-native';
import Dialog from './components/Dialog';
import DialogTitle from './components/DialogTitle';
import ScaleAnimation from './animations/ScaleAnimation';

const SCRREN_WIDTH = Dimensions.get('window').width;
const SCRREN_HEIGHT = Dimensions.get('window').height;

const propTypes = {
  ...Dialog.propTypes,
  ...DialogTitle.propTypes,
};

const defaultProps = {
  animation: 'scale',
  animationDuration: 200,
  closeOnTouchOutside: true,
  dialogAnimation: new ScaleAnimation(),
};

class PopupDialog extends Component {
  static propTypes = propTypes
  static defaultProps = defaultProps

  openDialog(onOpened) {
    this.dialog.open(onOpened);
  }

  closeDialog(onClosed) {
    this.dialog.closed(onClosed);
  }

  render() {
    let title;

    if (this.props.title) {
      title = <DialogTitle {...this.props} />;
    }

    return (
      <Dialog
        ref={(dialog) => { this.dialog = dialog; }}
        {...this.props}
      >
        {title}
      </Dialog>
    );
  }
}

export default PopupDialog;
