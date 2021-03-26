const axios = require("axios");
const fs = require("fs");

axios.defaults.headers.common["access_token"] =
  "eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiJ9.eyJhdWQiOlsidW5pdHktcmVzb3VyY2UiXSwic2NvcGUiOlsicmVhZCIsIndyaXRlIl0sInN5c3RlbVR5cGUiOiIzIiwidXNlclR5cGVOb3ciOiI1IiwidXNlck5hbWUiOiLnjovml63ms6IiLCJleHAiOjE2MTY3MzI2MjQsInVzZXJJZCI6IjQwMjg4Njg3M2E5OGYxMTkwMTNhOTlmZDc0ZTYwNDUwIiwianRpIjoiNTgxMTMyNjAtNDI5MS00N2YxLWJhZDMtZTVkY2IxZWNhNzA5IiwiZXhwZGF0ZSI6MTYxNjczMjYyNDI1Nn0.jJqWVm2wDF21i-VhHZI681zWF_ydKvAqs_HCqjE2nLrv1KLrQOdP_SKuL5nKjr622nkv-6h0cfGIgH9xjyTEhzo-Yfk1PLmoMF0_vt6wHYI6l6C5me1C1IJ7L8lDPm5Q-K3DzzGo3ZLXD8eTxSf-EVPtJyJem2SzUQdMXwgUQVFhkwO73bh_jzEYktTHRSCVhj123Vs-moGi7HbzH9g5wQNib0tDcLON8CNBKrfUl6MkdiFuiYD3kept77WZlOn7Nd3gNKx8xH2wkUBjF3-kaq2vT1jL7tJn75GCZv2PYm2OJex_BDZ17BcfYPzkK09uYf0T8A6qch-hkes7g1R7GQ";

let config = {
  //url
  //"http://202.61.88.152:9100/gpbe-expertweb/expert/getQuestionLibrary.do?pageNumber=1&pageSize=201&sortName=&sortOrder=&pageNum=1&_t=1616671788130",
  Cookie:
    "midifypassword=; access_token=eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiJ9.eyJhdWQiOlsidW5pdHktcmVzb3VyY2UiXSwic2NvcGUiOlsicmVhZCIsIndyaXRlIl0sInN5c3RlbVR5cGUiOiIzIiwidXNlclR5cGVOb3ciOiI1IiwidXNlck5hbWUiOiLnjovml63ms6IiLCJleHAiOjE2MTY3MzI2MjQsInVzZXJJZCI6IjQwMjg4Njg3M2E5OGYxMTkwMTNhOTlmZDc0ZTYwNDUwIiwianRpIjoiNTgxMTMyNjAtNDI5MS00N2YxLWJhZDMtZTVkY2IxZWNhNzA5IiwiZXhwZGF0ZSI6MTYxNjczMjYyNDI1Nn0.jJqWVm2wDF21i-VhHZI681zWF_ydKvAqs_HCqjE2nLrv1KLrQOdP_SKuL5nKjr622nkv-6h0cfGIgH9xjyTEhzo-Yfk1PLmoMF0_vt6wHYI6l6C5me1C1IJ7L8lDPm5Q-K3DzzGo3ZLXD8eTxSf-EVPtJyJem2SzUQdMXwgUQVFhkwO73bh_jzEYktTHRSCVhj123Vs-moGi7HbzH9g5wQNib0tDcLON8CNBKrfUl6MkdiFuiYD3kept77WZlOn7Nd3gNKx8xH2wkUBjF3-kaq2vT1jL7tJn75GCZv2PYm2OJex_BDZ17BcfYPzkK09uYf0T8A6qch-hkes7g1R7GQ",
};

//let buffer;

//axios(config).then((res) => {
//for (let i = 0; i < res.data.data.list.length; i++) {
//buffer += res.data.data.list[i].questionguid+"\n";
//}
//fs.writeFile("./data.txt", buffer, (status) => {
//console.log("成功");
//});
//});

//`http://202.61.88.152:9100/gpbe-expertweb/expert/getQuestionInfo.do?questionguid=${data}&_t=1616676354709`;
const getItem = () => {
  let itemId = fs.readFileSync("./data.txt", "utf8", (err, data) => {
    if (err) {
      console.log("错误: " + err);
    }
  });
  return itemId.split("\n");
};

//axios
//.get(
//`http://202.61.88.152:9100/gpbe-expertweb/expert/getQuestionInfo.do?questionguid=${
//itemId.split("\n")[0]
//}&_t=1616676354709`
//)
//.then((res) => {
//console.log(res.data.data);
//});
let itemList = getItem();

let idIndex = 0;

let buffer;

let itemInterval = setInterval(() => {
  let url = `http://202.61.88.152:9100/gpbe-expertweb/expert/getQuestionInfo.do?questionguid=${itemList[idIndex]}&_t=1616676354709`;
  if (idIndex < itemList.length) {
    axios.get(url).then((res) => {
      console.log(res.data.data);
      idIndex += 1;
      buffer += JSON.stringify(res.data.data) + ",";
    });
  } else {
    fs.writeFile("./item.txt", buffer, (status) => {
      console.log("成功保存");
    });
    clearInterval(itemInterval);
  }
}, 3000);
