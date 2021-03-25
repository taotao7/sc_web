const axios = require("axios");
const fs = require("fs");

axios.defaults.headers.common["access_token"] =
  "eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiJ9.eyJhdWQiOlsidW5pdHktcmVzb3VyY2UiXSwic2NvcGUiOlsicmVhZCIsIndyaXRlIl0sInN5c3RlbVR5cGUiOiIzIiwidXNlclR5cGVOb3ciOiI1IiwidXNlck5hbWUiOiLnjovml63ms6IiLCJleHAiOjE2MTY2ODIzOTYsInVzZXJJZCI6IjQwMjg4Njg3M2E5OGYxMTkwMTNhOTlmZDc0ZTYwNDUwIiwianRpIjoiYzdiMjQ0YWMtNjRmYS00NDMxLWJjMmMtOTUxZDBiNDFkMGIzIiwiZXhwZGF0ZSI6MTYxNjY4MjM5NjQxMH0.QfS3G6nVLusj-G2BBAg-nsTWN_OZkyPlFMq0_v-pFNBFdeCklU0SRSAq-W47ByA1fOtG85ZMJ91PcRMJSd6FbDEPYSrIiu-uA_9KQDRT-tA0VJyjghpkhRCO7THq4l_APbCAWLyhSABq2PHHAqmesb-u_uPMrtRJ6jS5OsDZdKvSJp5lJk9iTjTU3umtqlKYlUbohGkM_DSZH9jECiKagp6D-vanPLexboaDgPqZrMdgd4QPzNvuKeqddgRexRj_hCaLYNLqnwSDP9xhJFYMTHZyVcSlutedY1hZKfFY0uFGK9phpqQUOC4nCdFStI97AWOK1QEQI8cxrhtxci8LSQ";

let config = {
  //url
  //"http://202.61.88.152:9100/gpbe-expertweb/expert/getQuestionLibrary.do?pageNumber=1&pageSize=201&sortName=&sortOrder=&pageNum=1&_t=1616671788130",
  Cookie:
    "midifypassword=; access_token=eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiJ9.eyJhdWQiOlsidW5pdHktcmVzb3VyY2UiXSwic2NvcGUiOlsicmVhZCIsIndyaXRlIl0sInN5c3RlbVR5cGUiOiIzIiwidXNlclR5cGVOb3ciOiI1IiwidXNlck5hbWUiOiLnjovml63ms6IiLCJleHAiOjE2MTY2ODIzOTYsInVzZXJJZCI6IjQwMjg4Njg3M2E5OGYxMTkwMTNhOTlmZDc0ZTYwNDUwIiwianRpIjoiYzdiMjQ0YWMtNjRmYS00NDMxLWJjMmMtOTUxZDBiNDFkMGIzIiwiZXhwZGF0ZSI6MTYxNjY4MjM5NjQxMH0.QfS3G6nVLusj-G2BBAg-nsTWN_OZkyPlFMq0_v-pFNBFdeCklU0SRSAq-W47ByA1fOtG85ZMJ91PcRMJSd6FbDEPYSrIiu-uA_9KQDRT-tA0VJyjghpkhRCO7THq4l_APbCAWLyhSABq2PHHAqmesb-u_uPMrtRJ6jS5OsDZdKvSJp5lJk9iTjTU3umtqlKYlUbohGkM_DSZH9jECiKagp6D-vanPLexboaDgPqZrMdgd4QPzNvuKeqddgRexRj_hCaLYNLqnwSDP9xhJFYMTHZyVcSlutedY1hZKfFY0uFGK9phpqQUOC4nCdFStI97AWOK1QEQI8cxrhtxci8LSQ",
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

setInterval(() => {
  let url = `http://202.61.88.152:9100/gpbe-expertweb/expert/getQuestionInfo.do?questionguid=${itemList[idIndex]}&_t=1616676354709`;
  if (idIndex < itemList.length) {
    axios.get(url).then((res) => {
      console.log("当前数据为" + res.data.data);
      idIndex += 1;
    });
  } else {
    console.log("完成了");
  }
}, 3000);
