export const config = { runtime: "edge" };

export default async function handler(req) {
  try {
    const raw = req.url.split("url=")[1];

    if (!raw) {
      return new Response("Missing URL", { status: 400 });
    }

    const target = decodeURIComponent(raw);

    const headers = new Headers(req.headers);
    headers.delete("host");

    const resp = await fetch(target, {
      method: req.method,
      headers,
      body: req.body,
    });

    return new Response(resp.body, {
      status: resp.status,
      headers: resp.headers,
    });

  } catch (e) {
    return new Response("Proxy error", { status: 500 });
  }
}
