/* ============================================================
   Adrian Web — interacciones (vanilla, sin dependencias)
   Movimiento que susurra: secuencia de entrada, reveals con foco,
   cursor artesanal sobre el trabajo, parallax dentro de los marcos.
   + Bilingüe ES/EN · modo ligero (saveData/gama baja) · reduced-motion
   ============================================================ */

/* ============================================================
   0. Guardas de entorno (una sola fuente de verdad)
   ============================================================ */
var AW = (function () {
  'use strict';
  var mm = function (q) { try { return window.matchMedia(q).matches; } catch (e) { return false; } };
  var n = navigator;
  var reduce = mm('(prefers-reduced-motion: reduce)');
  var fine = mm('(hover: hover) and (pointer: fine)');
  var lite = reduce ||
    mm('(prefers-reduced-data: reduce)') ||
    !!(n.connection && n.connection.saveData === true) ||
    !!(n.deviceMemory && n.deviceMemory <= 4) ||
    !!(n.hardwareConcurrency && n.hardwareConcurrency <= 4);

  if (lite) document.documentElement.setAttribute('data-lite', '');
  else document.documentElement.removeAttribute('data-lite');

  return { reduce: reduce, fine: fine, lite: lite };
})();

/* ============================================================
   1. Bilingüe ES / EN — diccionario propio, tono comercial
   ============================================================ */
