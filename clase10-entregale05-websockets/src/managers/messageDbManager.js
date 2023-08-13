const fs = require('fs');
const DbManager = require("../scripts/dbScripts");


class MessageDbManager {

	constructor(fileDir) {
		this.fileDir = fileDir;
		this.dbManager = new DbManager("messages");
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
			let newObject = {
				email: object.email,
				date: object.date,
				message: object.message
			};
			if(newObject.message && newObject.email) {
				this.dbManager.addObject(newObject);
				return newObject;
			} else {
				throw("There was no message")
			}
		}
		catch(err) {
			if(err) {
				return err;
			}
			return {message:"Failed to save object", success:false};
		}
	}
}

module.exports = MessageDbManager;
