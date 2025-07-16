const posts = [
  {
    slug: 'guia-nuevos-compradores',
    image: '/Img/producto_estrella.jpg',
    image1: '/Img/producto4.jpg',
    title: 'Producto en Tendencia',
    summary: 'Conoce al producto más económico y cotizado.',
    category: 'Novedades',
    tags: ['productos', 'tendencia', 'económico', 'sostenible'],
    date: '2024-01-15',
    author: 'Equipo Ecológico',
    readTime: '5 min',
    content: `
En un mercado donde la sostenibilidad se vuelve cada vez más relevante, algunos productos logran destacar no solo por su impacto ambiental positivo, sino también por su accesibilidad económica. Nuestro producto estrella representa esta combinación ideal: calidad, conciencia ecológica y precio justo.

Este producto ha sido cuidadosamente seleccionado por su proceso de fabricación respetuoso con el medio ambiente, su durabilidad, y su gran aceptación entre los consumidores. Gracias a materiales biodegradables y una cadena de suministro optimizada, logramos reducir costos sin comprometer la calidad.

Es la opción perfecta para quienes desean comenzar a consumir de manera responsable sin afectar su presupuesto.

Descubre por qué se ha convertido en el favorito de nuestra comunidad ecológica. ¡Haz la prueba y suma tu voz al cambio!`,
  },
  {
    slug: 'motivacion-ecologica',
    image: '/Img/hitos.png',
    image1: '/Img/huella.jpg',
    title: 'Hitos de la empresa',
    summary: 'Historias de logros alcanzados por la empresa.',
    category: 'Hitos',
    tags: ['empresa', 'logros', 'historia', 'crecimiento'],
    date: '2024-01-10',
    author: 'Equipo Ecológico',
    readTime: '4 min',
    content: `
Cada paso que damos como empresa ecológica está guiado por el compromiso con el planeta y con las personas. A lo largo de los años, hemos trabajado arduamente para integrar prácticas sostenibles en cada rincón de nuestra organización.

Desde la implementación de energías renovables en nuestras oficinas, hasta la colaboración con comunidades locales para el desarrollo de productos éticos, cada hito es el reflejo de un esfuerzo conjunto. También nos enorgullece haber reducido en un 40% nuestra huella de carbono en los últimos tres años, y haber alcanzado una tasa de reciclaje del 95% en nuestras operaciones.

Estos logros no son solo números: representan historias de superación, innovación y compromiso. Te invitamos a conocer más sobre los hitos que definen nuestra historia verde.`,
  },
  {
    slug: 'comentarios-compradores',
    image: '/Img/noticias.jpg',
    image1: '/Img/paris.png',
    title: 'Noticias',
    summary: 'Noticias relevantes del mundo ecológico.',
    category: 'Noticias',
    tags: ['noticias', 'actualidad', 'ecología', 'mundo'],
    date: '2024-01-08',
    author: 'Equipo Ecológico',
    readTime: '6 min',
    content: `
El mundo ecológico está en constante evolución, y cada día surgen nuevas iniciativas, descubrimientos y cambios regulatorios que marcan el rumbo hacia un planeta más sano. Desde acuerdos internacionales sobre reducción de emisiones hasta nuevos avances en energías limpias, las noticias ecológicas son una fuente constante de inspiración y conciencia.

En nuestra sección de noticias te mantendrás informado sobre temas como la prohibición de plásticos de un solo uso, proyectos de reforestación global, innovaciones tecnológicas sostenibles y campañas de concientización.

Estar informado es el primer paso para actuar. Acompáñanos en este viaje informativo que conecta a la comunidad con los temas que realmente importan.`,
  },
  {
    slug: 'impacto-productos',
    image: '/Img/ISO.jpg',
    image1: '/Img/iso_blog.png',
    title: 'ISO 14001',
    summary: 'Certificación alcanzada por prácticas de medio ambiente.',
    category: 'Hitos',
    tags: ['certificación', 'ISO', 'medio-ambiente', 'calidad'],
    date: '2024-01-05',
    author: 'Equipo Ecológico',
    readTime: '3 min',
    content: `
Nos enorgullece compartir que hemos sido reconocidos con la certificación ISO 14001, un estándar internacional que avala la eficacia de nuestro sistema de gestión ambiental. Esta certificación es el resultado de años de trabajo enfocado en reducir el impacto ambiental de nuestras operaciones.

Gracias a la implementación de políticas de reducción de residuos, control del uso de recursos naturales, y formación ambiental continua para nuestro equipo, logramos cumplir con los criterios más exigentes en materia ecológica.

La certificación no solo valida nuestro compromiso, sino que nos impulsa a seguir innovando y mejorando día a día. Este logro es de todos los que forman parte de nuestra comunidad. ¡Gracias por acompañarnos en este camino verde!`,
  },
  {
    slug: 'guia-consumo-responsable',
    image: '/Img/producto_estrella.jpg',
    image1: '/Img/producto4.jpg',
    title: 'Guía de Consumo Responsable',
    summary: 'Aprende cómo hacer compras más ecológicas.',
    category: 'Guías',
    tags: ['guía', 'consumo', 'sostenible', 'hogar'],
    date: '2024-01-02',
    author: 'Equipo Ecológico',
    readTime: '7 min',
    content: `
Con pequeñas acciones cotidianas podemos reducir significativamente nuestro impacto ambiental. Esta guía te orientará sobre cómo consumir de forma responsable, desde elegir productos locales hasta reducir envoltorios innecesarios.

Aprenderás a leer etiquetas ecológicas, identificar certificaciones sostenibles y priorizar empresas con responsabilidad social. También abordamos la importancia del consumo consciente: pensar antes de comprar y evaluar si realmente lo necesitas.

Aplicando estos principios no solo cuidas al planeta, también fomentas una economía más justa y transparente.`,
  },
  {
    slug: 'reciclaje-en-casa',
    image: '/Img/hitos.png',
    image1: '/Img/huella.jpg',
    title: 'Reciclaje en Casa',
    summary: 'Consejos prácticos para reciclar mejor en tu hogar.',
    category: 'Educación',
    tags: ['reciclaje', 'hogar', 'educación', 'tips'],
    date: '2023-12-28',
    author: 'Equipo Ecológico',
    readTime: '5 min',
    content: `
El reciclaje doméstico puede ser simple si seguimos algunos pasos básicos. Clasificar residuos correctamente es clave: separa papel, plástico, vidrio y materia orgánica en diferentes contenedores.

Además, enjuaga envases antes de desecharlos para evitar contaminación, y nunca mezcles materiales distintos en un solo recipiente. Involucra a tu familia y crea un espacio específico para reciclar.

Recuerda que el reciclaje no solo es tirar en el tacho correcto, sino también reducir y reutilizar siempre que sea posible.`,
  },
  {
    slug: 'energia-solar-beneficios',
    image: '/Img/noticias.jpg',
    image1: '/Img/paris.png',
    title: 'Beneficios de la Energía Solar',
    summary: 'Conoce cómo aprovechar la energía del sol.',
    category: 'Tecnología',
    tags: ['energía', 'solar', 'tecnología', 'renovable'],
    date: '2023-12-15',
    author: 'Equipo Ecológico',
    readTime: '6 min',
    content: `
La energía solar es una de las fuentes más limpias y abundantes disponibles en la Tierra. A través de paneles solares, podemos generar electricidad sin emisiones contaminantes ni dependencia de combustibles fósiles.

Entre sus ventajas destacan el ahorro económico a largo plazo, la independencia energética y el aprovechamiento de espacios como techos o terrazas.

Instalar sistemas solares en el hogar es más accesible que nunca gracias a incentivos gubernamentales y avances tecnológicos.`,
  },
  {
    slug: 'proyecto-reforestacion',
    image: '/Img/ISO.jpg',
    image1: '/Img/iso_blog.png',
    title: 'Proyecto de Reforestación',
    summary: 'Sumando esfuerzos por un planeta más verde.',
    category: 'Noticias',
    tags: ['bosques', 'reforestación', 'impacto', 'comunidad'],
    date: '2023-12-10',
    author: 'Equipo Ecológico',
    readTime: '5 min',
    content: `
Miles de árboles plantados como parte de nuestro proyecto de reforestación. Esta iniciativa involucra voluntarios, comunidades locales y donantes comprometidos con restaurar ecosistemas dañados.

Además de capturar carbono, los árboles plantados ayudan a conservar el agua, proteger la biodiversidad y mejorar la calidad del aire.

Participar en este tipo de proyectos no solo genera impacto ambiental positivo, también fortalece el tejido social.`,
  },
  {
    slug: 'cuidado-del-agua',
    image: '/Img/producto_estrella.jpg',
    image1: '/Img/producto4.jpg',
    title: 'Cuidado del Agua',
    summary: 'Acciones simples para proteger este recurso vital.',
    category: 'Guías',
    tags: ['agua', 'ahorro', 'consejos', 'sostenibilidad'],
    date: '2023-12-01',
    author: 'Equipo Ecológico',
    readTime: '4 min',
    content: `
El agua es un recurso limitado y esencial para la vida. En casa, podemos cuidar este recurso cerrando el grifo mientras cepillamos los dientes, reutilizando agua de lluvia y reparando fugas.

Además, usar dispositivos de bajo consumo y elegir plantas nativas para el jardín contribuye al ahorro.

Cuidar el agua es responsabilidad de todos, y cada pequeño gesto cuenta.`,
  },
  {
    slug: 'moda-sostenible',
    image: '/Img/hitos.png',
    image1: '/Img/huella.jpg',
    title: 'Moda Sostenible',
    summary: 'Ropa que cuida del planeta.',
    category: 'Novedades',
    tags: ['moda', 'ecológica', 'textil', 'tendencia'],
    date: '2023-11-25',
    author: 'Equipo Ecológico',
    readTime: '5 min',
    content: `
Vestir bien también puede ser responsable con el medio ambiente. La moda sostenible prioriza el uso de materiales reciclados, procesos no contaminantes y condiciones laborales justas.

Al elegir ropa ética, contribuimos a reducir el desperdicio textil y apoyamos marcas comprometidas.

Explora opciones como ropa de segunda mano, upcycling o marcas locales ecológicas.`,
  },
  {
    slug: 'emprendimientos-verdes',
    image: '/Img/noticias.jpg',
    image1: '/Img/paris.png',
    title: 'Emprendimientos Verdes',
    summary: 'Ideas de negocio con impacto positivo.',
    category: 'Hitos',
    tags: ['emprendimiento', 'negocios', 'verde', 'sostenible'],
    date: '2023-11-15',
    author: 'Equipo Ecológico',
    readTime: '6 min',
    content: `
Las nuevas startups ecológicas están revolucionando la forma en que producimos y consumimos. Desde empaques biodegradables hasta plataformas para compartir vehículos eléctricos, la innovación verde está en auge.

Estos emprendimientos no solo generan rentabilidad, también ofrecen soluciones a problemas ambientales urgentes.

Conoce casos reales de emprendedores que están cambiando el mundo desde lo local.`,
  },
  {
    slug: 'residuos-organicos',
    image: '/Img/ISO.jpg',
    image1: '/Img/iso_blog.png',
    title: 'Gestión de Residuos Orgánicos',
    summary: 'Transforma tus desechos en recursos.',
    category: 'Educación',
    tags: ['orgánico', 'residuos', 'compostaje', 'hogar'],
    date: '2023-11-01',
    author: 'Equipo Ecológico',
    readTime: '5 min',
    content: `
El compostaje es una forma poderosa de reducir tu basura y fertilizar tus plantas de forma natural. Separar restos de frutas, verduras, cáscaras y hojas secas puede convertirse en abono de excelente calidad.

Además de reducir la cantidad de residuos enviados al vertedero, el compost mejora la salud del suelo y evita el uso de fertilizantes químicos.

Puedes comenzar con una compostera pequeña en tu cocina o jardín.`,
  },
];

export default posts;
