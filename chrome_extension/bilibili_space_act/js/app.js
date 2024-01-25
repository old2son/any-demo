/**
 * @author: o2s
 * Date: 24/1/13
 * Time: 下午13:17
 */
(() => {
	/**
	 * bilibli 🦑sb comment
	 */

	function getCookieValue(cookieName) {
		const regex = new RegExp(`${cookieName}=([^;]+)`);
		const match = regex.exec(document.cookie);
		return match ? match[1] : null;
	}

	const biliJct = getCookieValue('bili_jct');
	const urlSb = `https://api.bilibili.com/x/v2/reply/add?csrf=${biliJct}`;

	const dayStrs = [
		`卡车队来咯📢📢📢📢📢📢📢📢\n                   🚚🚚🚚🚚🚚🚚🚚🚚\n1.犹太教在我国没有合法席位，国内没有犹太教。\n2.将宗教类物品植入文娱作品需要有报备，而2024年1月7日凌晨2：40的紧急热修加上后来的大规模删帖封号足以说明散爆是在没有报备的情况下故意夹带私货，货不对板。\n3.根据宗教事务条例，涉及宗教内容的出版物，应当符合国家出版管理的规定，并不得含有下列内容：\n（一）破坏信教公民与不信教公民和睦相处的；\n（二）破坏不同宗教之间和睦以及宗教内部和睦的；\n（三）歧视、侮辱信教公民或者不信教公民的；\n（四）宣扬宗教极端主义的；\n（五）违背宗教的独立自主自办原则的。`,
		`传播非法宗教\n非法恶意使用中国邮政和EMS logo\n恶意抹黑世界文明遗产长城\n文案恶意辱骂玩家\n191不当剧情恶意引用伟人话语\n无公告，未告知用户更新\n月卡描述欺诈`
	];

	const nightStrs = [
		'💕🪶⏰FM💕',
		'❤️🐟⏰FM❤️',
		'🥰🐠⏲️FM🥰',
		'😻🐟⏲️F🐎😻',
		'Y💘M💘F💘M💘',
		'💞YMFM💞',
		`(转)\n冲个648，炸弹落进老乡家，正统二🦑，只此一家。`,
		`+🦑追放好好做，希望一切都变好(每条 0.5 新谢克尔,括号内删除)`,
		`➕🦑，好好总结调整。期待春节活动能做的更好，期待你游玉玲珑皮肤(0.5 新谢克尔一条,`,
		`啊啊啊啊啊啊啊，不管了，我反正挺喜欢这个游戏的，希望别💥姒，也不要总折腾官方了等新年活动吧，希望越做越好！！！\n(此条 0.5 新谢克尔,括号里面记得删)`
	];

	const backStrs = ['ymfm', 'YMFM', '狱中❤️‍🔥fm', '狱中💝FM'];

	function getRandomUniqueValue(arr, isDel = false) {
		if (!arr.length) {
			arr = [...backStrs];
		}

		let currentIndex = arr.length;
		let randomIndex, temporaryValue;

		while (currentIndex !== 0) {
			randomIndex = Math.floor(Math.random() * currentIndex);
			currentIndex--;

			temporaryValue = arr[currentIndex];
			arr[currentIndex] = arr[randomIndex];
			arr[randomIndex] = temporaryValue;
		}

		if (isDel) {
			return arr.pop();
		} else {
			return arr[0];
		}
	}

	const params = {
		oid: 305455322,
		type: 11,
		message: getRandomUniqueValue(dayStrs),
		plat: '1',
		at_name_to_mid: '{}',
		pictures: [],
		has_vote_option: true
	};

	const delay = (ms) => {
		return new Promise((resolve) => setTimeout(resolve, ms));
	};

	const autoComment = (sec = 1800000) => {
		setInterval(() => {
			fetch(urlSb, {
				method: 'POST',
				headers: {
					'Content-Type': 'application/x-www-form-urlencoded'
				},
				credentials: 'include',
				body: new URLSearchParams(params).toString()
			})
				.then((response) => {
					if (!response.ok) {
						throw new Error(`HTTP error! Status: ${response.status}`);
					}
					return response.json();
				})
				.then((data) => {
					console.log('Response data:', data);
				})
				.catch((error) => {
					console.error('Error:', error);
				});
		}, sec);
	};

	const switchClick = (sec = 30000) => {
		setInterval(() => {
			const $hot = document.querySelector('.hot-sort');
			$hot.click();
			delay(5000)
				.then(() => {
					const $time = document.querySelector('.time-sort');
					$time.click();
					return delay(5000);
				})
				.then(() => {
					likeFn();
				})
				.catch((error) => {
					console.error('发生错误:', error);
				});
		}, sec);
	};

	const likeFn = () => {
		const $replyWrap = document.querySelectorAll('.root-reply-container');
		const keywords = [
			'红星',
			'教员',
			'鱿',
			'🦑',
			'犹太',
			'新谢克尔',
			'以色列',
			'典籍',
			'传教',
			'非法宗教',
			'🔻',
			'羽中',
			'翀',
			'汉奸',
			'罕见',
			'识趣的后退',
			'一瘸一拐',
			'行家啊',
			'土豆花',
			'马铃薯花',
			'硬核不媚宅',
			'提纯',
			'社区管理',
			'社管',
			'关服',
			'水军',
			'删评',
			'画饼骗钱',
			'网警',
			'ymfm',
			'YMFM',
			'まする',
			'必养的',
			'byd'
		];
		const banwords = ['🐢', '⭐️', '星', '@'];

		const containsKeywordsButNotBanwords = (text, keywords, banwords) => {
			let containsKeywords = keywords.some((keyword) => text.includes(keyword));
			let containsBanwords = banwords.some((banword) => text.includes(banword));
			return containsKeywords && !containsBanwords;
		};

		$replyWrap.forEach(($cur) => {
			const $btnLike = $cur.querySelector('.reply-like');
			const userId = $cur.querySelector('.user-name').dataset.userId;

			if (Number(userId) === 809925 || $btnLike.querySelector('.liked')) {
				return;
			}

			const $text = $cur.querySelector('.reply-content');
			const containsKeyword = containsKeywordsButNotBanwords($text.innerHTML, keywords, banwords);

			if (containsKeyword) {
				$btnLike.click();
			} else {
				console.log('文字中未包含指定的内容');
			}
		});
	};

	switchClick(sec);
	autoComment(sec);
})();
