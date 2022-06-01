import _ from 'lodash';
import moment from 'moment';
import PropTypes from 'prop-types';
import { useFormik } from 'formik';
import { indigo } from '@material-ui/core/colors';
import React, { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Button, Box, Grid } from '@material-ui/core';
import KeyboardArrowDownIcon from '@material-ui/icons/KeyboardArrowDown';
import KeyboardArrowUpIcon from '@material-ui/icons/KeyboardArrowUp';
import RenderHeaderItem from '../../components/RenderHeaderItem';

const useStyles = makeStyles((theme) => ({
  root: {
    margin: theme.spacing(0, 2)
  },
  'control-columns-icon': {
    color: indigo[400],
    cursor: 'pointer',
    margin: theme.spacing(1, 1, 0, 0)
  },
  'adsearch-icon': {
    color: indigo[400],
    cursor: 'pointer',
    fontSize: '30px',
    margin: theme.spacing(1, 1, 0, 0)
  },
  'flex-icon': {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center'
  },
  'reset-btn-flex': {
    marginLeft: "80%",
    width: '200px',
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center'
  }
}));

export default function Index(props) {
  const {
    headerFiled,
    setParams,
    params
  } = props;
  const classes = useStyles();

  // 控制列展开表单的图标
  const [showAllHeaderFiled, setShowAllHeaderFiled] = useState(false);


  const formik = useFormik({
    initialValues: {
      Warehouse: "",
      commodity: "",
      postName: "",
      postSort: "",
      postCode: "",
      status: "",
      createTime: null,
      CreationTime:null,
      WarehouseSize:"",
      WarehouseAddress:"",
      personInCnharge:"",
      staffSort:"",
    },

    onSubmit: (val) => {
      const copyval = _.cloneDeep(val);
      // copyval.currentSalary =
      //   copyval.currentSalary === '' ? null : copyval.currentSalary;
      // copyval.expectSalary =
      //   copyval.expectSalary === '' ? null : copyval.expectSalary;
      copyval.createTime = val.createTime
        ? new Date(moment(val.createTime).format('YYYY-MM-DD'))
        : val.createTime;
      setParams({
        ...params,
        ...copyval,
        pageIndex: 1
      });
    },
    onReset: () => {
      setParams({
        // pageIndex: 1,
        // pageSize: 5,
        Warehouse: "",//仓库信息
        commodity: "",//商品名称
        postName: "",//登记员
        postSort: "",//数量
        postCode: "",//商品类别
        status: "",//状态
        createTime: null,//登记时间
        CreationTime:null,//创建时间
        WarehouseSize:"",//仓库大小
        WarehouseAddress:"",//仓库地址
        personInCnharge:"",//负责人
        staffSort:"",//员工数量
      });
    }
  });

  // 重置表单头的搜索字段
  const handleReset = () => {
    formik.handleReset();
  };

  // 显示隐藏表单的高级搜索
  const showAllHeader = () => {
    setShowAllHeaderFiled(!showAllHeaderFiled);
  };


  return (
    <div className={classes.root}>
      <form onSubmit={formik.handleSubmit}>
        <Grid container>
          {headerFiled.map(
            (item) =>
              (showAllHeaderFiled || item?.isShow) && (
                <RenderHeaderItem
                  key={item.filed}
                  formik={formik}
                  item={item}
                />
              )
          )}
        </Grid>

        {/* 按钮区域 */}
        <div className={classes['flex-icon']}>
          <Box className={classes['reset-btn-flex']}>
            <Button
              variant="contained"
              color="primary"
              type="submit"
            >
              搜索
            </Button>
            <Button
              variant="outlined"
              color="primary"
              type="reset"
              onClick={handleReset}
            >
              重置
            </Button>
            {showAllHeaderFiled ? (
              <KeyboardArrowUpIcon
                className={classes['adsearch-icon']}
                onClick={showAllHeader}
              />
            ) : (
              <KeyboardArrowDownIcon
                className={classes['adsearch-icon']}
                onClick={showAllHeader}
              />
            )}
          </Box>
        </div>
      </form>
    </div>
  );
}

Index.propTypes = {
  params: PropTypes.object, 
  headerFiled: PropTypes.object,
  setParams: PropTypes.func,
};