(function () {
  'use strict';

  var DICT = {
    es: {
      'meta.title': 'Adrian Web — Diseño web para negocios que no quieren pasar desapercibidos',
      'meta.desc': 'Diseño webs a medida para negocios locales. Te enseño una demo real antes de que pagues nada. Respuesta en menos de 24 h.',

      'nav.brandAria': 'Adrian Web — inicio',
      'nav.mainAria': 'Principal',
      'nav.langAria': 'Idioma',
      'nav.menuAria': 'Menú',
      'nav.work': 'Proyectos',
      'nav.method': 'Método',
      'nav.reviews': 'Estudio',
      'nav.drawerCta': 'Pídeme una demo gratis ↗',
      'cursor.label': 'La quiero&nbsp;↗',

      'hero.l1': 'Que te encuentren.',
      'hero.l2': 'Que les guste.',
      'hero.l3': 'Que tu negocio crezca.',
      'hero.lead': 'Te diseño y publico una web moderna, rápida y hecha para vender — lista en pocos días. La ves terminada <em>antes</em> de pagar nada.',
      'hero.meta': 'Sin compromiso &nbsp;·&nbsp; Respuesta en 24&nbsp;h &nbsp;·&nbsp; No pagas hasta verla',
      'cta.demo': 'Pídeme una demo gratis',
      'cta.work': 'Ver proyectos',

      'work.label': '[ Proyectos ]',
      'work.title': 'No te lo cuento.<br>Te lo enseño.',
      'work.note': 'Tres negocios reales. Tres necesidades distintas. Cero plantillas.',
      'case.cta': '→ Quiero una web así para mi negocio',

      'c1.imgAlt': 'Interior del restaurante Brasa',
      'c1.m1': 'Carta', 'c1.m2': 'Reservas', 'c1.m3': 'Contacto',
      'c1.chip': '· 214 reseñas',
      'c1.eyebrow': 'Cocina al fuego · Valencia',
      'c1.h1': 'Sabor que<br>se recuerda',
      'c1.btn': 'Reservar mesa',
      'c1.idx': '01 — Restaurante · Valencia',
      'c1.need': '<strong>El problema:</strong> mesas vacías entre semana y comisiones del 20&nbsp;% en las apps de reservas.',
      'c1.sol': '<strong>La web:</strong> reservas directas sin intermediarios, carta que da hambre y una primera imagen a la altura de la cocina.',
      'c1.result': '<strong>reservas</strong> en los primeros 2 meses<br><span class="mono">Caso real de cliente</span>',

      'c2.imgAlt': 'Paciente sonriendo en la clínica dental',
      'c2.m1': 'Tratamientos', 'c2.m2': 'Equipo', 'c2.m3': 'Pedir cita',
      'c2.eyebrow': 'Clínica dental · Valencia',
      'c2.h1': 'Tu mejor sonrisa<br>empieza aquí',
      'c2.p': 'Primera visita y estudio sin coste. Sin listas de espera.',
      'c2.btn': 'Pedir cita online',
      'c2.chip': 'Hoy · 17:30 libre',
      'c2.idx': '02 — Clínica dental · Valencia',
      'c2.need': '<strong>El problema:</strong> mucha gente busca dentista en Google, pero llegaba a una web anticuada y se iba a la de al lado.',
      'c2.sol': '<strong>La web:</strong> limpia, tranquila y con un botón de cita imposible de no ver. Confianza desde el primer segundo.',
      'c2.result': '<strong>citas online</strong> en 90 días<br><span class="mono">Caso real de cliente</span>',

      'c3.imgAlt': 'Atleta entrenando en el gimnasio Pulso',
      'c3.m1': 'Clases', 'c3.m2': 'Precios', 'c3.m3': 'Contacto',
      'c3.chip': '+52 socios este trimestre',
      'c3.eyebrow': 'Gimnasio · Alicante',
      'c3.h1': 'Entrena<br>como nunca',
      'c3.btn': 'Prueba gratis 7 días',
      'c3.idx': '03 — Gimnasio · Alicante',
      'c3.need': '<strong>El problema:</strong> mucho boca a boca, pero ni rastro online. Los que buscaban gimnasio nuevo ni lo encontraban.',
      'c3.sol': '<strong>La web:</strong> energía desde el primer scroll y una prueba gratis que se pide en un clic. Socios nuevos cada semana.',
      'c3.result': '<strong>socios nuevos</strong> el primer trimestre<br><span class="mono">Caso real de cliente</span>',

      'manifesto.badge': '↗ tus ventas',
      'manifesto.text': 'La mayoría de webs son <span class="strike">plantillas</span> disfrazadas. Yo diseño <em>la tuya</em>. Pensada para tu negocio, tu cliente y una sola cosa: <span class="hl">que aumenten tus ventas</span>.',

      'method.label': '[ Método ]',
      'method.title': 'Rápido, claro<br>y sin riesgo.',
      'method.note': 'Cuatro pasos, pocos días y no pagas nada hasta ver tu web terminada. Del resto me encargo yo.',
      'method.cta': 'Empezar por WhatsApp',
      'step1.t': 'Hablamos',
      'step1.d': 'Me escribes por WhatsApp y me cuentas tu negocio. Te respondo en menos de 24 horas.',
      'step2.t': 'Te la enseño',
      'step2.d': 'Diseño una demo real de tu web. Gratis. La ves y decides con ella delante, no con promesas.',
      'step3.t': 'La publicamos',
      'step3.d': 'Si te convence, en pocos días está online, rápida y lista para recibir clientes.',
      'step4.t': 'Yo me ocupo',
      'step4.d': 'Hosting, seguridad, cambios y publicidad para atraer clientes. Tú, a lo tuyo.',

      'rev.label': '[ Opiniones ]',
      'rev.title': 'Negocios de aquí<br>que ya lo notan.',
      'rev.note': 'Clientes reales de la Comunidad Valenciana.',
      'rev.stars': '5 de 5',
      'rev1.gain': '↗ +47% ventas',
      'rev1.q': 'Confié en Adrián para la web de mi tienda de ropa y ahora tengo a los turistas entrando sin parar. No sé cómo darle las gracias.',
      'rev1.role': 'Tienda de ropa · Valencia',
      'rev2.gain': '↗ +41% reservas',
      'rev2.q': 'Pensaba que una web así costaba una fortuna. Me enseñó la demo, me encantó, y en tres días estaba recibiendo reservas.',
      'rev2.role': 'Restaurante · Valencia',
      'rev3.gain': '↗ ×3 citas',
      'rev3.q': 'En un mes la agenda de citas no paraba. Trato cercano, todo por WhatsApp y sin líos técnicos.',
      'rev3.role': 'Clínica dental · Alicante',
      'rev4.gain': '↗ +52 socios',
      'rev4.q': 'Rápido, profesional y siempre disponible. Los socios nuevos llegan solos desde la web.',
      'rev4.role': 'Gimnasio · Gandía',
      'rev5.gain': '↗ +29% citas',
      'rev5.q': 'Mi peluquería siempre estuvo llena de vecinos; ahora también de gente que me encuentra en Google.',
      'rev5.role': 'Peluquería · Dénia',
      'rev6.gain': '↗ +34% pedidos',
      'rev6.q': 'La web quedó preciosa y la tuvo lista en nada. Cero complicaciones y no pagué hasta verla terminada.',
      'rev6.role': 'Cafetería · Castellón',

      'promise.label': '[ Sin riesgo ]',
      'promise.title': 'Primero la ves.<br><span class="i">Luego decides.</span>',
      'promise.note': 'Te preparo una demo real de tu web sin coste. Si no te enamora, no pagas ni un euro. Así de simple.',
      'promise.i1': 'Ves tu web <strong>terminada antes</strong> de pagar nada',
      'promise.i2': 'Sin permanencia y <strong>sin adelantos</strong>',
      'promise.i3': 'Trato <strong>directo conmigo</strong> por WhatsApp, siempre',

      'close.label': '[ Hablemos ]',
      'close.title': 'Vamos a hacer que tu negocio se vea <span class="i">como se merece.</span>',
      'close.cta': 'Escríbeme por WhatsApp',

      'foot.tag': 'Diseño web a medida para negocios de la Comunidad Valenciana y toda España.',
      'foot.status': 'Operativo online · Respuesta en 24&nbsp;h',
      'foot.contact': 'Contacto',
      'foot.legal': 'Legal',
      'foot.l1': 'Aviso legal',
      'foot.l2': 'Política de privacidad',
      'foot.l3': 'Política de cookies',
      'foot.l4': 'Confidencialidad del contrato',
      'foot.l5': 'Seguridad',
      'foot.copy': '© 2026 Adrian Web · Todos los derechos reservados.',
      'foot.hand': 'Diseñada a mano, no con plantillas.',
      'foot.back': '← Volver a la web',

      'wa.aria': 'Escríbeme por WhatsApp',
      'wa.label': 'Escríbeme',

      'legal.title': 'Legal — Adrian Web',
      'legal.desc': 'Aviso legal, privacidad, cookies, confidencialidad y seguridad de Adrian Web.',
      'legal.backAria': 'Adrian Web — volver al inicio',
      'legal.label': '[ Legal ]',
      'legal.h1': 'Las letras pequeñas,<br>en grande y claras.',
      'legal.updated': 'Última actualización · Julio 2026',
      'legal.indexAria': 'Índice de secciones',
      'legal.i1': 'Aviso legal', 'legal.i2': 'Privacidad', 'legal.i3': 'Cookies',
      'legal.i4': 'Confidencialidad', 'legal.i5': 'Seguridad',
      'legal.s1.h': 'Aviso legal',
      'legal.s1.p1': '<strong>Titular del sitio:</strong> Adrian Web, estudio de diseño web que opera online para negocios de la Comunidad Valenciana y toda España.',
      'legal.s1.p2': '<strong>Contacto:</strong> WhatsApp y teléfono <a href="tel:+34655334170">+34 655 334 170</a>.',
      'legal.s1.p3': '<strong>Objeto:</strong> este sitio presenta los servicios de diseño, desarrollo y mantenimiento de páginas web de Adrian Web, y facilita el contacto directo con clientes potenciales.',
      'legal.s1.p4': '<strong>Propiedad intelectual:</strong> el diseño de este sitio, su código, sus textos y su identidad visual pertenecen a Adrian Web. Los proyectos mostrados en la sección de portfolio son maquetas de demostración creadas para ilustrar el estilo y el nivel de acabado del estudio. No está permitida la reproducción total o parcial sin autorización.',
      'legal.s1.p5': '<strong>Responsabilidad:</strong> Adrian Web trabaja para que la información de este sitio sea correcta y esté actualizada, pero no puede garantizar la ausencia total de errores ni la disponibilidad ininterrumpida del sitio.',
      'legal.s2.h': 'Política de privacidad',
      'legal.s2.p1': 'Este sitio <strong>no tiene formularios ni recoge datos personales por sí mismo</strong>. El contacto se realiza siempre por canales que tú inicias: WhatsApp o teléfono.',
      'legal.s2.p2': '<strong>Qué datos se tratan:</strong> si me escribes, trataré los datos que tú decidas compartir (nombre, teléfono, información sobre tu negocio) con una única finalidad: responderte y preparar tu propuesta o demo.',
      'legal.s2.p3': '<strong>Base legal:</strong> tu consentimiento, expresado al iniciar el contacto.',
      'legal.s2.p4': '<strong>Conservación:</strong> los datos se conservan mientras dure la relación comercial o hasta que solicites su supresión.',
      'legal.s2.p5': '<strong>Cesión a terceros:</strong> tus datos no se venden ni se ceden a terceros. Las conversaciones por WhatsApp están sujetas además a la política de privacidad de WhatsApp (Meta).',
      'legal.s2.p6': '<strong>Tus derechos:</strong> puedes ejercer en cualquier momento tus derechos de acceso, rectificación, supresión, oposición, limitación y portabilidad (RGPD y LOPDGDD) escribiendo al teléfono de contacto. También puedes reclamar ante la Agencia Española de Protección de Datos (aepd.es).',
      'legal.s3.h': 'Política de cookies',
      'legal.s3.p1': '<strong>Este sitio no instala cookies propias ni de terceros</strong>, ni utiliza herramientas de analítica o publicidad. Por eso no verás banners de cookies: no hay nada que aceptar.',
      'legal.s3.p2': '<strong>Recursos externos:</strong> para mostrar la web se cargan tipografías de Google Fonts y fotografías alojadas en servicios externos. Estas peticiones pueden implicar que dichos proveedores conozcan tu dirección IP, como en cualquier carga de contenido web, pero no instalan cookies desde este sitio.',
      'legal.s3.p3': 'Si en el futuro se incorporara analítica, esta política se actualizará y se pedirá tu consentimiento previo.',
      'legal.s4.h': 'Confidencialidad del contrato',
      'legal.s4.p1': 'Cuando trabajamos juntos, tu negocio queda protegido. Todo encargo con Adrian Web incluye este compromiso de confidencialidad:',
      'legal.s4.l1': '<strong>Tus materiales son tuyos.</strong> Textos, fotografías, cifras, listados de clientes y cualquier información que me facilites se usan exclusivamente para tu proyecto.',
      'legal.s4.l2': '<strong>No divulgación.</strong> No comparto información de tu negocio con terceros, ni la uso como ejemplo público sin tu permiso expreso.',
      'legal.s4.l3': '<strong>Accesos protegidos.</strong> Las credenciales (hosting, dominio, redes) se guardan de forma segura, se usan solo para el trabajo acordado y se te devuelven o eliminan al finalizar.',
      'legal.s4.l4': '<strong>Portfolio con permiso.</strong> Tu web solo aparecerá en mi portfolio si tú lo autorizas.',
      'legal.s4.l5': '<strong>Acuerdo por escrito.</strong> Si tu proyecto lo requiere, firmo un acuerdo de confidencialidad (NDA) antes de empezar.',
      'legal.s5.h': 'Seguridad',
      'legal.s5.p1': 'La seguridad forma parte del servicio, no es un extra:',
      'legal.s5.l1': '<strong>Cifrado SSL (HTTPS)</strong> en todas las webs que entrego, sin excepción.',
      'legal.s5.l2': '<strong>Copias de seguridad periódicas</strong> de tu web dentro del plan de mantenimiento, para poder restaurarla ante cualquier imprevisto.',
      'legal.s5.l3': '<strong>Actualizaciones y vigilancia:</strong> mantengo el software al día y superviso el estado del sitio.',
      'legal.s5.l4': '<strong>Datos mínimos:</strong> tus proyectos se diseñan recogiendo la menor cantidad de datos personales posible, lo que reduce riesgos y obligaciones.',
      'legal.s5.l5': '<strong>Incidencias:</strong> si detectara un problema de seguridad que afecte a tu web, te aviso de inmediato y lo resuelvo con prioridad.'
    },

    en: {
      'meta.title': 'Adrian Web — Websites for businesses that refuse to go unnoticed',
      'meta.desc': 'Custom websites for local businesses. I show you a real demo before you pay a thing. Reply in under 24 h.',

      'nav.brandAria': 'Adrian Web — home',
      'nav.mainAria': 'Main',
      'nav.langAria': 'Language',
      'nav.menuAria': 'Menu',
      'nav.work': 'Work',
      'nav.method': 'Process',
      'nav.reviews': 'Reviews',
      'nav.drawerCta': 'Get a free demo ↗',
      'cursor.label': 'I want it&nbsp;↗',

      'hero.l1': 'Get found.',
      'hero.l2': 'Get remembered.',
      'hero.l3': 'Grow your business.',
      'hero.lead': 'I design and launch a modern, fast website built to sell — ready in days. You see it finished <em>before</em> you pay a thing.',
      'hero.meta': 'No commitment &nbsp;·&nbsp; Reply within 24&nbsp;h &nbsp;·&nbsp; You pay only once you’ve seen it',
      'cta.demo': 'Get a free demo',
      'cta.work': 'See the work',

      'work.label': '[ Work ]',
      'work.title': 'I won’t tell you.<br>I’ll show you.',
      'work.note': 'Three real businesses. Three different problems. Zero templates.',
      'case.cta': '→ I want a site like this for my business',

      'c1.imgAlt': 'Inside the Brasa restaurant',
      'c1.m1': 'Menu', 'c1.m2': 'Bookings', 'c1.m3': 'Contact',
      'c1.chip': '· 214 reviews',
      'c1.eyebrow': 'Cooked over fire · Valencia',
      'c1.h1': 'Flavour you<br>don’t forget',
      'c1.btn': 'Book a table',
      'c1.idx': '01 — Restaurant · Valencia',
      'c1.need': '<strong>The problem:</strong> empty tables midweek and 20&nbsp;% commission on booking apps.',
      'c1.sol': '<strong>The site:</strong> direct bookings with no middleman, a menu that makes you hungry and a first impression worthy of the kitchen.',
      'c1.result': '<strong>bookings</strong> in the first 2 months<br><span class="mono">Real client case</span>',

      'c2.imgAlt': 'Patient smiling at the dental clinic',
      'c2.m1': 'Treatments', 'c2.m2': 'Team', 'c2.m3': 'Book now',
      'c2.eyebrow': 'Dental clinic · Valencia',
      'c2.h1': 'Your best smile<br>starts here',
      'c2.p': 'First visit and check-up at no cost. No waiting lists.',
      'c2.btn': 'Book online',
      'c2.chip': 'Today · 5:30 pm free',
      'c2.idx': '02 — Dental clinic · Valencia',
      'c2.need': '<strong>The problem:</strong> plenty of people search for a dentist on Google, landed on a dated website and went straight to the one next door.',
      'c2.sol': '<strong>The site:</strong> clean, calm and with a booking button you cannot miss. Trust from the first second.',
      'c2.result': '<strong>online bookings</strong> in 90 days<br><span class="mono">Real client case</span>',

      'c3.imgAlt': 'Athlete training at the Pulso gym',
      'c3.m1': 'Classes', 'c3.m2': 'Pricing', 'c3.m3': 'Contact',
      'c3.chip': '+52 members this quarter',
      'c3.eyebrow': 'Gym · Alicante',
      'c3.h1': 'Train like<br>never before',
      'c3.btn': 'Free 7-day trial',
      'c3.idx': '03 — Gym · Alicante',
      'c3.need': '<strong>The problem:</strong> great word of mouth, invisible online. Anyone looking for a new gym never found it.',
      'c3.sol': '<strong>The site:</strong> energy from the first scroll and a free trial you claim in one tap. New members every week.',
      'c3.result': '<strong>new members</strong> in the first quarter<br><span class="mono">Real client case</span>',

      'manifesto.badge': '↗ your sales',
      'manifesto.text': 'Most websites are <span class="strike">templates</span> in disguise. I design <em>yours</em>. Built around your business, your customer and one single thing: <span class="hl">selling more</span>.',

      'method.label': '[ Process ]',
      'method.title': 'Fast, clear<br>and risk-free.',
      'method.note': 'Four steps, a few days, and you pay nothing until your website is finished in front of you. I handle the rest.',
      'method.cta': 'Start on WhatsApp',
      'step1.t': 'We talk',
      'step1.d': 'You message me on WhatsApp and tell me about your business. I reply in under 24 hours.',
      'step2.t': 'I show you',
      'step2.d': 'I design a real demo of your website. Free. You see it and decide with it in front of you, not on promises.',
      'step3.t': 'We go live',
      'step3.d': 'If you love it, within days it is online, fast and ready to bring in customers.',
      'step4.t': 'I take care of it',
      'step4.d': 'Hosting, security, changes and ads to bring customers in. You get on with your business.',

      'rev.label': '[ Reviews ]',
      'rev.title': 'Local businesses<br>already feeling it.',
      'rev.note': 'Real clients across the Valencia region.',
      'rev.stars': '5 out of 5',
      'rev1.gain': '↗ +47% sales',
      'rev1.q': 'I trusted Adrián with the website for my clothing shop and now tourists keep walking in. I can’t thank him enough.',
      'rev1.role': 'Clothing shop · Valencia',
      'rev2.gain': '↗ +41% bookings',
      'rev2.q': 'I thought a website like this cost a fortune. He showed me the demo, I loved it, and three days later bookings were coming in.',
      'rev2.role': 'Restaurant · Valencia',
      'rev3.gain': '↗ ×3 appointments',
      'rev3.q': 'Within a month the appointment book never stopped. Personal service, everything over WhatsApp and no technical headaches.',
      'rev3.role': 'Dental clinic · Alicante',
      'rev4.gain': '↗ +52 members',
      'rev4.q': 'Fast, professional and always available. New members now come in on their own through the website.',
      'rev4.role': 'Gym · Gandía',
      'rev5.gain': '↗ +29% appointments',
      'rev5.q': 'My salon was always full of neighbours; now it’s also full of people who find me on Google.',
      'rev5.role': 'Hair salon · Dénia',
      'rev6.gain': '↗ +34% orders',
      'rev6.q': 'The website turned out beautiful and he had it ready in no time. Zero hassle, and I paid nothing until I saw it finished.',
      'rev6.role': 'Café · Castellón',

      'promise.label': '[ Zero risk ]',
      'promise.title': 'First you see it.<br><span class="i">Then you decide.</span>',
      'promise.note': 'I build a real demo of your website at no cost. If you don’t fall for it, you don’t pay a cent. That simple.',
      'promise.i1': 'You see your site <strong>finished first</strong>, then pay',
      'promise.i2': 'No lock-in and <strong>no deposits</strong>',
      'promise.i3': 'You deal <strong>directly with me</strong> on WhatsApp, always',

      'close.label': '[ Let’s talk ]',
      'close.title': 'Let’s make your business look <span class="i">the way it deserves.</span>',
      'close.cta': 'Message me on WhatsApp',

      'foot.tag': 'Custom web design for businesses across the Valencia region and all of Spain.',
      'foot.status': 'Online and working · Reply within 24&nbsp;h',
      'foot.contact': 'Contact',
      'foot.legal': 'Legal',
      'foot.l1': 'Legal notice',
      'foot.l2': 'Privacy policy',
      'foot.l3': 'Cookie policy',
      'foot.l4': 'Contract confidentiality',
      'foot.l5': 'Security',
      'foot.copy': '© 2026 Adrian Web · All rights reserved.',
      'foot.hand': 'Designed by hand, not from a template.',
      'foot.back': '← Back to the site',

      'wa.aria': 'Message me on WhatsApp',
      'wa.label': 'Message me',

      'legal.title': 'Legal — Adrian Web',
      'legal.desc': 'Legal notice, privacy, cookies, confidentiality and security at Adrian Web.',
      'legal.backAria': 'Adrian Web — back to home',
      'legal.label': '[ Legal ]',
      'legal.h1': 'The small print,<br>large and clear.',
      'legal.updated': 'Last updated · July 2026',
      'legal.indexAria': 'Section index',
      'legal.i1': 'Legal notice', 'legal.i2': 'Privacy', 'legal.i3': 'Cookies',
      'legal.i4': 'Confidentiality', 'legal.i5': 'Security',
      'legal.s1.h': 'Legal notice',
      'legal.s1.p1': '<strong>Site owner:</strong> Adrian Web, a web design studio operating online for businesses across the Valencia region and all of Spain.',
      'legal.s1.p2': '<strong>Contact:</strong> WhatsApp and phone <a href="tel:+34655334170">+34 655 334 170</a>.',
      'legal.s1.p3': '<strong>Purpose:</strong> this site presents the design, development and maintenance services of Adrian Web, and makes direct contact with prospective clients easy.',
      'legal.s1.p4': '<strong>Intellectual property:</strong> the design of this site, its code, its copy and its visual identity belong to Adrian Web. The projects shown in the portfolio section are demonstration mock-ups created to illustrate the studio’s style and level of finish. Reproduction in whole or in part is not permitted without authorisation.',
      'legal.s1.p5': '<strong>Liability:</strong> Adrian Web works to keep the information on this site correct and up to date, but cannot guarantee it is entirely free of errors or that the site will be available without interruption.',
      'legal.s2.h': 'Privacy policy',
      'legal.s2.p1': 'This site <strong>has no forms and does not collect personal data by itself</strong>. Contact always happens through channels you start: WhatsApp or phone.',
      'legal.s2.p2': '<strong>What data is processed:</strong> if you message me, I process the data you choose to share (name, phone, information about your business) for one purpose only: replying to you and preparing your proposal or demo.',
      'legal.s2.p3': '<strong>Legal basis:</strong> your consent, given when you start the conversation.',
      'legal.s2.p4': '<strong>Retention:</strong> data is kept for as long as the business relationship lasts, or until you ask for it to be deleted.',
      'legal.s2.p5': '<strong>Third parties:</strong> your data is never sold or transferred to third parties. WhatsApp conversations are additionally subject to WhatsApp’s (Meta) own privacy policy.',
      'legal.s2.p6': '<strong>Your rights:</strong> you may exercise your rights of access, rectification, erasure, objection, restriction and portability (GDPR and Spanish LOPDGDD) at any time by writing to the contact phone number. You may also file a complaint with the Spanish Data Protection Agency (aepd.es).',
      'legal.s3.h': 'Cookie policy',
      'legal.s3.p1': '<strong>This site installs no cookies of its own or from third parties</strong>, and uses no analytics or advertising tools. That is why you will see no cookie banner: there is nothing to accept.',
      'legal.s3.p2': '<strong>External resources:</strong> to display the site, fonts from Google Fonts and photographs hosted on external services are loaded. Those requests may let the providers see your IP address, as with any web content, but they install no cookies from this site.',
      'legal.s3.p3': 'If analytics were added in the future, this policy would be updated and your prior consent requested.',
      'legal.s4.h': 'Contract confidentiality',
      'legal.s4.p1': 'When we work together, your business is protected. Every project with Adrian Web includes this confidentiality commitment:',
      'legal.s4.l1': '<strong>Your materials are yours.</strong> Copy, photographs, figures, client lists and any information you give me are used exclusively for your project.',
      'legal.s4.l2': '<strong>No disclosure.</strong> I do not share information about your business with third parties, nor use it as a public example without your express permission.',
      'legal.s4.l3': '<strong>Protected access.</strong> Credentials (hosting, domain, social) are stored securely, used only for the agreed work, and returned or deleted at the end.',
      'legal.s4.l4': '<strong>Portfolio with permission.</strong> Your website appears in my portfolio only if you authorise it.',
      'legal.s4.l5': '<strong>Written agreement.</strong> If your project requires it, I sign a non-disclosure agreement (NDA) before starting.',
      'legal.s5.h': 'Security',
      'legal.s5.p1': 'Security is part of the service, not an add-on:',
      'legal.s5.l1': '<strong>SSL encryption (HTTPS)</strong> on every website I deliver, no exceptions.',
      'legal.s5.l2': '<strong>Regular backups</strong> of your site within the maintenance plan, so it can be restored whatever happens.',
      'legal.s5.l3': '<strong>Updates and monitoring:</strong> I keep software current and watch over the state of the site.',
      'legal.s5.l4': '<strong>Minimal data:</strong> your projects are designed to collect as little personal data as possible, which reduces risk and obligations.',
      'legal.s5.l5': '<strong>Incidents:</strong> if I detect a security problem affecting your site, I tell you immediately and fix it as a priority.'
    }
  };

  var LANGS = { es: 1, en: 1 };
  var current = document.documentElement.getAttribute('data-lang');
  if (!LANGS[current]) current = 'es';

  function apply(lang) {
    var d = DICT[lang] || DICT.es;
    var root = document.documentElement;
    root.lang = lang;
    root.setAttribute('data-lang', lang);

    var i, els, v;
    els = document.querySelectorAll('[data-i18n]');
    for (i = 0; i < els.length; i++) { v = d[els[i].getAttribute('data-i18n')]; if (v != null) els[i].innerHTML = v; }
    els = document.querySelectorAll('[data-i18n-html]');
    for (i = 0; i < els.length; i++) { v = d[els[i].getAttribute('data-i18n-html')]; if (v != null) els[i].innerHTML = v; }
    els = document.querySelectorAll('[data-i18n-aria]');
    for (i = 0; i < els.length; i++) { v = d[els[i].getAttribute('data-i18n-aria')]; if (v != null) els[i].setAttribute('aria-label', v); }
    els = document.querySelectorAll('[data-i18n-alt]');
    for (i = 0; i < els.length; i++) { v = d[els[i].getAttribute('data-i18n-alt')]; if (v != null) els[i].setAttribute('alt', v); }

    if (d['meta.title'] && !document.body.classList.contains('is-legal')) document.title = d['meta.title'];
    if (d['legal.title'] && document.body.classList.contains('is-legal')) document.title = d['legal.title'];
    var md = document.querySelector('meta[name="description"]');
    var key = document.body.classList.contains('is-legal') ? 'legal.desc' : 'meta.desc';
    if (md && d[key]) md.setAttribute('content', d[key]);

    els = document.querySelectorAll('[data-lang-set]');
    for (i = 0; i < els.length; i++) {
      var on = els[i].getAttribute('data-lang-set') === lang;
      els[i].classList.toggle('is-on', on);
      els[i].setAttribute('aria-pressed', String(on));
    }

    current = lang;
    document.dispatchEvent(new CustomEvent('aw:langchange', { detail: { lang: lang } }));
  }

  // Aplicar antes del primer paint (script con defer: el DOM ya está parseado)
  apply(current);

  document.addEventListener('click', function (e) {
    var b = e.target.closest ? e.target.closest('[data-lang-set]') : null;
    if (!b) return;
    var l = b.getAttribute('data-lang-set');
    if (!LANGS[l] || l === current) return;
    apply(l);
    try { localStorage.setItem('aw-lang', l); } catch (err) {}
  });

  window.AWLang = { get: function () { return current; }, set: apply };
})();

