/* const cheerio = require('cheerio');
const $ = cheerio.load(html);
let allFiles = [];

$('li .item').each(function () {
	const title = $('.title', this).text();
	const star = $('.info .bd .rating_num', this).text();
	const pic = $('.pic img', this).attr('src');

    allFiles.push({
        title: title,
        star: star,
        pic: pic
    });
});

const fs = require('fs')
fs.writeFile('./files.json', JSON.stringify(allFiles), function (err, data) {
    if (err) {
        throw err
    }
    console.log('文件保存成功');
}) */


//引入模块
const https = require('https')
const cheerio = require('cheerio')
const fs = require('fs')
//获取页面的html结构
https.get('https://movie.douban.com/top250', function (res) {
    let html = ''
    res.on('data', function (chunk) {
        //console.log(chunk + '');
        html += chunk
    })

    res.on('end', function () {
        // 获取html中的数据
        const $ = cheerio.load(html)
        let allFiles = []
        //拿到每一个item中我们需要的数据
        $('li .item').each(function () {
            const title = $('.title', this).text()
            const star = $('.info .bd .rating_num', this).text()
            const pic = $('.pic img', this).attr('src')
            //数据以对象的形式存放在数组中
            allFiles.push({
                title: title,
                star: star,
                pic: pic
            })
        })
        //console.log(allFiles);
        //将数据写入文件中
        fs.writeFile('./files.json', JSON.stringify(allFiles), function (err, data) {
            if (err) {
                throw err
            }
            console.log('文件保存成功');
        })
    })
})



