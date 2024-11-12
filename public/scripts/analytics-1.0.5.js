;(function () {
  // Визначаємо ID проекту, для якого будемо зберігати дані
  const ID = document.currentScript.src.split('id=')[1] || null
  let visitInterval
  // const baseUrl = 'https://demo-analytics.vercel.app'
  const baseUrl = 'http://localhost:3000'

  /**************************************** Visit ****************************************/

  // Дормує дані відвідування
  async function visitData() {
    return {
      id: new Date().getTime().toString(),
      projectId: ID,
      userAgent: navigator.userAgent,
      ip: await getIPFromAmazon(),
      href: window.location.pathname,
      pageTitle: document.title,
      screenSize: `${window.screen.width}x${window.screen.height}`,
      timestamp: new Date().getTime(),
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
        `${baseUrl}/api/analytics/visits/update`,
      )
    }, 5000)

    return () => {
      clearInterval(visitInterval)
      time = 0
    }
  }

  async function trackVisit() {
    const data = await visitData()
    await sendDataToDashboard(data, `${baseUrl}/api/analytics/visits/save`)

    await updateVisitTime(data.id)
  }

  // Фіксуємо дані відвідування першого рендера сторінки
  trackVisit()

  // Відслідковуємо AJAX роутинг, фіксуємо дані
  if (window.navigation) {
    window.navigation.addEventListener('navigate', () => trackVisit())
  }

  /************************************** Events **************************************/

  // Формуємо стек даних для події
  async function eventData() {
    return {
      id: new Date().getTime().toString(),
      projectId: ID,
      userAgent: navigator.userAgent,
      ip: await getIPFromAmazon(),
      screenSize: `${window.screen.width}x${window.screen.height}`,
      timestamp: new Date().getTime(),
    }
  }

  // Функція для відстеження кліків
  async function trackClick(event) {
    const availableElements = [
      'BUTTON',
      'A',
      'INPUT',
      'TEXTAREA',
      'H1',
      'H2',
      'H3',
      'H4',
      'H5',
      'H6',
      'IMG',
      'P',
    ]
    const target = event.target
    if (availableElements.includes(target.tagName)) {
      const data = {
        ...(await eventData()),
        type: 'click',
        currentHref: window.location.pathname,
        pageTitle: document.title,
        element: target.tagName,
        details: {
          label: target.innerText || '',
          alt: target.alt || '',
          src: target.src || '',
          newHref: target.getAttribute('href') || '',
          blank: Boolean(target.getAttribute('target')) || false,
          name: target.name || '',
        },
      }

      // Відправляємо дані події до API застосунку
      await sendDataToDashboard(data, `${baseUrl}/api/analytics/events/save`)
    }

    return false
  }

  // Відправляємо відповідні дані до API застосунку
  async function sendDataToDashboard(data, url) {
    try {
      await fetch(url, {
        method: 'POST',
        mode: 'cors',
        body: JSON.stringify(data),
      })
    } catch (error) {
      console.error('Error sending data:', error)
    }
  }

  // Формуємо стек даних про відвідувача сайту
  async function userData() {
    return {
      projectId: ID,
      timestamp: new Date().getTime(),
      userAgent: navigator.userAgent,
      screenSize: `${window.screen.width}x${window.screen.height}`,
      language: navigator.language,
      ip: await getIPFromAmazon(),
      href: window.location.pathname,
      pageTitle: document.title,
      session: {
        referral: window.location.length > 1,
        direct: window.location.length <= 1,
      },
    }
  }

  async function trackUser() {
    const data = await userData()
    await sendDataToDashboard(data, `${baseUrl}/api/analytics/traffic/save`)
  }

  trackUser()

  // Додаємо обробник подій на document для відстеження кліків на кнопках
  document.addEventListener('click', async function (event) {
    await trackClick(event)
  })
})()

async function getIPFromAmazon() {
  const res = await fetch('https://checkip.amazonaws.com/')
  return (await res.text()).replace(/(\r\n|\n|\r)/gm, '')
}
