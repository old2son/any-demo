const getImgNum = (imgUrl) => {
	// 获取文件名中的数字字符串
	const startIndex = imgUrl.lastIndexOf('/'); // 找到最后一个斜杠的索引
	const endIndex = imgUrl.lastIndexOf('.'); // 找到最后一个点的索引
	const numberString = imgUrl.slice(startIndex, endIndex);
	return numberString;
};

export default getImgNum;
