(function () {
	const cultures = [
		{
			title:  "Dwibahasa",
			desc:   "Kanada adalah negara dwibahasa secara resmi, dengan Bahasa Inggris dan Bahasa Prancis yang memiliki status serta hak yang setara. Kebijakan ini memastikan dokumen pemerintah diterbitkan dalam kedua bahasa dan layanan publik tersedia bagi semua warga negara",
			bg:     "asset/img/culture/sign_in_canada.jpg",
			color:  "#630000",
			link:   "culture/bilingual/bilingual.html"
		},
		{
			title:  "Maple Syrup",
			desc:   "Maple Syrup adalah sirop manis yang dibuat dari getah pohon mapel. Di daerah beriklim dingin, pohon-pohon ini menyimpan pati di dalam batang dan akarnya sebelum musim dingin tiba; pati tersebut kemudian diubah menjadi gula yang naik bersama getah pada akhir musim dingin dan awal musim semi. Pohon mapel disadap dengan cara mengebor lubang pada batangnya dan mengumpulkan getahnya, yang kemudian dipanaskan untuk menguapkan sebagian besar kandungan airnya, sehingga menyisakan sirop yang pekat.",
			bg:     "asset/img/culture/maple_background.jpg",
			color:  "#C8102E",
			link:   "culture/maple/Maple-Syrup.html"
		},
		{
			title:  "Ice Hockey",
			desc:   "Ice hockey adalah olahraga musim dingin nasional resmi yang berasal dari Kanada pada awal abad ke-19. Olahraga ini menggabungkan unsur permainan tongkat tradisional dari Eropa dan permainan suku asli Mi'kmaq, yang kemudian diformalkan dengan aturan modern pertama oleh mahasiswa Universitas McGill pada tahun 1875.",
			bg:     "asset/img/culture/ice_hockey.jpg",
			color:  "#005eff",
			link:   "culture/iceHockey/ice-hockey.html"
		},
		{
			title:  "Quebec Winter Carnival",
			desc:   "Karnaval musim dingin terbesar di dunia. Parade meriah, patung es raksasa, dan lomba kano di tengah Sungai St. Lawrence yang beku, merayakan keindahan musim dingin Kanada.",
			bg:     "asset/img/culture/winter_carnival.jpg",
			color:  "#4A90C4",
			link:   "culture/winter_carnival/winter-carnival-canada.html"
		},
		{
			title:  "Ice Canoe Racing",
			desc:   "Ice canoe racing (balap kano es) adalah olahraga ekstrem sekaligus tradisi musim dingin Kanada di mana peserta harus mendayung dan mendorong perahu kano melintasi perairan beku dan bongkahan es Sungai St. Lawrence. Olahraga warisan budaya ini menguji ketahanan fisik dan kekompakan tim dalam kondisi alam yang menantang.",
			bg:     "asset/img/culture/ice_canoe_racing.jpg",
			color:  "#4141d9",
			link:   "culture/ice_canoe/ice_canoe.html"
		}
	];

	const DIST_CLASS = [
		['opacity-100', 'scale-105', 'shadow-[0_16px_48px_rgba(0,0,0,0.5)]'],
		['opacity-65',  'scale-[0.98]'],
		['opacity-35',  'scale-[0.95]'],
	];
	const FAR_CLASS = ['opacity-[0.18]', 'scale-[0.92]'];

	let active   = 0;
	let activeBg = 1;

	const bg1      = document.getElementById('cultureBg1');
	const bg2      = document.getElementById('cultureBg2');
	const track    = document.getElementById('cardsTrack');
	const titleEl  = document.getElementById('cultureTitle');
	const descEl   = document.getElementById('cultureDesc');
	const dotsEl   = document.getElementById('cultureNavDots');
	const moreBtn  = document.getElementById('cultureMoreInfo');
	const cards    = [...track.querySelectorAll('.culture-card')];

	function setBg(url) {
		console.log(`[Ubah background ke: ${url}`);
		const next = activeBg === 1 ? bg2 : bg1;
		const prev = activeBg === 1 ? bg1 : bg2;
		next.style.backgroundImage = `url('${url}')`;
		next.style.opacity = '1';
		prev.style.opacity = '0';
		activeBg = activeBg === 1 ? 2 : 1;
	}

	function updateCards(idx) {
		console.log(`Geser track kartu ke indeks: ${idx}`);
		const CARD_W   = 176 + 16;
		const wrapperW = track.parentElement.offsetWidth;
		const offset   = (wrapperW / 2) - 88 - idx * CARD_W;
		track.style.transform = `translateX(${offset}px)`;

		cards.forEach((card, i) => {
			card.className = card.className
				.replace(/opacity-\S+/g, '')
				.replace(/scale-\S+/g, '')
				.replace(/shadow-\S+/g, '')
				.trim();

			const dist    = Math.abs(i - idx);
			const classes = dist < DIST_CLASS.length ? DIST_CLASS[dist] : FAR_CLASS;
			card.classList.add(...classes);
			console.log(`  -> Kartu indeks [${i}] ("${cultures[i]?.title || 'Unknown'}") ` + `memiliki jarak |${i} - ${idx}| = ${dist}. `
			);
			console.log(`     -> Kelas yang diterapkan: ${classes.join(', ')}`);
		});
	}

	function buildDots() {
		console.log("Buat dots navigasi ");
		cultures.forEach((_, i) => {
			const d = document.createElement('button');
			d.dataset.i = i;
			d.className = i === 0
				? 'w-5 h-1.5 rounded bg-[#C8102E] transition-all duration-300'
				: 'w-1.5 h-1.5 rounded-full bg-white/30 transition-all duration-300';
			d.setAttribute('aria-label', `Slide ${i + 1}`);
			d.addEventListener('click', () => goTo(i));
			dotsEl.appendChild(d);
		});
	}

	function updateDots(idx) {
		[...dotsEl.children].forEach((d, i) => {
			if (i === idx) {
				d.className = 'w-5 h-1.5 rounded bg-[#C8102E] transition-all duration-300';
			} else {
				d.className = 'w-1.5 h-1.5 rounded-full bg-white/30 transition-all duration-300';
			}
		});
	}

	function updateText(idx) {
		[titleEl, descEl].forEach(el => {
			el.classList.remove('text-enter');
			void el.offsetWidth;
			el.classList.add('text-enter');
		});
		titleEl.textContent = cultures[idx].title;
		descEl.textContent  = cultures[idx].desc;
	}

	function updateMoreInfo(idx) {
		const { color, link } = cultures[idx];
		moreBtn.href = link;
		moreBtn.style.backgroundColor = color;
		moreBtn.style.boxShadow = `0 0 18px ${color}55`;
	}

	function goTo(idx) {
		console.log(`[Culture] Navigasi ke slide indeks: ${idx} (${cultures[idx].title})`);
		if (idx === active) return;
		active = idx;
		setBg(cultures[idx].bg);
		updateCards(idx);
		updateDots(idx);
		updateText(idx);
		updateMoreInfo(idx);
	}

	cards.forEach(card => {
		card.addEventListener('click', () => goTo(+card.dataset.index));
	});
	document.getElementById('culturePrev').addEventListener('click', () =>
		goTo((active - 1 + cultures.length) % cultures.length));
	document.getElementById('cultureNext').addEventListener('click', () =>
		goTo((active + 1) % cultures.length));

	console.log("[Culture] Menginisialisasi komponen Culture Carousel...");
	bg1.style.opacity = '1';
	bg1.style.backgroundImage = `url('${cultures[0].bg}')`;
	buildDots();
	updateMoreInfo(0);
	setTimeout(() => updateCards(0), 50);
})();

