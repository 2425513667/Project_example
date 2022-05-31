import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import MuiAlert from '@material-ui/lab/Alert';
import { Snackbar } from '@material-ui/core';


class CommonTip extends Component {
  static info(msg, autoHideDuration = 2000) {
    this.showtip({ msg, serverity: 'info', autoHideDuration });
  }

  static success(msg, autoHideDuration = 2000) {
    this.showtip({ msg, severity: 'success', autoHideDuration });
  }

  static warning(msg, autoHideDuration = 2000) {
    this.showtip({ msg, severity: 'warning', autoHideDuration });
  }

  static error(msg, autoHideDuration = 2000) {
    this.showtip({ msg, severity: 'error', autoHideDuration });
  }

  static showtip(options) {
    const defaultOptions = {
      msg: '',
      severity: 'info',
      autoHideDuration: options.autoHideDuration
        ? options.autoHideDuration
        : 5000,
      vertical: 'top',
      horizontal: 'center',
      ...options
    };
    const opt = { ...defaultOptions };
    const div = document.createElement('div');
    div.style.position = 'absolute';
    div.style.zIndex = '1300';
    document.body.append(div);

    const handleClose = (_event, reason) => {
      if (reason === 'clickaway') {
        return;
      }

      ReactDOM.unmountComponentAtNode(div);
      setTimeout(() => document.body.removeChild(div), 50);
    };

    const Alert = (props) => (
      <Snackbar
        anchorOrigin={{
          vertical: props.vertical,
          horizontal: props.horizontal
        }}
        open
        autoHideDuration={props.autoHideDuration}
        onClose={handleClose}
      >
        <MuiAlert variant="filled" severity={props.severity}>
          {props.msg}
        </MuiAlert>
      </Snackbar>
    );
    ReactDOM.render(<Alert {...opt} />, div);
  }
}
export default CommonTip;
