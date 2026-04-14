export const translations = {
  en: {
    // Hero
    hero_role: "Software Engineer",
    hero_name: "Ondassyn\nAbdrakhmanov",
    hero_description:
      "architecting complex systems and\nelegant, high-performance interfaces",
    hero_scroll: "scroll",

    // Projects
    selected_work: "selected work",

    // BIL Platform
    bil_subtitle: "National Integrated School Management System (ISMS)",
    bil_title: "BIL Platform",
    bil_description: `- Lead architect for the digital infrastructure of a nationwide ERP platform managing student records, staff payroll, and academic performance for 40+ schools.

- Designed and implemented complex data visualization dashboards for real-time performance auditing, enabling data-driven decision-making for organization leaders.

- Engineered secure, role-based authentication systems and managed complex permission logic for diverse user groups (Students, Teachers, Admin, and HR).

- Built automated modules for salary calculation and inter-school transfer workflows, optimizing cross-institutional data synchronization and reducing administrative overhead.`,

    // Student IDP
    idp_subtitle: "AI-Driven College Admissions & Career Roadmap Platform",
    idp_title: "Student IDP",
    idp_description: `- Engineered a personalized full-stack journey that guides students from career discovery to university acceptance using AI-driven roadmap logic.

- Developed an interactive Career Diagnostic Tool analyzing student data to recommend optimal professional paths and specific degree programs.

- Built a scalable Requirements Engine that aggregates and displays real-time admissions prerequisites for global universities.

- Integrated a comprehensive Learning Management System (LMS) module with project-based learning to bridge student qualification gaps.`,

    // JeoJeo
    jeojeo_subtitle: "Custom Live-Trivia Engine",
    jeojeo_title: "JeoJeo",
    jeojeo_description: `- Developed a private, end-to-end full-stack quiz platform featuring a Host-Client architecture for real-time competitive gaming.

- Engineered a lightweight Room ID system for instant-join capabilities, bypassing traditional account registration bottlenecks.

- Built a Live Scoring Engine allowing hosts to audit player submissions and update stateful data in real-time.

- Managed the entire development lifecycle, from system architecture and UI/UX design to deploying real-time backend infrastructure.`,

    // Who is lying (Existing descriptions were already very Full-stack, kept them strong)
    wholying_subtitle: "Real-Time Social Deduction Gaming Platform",
    wholying_title: "Who is lying?",
    wholying_description: `- Real-Time State Synchronization: Leveraged Firebase Realtime Database to orchestrate live game states and synchronized voting phases across connected clients.

- Hardware Integration: Implemented a QR Code scanning system using the browser's camera API to streamline the mobile join experience.

- Asymmetric Information Logic: Engineered a "Hidden Role" engine that distributes unique data to specific players while maintaining a consistent UI for the group.

- Hybrid Database Architecture: Integrated MongoDB for persistent storage of a vast categorized question bank, coupled with Firebase for low-latency game interactions.`,

    // David Fincher (Keeping the UI/Motion focus here as your "edge")
    fincher_subtitle: "Interactive Filmmaker Portfolio",
    fincher_title: "David Fincher Tribute",
    fincher_description: `- Built a visually driven experience showcasing filmography through custom scroll-driven animations and gesture interactions.

- Engineered a drag-and-scroll carousel with dynamic parallax image positioning and smooth easing curves.

- Implemented a minimap navigation system mirroring scroll position in real time—inspired by code editor UX patterns.

- Architected fluid page transitions and staggered reveal animations using Framer Motion with precise timing and choreography.`,
    read_more: "read more",
    collapse: "collapse",
    prev: "prev",
    next: "next",
    contacts_label: "always open to new challenges",
    contacts_heading: "Let's build something",
    contacts_subtext:
      "Got a complex problem, a product to ship, or a gap in your team? I specialize in bridging the gap between architecture and experience.",
    contacts_game_hint: "[ while you think it over — pop a colorful square ]",
    squares_popped: "Squares_Popped",
    not_found_label: "error 404",
    not_found_message:
      "This page doesn't exist — but the rest of the portfolio does.",
    not_found_back: "back to portfolio",
    not_found_stay: "stay & pop squares",
    not_found_or: "or",
    desktop_hint: "best experienced on desktop",
  },

  ru: {
    // Hero
    hero_role: "Software Engineer",
    hero_name: "Ondassyn\nAbdrakhmanov",
    hero_description:
      "проектирую сложные системы и\nэлегантные высокопроизводительные интерфейсы",
    hero_scroll: "скролл",

    // Projects
    selected_work: "избранные работы",

    // BIL Platform
    bil_subtitle:
      "Национальная Интегрированная Система Управления Школами (ISMS)",
    bil_title: "BIL Platform",
    bil_description: `- Ведущий архитектор цифровой инфраструктуры общенациональной ERP-платформы, управляющей данными учеников и зарплатами в сети из 40+ школ.

- Спроектировал и внедрил сложные дашборды визуализации данных для аудита успеваемости, обеспечив руководство инструментами аналитики в реальном времени.

- Разработал безопасные системы аутентификации и сложную логику прав доступа для различных групп пользователей (ученики, учителя, HR).

- Создал автоматизированные модули для расчёта зарплат и процессов межшкольных переводов, оптимизировав синхронизацию данных между учреждениями.`,

    // Student IDP
    idp_subtitle:
      "Платформа поступления в вузы и планирования карьеры на базе ИИ",
    idp_title: "Student IDP",
    idp_description: `- Разработал персонализированный Full-stack путь, ведущий студентов от выбора карьеры до зачисления с помощью ИИ-логики построения дорожных карт.

- Создал интерактивный инструмент диагностики карьеры, анализирующий данные студентов для рекомендации профессий и программ обучения.

- Разработал масштабируемый движок требований, агрегирующий актуальные данные о поступлении в мировые университеты в реальном времени.

- Интегрировал комплексный модуль LMS с проектным обучением для устранения пробелов в квалификации студентов.`,

    // JeoJeo
    jeojeo_subtitle: "Движок для живых викторин",
    jeojeo_title: "JeoJeo",
    jeojeo_description: `- Создал частную сквозную Full-stack платформу для викторин с архитектурой хост-клиент для соревновательных игр в реальном времени.

- Разработал систему идентификаторов комнат для мгновенного подключения без необходимости регистрации аккаунта.

- Реализовал систему подсчёта очков в реальном времени, позволяющую ведущим проверять ответы и обновлять данные на лету.

- Управлял всем циклом разработки — от архитектуры системы и UI/UX до развёртывания бэкенд-инфраструктуры.`,

    // Who is lying
    wholying_subtitle: "Платформа для социальных игр на вычисление лжеца",
    wholying_title: "Кто лжёт?",
    wholying_description: `- Синхронизация состояний в реальном времени: использовал Firebase Realtime Database для управления игровыми состояниями и фазами голосования.

- Интеграция с оборудованием: реализовал систему сканирования QR-кодов через API камеры, упростив вход в игру для мобильных пользователей.

- Логика асимметричной информации: разработал движок «скрытых ролей», распределяющий уникальные данные игрокам при сохранении единого интерфейса для группы.

- Гибридная архитектура БД: интегрировал MongoDB для хранения банка вопросов и Firebase для игровых взаимодействий с низкой задержкой.`,

    // David Fincher
    fincher_subtitle: "Интерактивное портфолио кинорежиссёра",
    fincher_title: "Дань Дэвиду Финчеру",
    fincher_description: `- Создал визуально насыщенный сайт, демонстрирующий фильмографию через кастомные анимации на основе скролла и жестов.

- Разработал карусель с параллакс-позиционированием изображений и плавными кривыми замедления.

- Реализовал систему навигации с миникартой, отображающей позицию скролла в реальном времени — по образцу редакторов кода.

- Спроектировал плавные переходы страниц с помощью Framer Motion, уделив внимание хореографии и дизайну движения.`,
    read_more: "читать далее",
    collapse: "свернуть",
    prev: "назад",
    next: "далее",
    contacts_label: "всегда открыт новым вызовам",
    contacts_heading: "Воплотим в коде",
    contacts_subtext:
      "Сложная задача, запуск продукта или нужно усилить команду? Я специализируюсь на стыке архитектуры и пользовательского опыта.",
    contacts_game_hint: "[ пока думаете — лопните цветной квадрат ]",
    squares_popped: "Квадратов_Лопнуто",
    not_found_label: "ошибка 404",
    not_found_message:
      "Такой страницы нет — зато остальное портфолио на месте.",
    not_found_back: "вернуться",
    not_found_stay: "остаться и лопать квадраты",
    not_found_or: "или",
    desktop_hint: "лучше смотреть на компьютере",
  },

  kz: {
    // Hero
    hero_role: "Software Engineer",
    hero_name: "Ondassyn\nAbdrakhmanov",
    hero_description:
      "күрделі жүйелерді және жоғары\nөнімді интерфейстерді жобалаймын",
    hero_scroll: "айналдыру",

    // Projects
    selected_work: "таңдаулы жұмыстар",

    // BIL Platform
    bil_subtitle:
      "Мектептерді Басқарудың Ұлттық Интеграцияланған Жүйесі (ISMS)",
    bil_title: "BIL Platform",
    bil_description: `- 40+ мектеп желісі үшін оқушылар деректерін және жалақыны басқаратын ұлттық ERP-платформаның цифрлық инфрақұрылымының жетекші архитектор болдым.

- Нақты уақыттағы аудит жүргізу үшін күрделі деректерді визуализациялау тақталарын жобалап, енгіздім.

- Әртүрлі пайдаланушы топтары (оқушылар, мұғалімдер, HR) үшін қауіпсіз аутентификация жүйелерін және күрделі рөлдік логиканы әзірледім.

- Жалақыны есептеу және мектепаралық ауысу процестерін автоматтандыру модульдерін жасап, деректер синхронизациясын оңтайландырдым.`,

    // Student IDP
    idp_subtitle: "ЖИ негізіндегі оқуға түсу және мансап жоспарлау платформасы",
    idp_title: "Student IDP",
    idp_description: `- Студенттерді мансап таңдаудан оқуға түсуге дейін бағыттайтын ЖИ негізіндегі жекелендірілген Full-stack жолын жасадым.

- Студенттердің деректерін талдап, оңтайлы кәсіби бағыттар мен бағдарламаларды ұсынатын интерактивті диагностикалық құрал әзірледім.

- Әлемдік университеттерге түсу талаптарын нақты уақытта жинақтайтын масштабируемые жүйе жасадым.

- Студенттердің біліктілік олқылықтарын жою үшін жобалық оқытуды қамтитын LMS модулін интеграцияладым.`,

    // JeoJeo
    jeojeo_subtitle: "Тікелей викторина қозғалтқышы",
    jeojeo_title: "JeoJeo",
    jeojeo_description: `- Нақты уақыттағы ойындарға арналған хост-клиент архитектурасы бар жеке Full-stack викторина платформасын жасадым.

- Тіркелусіз лезде қосылуға мүмкіндік беретін бөлме идентификаторлары жүйесін әзірледім.

- Хосттарға жауаптарды тексеруге және деректерді нақты уақытта жаңартуға мүмкіндік беретін жүйені іске асырдым.

- Жүйе архитектурасы мен UI/UX-тен бастап бэкенд инфрақұрылымын орналастыруға дейінгі барлық циклді басқардым.`,

    // Who is lying
    wholying_subtitle:
      "Өтірікшіні анықтауға арналған нақты уақыттағы ойын платформасы",
    wholying_title: "Who is lying?",
    wholying_description: `- Нақты уақытта күй синхронизациясы: ойын күйлері мен дауыс беру кезеңдерін басқару үшін Firebase Realtime Database пайдаландым.

- Жабдықпен интеграция: мобильді ойыншылар үшін камера API арқылы QR-код сканерлеу жүйесін енгіздім.

- Асимметриялық ақпарат логикасы: топтың қалған мүшелері үшін бірыңғай интерфейсті сақтай отырып, «жасырын рөл» қозғалтқышын жасадым.

- Гибридтік дерекқор архитектурасы: деректерді сақтау үшін MongoDB және нақты уақыттағы өзара әрекеттестік үшін Firebase интеграцияладым.`,

    // David Fincher
    fincher_subtitle: "Интерактивті кинорежиссер портфолиосы",
    fincher_title: "David Fincher Tribute",
    fincher_description: `- Дэвид Финчердің фильмографиясын скролл анимациялары мен қимыл-қозғалыс арқылы көрсететін визуалды сайт жасадым.

- Динамикалық параллакс және жұмсақ анимациялары бар сүйреп апаруға арналған карусель әзірледім.

- Пайдаланушының скролл позициясын нақты уақытта көрсететін миникарта навигация жүйесін іске асырдым.

- Framer Motion көмегімен хореография мен қозғалыс дизайнына назар аудара отырып, плавты бет өтулерін жасадым.`,
    read_more: "толығырақ",
    collapse: "жабу",
    prev: "артқа",
    next: "алға",
    contacts_label: "жаңа қиындықтарға әрдайым дайынмын",
    contacts_heading: "Биік белестерге бірге",
    contacts_subtext:
      "Күрделі тапсырма, өнімді іске қосу немесе команданы күшейту керек пе? Мен архитектура мен тәжірибе арасындағы алшақтықты жоюға маманданғанмын.",
    contacts_game_hint: "[ ойланып жатқанда — түрлі-түсті шаршыны жарыңыз ]",
    squares_popped: "Жарылған_Шаршылар",
    not_found_label: "қате 404",
    not_found_message: "Бұл бет жоқ — бірақ портфолионың қалған бөлігі бар.",
    not_found_back: "артқа қайту",
    not_found_stay: "қалып, шаршыларды жару",
    not_found_or: "немесе",
    desktop_hint: "компьютерде жақсы көрінеді",
  },
};

export type Language = keyof typeof translations;
export type TranslationKeys = keyof (typeof translations)["en"];
