const { Router } = require('express');
const Product = require('../models/Product');
const router = Router();

const getOptions = (page = 1) => ({
	page,
	limit: 20
});

router.get('/', async (req, response) => {
	const { page, category } = req.query;
	const query = {};

	if (category && category !== 'all') {
		query.category = category;
	}

	try {
		const products = await Product.paginate(query, getOptions(page));
		response.json(products);
	} catch(e) {
		console.log(e)
		response.status(500).json({ message: "Что-то пошло не так, попробуйте снова" });
	}
});

router.get('/detail/:id', async (request, response) => {
	const { id } = request.params;

	console.log(id)

	try {
		const product = await Product.find({ code: id });
		response.json(product);
	} catch(e) {
		response.status(500).json({ message: "Что-то пошло не так, попробуйте снова" });
	}
});

router.post('/detail/ids', async (request, response) => {
	// console.log(request)
	try {
		const { ids } = request.body;
		const product = await Product.find({ id: ids });
		response.json(product);
	} catch(e) {
		response.status(500).json({ message: "Что-то пошло не так, попробуйте снова" });
	}
});

module.exports = router;