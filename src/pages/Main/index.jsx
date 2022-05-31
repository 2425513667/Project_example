import React from "react";
import clsx from "clsx";
import { makeStyles, useTheme } from "@material-ui/core/styles";
import MenuIcon from "@material-ui/icons/Menu";
import ChevronLeftIcon from "@material-ui/icons/ChevronLeft";
import ChevronRightIcon from "@material-ui/icons/ChevronRight";
import {
  Button,
  ListItemText,
  ListItemIcon,
  ListItem,
  IconButton,
  Divider,
  Typography,
  List,
  Toolbar,
  AppBar,
  CssBaseline,
  Drawer,
} from "@material-ui/core";
import InboxIcon from "@material-ui/icons/MoveToInbox";
import MailIcon from "@material-ui/icons/Mail";
import { NavLink, Route, Switch } from "react-router-dom";
import Home from "../Home";
import Order from "../Order";

import { mainContext } from "../../reducer";
import { FormattedMessage } from "react-intl";
import { connect } from "react-redux";

const drawerWidth = 240;
const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
  },
  appBar: {
    transition: theme.transitions.create(["margin", "width"], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
  },
  appBarShift: {
    width: `calc(100% - ${drawerWidth}px)`,
    marginLeft: drawerWidth,
    transition: theme.transitions.create(["margin", "width"], {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen,
    }),
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  hide: {
    display: "none",
  },
  drawer: {
    width: drawerWidth,
    flexShrink: 0,
  },
  drawerPaper: {
    width: drawerWidth,
  },
  drawerHeader: {
    display: "flex",
    alignItems: "center",
    padding: theme.spacing(0, 1),
    ...theme.mixins.toolbar,
    justifyContent: "flex-end",
  },
  content: {
    flexGrow: 1,
    padding: theme.spacing(3),
    transition: theme.transitions.create("margin", {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    marginLeft: -drawerWidth,
  },
  contentShift: {
    transition: theme.transitions.create("margin", {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen,
    }),
    marginLeft: 0,
  },
}));

function Main(props) {
  const classes = useStyles();
  const theme = useTheme();
  const [open, setOpen] = React.useState(true); //导航栏是否显示初始

  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const handleDrawerClose = () => {
    setOpen(false);
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

  return (
    <div className={classes.root}>
      <CssBaseline />
      <AppBar
        position="fixed"
        className={clsx(classes.appBar, {
          [classes.appBarShift]: open,
        })}
      >
        <Toolbar width="100%">
          <IconButton
            color="inherit"
            aria-label="open drawer"
            onClick={handleDrawerOpen}
            edge="start"
            className={clsx(classes.menuButton, open && classes.hide)}
          >
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" noWrap style={{ width: "30%" }}>
            <FormattedMessage id="main_pyjiemian" />
            {/* 彭烨首界面 */}
          </Typography>

          <Typography variant="h6" noWrap style={{ marginLeft: "10px" }}>
            <Button
              color="primary"
              variant="contained"
              textAllCaps="false"
              onClick={changeLang}
            >
              <FormattedMessage id="switch" />
            </Button>
          </Typography>

          <Typography variant="h6" noWrap style={{ marginLeft: "50%" }}>
            <Button
              color="primary"
              variant="contained"
              textAllCaps="false"
              onClick={() => {
                props.history.push("/login");
              }}
            >
              退出
            </Button>
          </Typography>
        </Toolbar>
      </AppBar>
      <Drawer
        className={classes.drawer}
        variant="persistent"
        anchor="left"
        open={open}
        classes={{
          paper: classes.drawerPaper,
        }}
      >
        <div className={classes.drawerHeader}>
          <div>
            <FormattedMessage id="Current_login"></FormattedMessage>{" "}
            {props.login.data.account_number}
          </div>
          <IconButton onClick={handleDrawerClose}>
            {theme.direction === "ltr" ? (
              <ChevronLeftIcon />
            ) : (
              <ChevronRightIcon />
            )}
          </IconButton>
        </div>
        <Divider />
        <List>
          <ListItem button key={1} component={NavLink} to="/main/home">
            <ListItemIcon>
              <InboxIcon />
            </ListItemIcon>
            <ListItemText>
              <FormattedMessage id="Interface" /> Home
            </ListItemText>
          </ListItem>
          <ListItem button key={2} component={NavLink} to="/main/order">
            <ListItemIcon>
              <MailIcon />
            </ListItemIcon>
            <ListItemText>
              <FormattedMessage id="Interface" /> Order
            </ListItemText>
          </ListItem>
        </List>
      </Drawer>
      <main
        className={clsx(classes.content, {
          [classes.contentShift]: open,
        })}
      >
        <div className={classes.drawerHeader} />
        <Switch>
          <Route path="/main/home" component={Home} />
          <Route path="/main/order" component={Order} />
        </Switch>
      </main>
    </div>
  );
}

export default connect(
  (state) => ({
    login: state.login,
  })
  //映射操作状态的方法
)(Main);
