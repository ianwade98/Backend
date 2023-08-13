const fs = require('fs');
const DbManager = require("../scripts/dbScripts");

class ProductDbManager {
	constructor(fileDir) {
		this.fileDir = fileDir;
		this.dbManager = new DbManager("products");
	}
	/*
	async readFile() {
		try {
			return JSON.parse(await fs.promises.readFile(this.fileDir, "utf-8"));
		}
		catch(err) {
			console.log(err);
		}
	}
	async writeFile(file) {
		try {
			await fs.promises.writeFile(this.fileDir, JSON.stringify(file, null, "	"));
		}
		catch {
			console.log("Failed to write file")
		}
	}
	*/
	async save(object) {
		try {
			//let file = await this.readFile();
			//file.lastId++;
			let newObject = {};
			if(!object.name || !object.price) {
				throw "Didn't provide proper name and price"
			} else {
				if(typeof(object.name) == "string") {
					newObject.name = object.name;
				} else {
					throw "Name must be a string";
				}
				if(typeof(object.price) == "number") {
					newObject.price = object.price;
				} else {
					throw "Price must be a number";
				}
				newObject.imgUrl = object.imgUrl;
				//file.products.push(newObject);
				//this.writeFile(file);
				this.dbManager.addObject(newObject).then(res =>{
					console.log(res)
				})
				.catch(err => console.log(err))
			}
			return newObject;
		}
		catch(err) {
			if(err) {
				return err;
			}
			return {message:"Failed to save object", success:false};
		}
	}
	/*
	async getById(id) {
		try {
			let file = await this.readFile();
			return file.products.find(product => product.id == id) || null;
		}
		catch {
			console.log("Failed to find object")
		}
	}
	*/
	async getAll() {
		try {
			//let file = await this.readFile();
			let answer = await this.dbManager.getObjects()
			if(answer.success) {
				return answer.response
			} else {
				throw answer.response
			}
		}
		catch(err) {
			console.log(err);
			return false;
		}
	}
	/*
	async deleteById(id) {
		try {
			let file = await this.readFile();
			let index = file.products.findIndex(product => product.id == id);
			if(index == -1) {
				return {success: false};
			} else {
				file.products.splice(index, 1)
				this.writeFile(file);
				return {success: true};
			}
		}
		catch {
			return {success: false};
		}
	}
	async edit(object, id) {
		try {
			let file = await this.readFile();
			let index = file.products.findIndex(product => product.id == id);
			if(index != -1) {
				Object.assign(file.products[index], object)
				this.writeFile(file);
				return file.products[index];
			} else {
				throw "Product ID invalid";
			}
		} 
		catch(err) {
			if(err) {
				return err;
			} else {
				return "Failed to modify product";
			}
		}
	}

	async deleteAll() {
		try {
			let file = {
				lastId: 0,
				products: []
			};
			this.writeFile(file);
		}
		catch {
			console.log("Failed to delete objects");
		}
	}
	async randomProduct() {
		try {
			let file = await this.readFile();
			console.log(Math.round(Math.random() * (file.products.length - 1)))
			let product = file.products[Math.round(Math.random() * (file.products.length - 1))];
			return product;
		}
		catch {
			console.log("failed to get product")
		}
	}
	*/
}

module.exports = ProductDbManager;
