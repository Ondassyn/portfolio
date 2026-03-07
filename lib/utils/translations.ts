export const translations = {
  en: {
    // Hero
    hero_role: "Frontend Engineer",
    hero_name: "Ondassyn\nAbdrakhmanov",
    hero_description:
      "turning complex problems into\nelegant, high-performance interfaces",
    hero_scroll: "scroll",

    // Projects
    selected_work: "selected work",

    // BIL Platform
    bil_subtitle: "National Integrated School Management System (ISMS)",
    bil_title: "BIL Platform",
    bil_description: `- Engineered the frontend for a nationwide ERP platform managing student records, staff payroll, and academic performance for a network of 40+ schools all over the country.

- Developed complex data visualization dashboards to provide real-time audits of student and school performance, enabling data-driven decision-making for organization leaders.

- Built secure, role-based authentication flows for diverse user groups (Students, Teachers, Admin, and HR).

- Implemented automated modules for salary calculation and inter-school transfer workflows, reducing manual administrative overhead by streamlining cross-institutional data syncing.`,

    // Student IDP
    idp_subtitle: "AI-Driven College Admissions & Career Roadmap Platform",
    idp_title: "Student IDP",
    idp_description: `- Architected a personalized user journey that guides students from career discovery to university acceptance using AI-driven roadmap logic.

- Developed an interactive Career Diagnostic Tool that analyzes student test results to recommend optimal professional paths and degree programs.

- Built a comprehensive Requirements Engine that aggregates and displays real-time admissions data and prerequisites for global universities.

- Integrated a Learning Management System (LMS) module featuring courses and project-based learning to help students bridge qualification gaps.`,

    // JeoJeo
    jeojeo_subtitle: "Custom Live-Trivia Engine",
    jeojeo_title: "JeoJeo",
    jeojeo_description: `- Built a private, end-to-end quiz platform featuring a Host-Client architecture for real-time competitive gaming.

- Engineered a Room ID system allowing instant-join capabilities for players without requiring traditional account registration.

- Developed a Live Scoring Engine that enables hosts to audit player submissions and update point totals in real-time.

- Managed the entire development lifecycle, from UI/UX design to deploying the real-time backend infrastructure.`,

    // Who is lying
    wholying_subtitle: "Real-Time Social Deduction Gaming Platform",
    wholying_title: "Who is lying?",
    wholying_description: `- Real-Time State Synchronization: Leveraged Firebase Realtime Database to orchestrate live game states, ensuring synchronized question delivery and voting phases across all connected clients.

- Hardware Integration: Implemented a QR Code scanning system using the browser's camera API, streamlining the "Join Room" UX for mobile players.

- Asymmetric Information Logic: Engineered a "Hidden Role" engine that intelligently distributes unique data (the "Odd One Out" question) to a single player while maintaining a consistent UI for the rest of the group.

- Hybrid Database Architecture: Integrated MongoDB for persistent storage of a vast categorized question bank, coupled with Firebase for high-frequency, low-latency game interactions.`,

    // David Fincher
    fincher_subtitle: "Interactive Filmmaker Portfolio",
    fincher_title: "David Fincher Tribute",
    fincher_description: `- Built a visually driven single-page experience showcasing David Fincher's filmography through custom scroll-driven animations and gesture interactions.

- Engineered a drag-and-scroll carousel with dynamic parallax image positioning, smooth easing curves, and an animated loading sequence synchronized to asset load progress.

- Implemented a minimap navigation system mirroring the user's scroll position in real time against a scaled-down content preview — inspired by code editor UX patterns.

- Architected fluid page transitions and staggered reveal animations using Framer Motion, with careful attention to choreography, timing, and motion design.`,
    read_more: "read more",
    collapse: "collapse",
    prev: "prev",
    next: "next",
    contacts_label: "always open to new challenges",
    contacts_heading: "Let's build something",
    contacts_subtext:
      "Got a complex problem, a product to ship, or a gap in your team? That's exactly where I come in.",
    contacts_game_hint: "[ while you think it over — pop a colorful square ]",
    squares_popped: "Squares_Popped",
    not_found_label: "error 404",
    not_found_message:
      "This page doesn't exist — but the rest of the portfolio does.",
    not_found_back: "back to portfolio",
  },

  ru: {
    // Hero
    hero_role: "Фронтенд Разработчик",
    hero_name: "Ondassyn\nAbdrakhmanov",
    hero_description:
      "превращаю сложные задачи в\nэлегантные высокопроизводительные интерфейсы",
    hero_scroll: "скролл",

    // Projects
    selected_work: "избранные работы",

    // BIL Platform
    bil_subtitle:
      "Национальная Интегрированная Система Управления Школами (ISMS)",
    bil_title: "BIL Platform",
    bil_description: `- Разработал фронтенд для общенациональной ERP-платформы, управляющей данными учеников, зарплатами сотрудников и академической успеваемостью в сети из 40+ школ по всей стране.

- Создал сложные дашборды визуализации данных для аудита успеваемости учеников и школ в режиме реального времени, обеспечивая руководителей инструментами для принятия решений.

- Реализовал безопасные потоки аутентификации на основе ролей для различных групп пользователей (ученики, учителя, администраторы и HR).

- Внедрил автоматизированные модули для расчёта зарплат и процессов межшкольных переводов, снизив ручную административную нагрузку.`,

    // Student IDP
    idp_subtitle:
      "Платформа поступления в вузы и карьерного планирования на базе ИИ",
    idp_title: "Student IDP",
    idp_description: `- Разработал персонализированный пользовательский путь, ведущий студентов от выбора карьеры до поступления в университет с помощью ИИ-логики построения дорожной карты.

- Создал интерактивный карьерный диагностический инструмент, анализирующий результаты тестов студентов и рекомендующий оптимальные профессиональные пути и направления обучения.

- Разработал комплексный модуль требований, агрегирующий и отображающий актуальные данные о поступлении в мировые университеты.

- Интегрировал модуль системы управления обучением (LMS) с курсами и проектным обучением для устранения пробелов в квалификации студентов.`,

    // JeoJeo
    jeojeo_subtitle: "Движок для живых викторин",
    jeojeo_title: "JeoJeo",
    jeojeo_description: `- Создал частную сквозную платформу для викторин с архитектурой хост-клиент для соревновательных игр в реальном времени.

- Разработал систему идентификаторов комнат, позволяющую игрокам мгновенно подключаться без традиционной регистрации аккаунта.

- Реализовал систему подсчёта очков в реальном времени, позволяющую ведущим проверять ответы и обновлять баллы на лету.

- Управлял всем циклом разработки — от UI/UX дизайна до развёртывания бэкенд-инфраструктуры в реальном времени.`,

    // Who is lying
    wholying_subtitle: "Платформа для социальных игр на вычисление лжеца",
    wholying_title: "Кто лжёт?",
    wholying_description: `- Синхронизация состояний в реальном времени: использовал Firebase Realtime Database для управления игровыми состояниями, обеспечивая синхронную доставку вопросов и фазы голосования всем клиентам.

- Интеграция с оборудованием: реализовал систему сканирования QR-кодов через API камеры браузера, упростив UX входа в комнату для мобильных игроков.

- Логика асимметричной информации: разработал движок «скрытых ролей», распределяющий уникальные данные одному игроку при сохранении единого интерфейса для остальных.

- Гибридная архитектура баз данных: интегрировал MongoDB для хранения банка вопросов и Firebase для высокочастотных игровых взаимодействий с низкой задержкой.`,

    // David Fincher
    fincher_subtitle: "Интерактивное портфолио кинорежиссёра",
    fincher_title: "Дань Дэвиду Финчеру",
    fincher_description: `- Создал визуально насыщенный одностраничный сайт, демонстрирующий фильмографию Дэвида Финчера через кастомные анимации на основе скролла и жестовых взаимодействий.

- Разработал карусель с перетаскиванием и параллакс-позиционированием изображений, плавными кривыми замедления и анимированной загрузочной последовательностью, синхронизированной с прогрессом загрузки ресурсов.

- Реализовал систему навигации с миникартой, отображающей позицию скролла пользователя в реальном времени на уменьшенном превью контента — по образцу UX редакторов кода.

- Спроектировал плавные переходы страниц и поэтапные анимации появления с помощью Framer Motion, уделив особое внимание хореографии, тайминг и дизайну движения.`,
    read_more: "читать далее",
    collapse: "свернуть",
    prev: "назад",
    next: "далее",
    contacts_label: "всегда открыт новым вызовам",
    contacts_heading: "Давайте создадим",
    contacts_subtext:
      "Сложная задача, продукт на запуске или дыра в команде? Именно для этого я здесь.",
    contacts_game_hint: "[ пока думаете — лопните цветной квадрат ]",
    squares_popped: "Квадратов_Лопнуто",
    not_found_label: "ошибка 404",
    not_found_message:
      "Такой страницы нет — зато остальное портфолио на месте.",
    not_found_back: "вернуться",
  },

  kz: {
    // Hero
    hero_role: "Фронтенд Әзірлеуші",
    hero_name: "Ondassyn\nAbdrakhmanov",
    hero_description:
      "күрделі мәселелерді\nәдемі, жоғары өнімді интерфейстерге айналдырамын",
    hero_scroll: "айналдыру",

    // Projects
    selected_work: "таңдаулы жұмыстар",

    // BIL Platform
    bil_subtitle:
      "Мектептерді Басқарудың Ұлттық Интеграцияланған Жүйесі (ISMS)",
    bil_title: "BIL Platform",
    bil_description: `- Елдің 40+ мектебін қамтитын желі үшін оқушылардың деректерін, қызметкерлердің жалақысын және академиялық үлгерімді басқаратын ұлттық ERP-платформаның фронтендін әзірледім.

- Ұйым басшылары үшін деректерге негізделген шешімдер қабылдауды қамтамасыз ете отырып, оқушылар мен мектептердің үлгерімін нақты уақытта тексеруге арналған күрделі деректерді визуализациялау бақылау тақталарын жасадым.

- Әртүрлі пайдаланушы топтары (оқушылар, мұғалімдер, әкімшілер және HR) үшін рөлге негізделген қауіпсіз аутентификация ағындарын енгіздім.

- Жалақыны есептеу және мектепаралық ауысу процестерін автоматтандыру модульдерін іске асырдым.`,

    // Student IDP
    idp_subtitle:
      "ЖИ негізіндегі жоғары оқу орнына түсу және мансап жоспарлау платформасы",
    idp_title: "Student IDP",
    idp_description: `- ЖИ-логикасын пайдалана отырып, студенттерді мансап таңдаудан университетке қабылдануға дейін бағыттайтын жекелендірілген пайдаланушы жолын жасадым.

- Студенттердің тест нәтижелерін талдап, оңтайлы кәсіби бағыттар мен оқу бағдарламаларын ұсынатын интерактивті мансаптық диагностикалық құрал әзірледім.

- Әлемдік университеттерге түсу деректері мен алғышарттарын жинақтайтын және көрсететін жан-жақты талаптар модулін жасадым.

- Студенттердің біліктілік олқылықтарын жою үшін курстар мен жобалық оқытуды қамтитын оқытуды басқару жүйесі (LMS) модулін интеграцияладым.`,

    // JeoJeo
    jeojeo_subtitle: "Тікелей викторина қозғалтқышы",
    jeojeo_title: "JeoJeo",
    jeojeo_description: `- Нақты уақытта бәсекелестік ойындарға арналған хост-клиент архитектурасы бар жеке викторина платформасын жасадым.

- Дәстүрлі тіркеусіз ойыншылардың лезде қосылуына мүмкіндік беретін бөлме идентификаторлары жүйесін әзірледім.

- Хосттарға жауаптарды тексеруге және баллдарды нақты уақытта жаңартуға мүмкіндік беретін тікелей есептеу жүйесін іске асырдым.

- UI/UX дизайнынан нақты уақыттағы бэкенд инфрақұрылымын орналастыруға дейін барлық әзірлеу циклін басқардым.`,

    // Who is lying
    wholying_subtitle:
      "Өтірікшіні анықтауға арналған нақты уақыттағы ойын платформасы",
    wholying_title: "Who is lying?",
    wholying_description: `- Нақты уақытта күй синхронизациясы: барлық клиенттерде сұрақтарды синхронды жеткізуді және дауыс беру кезеңдерін қамтамасыз ету үшін Firebase Realtime Database пайдаландым.

- Жабдықпен интеграция: мобильді ойыншылар үшін бөлмеге кіру UX-ын жеңілдету мақсатында браузердің камера API арқылы QR-код сканерлеу жүйесін енгіздім.

- Асимметриялық ақпарат логикасы: топтың қалған мүшелері үшін бірыңғай интерфейсті сақтай отырып, бір ойыншыға ғана бірегей деректерді беретін «жасырын рөл» қозғалтқышын жасадым.

- Гибридтік дерекқор архитектурасы: сұрақтар банкін сақтау үшін MongoDB және жоғары жиіліктегі ойын өзара әрекеттестігі үшін Firebase интеграцияладым.`,

    // David Fincher
    fincher_subtitle: "Интерактивті кинорежиссер портфолиосы",
    fincher_title: "David Fincher Tribute",
    fincher_description: `- Дэвид Финчердің фильмографиясын скроллға негізделген анимациялар мен қимыл-қозғалыс өзара әрекеттестігі арқылы көрсететін визуалды бір беттік сайт жасадым.

- Динамикалық параллакс-позиционерлеумен, жұмсақ жеңілдету қисықтарымен және ресурс жүктелуімен синхрондалған жүктеу анимациясымен сүйреп апаруға арналған карусель жасадым.

- Редактор UX үлгілерінен шабыт алып, азайтылған контент алдын ала қарауда пайдаланушының скролл позициясын нақты уақытта көрсететін миникарта навигация жүйесін іске асырдым.

- Framer Motion көмегімен хореография, уақыт және қозғалыс дизайнына ерекше назар аудара отырып, плавты бет өтулері мен кезеңдік анимацияларды жасадым.`,
    read_more: "толығырақ",
    collapse: "жабу",
    prev: "артқа",
    next: "алға",
    contacts_label: "жаңа қиындықтарға әрдайым дайынмын",
    contacts_heading: "Бірге жасайық",
    contacts_subtext:
      "Күрделі мәселе, іске қосылатын өнім немесе командадағы олқылық па? Дәл осы жерде мен кіреді.",
    contacts_game_hint: "[ ойланып жатқанда — түрлі-түсті шаршыны жарыңыз ]",
    squares_popped: "Жарылған_Шаршылар",
    not_found_label: "қате 404",
    not_found_message: "Бұл бет жоқ — бірақ портфолионың қалған бөлігі бар.",
    not_found_back: "артқа қайту",
  },
};

export type Language = keyof typeof translations;
export type TranslationKeys = keyof (typeof translations)["en"];