(function() {
	console.log("[Observer] Menginisialisasi IntersectionObserver untuk efek reveal...");
	const revealEls = document.querySelectorAll('.reveal');
	const observer = new IntersectionObserver(
		(entries) => {
			entries.forEach(entry => {
				if (entry.isIntersecting) {
					console.log(`[Observer] Elemen terdeteksi masuk viewport:`, entry.target);
					entry.target.classList.add('visible');
					observer.unobserve(entry.target);
				}
			});
		},
		{ threshold: 0.15 }
	);
	revealEls.forEach(el => observer.observe(el));
})();

// quiz
(function () {
	const QUESTIONS = {
		general: [
			{ q: "Apa ibukota Kanada?", opts: ["Toronto", "Vancouver", "Ottawa", "Montreal"], ans: 2 },
			{ q: "Kanada adalah negara terbesar ke berapa di dunia berdasarkan luas wilayah?", opts: ["Pertama", "Kedua", "Ketiga", "Keempat"], ans: 1 },
			{ q: "Berapa jumlah provinsi resmi yang dimiliki Kanada?", opts: ["8", "10", "12", "13"], ans: 1 },
			{ q: "Apa semboyan resmi Kanada yang tertera di lambang negaranya?", opts: ["In God We Trust", "A Mari Usque Ad Mare", "Ever Forward", "Unity in Diversity"], ans: 1 },
			{ q: "Mata uang resmi Kanada adalah?", opts: ["Dollar Amerika", "Pound Sterling", "Dollar Kanada", "Euro"], ans: 2 },
		],
		hockey: [
			{ q: "Ice hockey pertama kali diformalkan aturannya di universitas mana?", opts: ["University of Toronto", "McGill University", "Queen's University", "Dalhousie University"], ans: 1 },
			{ q: "Pada tahun berapa aturan modern ice hockey pertama kali dibuat?", opts: ["1860", "1875", "1890", "1902"], ans: 1 },
			{ q: "Trofi bergengsi yang diperebutkan di NHL bernama?", opts: ["Stanley Cup", "Grey Cup", "Memorial Cup", "Olympic Shield"], ans: 0 },
			{ q: "Ice hockey adalah olahraga musim dingin nasional resmi Kanada sejak tahun berapa?", opts: ["1945", "1994", "1967", "2002"], ans: 1 },
			{ q: "Unsur permainan suku asli manakah yang turut membentuk ice hockey?", opts: ["Ojibwe", "Mi'kmaq", "Inuit", "Cree"], ans: 1 },
		],
		maple: [
			{ q: "Berapa persen produksi maple syrup dunia berasal dari Kanada?", opts: ["Lebih dari 50%", "Lebih dari 70%", "Lebih dari 90%", "Sekitar 40%"], ans: 1 },
			{ q: "Provinsi mana yang menjadi penghasil maple syrup terbesar di Kanada?", opts: ["Ontario", "British Columbia", "Quebec", "Nova Scotia"], ans: 2 },
			{ q: "Musim panen maple syrup umumnya berlangsung pada bulan?", opts: ["Juni–Juli", "September–Oktober", "Desember–Januari", "Februari–April"], ans: 3 },
			{ q: "Berapa liter getah pohon maple yang dibutuhkan untuk menghasilkan 1 liter maple syrup?", opts: ["10 liter", "20 liter", "40 liter", "60 liter"], ans: 2 },
			{ q: "Maple syrup grade 'Amber' umumnya memiliki rasa yang bagaimana?", opts: ["Sangat ringan", "Kaya dan gurih sedang", "Sangat kuat dan gelap", "Pahit"], ans: 1 },
		],
		carnival: [
			{ q: "Quebec Winter Carnival diakui sebagai karnaval musim dingin terbesar ke berapa di dunia?", opts: ["Kedua", "Pertama", "Ketiga", "Keempat"], ans: 1 },
			{ q: "Maskot ikonik Quebec Winter Carnival bernama?", opts: ["Bonhomme Neige", "Jack Frost", "Frosty", "Le Blanc"], ans: 0 },
			{ q: "Salah satu tradisi unik di karnaval ini adalah lomba kano di sungai mana?", opts: ["Sungai Ottawa", "Sungai Yukon", "Sungai St. Lawrence", "Sungai Fraser"], ans: 2 },
			{ q: "Karnaval musim dingin Quebec pertama kali diadakan pada tahun berapa?", opts: ["1894", "1920", "1955", "1979"], ans: 0 },
			{ q: "Istilah 'bonhomme' dalam bahasa Prancis berarti?", opts: ["Pria salju", "Orang baik", "Pria pemberani", "Orang besar"], ans: 1 },
		],
		canoe: [
			{ q: "Ice canoe racing terutama diadakan di kota mana di Kanada?", opts: ["Montreal", "Quebec City", "Toronto", "Vancouver"], ans: 1 },
			{ q: "Olahraga ini menguji ketahanan fisik dan kekompakan tim dalam kondisi apa?", opts: ["Cuaca panas", "Cuaca hujan", "Cuaca berangin", "Cuaca dingin dengan es"], ans: 3 },
			{ q: "Perahu kano yang digunakan dalam ice canoe racing biasanya terbuat dari bahan apa?", opts: ["Kayu tradisional", "Fiberglass modern", "Aluminium ringan", "Plastik tahan dingin"], ans: 0 },
			{ q: "Ice canoe racing adalah bagian dari perayaan apa di Quebec?", opts: ["Festival Musim Panas", "Karnaval Musim Dingin Quebec", "Hari Nasional Kanada", "Festival Air"], ans: 1 },
			{ q: "Olahraga ini merupakan warisan budaya dari kelompok masyarakat mana?", opts: ["Suku asli Mi'kmaq", "Suku asli Cree", "Suku asli Ojibwe", "Suku asli Inuit"], ans: 0 },
		],
	};

	const RESULTS = [
		{ min: 0, max: 1, msg: "Jangan menyerah!" },
		{ min: 2, max: 3, msg: "Lumayan!" },
		{ min: 4, max: 4, msg: "Hampir sempurna! Sedikit lagi!" },
		{ min: 5, max: 5, msg: "Luar biasa! Kamu benar-benar ahli." },
	];

	let currentQ = 0, score = 0, questions = [], playerName = "";

	const form       = document.getElementById('quizForm');
	const card       = document.getElementById('quizCard');
	const resultCard = document.getElementById('quizResult');
	const startBtn   = document.getElementById('startQuizBtn');
	const retryBtn   = document.getElementById('quizRetryBtn');
	const countEl    = document.getElementById('quizCount');
	const questionEl = document.getElementById('quizQuestion');
	const optionsEl  = document.getElementById('quizOptions');

	// shuffle array 
	function shuffle(arr) {
		return [...arr].sort(() => Math.random() - 0.5);
	}

	function startQuiz() {
        const nameInput = document.getElementById('playerName').value.trim();
        const topic     = document.getElementById('topicSelect').value;
        playerName = nameInput || "Kamu";
        questions  = shuffle(QUESTIONS[topic]).slice(0, 5);
        currentQ   = 0;
        score      = 0;

		console.log(`[Quiz] Memulai kuis. Pemain: ${playerName}, Topik: ${topic}`);
        console.log(`[Quiz] Pertanyaan yang diacak untuk sesi ini:`, questions);

        document.getElementById('quizForm').style.display   = 'none';
        document.getElementById('quizResult').style.display = 'none';
        document.getElementById('quizCard').style.display   = 'block';
        renderQuestion();
    }

	function renderQuestion() {
		const q = questions[currentQ];
		console.log(`[Quiz] Menampilkan Pertanyaan ${currentQ + 1}: "${q.q}"`);
		countEl.textContent    = `Pertanyaan ${currentQ + 1} / 5`;
		questionEl.textContent = q.q;

		optionsEl.innerHTML = '';
		q.opts.forEach((opt, i) => {
			const btn = document.createElement('button');
			btn.className    = 'quiz-option-btn';
			btn.textContent  = opt;
			btn.addEventListener('click', () => selectAnswer(i, q.ans, btn));
			optionsEl.appendChild(btn);
		});
	}

	function selectAnswer(chosen, correct, chosenBtn) {
        const allBtns = optionsEl.querySelectorAll('.quiz-option-btn');
        allBtns.forEach(b => { b.disabled = true; });

        if (chosen === correct) {
			// tandai jawaban kalau benar
            chosenBtn.style.background    = 'rgba(34,197,94,0.12)';
            chosenBtn.style.borderColor   = 'rgba(34,197,94,0.45)';
            chosenBtn.style.color         = '#86efac';
            score++;
			console.log(`[Quiz] Jawaban dipilih: indeks ${chosen} ("${questions[currentQ].opts[chosen]}"). Benar? ${correct}`);
        } else {
            // tandai jawaban kalau salah 
            chosenBtn.style.background    = 'rgba(200,16,46,0.10)';
            chosenBtn.style.borderColor   = 'rgba(200,16,46,0.40)';
            chosenBtn.style.color         = 'rgba(255,100,100,0.85)';

			// tandai jawaban yang benar
            allBtns[correct].style.background  = 'rgba(34,197,94,0.12)';
            allBtns[correct].style.borderColor = 'rgba(34,197,94,0.45)';
            allBtns[correct].style.color       = '#86efac';

			console.log(`[Quiz] Jawaban benar indeks ${correct} ("${questions[currentQ].opts[correct]}")`);
        }

        setTimeout(() => {
            currentQ++;
            if (currentQ < 5) renderQuestion();
            else showResult();
        }, 1000);
    }

    function showResult() {
        document.getElementById('quizCard').style.display   = 'none';
        const res = document.getElementById('quizResult');
        res.style.display = 'flex'; 

        const r = RESULTS.find(r => score >= r.min && score <= r.max);
        document.getElementById('quizResultName').textContent  = playerName.toUpperCase();
        document.getElementById('quizResultScore').textContent = `${score} / 5`;
        document.getElementById('quizResultMsg').textContent   = r.msg;
    }

	startBtn.addEventListener('click', startQuiz);
	retryBtn.addEventListener('click', () => {
        document.getElementById('quizResult').style.display = 'none';
        document.getElementById('quizForm').style.display   = 'flex';
    });
})();