/* ============================================================
   2. Momentos de movimiento
   ============================================================ */
(function () {
  'use strict';
  var reduce = AW.reduce, fine = AW.fine, lite = AW.lite;

  /* ---------- HeroLoadReveal: entrada al cargar (preset 07) ---------- */
  var hero = document.querySelector('.hero');
  if (hero) {
    var startHero = function () {
      hero.classList.add('is-ready');
      // will-change puntual: se retira en cuanto termina la secuencia
      var animated = hero.querySelectorAll('.line > span, .hero__lead, .hero__cta, .hero__meta');
      var pending = animated.length;
      for (var i = 0; i < animated.length; i++) {
        (function (el) {
          var done = function () {
            el.style.willChange = '';
            el.removeEventListener('animationend', done);
            if (--pending <= 0) hero.classList.add('is-settled');
          };
          el.style.willChange = 'transform, opacity, filter';
          el.addEventListener('animationend', done);
        })(animated[i]);
      }
      // Red de seguridad: si algún animationend no llega, limpia igual
      setTimeout(function () {
        for (var j = 0; j < animated.length; j++) animated[j].style.willChange = '';
        hero.classList.add('is-settled');
      }, 2600);
    };

    if (reduce || lite) {
      hero.classList.add('is-ready', 'is-settled');
    } else {
      // Espera a las fuentes (la display gigante no debe saltar), con tope de 1,2 s.
      // NADA de requestAnimationFrame como única vía: en una pestaña abierta en
      // segundo plano el rAF no se ejecuta y el hero se quedaría invisible.
      var fired = false;
      var go = function () { if (fired) return; fired = true; startHero(); };
      if (document.fonts && document.fonts.ready) document.fonts.ready.then(go);
      setTimeout(go, 1200);
      // Última red de seguridad: pase lo que pase, el hero se ve.
      setTimeout(function () { hero.classList.add('is-ready'); }, 2500);
    }
  }

  /* ---------- Reveal al hacer scroll ---------- */
  var items = document.querySelectorAll('[data-reveal]');
  if (reduce || !('IntersectionObserver' in window)) {
    for (var r = 0; r < items.length; r++) items[r].classList.add('is-in');
  } else {
    var io = new IntersectionObserver(function (entries, obs) {
      entries.forEach(function (e) {
        if (!e.isIntersecting) return;
        var sibs = Array.prototype.slice.call(e.target.parentElement.querySelectorAll(':scope > [data-reveal]'));
        var i = sibs.indexOf(e.target);
        e.target.style.transitionDelay = (i > 0 ? Math.min(i, 5) * 85 : 0) + 'ms';
        e.target.classList.add('is-in');
        obs.unobserve(e.target);
      });
    }, { threshold: 0.16, rootMargin: '0px 0px -8% 0px' });
    for (var k = 0; k < items.length; k++) io.observe(items[k]);
  }

  /* ---------- Contadores de resultados (preset 03 · aplicaCounter) ---------- */
  var counters = document.querySelectorAll('[data-count]');
  if (counters.length) {
    var locale = function () { return (document.documentElement.lang === 'en') ? 'en-GB' : 'es-ES'; };
    var fmt = function (el, v) {
      var dec = parseInt(el.getAttribute('data-count-decimals') || '0', 10);
      return (el.getAttribute('data-count-prefix') || '') +
        Number(v).toLocaleString(locale(), { minimumFractionDigits: dec, maximumFractionDigits: dec }) +
        (el.getAttribute('data-count-suffix') || '');
    };
    var settle = function (el) { el.textContent = fmt(el, parseFloat(el.getAttribute('data-count')) || 0); };
    var run = function (el) {
      var to = parseFloat(el.getAttribute('data-count')) || 0;
      var dur = 1500, t0 = 0;
      var step = function (now) {
        if (!t0) t0 = now;
        var p = Math.min(1, (now - t0) / dur);
        var e = 1 - Math.pow(1 - p, 3);
        el.textContent = fmt(el, Math.round(to * e));
        if (p < 1) requestAnimationFrame(step); else settle(el);
      };
      requestAnimationFrame(step);
    };

    var initCounters = function () {
      for (var i = 0; i < counters.length; i++) {
        var el = counters[i];
        el.setAttribute('aria-label', fmt(el, parseFloat(el.getAttribute('data-count')) || 0));
        if (reduce || lite || !('IntersectionObserver' in window)) { settle(el); continue; }
        el.textContent = fmt(el, 0);
        (function (node) {
          var ob = new IntersectionObserver(function (es) {
            es.forEach(function (e) { if (e.isIntersecting) { ob.disconnect(); run(node); } });
          }, { threshold: 0.6 });
          ob.observe(node);
        })(el);
      }
    };
    initCounters();

    // Al cambiar de idioma se reformatea el separador de miles y el aria-label
    document.addEventListener('aw:langchange', function () {
      for (var i = 0; i < counters.length; i++) {
        counters[i].setAttribute('aria-label', fmt(counters[i], parseFloat(counters[i].getAttribute('data-count')) || 0));
        settle(counters[i]);
      }
    });
  }

  /* ---------- Nav condensada ---------- */
  var nav = document.getElementById('nav');
  if (nav) {
    var onNav = function () { nav.classList.toggle('is-scrolled', window.scrollY > 20); };
    onNav();
    window.addEventListener('scroll', onNav, { passive: true });
  }

  /* ---------- Menú móvil ---------- */
  var burger = document.getElementById('burger');
  var drawer = document.getElementById('drawer');
  if (burger && nav && drawer) {
    var set = function (open) {
      nav.classList.toggle('is-open', open);
      burger.setAttribute('aria-expanded', String(open));
      drawer.setAttribute('aria-hidden', String(!open));
    };
    burger.addEventListener('click', function () { set(!nav.classList.contains('is-open')); });
    drawer.querySelectorAll('a').forEach(function (a) { a.addEventListener('click', function () { set(false); }); });
    document.addEventListener('keydown', function (e) {
      if (e.key === 'Escape' && nav.classList.contains('is-open')) { set(false); burger.focus(); }
    });
  }

  /* ---------- SmoothScroll propio (preset 05, sin CDN) ----------
     Solo escritorio con puntero fino y presupuesto de sobra.
     Nada de window.innerHeight en los cálculos (barra de URL móvil). */
  var smooth = null;
  if (!lite && fine) {
    smooth = (function () {
      var root = document.documentElement;
      var prevBehavior = root.style.scrollBehavior;
      root.style.scrollBehavior = 'auto';           // programático = salto, no doble animación
      var target = window.scrollY, cur = target, raf = 0, running = false;
      var maxY = function () { return Math.max(0, root.scrollHeight - root.clientHeight); };
      var loop = function () {
        cur += (target - cur) * 0.14;
        if (Math.abs(target - cur) < 0.5) { cur = target; running = false; window.scrollTo(0, Math.round(cur)); return; }
        window.scrollTo(0, Math.round(cur));
        raf = requestAnimationFrame(loop);
      };
      var kick = function () { if (!running) { running = true; raf = requestAnimationFrame(loop); } };
      var scrollable = function (node) {
        while (node && node !== document.body && node !== root) {
          if (node.scrollHeight - node.clientHeight > 2) {
            var ov = getComputedStyle(node).overflowY;
            if (ov === 'auto' || ov === 'scroll') return true;
          }
          node = node.parentElement;
        }
        return false;
      };
      var onWheel = function (e) {
        if (e.ctrlKey || e.defaultPrevented) return;             // zoom del navegador
        if (e.target && e.target.nodeType === 1 && scrollable(e.target)) return;  // chat, paneles, etc.
        e.preventDefault();
        var d = e.deltaY * (e.deltaMode === 1 ? 16 : (e.deltaMode === 2 ? root.clientHeight : 1));
        target = Math.max(0, Math.min(maxY(), target + d));
        kick();
      };
      var resync = function () { if (!running) { target = cur = window.scrollY; } };
      window.addEventListener('wheel', onWheel, { passive: false });
      window.addEventListener('scroll', resync, { passive: true });
      window.addEventListener('resize', resync, { passive: true });
      return {
        to: function (y) { target = Math.max(0, Math.min(maxY(), y)); kick(); },
        destroy: function () {
          window.removeEventListener('wheel', onWheel);
          window.removeEventListener('scroll', resync);
          window.removeEventListener('resize', resync);
          cancelAnimationFrame(raf);
          root.style.scrollBehavior = prevBehavior;
        }
      };
    })();
  }

  /* ---------- Anclas del nav (offset del header, sin romper nada) ---------- */
  document.querySelectorAll('a[href^="#"]').forEach(function (link) {
    link.addEventListener('click', function (e) {
      var id = link.getAttribute('href');
      if (!id || id.length < 2) return;
      var t = document.querySelector(id);
      if (!t) return;
      e.preventDefault();
      var y = t.getBoundingClientRect().top + window.scrollY - 74;
      if (smooth) smooth.to(y);
      else window.scrollTo({ top: y, behavior: reduce ? 'auto' : 'smooth' });
      if (history.replaceState) history.replaceState(null, '', id);
    });
  });

  /* ---------- Magnetic en el CTA principal (preset 06) ---------- */
  (function () {
    if (reduce || lite || !fine) return;
    var el = document.querySelector('[data-magnetic]');
    if (!el) return;
    var strength = 0.26, padding = 34, stiffness = 0.14, damping = 0.72;
    var tx = 0, ty = 0, cx = 0, cy = 0, vx = 0, vy = 0, raf = null, active = false;

    var spring = function () {
      vx = (vx + (tx - cx) * stiffness) * damping;
      vy = (vy + (ty - cy) * stiffness) * damping;
      cx += vx; cy += vy;
      el.style.transform = 'translate3d(' + cx.toFixed(2) + 'px,' + cy.toFixed(2) + 'px,0)';
      if (!active && Math.abs(vx) + Math.abs(vy) + Math.abs(tx - cx) + Math.abs(ty - cy) < 0.05) {
        el.style.transform = ''; el.style.willChange = ''; raf = null; return;
      }
      raf = requestAnimationFrame(spring);
    };
    var kick = function () { if (!raf) { el.style.willChange = 'transform'; raf = requestAnimationFrame(spring); } };
    var onMove = function (e) {
      var b = el.getBoundingClientRect();
      var inside = e.clientX >= b.left - padding && e.clientX <= b.right + padding &&
                   e.clientY >= b.top - padding && e.clientY <= b.bottom + padding;
      if (inside) {
        active = true;
        tx = (e.clientX - (b.left + b.width / 2)) * strength;
        ty = (e.clientY - (b.top + b.height / 2)) * strength;
        kick();
      } else if (active) { active = false; tx = 0; ty = 0; kick(); }
    };
    window.addEventListener('pointermove', onMove, { passive: true });
    el.addEventListener('blur', function () { active = false; tx = 0; ty = 0; kick(); });
  })();

  /* ---------- Cursor artesanal (solo puntero fino, sin reduced-motion) ---------- */
  var cursor = document.getElementById('cursor');
  if (cursor && fine && !reduce && !lite) {
    document.body.classList.add('has-cursor');
    var mx = 0, my = 0, ccx = 0, ccy = 0, shown = false, cRaf = null;
    window.addEventListener('mousemove', function (e) {
      mx = e.clientX; my = e.clientY;
      if (!shown) { shown = true; ccx = mx; ccy = my; cursor.classList.add('is-visible'); if (!cRaf) cRaf = requestAnimationFrame(cLoop); }
    }, { passive: true });
    function cLoop() {
      ccx += (mx - ccx) * 0.18; ccy += (my - ccy) * 0.18;
      cursor.style.transform = 'translate3d(' + ccx + 'px,' + ccy + 'px,0) translate(-50%,-50%)';
      cRaf = requestAnimationFrame(cLoop);
    }
    document.querySelectorAll('.case__view').forEach(function (v) {
      v.addEventListener('mouseenter', function () { cursor.classList.add('is-hot'); });
      v.addEventListener('mouseleave', function () { cursor.classList.remove('is-hot'); });
      v.addEventListener('click', function () {
        // Nada de abrir dominios de demo que no existen: el clic vende.
        var host = v.closest('.case');
        var nameEl = host ? host.querySelector('.case__name') : null;
        var name = (nameEl && nameEl.textContent.trim()) || 'estas';
        var es = document.documentElement.lang !== 'en';
        var msg = encodeURIComponent(es
          ? 'Hola Adrian, quiero una web como la de ' + name + ' para mi negocio.'
          : 'Hi Adrian, I want a website like ' + name + ' for my business.');
        window.open('https://wa.me/34655334170?text=' + msg, '_blank', 'noopener,noreferrer');
      });
    });
    document.addEventListener('mouseleave', function () { cursor.classList.remove('is-visible'); });
    document.addEventListener('mouseenter', function () { cursor.classList.add('is-visible'); });
  }

  /* ---------- Opiniones: duplicar para bucle sin costuras ---------- */
  var track = document.getElementById('revTrack');
  if (track && !reduce) {
    track.innerHTML += track.innerHTML;   // 6 → 12 tarjetas; la animación a -50% encaja
  }

  /* ---------- Parallax de la foto dentro del marco ---------- */
  if (!reduce && !lite) {
    var bgs = document.querySelectorAll('.site--brasa .site__bg, .site--forja .site__bg');
    if (bgs.length) {
      var ticking = false;
      var update = function () {
        // clientHeight del documento: estable aunque la barra de URL móvil cambie de alto
        var vh = document.documentElement.clientHeight;
        for (var i = 0; i < bgs.length; i++) {
          var bg = bgs[i];
          var rect = bg.getBoundingClientRect();
          if (rect.bottom < 0 || rect.top > vh) continue;
          var p = (rect.top + rect.height / 2 - vh / 2) / vh;      // -0.5..0.5
          bg.style.transform = 'scale(1.12) translate3d(0,' + (-p * 26).toFixed(2) + 'px,0)';
        }
        ticking = false;
      };
      var req = function () { if (!ticking) { ticking = true; requestAnimationFrame(update); } };
      window.addEventListener('scroll', req, { passive: true });
      window.addEventListener('resize', req, { passive: true });
      update();
    }
  }
})();

/* ============================================================
   3. Cursor-spotlight en tarjetas de reseñas (librería #3)
   ============================================================ */
(function () {
  'use strict';
  if (!AW.fine || AW.reduce || AW.lite) return;
  var first = document.querySelector('.rev');
  if (!first || !first.parentElement) return;
  first.parentElement.addEventListener('pointermove', function (e) {
    var card = e.target.closest ? e.target.closest('.rev') : null;
    if (!card) return;
    var r = card.getBoundingClientRect();
    card.style.setProperty('--mx', (e.clientX - r.left) + 'px');
    card.style.setProperty('--my', (e.clientY - r.top) + 'px');
  }, { passive: true });
})();

/* ============================================================
   4. Neón de ventas: la gráfica se dibuja al entrar en vista
   ============================================================ */
(function () {
  'use strict';
  var g = document.querySelector('.growth');
  if (!g) return;
  if (AW.reduce || AW.lite || !('IntersectionObserver' in window)) { g.classList.add('is-drawn'); return; }
  new IntersectionObserver(function (es, io) {
    es.forEach(function (e) { if (e.isIntersecting) { g.classList.add('is-drawn'); io.disconnect(); } });
  }, { threshold: 0.4 }).observe(g);
})();
