import './App.css'

const modules = [
  {
    title: 'Cultura DevOps sin humo',
    text: 'Entenderas por que DevOps no es comprar una herramienta nueva, sino cambiar como los equipos colaboran, aprenden y entregan software.',
  },
  {
    title: 'Git, ramas y entregas ordenadas',
    text: 'Practicaras flujos de versionamiento para que el codigo deje de ser una caja negra y pase a ser una historia clara y revisable.',
  },
  {
    title: 'CI/CD que trabaja por ti',
    text: 'Automatizaras builds, pruebas y despliegues con pipelines que avisan temprano cuando algo se rompe.',
  },
  {
    title: 'Testing y calidad continua',
    text: 'Conectaras pruebas automatizadas con decisiones de entrega, para subir la confianza antes de llegar a produccion.',
  },
  {
    title: 'Contenedores e infraestructura',
    text: 'Veras como empaquetar, configurar y mover aplicaciones con menos “en mi maquina funciona” y mas ambientes reproducibles.',
  },
  {
    title: 'SRE, monitoreo y observabilidad',
    text: 'Aprenderas a mirar sistemas vivos con logs, metricas, alertas e incidentes que se transforman en aprendizaje.',
  },
]

const benefits = [
  'Hablar el idioma de desarrollo, operaciones y negocio sin perderte en siglas.',
  'Llegar a entrevistas y proyectos con criterio practico sobre pipelines, calidad y despliegue.',
  'Reducir friccion entre equipos: menos traspasos dolorosos, mas feedback temprano.',
  'Tomar mejores decisiones cuando un sistema falla, escala o necesita mejorar su entrega.',
]

const stats = [
  ['30 h', 'online sincronico'],
  ['6', 'bloques practicos'],
  ['100%', 'orientado a aplicar'],
]

function PipelineDiagram() {
  const steps = ['commit', 'build', 'test', 'deploy', 'observe']

  return (
    <div className="pipeline-card" aria-label="Flujo DevOps del curso">
      <div className="terminal-bar">
        <span></span>
        <span></span>
        <span></span>
        <p>pipeline.yml</p>
      </div>
      <div className="terminal-lines">
        <p>
          <span>$</span> git push origin aprendizaje
        </p>
        <p>
          <span>run</span> tests + build + deploy
        </p>
        <p>
          <span>ok</span> release con feedback real
        </p>
      </div>
      <div className="pipeline-flow">
        {steps.map((step, index) => (
          <div className="pipeline-step" key={step}>
            <strong>{index + 1}</strong>
            <p>{step}</p>
          </div>
        ))}
      </div>
      <div className="monitor">
        <div>
          <span>latencia</span>
          <strong>128 ms</strong>
        </div>
        <div>
          <span>deploy</span>
          <strong>estable</strong>
        </div>
      </div>
    </div>
  )
}

function App() {
  return (
    <main>
      <section className="hero-section">
        <nav className="nav" aria-label="Principal">
          <a className="brand" href="#top" aria-label="Fundamentos de DevOps">
            <span className="brand-mark">fd</span>
            <span>Fundamentos de DevOps</span>
          </a>
          <div className="nav-links">
            <a href="#aprendizajes">Aprendizajes</a>
            <a href="#beneficios">Beneficios</a>
            <a href="#curso">Curso</a>
          </div>
        </nav>

        <div className="hero-grid" id="top">
          <div className="hero-copy">
            <h1>Deja de tirar releases a la suerte</h1>
            <p>
              Un curso para entender DevOps desde la practica: cultura,
              automatizacion, pipelines, calidad, operacion y observabilidad.
              Menos magia negra, mas software que llega vivo a produccion.
            </p>
            <div className="hero-actions">
              <a
                className="primary-action"
                href="https://ingenieria.uchile.cl/cursos/202313/curso-fundamentos-de-devops"
                target="_blank"
                rel="noreferrer"
              >
                Quiero subirme al pipeline
              </a>
              <a className="secondary-action" href="#aprendizajes">
                Ver que aprenderas
              </a>
            </div>
          </div>

          <PipelineDiagram />
        </div>
      </section>

      <section className="stats-band" aria-label="Datos rapidos del curso">
        {stats.map(([value, label]) => (
          <div key={label}>
            <strong>{value}</strong>
            <span>{label}</span>
          </div>
        ))}
      </section>

      <section className="section intro-section">
        <div className="section-heading">
          <h2>Del caos del deploy al flujo de entrega</h2>
          <p>
            Este curso no promete convertirte en “DevOps Engineer” por
            combustion espontanea. Te entrega fundamentos, lenguaje comun y
            herramientas para participar mejor en equipos que construyen,
            despliegan y operan software real.
          </p>
        </div>
      </section>

      <section className="section modules-section" id="aprendizajes">
        <div className="section-heading">
          <h2>Lo que te llevaras en la mochila tecnica</h2>
          <p>
            Aprendizajes conectados entre si: desde colaborar mejor con Git
            hasta observar un sistema cuando ya esta corriendo.
          </p>
        </div>
        <div className="module-grid">
          {modules.map((module, index) => (
            <article className="module-card" key={module.title}>
              <span>{String(index + 1).padStart(2, '0')}</span>
              <h3>{module.title}</h3>
              <p>{module.text}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="benefits-section" id="beneficios">
        <div className="benefits-copy">
          <h2>Por que esto suma a tu carrera</h2>
          <p>
            DevOps no solo mejora deploys. Mejora como piensas sistemas, como
            conversas con otros roles y como aportas cuando la presion sube.
          </p>
        </div>
        <div className="benefit-list">
          {benefits.map((benefit) => (
            <article key={benefit}>
              <span aria-hidden="true">OK</span>
              <p>{benefit}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="section method-section">
        <div className="method-card">
          <div>
            <h2>Clase sincronica, ritmo de taller</h2>
            <p>
              La idea es bajar los conceptos al terreno: conversar casos,
              revisar flujos, entender trade-offs y conectar herramientas con
              decisiones tecnicas. Sales con una brujula profesional, no con
              una coleccion de comandos sueltos.
            </p>
          </div>
          <div className="method-terminal" aria-label="Resumen de metodologia">
            <p>
              <span>learn</span> fundamentos
            </p>
            <p>
              <span>apply</span> automatizacion
            </p>
            <p>
              <span>observe</span> sistemas en produccion
            </p>
          </div>
        </div>
      </section>

      <section className="cta-section" id="curso">
        <div>
          <h2>Tu proximo deploy puede venir con menos drama</h2>
          <p>
            Revisa la informacion oficial del curso en Ingenieria U. de Chile y
            prepara tu salto hacia equipos que entregan con mas confianza.
          </p>
        </div>
        <a
          className="primary-action"
          href="https://ingenieria.uchile.cl/cursos/202313/curso-fundamentos-de-devops"
          target="_blank"
          rel="noreferrer"
        >
          Ver curso oficial
        </a>
      </section>
    </main>
  )
}

export default App
