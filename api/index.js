export const config = { runtime: "edge" };

const TARGET = "https://m.me2me.sbs";

export default async function handler(req) {
  try {
    const url = new URL(req.url);
    const path = url.pathname.replace("/api/proxy", "");

    const targetUrl = TARGET + path + url.search;

    const headers = new Headers(req.headers);
    headers.delete("host");

    const resp = await fetch(targetUrl, {
      method: req.method,
      headers,
      body: req.body,
      redirect: "manual",
    });

    return new Response(resp.body, {
      status: resp.status,
      headers: resp.headers,
    });

  } catch (e) {
    return new Response("Proxy error", { status: 500 });
  }
}
