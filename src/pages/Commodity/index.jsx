import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import { makeStyles } from "@material-ui/core/styles";
import { Delete, BorderColor, Add } from "@material-ui/icons";
import {
  Button,
  FormLabel,
  TextField,
  DialogTitle,
  ListItem,
  DialogContent,
  Dialog,
  TableBody,
  Table,
  TableCell,
  TableContainer,
  TableHead,
  TablePagination,
  TableRow,
  TableSortLabel,
  Paper,
  Checkbox,
} from "@material-ui/core";
import StyledDialog from "../../components/StyledDialog";
import { FormattedMessage } from "react-intl";
import CommonTip from "../../components/CommonTip";
import Haeder from "../../components/Haeder";

function descendingComparator(a, b, orderBy) {
  if (b[orderBy] < a[orderBy]) {
    return -1;
  }
  if (b[orderBy] > a[orderBy]) {
    return 1;
  }
  return 0;
}

function getComparator(order, orderBy) {
  return order === "desc"
    ? (a, b) => descendingComparator(a, b, orderBy)
    : (a, b) => -descendingComparator(a, b, orderBy);
}

function stableSort(array, comparator) {
  const stabilizedThis = array.map((el, index) => [el, index]);
  stabilizedThis.sort((a, b) => {
    const order = comparator(a[0], b[0]);
    if (order !== 0) return order;
    return a[1] - b[1];
  });
  return stabilizedThis.map((el) => el[0]);
}

const headCells = [
  {
    id: "postId",
    numeric: false,
    disablePadding: true,
    label: <FormattedMessage id="postId"></FormattedMessage>,
  },
  {
    id: "commodity",
    numeric: true,
    disablePadding: false,
    label: <FormattedMessage id="commodity"></FormattedMessage>,
  },
  {
    id: "postCode",
    numeric: true,
    disablePadding: false,
    label: <FormattedMessage id="postCode"></FormattedMessage>,
  },
  {
    id: "postName",
    numeric: true,
    disablePadding: false,
    label: <FormattedMessage id="postName"></FormattedMessage>,
  },
  {
    id: "postSort",
    numeric: true,
    disablePadding: false,
    label: <FormattedMessage id="postSort"></FormattedMessage>,
  },
  {
    id: "status",
    numeric: true,
    disablePadding: false,
    label: <FormattedMessage id="status"></FormattedMessage>,
  },
  {
    id: "createTime",
    numeric: true,
    disablePadding: false,
    label: <FormattedMessage id="createTime"></FormattedMessage>,
  },
];

function EnhancedTableHead(props) {
  const {
    classes,
    onSelectAllClick,
    order,
    orderBy,
    numSelected,
    rowCount,
    onRequestSort,
  } = props; //numSelected 是选择多少
  const createSortHandler = (property) => (event) => {
    onRequestSort(event, property);
  };

  return (
    <TableHead style={{ backgroundColor: "#f8f8f9" }}>
      <TableRow>
        <TableCell padding="checkbox">
          <Checkbox
            indeterminate={numSelected > 0 && numSelected < rowCount}
            checked={rowCount > 0 && numSelected === rowCount}
            onChange={onSelectAllClick}
            inputProps={{ "aria-label": "select all desserts" }}
          />
        </TableCell>
        {headCells.map((headCell) => (
          <TableCell
            key={headCell.id}
            align={headCell.numeric ? "center" : "left"}
            padding={headCell.disablePadding ? "none" : "normal"}
            sortDirection={orderBy === headCell.id ? order : false}
          >
            <TableSortLabel
              active={orderBy === headCell.id}
              direction={orderBy === headCell.id ? order : "asc"}
              onClick={createSortHandler(headCell.id)}
            >
              {headCell.label}
              {orderBy === headCell.id ? (
                <span className={classes.visuallyHidden}>
                  {order === "desc" ? "sorted descending" : "sorted ascending"}
                </span>
              ) : null}
            </TableSortLabel>
          </TableCell>
        ))}
        <TableCell align="center">操作</TableCell>
      </TableRow>
    </TableHead>
  );
}

