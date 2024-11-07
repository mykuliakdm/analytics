(function() {
	// Визначаємо ID проекту, для якого будемо зберігати дані
	const ID = document.currentScript.src.split('id=')[1] || null
	let visitInterval
	
	/**************************************** Visit ****************************************/
	
	// Дормує дані відвідування
	async function visitData() {
		return {
			id: new Date().getTime().toString(),
			projectId: ID,
			userAgent: navigator.userAgent,
			ip: await getIPFromAmazon(),
			href: window.location.pathname,
			screenSize: `${window.screen.width}x${window.screen.height}`,
			timestamp: new Date().toLocaleString(),
			time: 0,
		}
	}
	
	async function updateVisitTime(id) {
		// Очищаємо попередній інтервал, якщо він існує
		if (visitInterval) {
			clearInterval(visitInterval)
		}
		
		let time = 0
		
		visitInterval = setInterval(() => {
			time += 5
			sendDataToDashboard(
				{ id, time },
				'http://localhost:3000/api/analytics/visits/update',
			)
		}, 5000)
		
		return () => {
			clearInterval(visitInterval)
			time = 0
		}
	}
	
	async function trackVisit() {
		const data = await visitData()
		await sendDataToDashboard(
			data,
			'http://localhost:3000/api/analytics/visits/save',
		)
		
		await updateVisitTime(data.id)
	}
	
	// Фіксуємо дані відвідування першого рендера сторінки
	trackVisit()
	
	// Відслідковуємо AJAX роутинг, фіксуємо дані
	window.navigation.addEventListener('navigate', () => trackVisit())
	
	//
	async function sendDataToDashboard(data, url) {
		try {
			await fetch(url, {
				method: 'POST',
				mode: 'cors',
				body: JSON.stringify(data),
			}).then((response) => {
				console.log('sendDataToDashboard, response ', response)
			})
		} catch (error) {
			console.error('Error sending data:', error)
		}
	}
	
	// Формуємо стек даних про відвідувача сайту
	async function userData() {
		return {
			projectId: ID,
			timestamp: new Date().toLocaleString(),
			userAgent: navigator.userAgent,
			screenSize: `${window.screen.width}x${window.screen.height}`,
			language: navigator.language,
			platform: navigator.platform,
			appVersion: navigator.appVersion,
			history: history.length,
			ip: await getIPFromAmazon(),
			href: window.location.href,
		}
	}
	
	userData().then((data) => {
		// console.log('user data ', data)
	})
	
	// Логіка для відстеження перегляду сторінки
	function trackPageView() {
		console.log('Page view tracked!')
	}
	
	// Функція для відстеження кліків на кнопках
	function trackClick(event) {
		const element = event.target
		if (element.tagName === 'BUTTON') {
			console.log('Button clicked:', element)
			// Додайте логіку для обробки кліка
		}
	}
	
	// Додаємо обробник подій при завантаженні сторінки
	window.addEventListener('load', () => {
		trackPageView()
		
		// Додаємо обробник подій на document для відстеження кліків на кнопках
		document.addEventListener('click', trackClick)
	})
})();

async function getIPFromAmazon() {
	const res =  await fetch('https://checkip.amazonaws.com/');
	return (await res.text()).replace(/(\r\n|\n|\r)/gm, "");
}