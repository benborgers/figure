const fs = require("fs")
const fetch = require("node-fetch")

const { token, file } = process.env

if(!(token && file)) {
  console.error("You need to define environment variables `token` and `file`.")
}

fs.mkdirSync("./dist")

const packageJson = require("./package.json")

let index = fs.readFileSync("./src/index.html", "utf8")
index = index.replace(/!VERSION/g, packageJson.version)
fs.writeFileSync("./dist/index.html", index)