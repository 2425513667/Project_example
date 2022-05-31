import { React, useState, useEffect } from 'react';

import PropTypes from 'prop-types';

import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle
} from '@material-ui/core';

const StyledDialog = (props) => {
  const {
    id,
    content,
    open,
    handleClose,
    handleConfirm,
    title = '提示',
    maxWidth = 'sm'
  } = props;
  const [data, setData] = useState(id);
  const fullwidth = true;
  useEffect(() => {
    setData(id);
  }, [id]);

  return (
    <Dialog
      fullWidth={fullwidth}
      maxWidth={maxWidth}
      open={open}
      onClose={() => {
        handleClose(false);
      }}
    >
      <DialogTitle>{title}</DialogTitle>
      <DialogContent>{content || '是否执行操作'}</DialogContent>
      <DialogActions>
        <Button
          onClick={() => {
            handleConfirm(data);
          }}
          color="primary"
          variant="contained"
        >
          确认
        </Button>
        <Button
          onClick={() => {
            handleClose(false);
          }}
          color="primary"
          variant="outlined"
          autoFocus
        >
          取消
        </Button>
      </DialogActions>
    </Dialog>
  );
};

StyledDialog.propTypes = {
  id: PropTypes.number,
  content: PropTypes.any,
  open: PropTypes.bool,
  handleClose: PropTypes.func,
  handleConfirm: PropTypes.func,
  title: PropTypes.string,
  maxWidth: PropTypes.string
};

export default StyledDialog;
