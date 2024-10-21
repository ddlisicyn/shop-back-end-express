const express = require("express");
const bodyParser = require("body-parser");
const morgan = require("morgan");
const mongoose = require("mongoose");
const config = require("config");
const cors = require("cors");
const productsRouter = require("./routes/products.routes");

const app = express();
const port = config.get('port');
const mongoUri = config.get('mongoUri');

app.use(cors());
app.use(morgan('tiny'));
app.use(bodyParser.json());
app.use('/api', productsRouter);
async function start() {
	try {
		await mongoose.connect(mongoUri);
		app.listen(port, () => console.log(`App has been started on ${port}...`));
	} catch(e) {
		console.log('Server Error', e.message);
		process.exit(1)
	}
}

start()