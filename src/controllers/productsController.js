const fs = require('fs');
const path = require('path');
const productsFilePath = path.join(__dirname, '../data/productsDataBase.json');

const getJson = () => {
const productsFilePath = path.join(__dirname, '../data/productsDataBase.json');
const products = JSON.parse(fs.readFileSync(productsFilePath, 'utf-8'));
return products; 
}
const toThousand = n => n.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");

const controller = {
	// Root - Show all products
	index: (req, res) => {
		const products =getJson();
		res.render("products",{products,toThousand})
		

	},

	// Detail - Detail from one product
	detail: (req, res) => {
		const {id} = req.params;
		const products = getJson();
		const product = products.find(product =>product.id == id);
		res.render("detail",{title:product.name,product,toThousand})
	},

	// Create - Form to create
	create: (req, res) => {
		res.render("product-create-form")
	},
	
	// Create -  Method to store
	store: (req, res) => {
		const products = getJson();
		const {name,
			price,
			discount,
			category,
			description,
			image} = req.body;
		const nuevoId = +Date.now();
		const newProduct= {
			id:+nuevoId,
			name: name.trim(),
			price:+price,
			discount:+discount,
			category,
			description:description.trim(),
			image:"default-image.png",

		}
		products.push(newProduct);
		const json = JSON.stringify(products);
		fs.writeFileSync(productsFilePath,json,"utf-8"),
		res.redirect("/products");
	},

	// Update - Form to edit
	edit: (req, res) => {
		const {id} = req.params;
		const products = getJson();
		const product = products.find(product =>product.id == id);
		res.render("product-edit-form",{product, toThousand})
	},
	// Update - Method to update
	update: (req, res) => {
		const {id} = req.params;
		const {name,
			price,
			discount,
			category,
			description,
			image} = req.body;
		const products = getJson();
		const newArray = products.map(product=>{
					if (product.id == id){
						return {
							id,
							name:name.trim(),
							price,
							discount,
							category,
							description:description.trim(),
							image:image ? image : product.image,
						}
					} 
					return product;
				})
				const json =JSON.stringify(newArray);
				fs.writeFileSync(productsFilePath,json,"utf-8");
				res.redirect(`/products/detail/${id}`);
	},

	// Delete - Delete one product from DB
	destroy : (req, res) => {
		const products = getJson();
		const productDelete = products.filter(product => product.id !== +req.params.id);
		const json =JSON.stringify(productDelete);
		fs.writeFileSync(productsFilePath,json,"utf-8")
		res.redirect("/")
	}
};

module.exports = controller;