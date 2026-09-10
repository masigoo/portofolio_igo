/* =========================================================
   DAFIGO AKBAR RAHMATULLAH — Portfolio interactions
   ========================================================= */

document.addEventListener('DOMContentLoaded', () => {

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

    const certGrid = document.getElementById('cert-grid');
    CERTS.forEach((cert, i) => {
        const card = document.createElement('button');
        card.className = 'cert-card reveal';
        card.innerHTML = `
            <div class="cert-top">
                <i class='bx bx-certification'></i>
                <span class="year">${cert.year}</span>
            </div>
            <h4>${cert.title}</h4>
            <span class="view"><i class='bx bx-show'></i> View certificate</span>
        `;
        card.addEventListener('click', () => openCertModal(cert));
        certGrid.appendChild(card);
        revealObserver.observe(card);
    });

    const modal = document.getElementById('cert-modal');
    const modalImg = document.getElementById('modal-img');
    const modalPlaceholder = document.getElementById('modal-placeholder');
    const modalPlaceholderText = document.getElementById('modal-placeholder-text');
    const modalTitle = document.getElementById('modal-title');
    const modalIssuer = document.getElementById('modal-issuer');
    const modalDesc = document.getElementById('modal-desc');

    function openCertModal(cert) {
        modalTitle.textContent = cert.title;
        modalIssuer.textContent = cert.issuer + ' · ' + cert.year;
        modalDesc.textContent = cert.desc;
        modalPlaceholder.style.display = 'none';
        modalImg.style.display = 'block';
        modalPlaceholderText.textContent = `Add file: ${cert.img}`;
        modalImg.src = cert.img;
        modalImg.alt = cert.title;
        modal.classList.add('active');
        document.body.style.overflow = 'hidden';
    }
    function closeCertModal() {
        modal.classList.remove('active');
        document.body.style.overflow = '';
    }
    document.getElementById('modal-close').addEventListener('click', closeCertModal);

    /* ---------- Internship certificate (shown inline in Experience, not in the grid) ---------- */
    const internshipCert = {
        title: 'Internship Completion Certificate', // TODO: replace with the exact title printed on your certificate
        issuer: 'PT. Citra Langgeng Sentosa', // TODO: confirm issuer name
        year: '2026', // TODO: confirm the year on the certificate
        img: 'assets/img/cert-clsentosa.jpg', // TODO: put your scanned/exported certificate file here
        desc: 'Completed the Innovation and Deployment Engineer internship covering AGV control and electrical system design, PLC/Roboteq programming, and commissioning.' // TODO: replace with your own description
    };
    const certClsentosaBtn = document.getElementById('cert-clsentosa-btn');
    if (certClsentosaBtn) {
        certClsentosaBtn.addEventListener('click', () => openCertModal(internshipCert));
    }

    const plnCert = {
        title: 'Internship Completion Certificate', // TODO: replace with the exact title printed on your certificate
        issuer: 'PT. PLN Persero UP2D Jateng & DIY', // TODO: confirm issuer name
        year: '2024', // TODO: confirm the year on the certificate
        img: 'assets/img/cert-pln.jpg', // TODO: put your scanned/exported certificate file here
        desc: 'Completed the Planning Engineer internship, developing a real-time SCADA + ArcGIS monitoring system for medium-voltage electrical networks.' // TODO: replace with your own description
    };
    const certPlnBtn = document.getElementById('cert-pln-btn');
    if (certPlnBtn) {
        certPlnBtn.addEventListener('click', () => openCertModal(plnCert));
    }

    modal.addEventListener('click', (e) => { if (e.target === modal) closeCertModal(); });
    document.addEventListener('keydown', (e) => { if (e.key === 'Escape') closeCertModal(); });

});
