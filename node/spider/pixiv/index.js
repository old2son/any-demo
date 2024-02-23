import { createServer } from 'http';
import https from 'https';
import * as cheerio from 'cheerio';
import fs from 'fs';
import 'dotenv/config';
import { SocksProxyAgent } from 'socks-proxy-agent';
import downloadImage from './downloadImage.js';

// 定义代理选项
/* const proxyOptions = {
	hostname: '127.0.0.1', // 代理主机名
	port: 7890, // 代理端口号
	protocol: 'socks:' // 使用 SOCKS 协议
}; */

// 创建代理对象
const proxyAgent = new SocksProxyAgent(process.env.SOCKET_PROXY);

// 创建 HTTP 请求选项
const requestOptions = {
	hostname: 'www.pixiv.net',
	path: '/artworks/108432757', // 你要请求的路径
	method: 'GET', // 请求方法
	headers: {
		'Accept-Charset': 'UTF-8',
		'User-Agent': process.env.USER_AGENT,
		Cookie: process.env.PIXIV_COOKIE,
		Referer: 'https://www.pixiv.net/artworks/108432757'
	},
	agent: proxyAgent // 使用代理
};

// 创建 HTTP 服务器
createServer((req, res) => {
	// 发起请求
	const request = https.request(requestOptions, (response) => {
		let html = '';

		// 接收数据
		response.on('data', (chunk) => {
			html += chunk;
		});

		// 数据接收完成
		response.on('end', () => {
			res.writeHead(200, { 'Content-Type': 'text/plain' });
			res.end(); // 返回数据给客户端

			const $ = cheerio.load(html);
			const text = JSON.parse($('#meta-preload-data').attr('content'));
			const img = text.illust['108432757'].urls.original;
			downloadImage(img);
		});
	});

	// 请求错误处理
	request.on('error', (error) => {
		console.error('Error:', error.message);
		res.writeHead(500, { 'Content-Type': 'text/plain' });
		res.end('Internal Server Error');
	});

	// 发送请求
	request.end();
}).listen(9000, () => {
	console.log('Server is running at http://localhost:9000');
});
