// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next'
import Cookies from 'cookies';
import prepareAnswer from '../../utils/prepare-answer';

export default function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
	const cookies = new Cookies(req, res);

	const guess = req.query.guess;

	let status = 404;

	if (process.env.LEVEL_TWO_ANS && prepareAnswer(guess) === process.env.LEVEL_TWO_ANS) {
		cookies.set('level-two-ans', process.env.LEVEL_TWO_ANS);

		status = 200;
	}

	res.status(status).json({ version: 1, status })
}
