const fs = require("fs");
let data = fs.readFileSync("./items.json", "utf8", (err, data) => {
  console.log(data);
});
console.log(JSON.parse(data));
