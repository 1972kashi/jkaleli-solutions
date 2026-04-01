 // Inject footer into each page
  const footerIds = ['home-footer','portfolio-footer','about-footer','services-footer'];
  const tpl = document.getElementById('footer-tpl');
  footerIds.forEach(id => {
    document.getElementById(id).appendChild(tpl.content.cloneNode(true));
  });

  // Page navigation
  function showPage(name, btn) {
    document.querySelectorAll('.page').forEach(p => p.classList.remove('active'));
    document.querySelectorAll('nav button').forEach(b => b.classList.remove('active'));
    document.getElementById('page-' + name).classList.add('active');
    if (btn) btn.classList.add('active');
  }

  // Portfolio filter
  function filterPortfolio(cat, btn) {
    document.querySelectorAll('.filter-btn').forEach(b => b.classList.remove('active'));
    btn.classList.add('active');
    document.querySelectorAll('.portfolio-item').forEach(item => {
      item.style.display = (cat === 'all' || item.dataset.cat === cat) ? 'flex' : 'none';
    });
  }

  // Service details
  const serviceData = {
    uiux:      { icon:'🎨', title:'UI/UX Design', desc:'We design intuitive, user-friendly interfaces that enhance customer experiences and drive engagement.' },
    webdesign: { icon:'🖥️', title:'Web Design',   desc:'We craft beautiful, responsive websites that capture your brand identity and leave a lasting impression.' },
    webdev:    { icon:'💻', title:'Web Development', desc:'From custom applications to complex systems, we build scalable and secure solutions tailored to your business needs.' },
    appdev:    { icon:'📱', title:'App Development', desc:'From custom applications to complex systems, we build scalable and secure mobile solutions tailored to your business needs.' },
    startup:   { icon:'🧠', title:'Startup Ideas',  desc:'We help you validate, refine, and launch your startup concept — turning raw ideas into actionable plans and MVPs.' },
    seo:       { icon:'🔍', title:'SEO Optimization', desc:'Optimize your digital presence and boost your visibility with our data-driven SEO strategies.' },
  };

  function openDetail(key) {
    const d = serviceData[key];
    document.getElementById('detail-icon').textContent = d.icon;
    document.getElementById('detail-title').textContent = d.title;
    document.getElementById('detail-desc').textContent = d.desc;
    document.getElementById('service-detail').classList.add('open');
  }

  function closeDetail() {
    document.getElementById('service-detail').classList.remove('open');
  }