import { render, screen, within } from '@testing-library/react'
import { describe, expect, it } from 'vitest'
import App from '../src/App'

const courseUrl =
  'https://ingenieria.uchile.cl/cursos/202313/curso-fundamentos-de-devops'

describe('App', () => {
  it('renders the main hero and introduction', () => {
    render(<App />)

    expect(
      screen.getByRole('heading', {
        level: 1,
        name: 'Deja de tirar releases a la suerte',
      }),
    ).toBeInTheDocument()
    expect(
      screen.getByText(/Un curso para entender DevOps desde la practica/i),
    ).toBeInTheDocument()
  })

  it('renders the primary navigation links', () => {
    render(<App />)

    const nav = screen.getByRole('navigation', { name: 'Principal' })

    expect(within(nav).getByRole('link', { name: 'Aprendizajes' })).toHaveAttribute(
      'href',
      '#aprendizajes',
    )
    expect(within(nav).getByRole('link', { name: 'Beneficios' })).toHaveAttribute(
      'href',
      '#beneficios',
    )
    expect(within(nav).getByRole('link', { name: 'Curso' })).toHaveAttribute(
      'href',
      '#curso',
    )
  })

  it('renders the primary external call to action', () => {
    render(<App />)

    const link = screen.getByRole('link', { name: 'Quiero subirme al pipeline' })

    expect(link).toHaveAttribute('href', courseUrl)
    expect(link).toHaveAttribute('target', '_blank')
    expect(link).toHaveAttribute('rel', 'noreferrer')
  })

  it('renders the course stats', () => {
    render(<App />)

    expect(screen.getByText('30 h')).toBeInTheDocument()
    expect(screen.getByText('online sincronico')).toBeInTheDocument()
    expect(screen.getByText('6')).toBeInTheDocument()
    expect(screen.getByText('bloques practicos')).toBeInTheDocument()
    expect(screen.getByText('100%')).toBeInTheDocument()
    expect(screen.getByText('orientado a aplicar')).toBeInTheDocument()
  })

  it('renders the six learning modules', () => {
    render(<App />)

    const moduleTitles = [
      'Cultura DevOps sin humo',
      'Git, ramas y entregas ordenadas',
      'CI/CD que trabaja por ti',
      'Testing y calidad continua',
      'Contenedores e infraestructura',
      'SRE, monitoreo y observabilidad',
    ]

    for (const title of moduleTitles) {
      expect(screen.getByRole('heading', { level: 3, name: title })).toBeInTheDocument()
    }
  })

  it('renders the career benefits', () => {
    render(<App />)

    const benefits = [
      'Hablar el idioma de desarrollo, operaciones y negocio sin perderte en siglas.',
      'Llegar a entrevistas y proyectos con criterio practico sobre pipelines, calidad y despliegue.',
      'Reducir friccion entre equipos: menos traspasos dolorosos, mas feedback temprano.',
      'Tomar mejores decisiones cuando un sistema falla, escala o necesita mejorar su entrega.',
    ]

    for (const benefit of benefits) {
      expect(screen.getByText(benefit)).toBeInTheDocument()
    }
  })

  it('renders the pipeline diagram steps', () => {
    render(<App />)

    const pipeline = screen.getByLabelText('Flujo DevOps del curso')

    for (const step of ['commit', 'build', 'test', 'deploy', 'observe']) {
      expect(within(pipeline).getAllByText(step).length).toBeGreaterThan(0)
    }
  })

  it('renders the final external course link', () => {
    render(<App />)

    const link = screen.getByRole('link', { name: 'Ver curso oficial' })

    expect(link).toHaveAttribute('href', courseUrl)

  })
})
