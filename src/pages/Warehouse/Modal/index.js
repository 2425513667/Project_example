import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import {
  TextField,
  FormLabel,
  Box,
  Modal,
  Typography,
  Select,
  MenuItem,
  FormControl,
  InputLabel
} from '@material-ui/core';
import { selectAddress, selectWeather } from '../../../Api/weather'


const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 800,
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  p: 4
};

export default function KeepMountedModal(props) {
  const { address, openWeather, setOpenWeather } = props;

  //经纬度数据
  const [LongitudeAndLatitude, setLongitudeAndLatitude] = useState();

  // 区域
  const [region, setRegion] = useState();
  // 实时天气数据
  const [weather, setWeather] = useState();

  useEffect(() => {
    if (openWeather) {
      selectAddress(address).then(
        (response) => {
          setLongitudeAndLatitude(response?.data?.location[0]?.id);
          setRegion(response?.data?.location)
        },
        (error) => {
          console.log("失败了", error);
        }
      );
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [address])

  useEffect(() => {
    if (!(LongitudeAndLatitude === null && LongitudeAndLatitude === undefined)) {
      selectWeather(LongitudeAndLatitude).then(
        (response) => {
          console.log("成功了selectWeather", response?.data?.now);
          setWeather(response?.data?.now);
        },
        (error) => {
          console.log("失败了", error);
        }
      );
    }
  }, [LongitudeAndLatitude]);

  // 选择数据
  const handleRegion = (e) => {
    setLongitudeAndLatitude(e?.target?.value)
  }

  //关闭
  const handleClose = () => setOpenWeather(false);

  return (
    <div>
      <Modal
        keepMounted
        open={openWeather}
        onClose={handleClose}
        aria-labelledby="keep-mounted-modal-title"
        aria-describedby="keep-mounted-modal-description"
      >
        <Box sx={style}>
          <Typography id="keep-mounted-modal-title" variant="h2" component="h2">
            <b>{address} 的天气信息</b>
          </Typography>
          <div
            style={{
              background: '#fff',
              padding: 40,
              height: '80vh',
              overflowY: 'auto',
              float: 'left'
            }}
          >
            <div style={{ display: 'block', marginLeft: 30, marginBottom: 10 }}>
              <span style={{ marginRight: 30 }}>
                <FormControl>
                  <InputLabel htmlFor="grouped-native-select1">
                    选择天气的区域
                  </InputLabel>
                  <Select
                    style={{
                      marginTop: '16px',
                      width: '265px',
                      marginBottom: '10px',
                      height: '20px!important'
                    }}
                    id="grouped-native-select1"
                    value={LongitudeAndLatitude}
                    label="选择区域"
                    onChange={handleRegion}
                  >
                    {region?.map((py) => (<MenuItem value={py?.id}>{py?.name}</MenuItem>))}
                  </Select>
                </FormControl>
              </span>
            </div>
            <div style={{ display: 'block', marginLeft: 30, marginBottom: 10 }}>
              <h3 style={{ marginRight: 30 ,fontSize:30 ,marginBottom: '10px'}}>
                温度：{weather?.temp}
              </h3>
              <h3 style={{ marginRight: 30 ,fontSize:30 ,marginBottom: '10px'}}>
                体感温度：{weather?.feelsLike}
              </h3>
              <h3 style={{ marginRight: 30 ,fontSize:30 ,marginBottom: '10px'}}>
                风向360角度：{weather?.wind360}
              </h3>
              <h3 style={{ marginRight: 30 ,fontSize:30 ,marginBottom: '10px'}}>
                天气：{weather?.text}
              </h3>
              <h3 style={{ marginRight: 30 ,fontSize:30 ,marginBottom: '10px'}}>
                风向：{weather?.windDir}
              </h3>
              <h3 style={{ marginRight: 30 ,fontSize:30 ,marginBottom: '10px'}}>
                风立等级：{weather?.windScale}
              </h3>
              <h3 style={{ marginRight: 30 ,fontSize:30 ,marginBottom: '10px'}}>
                风速：{weather?.windSpeed}
              </h3>
              <h3 style={{ marginRight: 30 ,fontSize:30 ,marginBottom: '10px'}}>
                湿度：{weather?.humidity}
              </h3>
              
            </div>
          </div>
        </Box>
      </Modal>
    </div>
  );
}

KeepMountedModal.propTypes = {
  openWeather: PropTypes.bool,
  setOpenWeather: PropTypes.func.isRequired,
  address: PropTypes.string
};
