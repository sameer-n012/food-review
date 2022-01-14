import fs from 'fs';
import asyncHandler from 'express-async-handler';
import { generateImageName } from '../utils/imageName.js';

const getImage = asyncHandler(async (req, res) => {
	console.log(`GET IMAGE`);

	try {
		const path = `./assets/images/${req.params.filename}`;
		const ext = req.params.filename.split('.').pop();
		if (fs.existsSync(path)) {
			const contents = fs.readFileSync(path, { encoding: 'base64' });
			res.status(200);
			res.writeHead(200, {
				'Content-Type': `image/${ext}`,
				'Content-Length': contents.length,
			});
			res.end(contents);
		} else {
			throw new Error();
		}
	} catch (error) {
		res.status(404);
		throw new Error('Image not found');
	}
});

const postImage = asyncHandler(async (req, res) => {
	console.log('SAVE IMAGE');
	//uses the protect auth middleware to check jwt but doesn't need to check if correct user
	try {
		let { imageName, imageURI } = req.body;
		imageName = imageName.replace(/[^A-Za-z0-9.]/g, '');
		while (fs.existsSync(`./assets/images/${imageName}`)) {
			imageName = generateImageName(imageName);
		}

		const path = `./assets/images/${imageName}`;
		const b64data = imageURI.replace(
			/^data:image\/[A-Za-z]{0,4};base64,/,
			''
		);
		fs.writeFileSync(path, b64data, 'base64');
		res.status(201);
		res.send({ imgName: imageName });
	} catch (error) {
		res.status(400);
		console.log(error.message);
		throw new Error('Invalid image post');
	}
});

export { getImage, postImage };
