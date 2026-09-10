/* =========================================================
   DAFIGO AKBAR RAHMATULLAH — Portfolio interactions
   ========================================================= */

/* ---------- Preloader ---------- */
(function preloader() {
    const pre = document.getElementById('preloader');
    const fill = document.getElementById('preloader-fill');
    const pct = document.getElementById('preloader-pct');
    if (!pre) return;
    document.body.classList.add('is-loading');
    let p = 0;
    function tick() {
        p += Math.random() * 16 + 8;
        if (p >= 100) p = 100;
        if (fill) fill.style.width = p + '%';
        if (pct) pct.textContent = 'INITIALIZING… ' + String(Math.floor(p)).padStart(2, '0') + '%';
        if (p < 100) {
            setTimeout(tick, 80 + Math.random() * 90);
        } else {
            setTimeout(() => {
                pre.classList.add('loaded');
                document.body.classList.remove('is-loading');
            }, 220);
        }
    }
    setTimeout(tick, 150);
})();

document.addEventListener('DOMContentLoaded', () => {

    const isFinePointer = window.matchMedia('(pointer:fine)').matches;
    const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const wantsMotion = isFinePointer && !reducedMotion;

    /* ---------- Custom cursor ---------- */
    if (wantsMotion) {
        document.body.classList.add('cursor-ready');
        const cursorDot = document.getElementById('cursor-dot');
        const cursorOutline = document.getElementById('cursor-outline');
        let mouseX = 0, mouseY = 0, outlineX = 0, outlineY = 0;
        window.addEventListener('mousemove', (e) => {
            mouseX = e.clientX; mouseY = e.clientY;
            if (cursorDot) { cursorDot.style.left = mouseX + 'px'; cursorDot.style.top = mouseY + 'px'; }
        });
        (function animateOutline() {
            outlineX += (mouseX - outlineX) * 0.18;
            outlineY += (mouseY - outlineY) * 0.18;
            if (cursorOutline) { cursorOutline.style.left = outlineX + 'px'; cursorOutline.style.top = outlineY + 'px'; }
            requestAnimationFrame(animateOutline);
        })();
        const hoverSelector = 'a, button, .tool-card, .proj-card, .cert-card, .filter-tab, input, textarea';
        document.addEventListener('mouseover', (e) => {
            if (e.target.closest(hoverSelector)) document.body.classList.add('cursor-hover');
        });
        document.addEventListener('mouseout', (e) => {
            if (e.target.closest(hoverSelector)) document.body.classList.remove('cursor-hover');
        });
    }

    /* ---------- Magnetic buttons ---------- */
    if (wantsMotion) {
        document.querySelectorAll('.magnetic').forEach((btn) => {
            btn.addEventListener('mousemove', (e) => {
                const rect = btn.getBoundingClientRect();
                const relX = e.clientX - rect.left - rect.width / 2;
                const relY = e.clientY - rect.top - rect.height / 2;
                btn.style.transform = `translate(${relX * 0.3}px, ${relY * 0.4}px)`;
            });
            btn.addEventListener('mouseleave', () => { btn.style.transform = 'translate(0,0)'; });
        });
    }

    /* ---------- 3D tilt on cards ---------- */
    function applyTilt(el) {
        if (!wantsMotion) return;
        el.addEventListener('mousemove', (e) => {
            const rect = el.getBoundingClientRect();
            const x = (e.clientX - rect.left) / rect.width - 0.5;
            const y = (e.clientY - rect.top) / rect.height - 0.5;
            const rotateX = (-y * 10).toFixed(2);
            const rotateY = (x * 12).toFixed(2);
            el.style.transform = `perspective(700px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale3d(1.02,1.02,1.02)`;
        });
        el.addEventListener('mouseleave', () => {
            el.style.transform = 'perspective(700px) rotateX(0) rotateY(0) scale3d(1,1,1)';
        });
    }
    document.querySelectorAll('.tilt').forEach(applyTilt);

    /* ---------- Hero parallax (grid backdrop follows the mouse) ---------- */
    if (wantsMotion) {
        const heroSection = document.getElementById('home');
        const gridBackdrop = document.getElementById('grid-backdrop');
        if (heroSection && gridBackdrop) {
            heroSection.addEventListener('mousemove', (e) => {
                const rect = heroSection.getBoundingClientRect();
                const x = (e.clientX - rect.left) / rect.width - 0.5;
                const y = (e.clientY - rect.top) / rect.height - 0.5;
                gridBackdrop.style.transform = `translate(${x * -18}px, ${y * -18}px)`;
            });
            heroSection.addEventListener('mouseleave', () => { gridBackdrop.style.transform = 'translate(0,0)'; });
        }
    }

    /* ---------- Mobile nav ---------- */
    const menuIcon = document.getElementById('menu-icon');
    const navbar = document.getElementById('navbar');
    menuIcon.addEventListener('click', () => {
        navbar.classList.toggle('active');
        menuIcon.classList.toggle('bx-menu');
        menuIcon.classList.toggle('bx-x');
    });
    navbar.querySelectorAll('a').forEach(link => {
        link.addEventListener('click', () => navbar.classList.remove('active'));
    });

    /* ---------- Active nav link on scroll ---------- */
    const sections = document.querySelectorAll('section[id]');
    const navLinks = document.querySelectorAll('.navbar a');
    const setActiveLink = () => {
        let current = sections[0]?.id;
        const offset = window.scrollY + 140;
        sections.forEach(sec => {
            if (offset >= sec.offsetTop) current = sec.id;
        });
        navLinks.forEach(link => {
            link.classList.toggle('active', link.getAttribute('href') === `#${current}`);
        });
    };
    window.addEventListener('scroll', setActiveLink);
    setActiveLink();

    /* ---------- Scroll reveal ---------- */
    const revealEls = document.querySelectorAll('.reveal');
    const revealObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('in');
                revealObserver.unobserve(entry.target);
            }
        });
    }, { threshold: 0.15 });
    revealEls.forEach(el => revealObserver.observe(el));

    /* ---------- Role text rotator ---------- */
    const roles = [
        'Industrial Automation Systems',
        'PLC & Ladder Logic Control',
        'IoT-Connected Devices',
        'Autonomous Robots',
        'SCADA Monitoring Systems'
    ];
    const roleEl = document.getElementById('role-text');
    let roleIndex = 0, charIndex = roles[0].length, deleting = true;

    function typeRole() {
        const word = roles[roleIndex];
        if (deleting) {
            charIndex--;
            roleEl.textContent = word.substring(0, charIndex);
            if (charIndex <= 0) {
                deleting = false;
                roleIndex = (roleIndex + 1) % roles.length;
                setTimeout(typeRole, 400);
                return;
            }
            setTimeout(typeRole, 35);
        } else {
            charIndex++;
            const nextWord = roles[roleIndex];
            roleEl.textContent = nextWord.substring(0, charIndex);
            if (charIndex >= nextWord.length) {
                deleting = true;
                setTimeout(typeRole, 1800);
                return;
            }
            setTimeout(typeRole, 55);
        }
    }
    setTimeout(typeRole, 1200);

    /* ---------- Skill bars + gauges animate on view ---------- */
    const skillBars = document.getElementById('skill-bars');
    if (skillBars) {
        const barObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.querySelectorAll('.skill-row').forEach(row => {
                        const val = row.dataset.value;
                        row.querySelector('.fill').style.width = val + '%';
                    });
                    barObserver.unobserve(entry.target);
                }
            });
        }, { threshold: 0.3 });
        barObserver.observe(skillBars);
    }

    const gaugeGrid = document.getElementById('gauge-grid');
    if (gaugeGrid) {
        const CIRC = 157; // approximate path length for the gauge arc
        const gaugeObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.querySelectorAll('.gauge-card').forEach(card => {
                        const val = parseFloat(card.dataset.value);
                        const offset = CIRC - (CIRC * val) / 100;
                        const needleAngle = -90 + (180 * val) / 100;
                        card.querySelector('.gauge-fill').style.strokeDashoffset = offset;
                        card.querySelector('.gauge-needle').style.transform = `rotate(${needleAngle}deg)`;
                    });
                    gaugeObserver.unobserve(entry.target);
                }
            });
        }, { threshold: 0.3 });
        gaugeObserver.observe(gaugeGrid);
    }

    /* =====================================================
       Certificates — data, render, and popup modal
       Add real scans by dropping a file at the given `img`
       path into assets/img/ — the placeholder is replaced
       automatically once the file exists.
       ===================================================== */
    const CERTS = [
        {
            title: 'Ahli Keselamatan dan Kesehatan Kerja (K3)',
            issuer: 'Occupational Health & Safety',
            year: '2026',
            img: 'assets/img/cert-ohs.jpg',
            desc: 'Proficient in OHS practices: hazard identification, risk assessment and control, safe work procedures, PPE, workplace safety inspections and incident prevention.'
        },
        {
            title: 'HTTP and MQTT Protocols',
            issuer: 'IoT Communication Protocols Course',
            year: '2025',
            img: 'assets/img/cert-http-mqtt.jpg',
            desc: 'Fundamentals of HTTP and MQTT communication, message exchange, and their practical application in IoT systems.'
        },
        {
            title: 'MQTT Protocol Implementation on ESP32',
            issuer: 'Applied IoT Course',
            year: '2025',
            img: 'assets/img/cert-mqtt-esp32.jpg',
            desc: 'Hands-on configuration of MQTT communication on ESP32: broker connection, publish/subscribe, and real-time IoT data exchange.'
        },
        {
            title: 'Cloud Practitioner Essentials',
            issuer: 'AWS Cloud Basics',
            year: '2023',
            img: 'assets/img/cert-aws.jpg',
            desc: 'Core cloud computing concepts on AWS, from foundational services to designing good architecture.'
        },
        {
            title: 'Programming With C',
            issuer: 'Industry-Standard C Fundamentals',
            year: '2024',
            img: 'assets/img/cert-c.jpg',
            desc: 'C language programming fundamentals following industry-standard practices.'
        },
        {
            title: 'POVVAF Volleyball Competition — 2nd Place',
            issuer: 'Vocational School Level Competition',
            year: '2023',
            img: 'assets/img/cert-volleyball.jpg',
            desc: 'Second place finish representing the department at the POVVAF vocational-school volleyball competition.'
        },
        {
            title: 'TGES — Security Coordinator',
            issuer: 'KMTEDI Interests & Talents Division',
            year: '2024',
            img: 'assets/img/cert-tges.jpg',
            desc: 'Coordinated venue security for TGES, an annual sports & arts week preparing students for the POVVAF competition.'
        }
    ];

    /* ---------- Internship certificates (also shown inline in Experience) ---------- */
    const internshipCert = {
        title: 'Internship Completion Certificate', // TODO: replace with the exact title printed on your certificate
        issuer: 'PT. Citra Langgeng Sentosa', // TODO: confirm issuer name
        year: '2026', // TODO: confirm the year on the certificate
        img: 'assets/img/cert-clsentosa.jpg', // TODO: put your scanned/exported certificate file here
        desc: 'Completed the Innovation and Deployment Engineer internship covering AGV control and electrical system design, PLC/Roboteq programming, and commissioning.' // TODO: replace with your own description
    };
    const plnCert = {
        title: 'Internship Completion Certificate', // TODO: replace with the exact title printed on your certificate
        issuer: 'PT. PLN Persero UP2D Jateng & DIY', // TODO: confirm issuer name
        year: '2024', // TODO: confirm the year on the certificate
        img: 'assets/img/cert-pln.jpg', // TODO: put your scanned/exported certificate file here
        desc: 'Completed the Planning Engineer internship, developing a real-time SCADA + ArcGIS monitoring system for medium-voltage electrical networks.' // TODO: replace with your own description
    };

    /* All certs combined into one browsable list, so prev/next in the modal
       can cycle through every certificate — grid ones and internship ones alike. */
    const ALL_CERTS = [...CERTS, internshipCert, plnCert];

    const certGrid = document.getElementById('cert-grid');
    CERTS.forEach((cert, i) => {
        const card = document.createElement('button');
        card.className = 'cert-card tilt reveal';
        card.innerHTML = `
            <div class="cert-top">
                <i class='bx bx-certification'></i>
                <span class="year">${cert.year}</span>
            </div>
            <h4>${cert.title}</h4>
            <span class="view"><i class='bx bx-show'></i> View certificate</span>
        `;
        card.addEventListener('click', () => openCertModal(i));
        certGrid.appendChild(card);
        revealObserver.observe(card);
        if (typeof applyTilt === 'function') applyTilt(card);
    });

    const modal = document.getElementById('cert-modal');
    const modalImg = document.getElementById('modal-img');
    const modalPlaceholder = document.getElementById('modal-placeholder');
    const modalPlaceholderText = document.getElementById('modal-placeholder-text');
    const modalTitle = document.getElementById('modal-title');
    const modalIssuer = document.getElementById('modal-issuer');
    const modalDesc = document.getElementById('modal-desc');
    const modalCounter = document.getElementById('modal-counter');
    const modalPrevBtn = document.getElementById('modal-prev');
    const modalNextBtn = document.getElementById('modal-next');

    let currentCertIndex = 0;

    function openCertModal(index) {
        currentCertIndex = ((index % ALL_CERTS.length) + ALL_CERTS.length) % ALL_CERTS.length;
        const cert = ALL_CERTS[currentCertIndex];
        modalTitle.textContent = cert.title;
        modalIssuer.textContent = cert.issuer + ' · ' + cert.year;
        modalDesc.textContent = cert.desc;
        modalPlaceholder.style.display = 'none';
        modalImg.style.display = 'block';
        modalPlaceholderText.textContent = `Add file: ${cert.img}`;
        modalImg.src = cert.img;
        modalImg.alt = cert.title;
        if (modalCounter) modalCounter.textContent = `${currentCertIndex + 1} / ${ALL_CERTS.length}`;
        modal.classList.add('active');
        document.body.style.overflow = 'hidden';
    }
    function closeCertModal() {
        modal.classList.remove('active');
        document.body.style.overflow = '';
    }
    document.getElementById('modal-close').addEventListener('click', closeCertModal);
    if (modalPrevBtn) modalPrevBtn.addEventListener('click', () => openCertModal(currentCertIndex - 1));
    if (modalNextBtn) modalNextBtn.addEventListener('click', () => openCertModal(currentCertIndex + 1));

    const certClsentosaBtn = document.getElementById('cert-clsentosa-btn');
    if (certClsentosaBtn) {
        certClsentosaBtn.addEventListener('click', () => openCertModal(ALL_CERTS.indexOf(internshipCert)));
    }
    const certPlnBtn = document.getElementById('cert-pln-btn');
    if (certPlnBtn) {
        certPlnBtn.addEventListener('click', () => openCertModal(ALL_CERTS.indexOf(plnCert)));
    }

    modal.addEventListener('click', (e) => { if (e.target === modal) closeCertModal(); });
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape') closeCertModal();
        if (!modal.classList.contains('active')) return;
        if (e.key === 'ArrowLeft') openCertModal(currentCertIndex - 1);
        if (e.key === 'ArrowRight') openCertModal(currentCertIndex + 1);
    });

    /* =====================================================
       Category filters — Projects & Tools
       ===================================================== */
    function setupFilter(tabsId, itemsSelector) {
        const tabs = document.getElementById(tabsId);
        if (!tabs) return;
        tabs.addEventListener('click', (e) => {
            const btn = e.target.closest('.filter-tab');
            if (!btn) return;
            tabs.querySelectorAll('.filter-tab').forEach(t => t.classList.remove('active'));
            btn.classList.add('active');
            const filter = btn.dataset.filter;
            document.querySelectorAll(itemsSelector).forEach(item => {
                const match = filter === 'all' || item.dataset.category === filter;
                item.classList.toggle('filtered-out', !match);
            });
        });
    }
    setupFilter('proj-filter-tabs', '.proj-card');
    setupFilter('tool-filter-tabs', '.tool-card');

});
