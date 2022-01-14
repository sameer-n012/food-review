import fs from 'fs';
import asyncHandler from 'express-async-handler';
import { parseSearchString } from '../utils/searchParser.js';

const testParams = asyncHandler(async (req, res) => {
	console.log(`TEST PARAMS`);

	try {
		const param = req.params.param;
		console.log(req.params.l);
		console.log('param: ', param);
		const so = parseSearchString(param);
		console.log(so);
		res.status(200);
		res.send(req.params);
	} catch (error) {
		res.status(404);
		console.log(error.message);
		throw new Error('Invalid params');
	}
});

export { testParams };
