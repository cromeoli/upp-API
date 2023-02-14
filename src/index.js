const express = require("express")
const cors = require('cors')

const app = express()
const routesV1 = require("./routes/v1/indexRoutes")

app.use(cors());
app.use(express.json())
app.use("/api/v1", routesV1.router)

app.use((err, req, res, next) => {
    console.log("Error general - (index.js)")
    console.log(err.stack)
    res.status(500).end()
})

const PORT = process.env.PORT || 3003
app.listen(PORT, ()=>{
    console.log(
        "\x1b[45m%s\x1b[0m",
        `[start] ---> Server listening on port ${PORT} <---`
    );
})