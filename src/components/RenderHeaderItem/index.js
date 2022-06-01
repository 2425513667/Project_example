import 'date-fns';
import React from 'react';
import PropTypes from 'prop-types';
import DateFnsUtils from '@date-io/date-fns';
import { makeStyles } from '@material-ui/core/styles';
import { MuiPickersUtilsProvider, DatePicker } from '@material-ui/pickers';
import {
  Grid,
  Select,
  Tooltip,
  MenuItem,
  Checkbox,
  TextField,
  InputLabel
} from '@material-ui/core';
import { Autocomplete, createFilterOptions } from '@material-ui/lab';

const filter = createFilterOptions();
const useStyles = makeStyles((theme) => ({
  'input-label': {
    color: '#333',
    width: '114px',
    textAlign: 'right',
    overflow: 'visible'
  },
  'item-container': {
    paddingRight: theme.spacing(5),
    height: '100%',
    display: 'flex',
    '& .MuiTextField-root': {
      flex: 1
    },
    '& .MuiAutocomplete-root': {
      flex: 1
    }
  },
  'item-relative': {
    position: 'relative',
    '& .checkbox': {
      position: 'absolute',
      right: '-50px',
      '& .tip': {
        color: '#333',
        fontSize: '15px'
      }
    }
  }
}));
export default function Index(props) {
  const classes = useStyles();
  const { formik, item } = props;

  const render = (type) => {
    switch (type) {
      case 'date':
        return (
          <Grid item xs={4}>
            <Grid
              container
              alignItems="center"
              className={classes['item-container']}
            >
              <InputLabel className={classes['input-label']}>
                {item.labelName}：
              </InputLabel>
              <MuiPickersUtilsProvider utils={DateFnsUtils}>
                <DatePicker
                  disableToolbar
                  label=""
                  margin="normal"
                  variant="inline"
                  format="yyyy/MM/dd"
                  inputVariant="standard"
                  id="date-picker-inline"
                  invalidDateMessage="请输入正确的格式(年/月/日)"
                  onChange={(value) => {
                    formik.setFieldValue(item?.filed, value || []);
                  }}
                  value={formik.values[item.filed]}
                  name={item?.filed}
                />
              </MuiPickersUtilsProvider>
            </Grid>
          </Grid>
        );
      case 'skill':
        return (
          <Grid item xs={4}>
            <Grid
              container
              alignItems="center"
              className={`${classes['item-container']} ${classes['item-relative']}`}
            >
              <InputLabel className={classes['input-label']}>
                {item.labelName}：
              </InputLabel>
              <Autocomplete
                multiple
                freeSolo
                autoSelect
                limitTags={1}
                disableListWrap
                options={item?.data}
                getOptionLabel={(option) => {
                  if (option.inputValue) {
                    return option.inputValue;
                  }
                  return option?.skillName || '';
                }}
                forcePopupIcon={false}
                value={formik.values[item.filed]}
                onChange={(e, value) => {
                  let newValue = value;
                  if (typeof value[value.length - 1] === 'string') {
                    const skillName = newValue.pop();
                    newValue = [
                      ...value,
                      {
                        skillName,
                        id: parseInt(
                          Date.parse(new Date()).toString().substring(4),
                          10
                        )
                      }
                    ];
                  }
                  formik.setFieldValue(item.filed, newValue || []);
                }}
                filterOptions={(options, params) => {
                  const filtered = filter(options, params);
                  if (params.inputValue !== '') {
                    filtered.push({
                      skillName: params.inputValue,
                      id: parseInt(
                        Date.parse(new Date()).toString().substring(4),
                        10
                      ),
                      title: `Add "${params.inputValue}"`
                    });
                  }

                  return filtered;
                }}
                name={item?.filed}
                renderInput={(params) => (
                  <TextField {...params} variant="standard" />
                )}
              />

              <div className="checkbox">
                <Tooltip title={formik.values.skillType ? 'And' : 'Or'}>
                  <Checkbox
                    color="primary"
                    name="skillType"
                    checked={formik.values.skillType}
                    onChange={formik.handleChange}
                  />
                </Tooltip>
                <span className="tip">
                  {formik.values.skillType ? '并关系' : '或关系'}
                </span>
              </div>
            </Grid>
          </Grid>
        );
      case 'number':
        return (
          <Grid item xs={4}>
            <Grid
              container
              alignItems="center"
              className={classes['item-container']}
            >
              <InputLabel className={classes['input-label']}>
                {item.labelName}：
              </InputLabel>
              <TextField
                size="small"
                type="number"
                margin="normal"
                variant="standard"
                name={item?.filed}
                onChange={formik.handleChange}
                value={formik.values[item.filed]}
              />
            </Grid>
          </Grid>
        );
      case 'single-select':
        return (
          <Grid item xs={4}>
            <Grid
              container
              alignItems="center"
              style={{ marginTop: '10px' }}
              className={classes['item-container']}
            >
              <InputLabel className={classes['input-label']}>
                {item.labelName}：
              </InputLabel>
              <Select
                value={formik?.values?.[item.filed] || ''}
                onChange={(e) => {
                  formik.setFieldValue(item.filed, e.target.value || '');
                }}
                name={item.filed}
                displayEmpty
                style={{ flex: 1 }}
                inputProps={{ 'aria-label': 'Without label' }}
              >
                {item?.data?.map((val) => (
                  <MenuItem key={val} value={val}>
                    {val}
                  </MenuItem>
                ))}
              </Select>
            </Grid>
          </Grid>
        );
      default:
        return (
          <Grid item xs={4}>
            <Grid
              container
              alignItems="center"
              className={classes['item-container']}
            >
              <InputLabel className={classes['input-label']}>
                {item.labelName}：
              </InputLabel>
              <TextField
                size="small"
                margin="normal"
                name={item.filed}
                variant="standard"
                onChange={formik.handleChange}
                value={formik.values[item.filed] || ''}
              />
            </Grid>
          </Grid>
        );
    }
  };

  return <>{render(item?.type)}</>;
}

Index.propTypes = {
  formik: PropTypes.any,
  item: PropTypes.any
};