EnhancedTableHead.propTypes = {
  classes: PropTypes.object.isRequired,
  numSelected: PropTypes.number.isRequired,
  onRequestSort: PropTypes.func.isRequired,
  onSelectAllClick: PropTypes.func.isRequired,
  order: PropTypes.oneOf(["asc", "desc"]).isRequired,
  orderBy: PropTypes.string.isRequired,
  rowCount: PropTypes.number.isRequired,
};

const useStyles = makeStyles((theme) => ({
  root: {
    width: "100%",
    minWidth: "100%",
  },
  paper: {
    width: "100%",
    marginBottom: theme.spacing(2),
  },
  table: {
    minWidth: 1050,
  },
  visuallyHidden: {
    border: 0,
    clip: "rect(0 0 0 0)",
    height: 1,
    margin: -1,
    overflow: "hidden",
    padding: 0,
    position: "absolute",
    top: 20,
    width: 1,
  },
}));
export default function ORder() {
  const classes = useStyles();
  const [order, setOrder] = useState("asc");
  const [orderBy, setOrderBy] = useState("postId");
  const [selected, setSelected] = useState([]); //id 数据
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [rows, setRows] = useState([
    {
      postId: 1,
      postName: "李四",
      commodity: "手机",
      postCode: "AMD",
      postSort: 0,
      createTime: "2020-1-2",
    },
    {
      postId: 2,
      postName: "李四",
      commodity: "电脑",
      postCode: "AMD",
      postSort: 10,
      createTime: "2020-1-2",
    },
    {
      postId: 3,
      postName: "王五",
      commodity: "电视",
      postCode: "CND",
      postSort: 0,
      createTime: "2020-1-2",
    },
    {
      postId: 4,
      postName: "王五",
      commodity: "洗衣机",
      postCode: "CND",
      postSort: 5,
      createTime: "2020-1-2",
    },
    {
      postId: 5,
      postName: "王五",
      commodity: "空调",
      postCode: "UMD",
      postSort: 0,
      createTime: "2020-1-2",
    },
    {
      postId: 6,
      postName: "王五",
      commodity: "床",
      postCode: "AOO",
      postSort: 8,
      createTime: "2020-1-2",
    },
    {
      postId: 7,
      postName: "历史",
      commodity: "红酒",
      postCode: "lihai",
      postSort: 365,
      createTime: "2020-1-2",
    },
    {
      postId: 8,
      postName: "历史",
      commodity: "白酒",
      postCode: "lihai",
      postSort: 254,
      createTime: "2020-1-2",
    },
  ]); //数据

  const handleRequestSort = (event, property) => {
    const isAsc = orderBy === property && order === "asc";
    setOrder(isAsc ? "desc" : "asc");
    setOrderBy(property);
  };
  const handleSelectAllClick = (event) => {
    if (event.target.checked) {
      const newSelecteds = rows.map((n) => n.postId);
      setSelected(newSelecteds);
      return;
    }
    setSelected([]);
  };
  //数据的多选参数
  const handleClick = (event, postId) => {
    const selectedIndex = selected.indexOf(postId);
    let newSelected = [];
    if (selectedIndex === -1) {
      newSelected = newSelected.concat(selected, postId);
    } else if (selectedIndex === 0) {
      newSelected = newSelected.concat(selected.slice(1));
    } else if (selectedIndex === selected.length - 1) {
      newSelected = newSelected.concat(selected.slice(0, -1));
    } else if (selectedIndex > 0) {
      newSelected = newSelected.concat(
        selected.slice(0, selectedIndex),
        selected.slice(selectedIndex + 1)
      );
    }
    setSelected(newSelected);
  };

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };
  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };
  const isSelected = (postId) => selected.indexOf(postId) !== -1;
  const emptyRows =
    rowsPerPage - Math.min(rowsPerPage, rows.length - page * rowsPerPage);
  //  警告框
  const [open, setOpen] = useState(false);
  const [post_id, setPoset_id] = useState(); //删除的id
  const [post_name, setPost_name] = useState(); //删除的post_name

  const handleClickOpen = (event, postId, postName) => {
    setPoset_id(postId);
    setPost_name(postName);
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };
  const handleDelete = () => {
    setOpen(false);
    CommonTip.success("删除成功");
    rows.splice(
      rows.findIndex((post) => post.postId === post_id),
      1
    );
  };

  //对话框
  const [duihua, setDuihua] = useState(false); //新增
  const [updateindex, setupdateindex] = useState(); // 单选框修改初始

  const duihuaClose = () => {
    setDuihua(false);
  };
  //添加
  const handleClickOpenadd = () => {
    sethuoqutianjiazi({
      postId: "",
      postName: "",
      commodity: "",
      postCode: "",
      postSort: "",
      createTime: "",
    });
    setupdateindex(rows.findIndex((post) => post.postId === post_id));
    setDuihua(true);
  };
  //修改的初始值
  const [huoqutianjiazi, sethuoqutianjiazi] = useState({
    postId: "",
    postName: "",
    commodity: "",
    postCode: "",
    postSort: "",
    createTime: "",
  });
  //修改
  const handleClickOpenupdate = (postId) => {
    setupdateindex(rows.findIndex((post) => post.postId === postId));
    setDuihua(true);
  };

  //新增修改获取值方法
  const getVlaue = (key, e) => {
    let d = huoqutianjiazi;
    for (let index in huoqutianjiazi) {
      if (index === key) {
        d[index] = e.target.value;
        sethuoqutianjiazi(d);
      }
    }
  };

  //新增方法
  const postADD = () => {
    let d = huoqutianjiazi;
    d["postId"] = rows[rows.length - 1].postId + 1;
    sethuoqutianjiazi(d);
    let pyadd = rows;
    setRows([...pyadd, huoqutianjiazi]);
    setDuihua(false);
    sethuoqutianjiazi({
      postId: "",
      postName: "",
      commodity: "",
      postCode: "",
      postSort: "",
      createTime: "",
    });
    CommonTip.success("新增成功");
  };

  useEffect(() => {
    if (updateindex !== -1) {
      let d = rows[updateindex];
      sethuoqutianjiazi(d);
    } else {
      sethuoqutianjiazi({
        postId: "",
        postName: "",
        commodity: "",
        postCode: "",
        postSort: "",
        createTime: "",
      });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [updateindex]);

  //修改方法
  const postUpdate = () => {
    let py = [];
    for (let index = 0; index < rows.length; index++) {
      const rowstext = rows[index];
      if (rowstext?.post_id === huoqutianjiazi.postId) {
        py = [...py, huoqutianjiazi];
      } else {
        py = [...py, rowstext];
      }
    }
    setDuihua(false);
    CommonTip.success("修改成功");
  };

  //查询数据
  const [params, setParams] = useState({
    commodity: "",
    postName: "",
    postSort: "",
    postCode: "",
    createTime: null,
  });

  //查询文本框
  const headerFiled = [
    {
      filed: "commodity",
      labelName: "商品名称",
      isShow: true,
      type: "string",
    },
    {
      filed: "postCode",
      labelName: "商品类别",
      isShow: true,
      type: "string",
    },
    {
      filed: "createTime",
      labelName: "登记时间",
      isShow: true,
      type: "date",
    },
    {
      filed: "postName",
      labelName: "登记员",
      isShow: false,
      type: "string",
    },
    {
      filed: "postSort",
      labelName: "数量",
      isShow: false,
      type: "number",
    },
  ];

  //查询重置事件
  useEffect(() => {
    console.log("查询重置参数",params);
    CommonTip.success("查询重置一次");
  }, [params]);
  return (
    <div className={classes.root}>
      <Haeder params={params} setParams={setParams} headerFiled={headerFiled} />
      <Button onClick={handleClickOpenadd} variant="outlined" color="primary">
        <Add />
        新增
      </Button>

      <Paper className={classes.paper}>
        <TableContainer>
          <Table
            className={classes.table}
            aria-labelledby="tableTitle"
            size="medium"
            aria-label="enhanced table"
          >
            <EnhancedTableHead
              classes={classes}
              numSelected={selected.length}
              order={order}
              orderBy={orderBy}
              onSelectAllClick={handleSelectAllClick}
              onRequestSort={handleRequestSort}
              rowCount={rows.length}
            />
            <TableBody>
              {stableSort(rows, getComparator(order, orderBy))
                .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                .map((row, index) => {
                  const isItemSelected = isSelected(row.postId);
                  const labelId = `enhanced-table-checkbox-${index}`;

                  return (
                    <TableRow
                      hover
                      role="checkbox"
                      aria-checked={isItemSelected}
                      tabIndex={-1}
                      key={row.postId}
                      selected={isItemSelected}
                    >
                      <TableCell
                        padding="checkbox"
                        onClick={(event) => handleClick(event, row.postId)}
                      >
                        <Checkbox
                          checked={isItemSelected}
                          inputProps={{ "aria-labelledby": labelId }}
                        />
                      </TableCell>
                      <TableCell
                        component="th"
                        id={labelId}
                        scope="row"
                        padding="none"
                        onClick={(event) => handleClick(event, row.postId)}
                      >
                        {row.postId}
                      </TableCell>
                      <TableCell
                        align="center"
                        onClick={(event) => handleClick(event, row.postId)}
                      >
                        {row.commodity}
                      </TableCell>
                      <TableCell
                        align="center"
                        onClick={(event) => handleClick(event, row.postId)}
                      >
                        {row.postCode}
                      </TableCell>
                      <TableCell
                        align="center"
                        onClick={(event) => handleClick(event, row.postId)}
                      >
                        {row.postName}
                      </TableCell>
                      <TableCell
                        align="center"
                        onClick={(event) => handleClick(event, row.postId)}
                      >
                        {row.postSort}
                      </TableCell>
                      <TableCell
                        align="center"
                        onClick={(event) => handleClick(event, row.postId)}
                      >
                        {row.postSort == 0 ? (
                          <div style={{ color: "red" }}>
                            <FormattedMessage id="SellOut" />
                          </div>
                        ) : (
                          <div style={{ color: "orange" }}>
                            <FormattedMessage id="normal" />
                          </div>
                        )}
                      </TableCell>
                      <TableCell
                        align="center"
                        onClick={(event) => handleClick(event, row.postId)}
                      >
                        {row.createTime}
                      </TableCell>
                      <TableCell align="center">
                        <Button
                          color="primary"
                          onClick={() => handleClickOpenupdate(row.postId)}
                        >
                          <BorderColor />
                          修改
                        </Button>

                        <Button
                          color="primary"
                          onClick={(event) =>
                            handleClickOpen(event, row.postId, row.postName)
                          }
                        >
                          <Delete />
                          删除
                        </Button>
                      </TableCell>
                    </TableRow>
                  );
                })}
              {emptyRows > 0 && (
                <TableRow style={{ height: 53 * emptyRows }}>
                  <TableCell colSpan={8} />
                </TableRow>
              )}
            </TableBody>
          </Table>
        </TableContainer>
        <TablePagination
          rowsPerPageOptions={[5, 10, 25]}
          component="div"
          count={rows.length}
          rowsPerPage={rowsPerPage}
          labelRowsPerPage={"每页行数"}
          page={page}
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangeRowsPerPage}
        />
      </Paper>

      {/* 修改新增对话框 */}
      <Dialog open={duihua} onClose={duihuaClose}>
        <DialogTitle>
          <h1>{rows[updateindex]?.postId ? "修改" : "新增"}</h1>
        </DialogTitle>
        <DialogContent>
          <ListItem>
            <FormLabel style={{ color: "red" }}>*</FormLabel>
            <FormLabel
              style={{ color: "black", marginRight: "15px", minWidth: "70px" }}
            >
              <FormattedMessage id="postName" />
            </FormLabel>
            <TextField
              style={{ minWidth: "400px" }}
              variant="outlined"
              placeholder="请输入登记员"
              name="postName"
              size="small"
              defaultValue={rows[updateindex]?.postName}
              onKeyUp={getVlaue.bind(this, "postName")}
            ></TextField>
          </ListItem>
          <ListItem style={{ marginTop: "15px" }}>
            <FormLabel style={{ color: "red" }}>*</FormLabel>
            <FormLabel
              style={{ color: "black", marginRight: "15px", minWidth: "70px" }}
            >
              <FormattedMessage id="commodity" />
            </FormLabel>
            <TextField
              style={{ minWidth: "400px" }}
              variant="outlined"
              placeholder="请输入几号仓库"
              name="commodity"
              defaultValue={rows[updateindex]?.commodity}
              size="small"
              onKeyUp={getVlaue.bind(this, "commodity")}
            ></TextField>
          </ListItem>
          <ListItem style={{ marginTop: "15px" }}>
            <FormLabel style={{ color: "red" }}>*</FormLabel>
            <FormLabel
              style={{ color: "black", marginRight: "15px", minWidth: "70px" }}
            >
              <FormattedMessage id="postCode" />
            </FormLabel>
            <TextField
              style={{ minWidth: "400px" }}
              variant="outlined"
              placeholder="请输入编码编码"
              name="postCode"
              defaultValue={rows[updateindex]?.postCode}
              size="small"
              onKeyUp={getVlaue.bind(this, "postCode")}
            ></TextField>
          </ListItem>
          <ListItem style={{ marginTop: "15px" }}>
            <FormLabel style={{ color: "red" }}>*</FormLabel>
            <FormLabel
              style={{ color: "black", marginRight: "15px", minWidth: "70px" }}
            >
              <FormattedMessage id="postSort" />
            </FormLabel>
            <TextField
              id="outlined-number"
              style={{ minWidth: "400px" }}
              defaultValue={rows[updateindex]?.postSort}
              type="number"
              InputLabelProps={{
                shrink: true,
              }}
              variant="outlined"
              name="postSort"
              onChange={getVlaue.bind(this, "postSort")}
            />
          </ListItem>
          <ListItem style={{ marginTop: "15px" }}>
            <FormLabel
              style={{ color: "black", marginRight: "15px", minWidth: "70px" }}
            >
              <FormattedMessage id="createTime" />
            </FormLabel>
            <TextField
              style={{ minWidth: "400px" }}
              variant="outlined"
              placeholder="请输入登记时间"
              size="medium"
              name="createTime"
              defaultValue={rows[updateindex]?.createTime}
              onChange={getVlaue.bind(this, "createTime")}
            ></TextField>
          </ListItem>
          <ListItem style={{ marginTop: "15px", marginBottom: "15px" }}>
            <Button
              style={{ marginLeft: "350px" }}
              onClick={rows[updateindex]?.postId ? postUpdate : postADD}
              variant="contained"
              color="primary"
            >
              确定
            </Button>
            <Button
              style={{ marginLeft: "15px" }}
              onClick={duihuaClose}
              variant="contained"
            >
              取消
            </Button>
          </ListItem>
        </DialogContent>
      </Dialog>
      {/* 删除对话框 */}
      <StyledDialog
        open={open}
        handleClose={handleClose}
        handleConfirm={handleDelete}
        content={`是否删除编号：${post_id} , 类别: ${post_name}这条记录吗?`}
      />
    </div>
  );
}
