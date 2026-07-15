#!/usr/bin/env node
/**
 * Submit all site URLs to IndexNow (Bing, plus Yandex, Seznam, Naver and other
 * participating engines share the endpoint).
 *
 * Run AFTER the site is deployed, so the key file at
 * https://www.indianbrokertest.com/<key>.txt is live:
 *
 *   npm run indexnow              # submit every URL in dist/sitemap-0.xml
 *   npm run indexnow -- <url...>  # submit specific URLs only
 */
import { readFileSync } from 'node:fs';

const HOST = 'www.indianbrokertest.com';
const KEY = '5cf935b1b366be74e0fa45e880860f75';
const ENDPOINT = 'https://api.indexnow.org/indexnow';

let urlList = process.argv.slice(2);
if (urlList.length === 0) {
  const xml = readFileSync(new URL('../dist/sitemap-0.xml', import.meta.url), 'utf8');
  urlList = [...xml.matchAll(/<loc>([^<]+)<\/loc>/g)].map((m) => m[1]);
}

if (urlList.length === 0) {
  console.error('No URLs to submit. Run `npm run build` first or pass URLs as arguments.');
  process.exit(1);
}

const body = {
  host: HOST,
  key: KEY,
  keyLocation: `https://${HOST}/${KEY}.txt`,
  urlList,
};

const res = await fetch(ENDPOINT, {
  method: 'POST',
  headers: { 'Content-Type': 'application/json; charset=utf-8' },
  body: JSON.stringify(body),
});

console.log(`Submitted ${urlList.length} URL(s) to IndexNow`);
console.log(`HTTP ${res.status} ${res.statusText}`);
if (res.status === 200 || res.status === 202) {
  console.log('Accepted. Engines will pick the URLs up shortly.');
} else {
  console.error(await res.text());
  console.error(
    'Submission failed. Common causes: key file not yet deployed at ' + body.keyLocation + ', or invalid URLs.'
  );
  process.exit(1);
}
