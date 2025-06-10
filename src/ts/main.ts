import '../css/style.css' // Стили можно подключать как в html так и в TS
import { Шаурма } from "./shaurma"; // Подключаем ШАУРМУ

const мояСуперШавуха = new Шаурма()
    .добавьМясо('курица')
    .добавьСоус('чесночный')
    .добавьОвощи('помидоры')
    .добавьОвощи('грибы')
    .добавьДопы('сыр')
    .добавьДопы('халапенью')
    .build();

const шавухаОстрая = new Шаурма()
    .добавьМясо('курица')
    .добавьСоус('острый')
    .добавьОвощи('маринованые огурцы', 'лук')
    .добавьДопы('сыр', 'картошка фри')
    .build();

const шавухаВеган = new Шаурма()
    .добавьМясо('фалафель')
    .добавьСоус('тахини')
    .добавьОвощи('салат', 'помидоры', 'огурцы')
    .добавьДопы('хумус')
    .build();

// Выводим шаурму в HTML
const shawarmaContent = document.querySelector('#shawarma-content') as HTMLDivElement
shawarmaContent.innerHTML = `
  <ul>
    <li>${мояСуперШавуха.описать()}</li>
    <li>${шавухаОстрая.описать()}</li>
    <li>${шавухаВеган.описать()}</li>
  </ul>
`




import {
    Оружие,
    Sword,
    эффектЯда,
    эффектОгня,
    эффектМолнии,
    ЭффектыОружия
} from "./weapon"; // Подключаем Оружие


// Логика оружия -- можем добавлять разные зачарования
let нашаПушка: Оружие = new Sword();
нашаПушка = new эффектЯда(нашаПушка);







// Обновляем визуалку
обновитьВизуалкуОружия();











// Клик по кнопкe добавляет Яд
(document.querySelector('.poision') as HTMLElement).onclick = () => {
    нашаПушка = new эффектЯда(нашаПушка);
    обновитьВизуалкуОружия();
};
// Клик по кнопкe добавляет Огонь
(document.querySelector('.fire') as HTMLElement).onclick = () => {
    нашаПушка = new эффектОгня(нашаПушка);
    обновитьВизуалкуОружия();
};
// Клик по кнопкe добавляет Молнию
(document.querySelector('.lightning') as HTMLElement).onclick = () => {
    нашаПушка = new эффектМолнии(нашаПушка);
    обновитьВизуалкуОружия();
};

// Убираем последний эффект
(document.querySelector('.delete-last') as HTMLElement).onclick = () => {
    нашаПушка = (нашаПушка as ЭффектыОружия).weapon; 
    обновитьВизуалкуОружия();
};

// Убираем все эффекты
(document.querySelector('.reset-btn') as HTMLElement).onclick = () => {
    нашаПушка = new Sword();
    обновитьВизуалкуОружия();
};



function removeEffect(effectIndex: number) {
    // Временное решение - создаем новое оружие без нужного эффекта
    // В реальном проекте лучше сделать метод removeEffect в Weapon
    let baseWeapon: Оружие = new Sword();

    нашаПушка.получитьЭффекты().forEach((effect, index) => {
        if (index !== effectIndex) {
            switch (effect) {
                case 'Яд (+5)': baseWeapon = new эффектЯда(baseWeapon); break;
                case 'Огонь (+10)': baseWeapon = new эффектОгня(baseWeapon); break;
                case 'Молния (+7)': baseWeapon = new эффектМолнии(baseWeapon); break;
            }
        }
    });

    нашаПушка = baseWeapon;
    обновитьВизуалкуОружия();
}







// UI Оружия
function обновитьВизуалкуОружия() {
    // Обновляем базовую информацию
    const descElement = document.getElementById('weapon-description');
    const damageElement = document.getElementById('weapon-damage');

    if (descElement) descElement.textContent = нашаПушка.получитьОписание();
    if (damageElement) damageElement.textContent = нашаПушка.получитьУрон().toString();

    // Очищаем и обновляем иконки эффектов
    const effectsList = document.getElementById('effects-list');
    if (effectsList) {
        effectsList.innerHTML = '';
        нашаПушка.получитьЭффекты().forEach((effect, index) => {
            effectsList.appendChild(createEffectIcon(effect, index));
        });
    }

    // Обновляем статусы
    const statusesElement = document.getElementById('weapon-statuses');
    if (statusesElement) {
        const statuses = нашаПушка.получитьСтатусы();
        // Убираем дубликаты, оставляя только по одному статусу каждого вида
        const uniqueStatuses = Array.from(new Set(statuses));
        statusesElement.textContent = uniqueStatuses.length > 0 ? uniqueStatuses.join(', ') : 'Статусов нет';
    }

}



function createEffectIcon(effect: string, index: number): HTMLElement {
    const effectIcon = createHtmlElement(`
    <div class="effect-icon" data-effect-type="">
        <span class="effect-letter"></span>
    </div> as HTMLElement `)

    const letter = effectIcon.querySelector('.effect-letter') as HTMLElement;

    // Устанавливаем тип эффекта
    let effectType = '';
    let effectLetter = '';

    switch (effect.charAt(0)) {
        case 'Я':
            effectType = 'Poison';
            effectLetter = 'P';
            break;
        case 'О':
            effectType = 'Fire';
            effectLetter = 'F';
            break;
        case 'М':
            effectType = 'Lightning';
            effectLetter = 'L';
            break;
        default:
            effectLetter = effect.charAt(0);
    }

    effectIcon.classList.add(effectType);
    effectIcon.setAttribute('data-effect-type', effectType.toLowerCase());
    letter.textContent = effectLetter;

    // Вешаем обработчик удаления
    effectIcon.addEventListener('click', (e) => {
        e.stopPropagation();
        removeEffect(index);
    });

    return effectIcon;
}

function createHtmlElement(html: string): HTMLElement {
    const template = document.createElement('template');
    template.innerHTML = html.trim(); // Убираем лишние пробелы
    return template.content.firstElementChild as HTMLElement;
}

