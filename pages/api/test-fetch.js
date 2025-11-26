export default async function handler(req, res) {
  const url = 'https://fakestoreapi.com/products?limit=1';
  const controller = new AbortController();
  const start = Date.now();
  const id = setTimeout(() => controller.abort(), 5000);
  try {
    const r = await fetch(url, { signal: controller.signal });
    clearTimeout(id);
    const elapsed = Date.now() - start;
    if (!r.ok) return res.status(502).json({ ok: false, error: 'Bad response from fakestoreapi', status: r.status });
    const data = await r.json();
    return res.status(200).json({ ok: true, elapsedMs: elapsed, data });
  } catch (err) {
    clearTimeout(id);
    return res.status(500).json({ ok: false, message: 'Error fetching', error: err?.message || String(err) });
  }
}
