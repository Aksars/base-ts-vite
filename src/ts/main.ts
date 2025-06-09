import '../css/style.css' // Стили можно подключать как в html так и в TS

// Сюда добавлять код




// Удалить этот фрагмент кода когда убедились что приложение работает
const message = document.querySelector('.message') as HTMLDivElement
message.innerHTML = 'Приложение работает'
message.classList.add('works')
