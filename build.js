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

const figmaFetch = url => new Promise(resolve => {
  fetch(url, {
    headers: {
      "X-FIGMA-TOKEN": process.env.token
    }
  })
    .then(res => res.json())
    .then(json => resolve(json))
})

const main = async () => {
  const fileData = await figmaFetch(`https://api.figma.com/v1/files/${file}`)

  const frames = fileData.document.children[0].children
  const frameIds = frames.map(f => f.id).join(",")

  const frameData = await figmaFetch(`https://api.figma.com/v1/images/${file}?ids=${frameIds}`)

  for(const id in frameData.images) {
    const name = frames.find(f => f.id === id).name
    const imageUrl = frameData.images[id]

    const cleanName = name.toLowerCase().replace(/[^a-z0-9] /g, "").replace(/ /g, "-")

    fetch(imageUrl)
      .then(res => {
        const destination = fs.createWriteStream(`./dist/${cleanName}.png`)
        res.body.pipe(destination)

        destination.on("finish", () => console.log(`Downloaded "${name}" to /${cleanName}`))
      })
  }
}

main()