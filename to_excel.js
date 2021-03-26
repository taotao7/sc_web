const fs = require("fs");
const xlsx = require("node-xlsx");

let excelData = [
  {
    name: "sheet",
    data: [["问题", "选项A", "选项B", "选项C", "选项D", "正确答案"]],
  },
];

let result = fs.readFileSync("./item.json", "utf8", (err, data) => {
  if (err) {
    console.log(err);
  }
});

let parseData = JSON.parse(result);
let trueItem = [];

for (let i = 0; i < parseData.length; i++) {
  let currentItem = [];
  for (let k = 0; k < parseData[i].questionAnswers.length; k++) {
    if (parseData[i].questionAnswers[k].iscorrect === 1) {
      currentItem.push(parseData[i].questionAnswers[k].answercontent);
    }
  }
  trueItem.push(currentItem);
}

for (let i = 0; i < parseData.length; i++) {
  excelData[0].data.push([
    parseData[i].questionlibrary.questioncontent,
    parseData[i].questionAnswers[0].answercontent,
    parseData[i].questionAnswers[1].answercontent,
    parseData[i].questionAnswers[2] != undefined
      ? parseData[i].questionAnswers[2].answercontent
      : "无",
    parseData[i].questionAnswers[3] != undefined
      ? parseData[i].questionAnswers[3].answercontent
      : "无",
    trueItem[i],
  ]);
}

console.log(trueItem);
let buffer = xlsx.build(excelData);

fs.writeFile("最终数据.xlsx", buffer, (err) => {
if (err) {
console.log(err);
return;
}
console.log("完成");
});
