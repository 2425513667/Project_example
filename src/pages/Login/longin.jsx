import React from "react";
import { withRouter } from "react-router-dom";
import { mainContext } from "../../reducer";
import { FormattedMessage } from "react-intl";
import "./login.css";
import { connect } from "react-redux";
import { Remember, Forget } from "../../redux/actions/login";
import { Formik, useFormik } from "formik";
import * as Yup from "yup";
import { TextField } from "@material-ui/core";
import CommonTip from "../../components/CommonTip";

function Login(props) {
  const [statechushizi, setstatechushizi] = React.useState([
    { account_number: "111", password: "111" },
    { account_number: "222", password: "222" },
    { account_number: "333", password: "333" },
    { account_number: "444", password: "444" },
    { account_number: "555", password: "555" },
    { account_number: "666", password: "666" },
    { account_number: "777", password: "777" },
    { account_number: "888", password: "888" },
    { account_number: "999", password: "999" },
  ]);

  //获取数据
  let [data, setData] = React.useState({
    words: { account_number: "", password: "" },
  });
  const getVlaue = (key, e) => {
    let d = data.words;
    for (let index in data.words) {
      if (index === key) {
        d[index] = e.target.value;
        setData({ words: d });
      }
    }
  };
  const login = (zhang, pas) => {
    if (zhang === "" || pas === "") {
    } else {
      const py = statechushizi.find((pyadsa) => {
        return pyadsa.account_number === zhang && pyadsa.password === pas;
      });
      if (py === null) {
        CommonTip.error("登录失败");
      } else {
        let Remember_password = document.getElementById("logincheckbox");
        if (Remember_password.checked) {
          props.Remember(py);
        } else {
          props.Forget({
            account_number: `${py.account_number}`,
            password: "",
          });
        }
        props.history.push("/main/order");
        CommonTip.success("登录成功");
      }
    }
  };
  //阻止from表单提交
  const handleSubmit = (event) => {
    event.preventDefault();
  };

  //改变语言
  const { dispatch, state } = React.useContext(mainContext);
  const { locale } = state;
  const changeLang = () => {
    // 改变状态里的 语言 进行切换
    dispatch({
      type: "CHANGE_LOCALE",
      locale: locale === "zh" ? "en" : "zh",
    });
  };
  //改变语言结束

  //表单验证
  const initialValues = {
    account_number: undefined,
    password: undefined,
  };
  const validationSchema = Yup.object({
    account_number: Yup.string()
      .max(15, "用户名长度不得超过15个字")
      .required("请输入用户名"),
    Password: Yup.string().min(3, "密码长度不得小于3").required("请输入密码"),
  });

  const formik = useFormik({
    initialValues,
    validationSchema,
  });
  return (
    <div id="pyLogin">
      <div className="sub-main-w3">
        <Formik
          initialValues={initialValues}
          validationSchema={validationSchema}
        >
          <form onSubmit={handleSubmit} style={{ marginTop: "50px" }}>
            <h2 id="Longinh2">
              <FormattedMessage id="Login"></FormattedMessage>
              <i className="fas fa-level-down-alt"></i>
            </h2>
            <div className="form-style-agile">
              <label>
                <i className="fas fa-user"></i>
                <FormattedMessage id="Username"></FormattedMessage>
              </label>

              <FormattedMessage id="Prompt_username">
                {(txt) => (
                  <TextField
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    error={
                      formik.touched.account_number &&
                      formik.errors.account_number
                    }
                    name="account_number"
                    value={formik.values.account_number}
                    variant="outlined"
                    helperText={
                      formik.touched.account_number &&
                      formik.errors.account_number
                    }
                    placeholder={txt.toString()}
                    onKeyUp={getVlaue.bind(this, "account_number")}
                    style={{
                      width: "100%",
                      color: "#000",
                      outline: "none",
                      fontsize: "14px",
                      letterspacing: "1px",
                    }}
                  />
                )}
              </FormattedMessage>
            </div>
            <div className="form-style-agile">
              <label>
                <i className="fas fa-unlock-alt"></i>
                <FormattedMessage id="Password"></FormattedMessage>
              </label>
              <FormattedMessage id="Prompt_password">
                {(tex) => (
                  <TextField
                    type="password"
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    error={formik.touched.Password && formik.errors.Password}
                    name="Password"
                    value={formik.values.Password}
                    variant="outlined"
                    helperText={
                      formik.touched.Password && formik.errors.Password
                    }
                    placeholder={tex.toString()}
                    onKeyUp={getVlaue.bind(this, "password")}
                    style={{
                      width: "100%",
                      color: "#000",
                      outline: "none",
                      fontsize: "14px",
                      letterspacing: "1px",
                    }}
                  />
                )}
              </FormattedMessage>
            </div>
            <div className="wthree-text">
              <ul>
                <li>
                  <label className="anim">
                    <input
                      type="checkbox"
                      className="checkbox"
                      required=""
                      id="logincheckbox"
                    />
                    <span>
                      <FormattedMessage id="Remember_password"></FormattedMessage>
                    </span>
                  </label>
                </li>
                <li>
                  <a href="#">
                    <FormattedMessage id="Forget_password"></FormattedMessage>?
                  </a>
                </li>
              </ul>
            </div>
            <FormattedMessage id="Login">
              {(tex) => (
                <input
                  type="submit"
                  value={tex.toString()}
                  onClick={() =>
                    login(data.words.account_number, data.words.password)
                  }
                />
              )}
            </FormattedMessage>
            &nbsp;:&nbsp;&nbsp;
            <FormattedMessage id="switch">
              {(tex) => (
                <input
                  type="button"
                  value={tex.toString()}
                  onClick={changeLang}
                />
              )}
            </FormattedMessage>
          </form>
        </Formik>
      </div>
    </div>
  );
}

export default connect(
  (state) => ({
    login: state.login,
  }),
  { Remember, Forget } //映射操作状态的方法
)(withRouter(Login));
