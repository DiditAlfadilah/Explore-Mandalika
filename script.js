        const spotDetails = {
            merica: {
                title: "Pasir Berunuk (Merica)",
                badge: "Daya Tarik Unik",
                image: "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=800&q=80",
                description: "Pantai Kuta Mandalika terkenal secara global karena tekstur pasirnya yang tidak biasa. Pasirnya berukuran besar membulat berwarna krem seperti biji merica (berunuk dalam bahasa lokal). Berjalan tanpa alas kaki di atas pasir ini memberikan efek terapi refleksi alami pada telapak kaki Anda."
            },
            merese: {
                title: "Bukit Merese & Sunset View",
                badge: "Panorama Alam",
                image: "https://images.unsplash.com/photo-1506929562872-bb421503ef21?auto=format&fit=crop&w=800&q=80",
                description: "Terletak hanya beberapa menit dari garis pantai utama, Bukit Merese menawarkan pemandangan 360 derajat samudra Samudra Hindia. Dari puncak bukit karpet hijau ini, pengunjung dapat menyaksikan panorama sunset emas yang memukau dan gradasi warna air laut pantai Mandalika."
            },
            surf: {
                title: "Surfing & Olahraga Air",
                badge: "Aktivitas Seru",
                image: "https://images.unsplash.com/photo-1502680390469-be75c86b636f?auto=format&fit=crop&w=800&q=80",
                description: "Dengan karakter gelombang ombak yang konsisten dan jernih, Kuta Mandalika menjadi destinasi favorit peselancar internasional. Tersedia banyak tempat penyewaan papan selancar serta instruktur lokal bagi pemula yang ingin belajar menaklukkan ombak laut selatan."
            },
            nyale: {
                title: "Tradisi Festival Bau Nyale",
                badge: "Warisan Budaya",
                image: "https://images.unsplash.com/photo-1544551763-46a013bb70d5?auto=format&fit=crop&w=800&q=80",
                description: "Setiap tahun (sekitar bulan Februari-Maret), ribuan masyarakat dan wisatawan berkumpul di pesisir pantai untuk menangkap 'Nyale' (cacing laut warna-warni). Tradisi ini berasal dari legenda sakral Putri Mandalika yang mengorbankan dirinya demi menjaga kedamaian pulau Lombok."
            }
        };

        function openModal(key) {
            const detail = spotDetails[key];
            if (!detail) return;

            document.getElementById('modalTitle').innerText = detail.title;
            document.getElementById('modalBadge').innerText = detail.badge;
            document.getElementById('modalImage').src = detail.image;
            document.getElementById('modalDescription').innerText = detail.description;

            const modal = document.getElementById('infoModal');
            modal.classList.remove('opacity-0', 'pointer-events-none');
            modal.querySelector('.modal-content').classList.remove('scale-95');
            modal.querySelector('.modal-content').classList.add('scale-100');
        }

        function closeModal() {
            const modal = document.getElementById('infoModal');
            modal.classList.add('opacity-0', 'pointer-events-none');
            modal.querySelector('.modal-content').classList.remove('scale-100');
            modal.querySelector('.modal-content').classList.add('scale-95');
        }

        // Close modal when clicking outside box
        window.addEventListener('click', function(e) {
            const modal = document.getElementById('infoModal');
            if (e.target === modal) {
                closeModal();
            }
        });


        /* ---------------------------------------------------------
           2. IMAGE SLIDER / CAROUSEL LOGIC
           --------------------------------------------------------- */
        const slides = [
            {
                img: "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=1000&q=80",
                title: "Garis Pantai Kuta Mandalika",
                desc: "Pemandangan gradasi laut biru dan pasir putih yang membentang luas."
            },
            {
                img: "https://images.unsplash.com/photo-1506929562872-bb421503ef21?auto=format&fit=crop&w=1000&q=80",
                title: "Perbukitan Eksotis Merese",
                desc: "Spot terbaik menikmati panorama perbukitan dan hamparan Samudra Hindia."
            },
            {
                img: "https://images.unsplash.com/photo-1510414842594-a61c69b5ae57?auto=format&fit=crop&w=1000&q=80",
                title: "Keberagaman Terumbu Karang",
                desc: "Kelebihan air laut yang jernih dan ekosistem laut yang terjaga."
            },
            {
                img: "https://images.unsplash.com/photo-1540555700478-4be289fbecef?auto=format&fit=crop&w=1000&q=80",
                title: "Suasana Senja di Mandalika",
                desc: "Kehangatan warna langit sore saat matahari terbenam di pesisir selatan."
            }
        ];

        let currentSlideIndex = 0;

        function updateSlideUI() {
            const slide = slides[currentSlideIndex];
            const slideImg = document.getElementById('currentSlideImg');
            
            // Fade effect
            slideImg.style.opacity = 0.3;
            setTimeout(() => {
                slideImg.src = slide.img;
                document.getElementById('slideTitle').innerText = slide.title;
                document.getElementById('slideDesc').innerText = slide.desc;
                document.getElementById('slideCounter').innerText = `${currentSlideIndex + 1} / ${slides.length}`;
                slideImg.style.opacity = 1;
            }, 200);

            // Update dot indicator
            const dots = document.querySelectorAll('#thumbnailDots button');
            dots.forEach((dot, idx) => {
                if (idx === currentSlideIndex) {
                    dot.className = "w-8 h-3 rounded-full bg-amber-400 transition-all";
                } else {
                    dot.className = "w-3 h-3 rounded-full bg-slate-600 transition-all";
                }
            });
        }

        function nextSlide() {
            currentSlideIndex = (currentSlideIndex + 1) % slides.length;
            updateSlideUI();
        }

        function prevSlide() {
            currentSlideIndex = (currentSlideIndex - 1 + slides.length) % slides.length;
            updateSlideUI();
        }

        function goToSlide(index) {
            currentSlideIndex = index;
            updateSlideUI();
        }

        // Auto slide interval (every 5 seconds)
        setInterval(() => {
            nextSlide();
        }, 5000);


        /* ---------------------------------------------------------
           3. WEB AUDIO API SYNTHESIZER (BACKSOUND OCEAN AMBIENCE)
           --------------------------------------------------------- */
        let audioCtx = null;
        let isPlayingAudio = false;
        let noiseNode = null;
        let gainNode = null;

        function initAudioSynthesizer() {
            // Web Audio API Synthesizer generating relaxing ocean wave sound
            const AudioContext = window.AudioContext || window.webkitAudioContext;
            audioCtx = new AudioContext();

            // Create Pink/White Noise Buffer for Ocean Waves
            const bufferSize = audioCtx.sampleRate * 3;
            const noiseBuffer = audioCtx.createBuffer(1, bufferSize, audioCtx.sampleRate);
            const output = noiseBuffer.getChannelData(0);

            let b0 = 0, b1 = 0, b2 = 0, b3 = 0, b4 = 0, b5 = 0, b6 = 0;
            for (let i = 0; i < bufferSize; i++) {
                const white = Math.random() * 2 - 1;
                b0 = 0.99886 * b0 + white * 0.0555179;
                b1 = 0.99332 * b1 + white * 0.0750759;
                b2 = 0.96900 * b2 + white * 0.1538520;
                b3 = 0.86650 * b3 + white * 0.3104856;
                b4 = 0.55000 * b4 + white * 0.5329522;
                b5 = -0.7616 * b5 - white * 0.0168980;
                output[i] = b0 + b1 + b2 + b3 + b4 + b5 + b6 + white * 0.5362;
                output[i] *= 0.11; // Volume attenuation
                b6 = white * 0.115926;
            }

            noiseNode = audioCtx.createBufferSource();
            noiseNode.buffer = noiseBuffer;
            noiseNode.loop = true;

            // Lowpass Filter for soft wave sound
            const filter = audioCtx.createBiquadFilter();
            filter.type = 'lowpass';
            filter.frequency.setValueAtTime(400, audioCtx.currentTime);

            // Gain node for fade in/out
            gainNode = audioCtx.createGain();
            gainNode.gain.setValueAtTime(0.05, audioCtx.currentTime);

            noiseNode.connect(filter);
            filter.connect(gainNode);
            gainNode.connect(audioCtx.destination);
            noiseNode.start();
        }

        function toggleAudio() {
            const btn = document.getElementById('audioToggleBtn');
            const icon = document.getElementById('audioIcon');
            const text = document.getElementById('audioText');
            const visualizer = document.getElementById('audioVisualizer');

            if (!isPlayingAudio) {
                if (!audioCtx) {
                    initAudioSynthesizer();
                } else if (audioCtx.state === 'suspended') {
                    audioCtx.resume();
                }
                isPlayingAudio = true;
                icon.className = "fa-solid fa-volume-high text-lg text-amber-400";
                text.innerText = "Audio Nyala";
                visualizer.classList.add('playing');
                btn.classList.add('border-amber-400');
            } else {
                if (audioCtx) {
                    audioCtx.suspend();
                }
                isPlayingAudio = false;
                icon.className = "fa-solid fa-volume-xmark text-lg";
                text.innerText = "Backsound";
                visualizer.classList.remove('playing');
                btn.classList.remove('border-amber-400');
            }
        }


        /* ---------------------------------------------------------
           4. MOBILE MENU & NAVBAR SCROLL BEHAVIOR
           --------------------------------------------------------- */
        function toggleMobileMenu() {
            const menu = document.getElementById('mobileMenu');
            menu.classList.toggle('hidden');
        }

        window.addEventListener('scroll', function() {
            const nav = document.getElementById('navbar');
            if (window.scrollY > 50) {
                nav.classList.add('shadow-xl', 'bg-slate-950/95');
            } else {
                nav.classList.remove('shadow-xl', 'bg-slate-950/95');
            }
        });