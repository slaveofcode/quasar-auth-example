import { Router } from 'express';

const router = Router({ mergeParams: true });

router.get('/ready', (req, res) => {
  const data = {
    ok: true,
  };

  if (process.env.DEV) {
    Object.assign(data, { headers: req.headers });
  }

  return res.json(data);
});

export default router;
