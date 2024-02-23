import https from 'https';
import path from 'path';
import fs from 'fs';
import 'dotenv/config';
import { SocksProxyAgent } from 'socks-proxy-agent';
import getImgNum from './getImgNum.js';

const downloadImage = (imgUrl) => {
    // 创建 imgs 目录（如果不存在）
	const imgDir = './imgs';
	if (!fs.existsSync(imgDir)) {
		fs.mkdirSync(imgDir);
	}

    // 解析图片 URL
	const urlParts = new URL(imgUrl);

    // 创建可写流
	const fileStream = fs.createWriteStream(path.join(imgDir, `${getImgNum(imgUrl)}.jpg`));

	const proxyAgent = new SocksProxyAgent(process.env.SOCKET_PROXY);

	const options = {
		hostname: urlParts.hostname,
		path: urlParts.pathname,
		method: 'GET',
		headers: {
			'Accept-Charset': 'UTF-8',
			'User-Agent': process.env.USER_AGENT,
			Cookie: process.env.PIXIV_COOKIE,
			Referer: 'https://i.pximg.net/'
		},
		agent: proxyAgent // 使用代理
	};

	const request = https.request(options, (response) => {
		// 监听数据接收事件
		response.on('data', (chunk) => {
			// 将数据写入文件流
			fileStream.write(chunk);
		});

		// 监听请求结束事件
		response.on('end', () => {
			// 关闭文件流
			fileStream.end();
			console.log('Image downloaded successfully');
		});
	});

	// 监听请求错误事件
	request.on('error', (error) => {
		console.error('Error downloading image:', error);
	});

	// 发送请求
	request.end();
};

export default downloadImage;