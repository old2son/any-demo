import https from 'https';
import * as cheerio from 'cheerio';
import 'dotenv/config';
import { SocksProxyAgent } from 'socks-proxy-agent';
import downloadImage from './downloadImage.js';

// 创建代理对象
const proxyAgent = new SocksProxyAgent(process.env.SOCKET_PROXY);

// 创建 HTTP 请求选项
const requestOptions = {
	hostname: 'www.pixiv.net',
	path: '/artworks/108212190', // 你要请求的路径
	method: 'GET',
	headers: {
		'Accept-Charset': 'UTF-8',
		'User-Agent': process.env.USER_AGENT,
		Cookie: process.env.PIXIV_COOKIE,
		Referer: 'https://www.pixiv.net/artworks/108212190'
	},
	agent: proxyAgent // 使用代理
};

// 发起请求
const request = https.request(requestOptions, (response) => {
	let html = '';

	// 接收数据
	response.on('data', (chunk) => {
		html += chunk;
	});

	// 数据接收完成
	response.on('end', () => {
		const $ = cheerio.load(html);
		const text = JSON.parse($('#meta-preload-data').attr('content'));
		const img = text.illust['108212190'].urls.original;
		downloadImage(img);
	});
});

// 请求错误处理
request.on('error', (error) => {
	console.error('Error:', error.message);
});

// 发送请求
request.end();
