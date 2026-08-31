import type { Problem } from '../types'

export const mockProblems: Problem[] = [
  {
    id: '1',
    slug: 'counter-button',
    title: 'Counter Button',
    difficulty: 'easy',
    tags: ['components', 'state'],
    status: 'solved',
    referencePreviewSrc: 'about:blank',
    starterCode: `export function Counter() {
  return (
    <div>
      <p>Count: 0</p>
      <button>Increment</button>
    </div>
  )
}`,
  },
  {
    id: '2',
    slug: 'toggle-visibility',
    title: 'Toggle Visibility',
    difficulty: 'easy',
    tags: ['hooks', 'state'],
    status: 'solved',
    referencePreviewSrc: 'about:blank',
    starterCode: `export function Toggle() {
  const visible = true

  return (
    <div>
      <button>Toggle</button>
      {visible && <p>Hello!</p>}
    </div>
  )
}`,
  },
  {
    id: '3',
    slug: 'styled-card',
    title: 'Styled Card',
    difficulty: 'easy',
    tags: ['styling', 'components'],
    status: 'unsolved',
    referencePreviewSrc: 'about:blank',
    starterCode: `export function Card() {
  return (
    <div>
      <h2>Card Title</h2>
      <p>Card content goes here.</p>
    </div>
  )
}`,
  },
  {
    id: '4',
    slug: 'todo-list',
    title: 'Todo List',
    difficulty: 'medium',
    tags: ['state', 'hooks', 'forms'],
    status: 'solved',
    referencePreviewSrc: 'about:blank',
    starterCode: `import { useState } from 'react'

export function TodoList() {
  const [todos, setTodos] = useState<string[]>([])
  const [input, setInput] = useState('')

  return (
    <div>
      <input value={input} onChange={() => {}} placeholder="Add todo" />
      <button>Add</button>
      <ul>
        {todos.map((t, i) => <li key={i}>{t}</li>)}
      </ul>
    </div>
  )
}`,
  },
  {
    id: '5',
    slug: 'search-filter',
    title: 'Search Filter',
    difficulty: 'medium',
    tags: ['hooks', 'state', 'forms'],
    status: 'unsolved',
    referencePreviewSrc: 'about:blank',
    starterCode: `import { useState } from 'react'

const items = ['Apple', 'Banana', 'Cherry', 'Date', 'Elderberry']

export function SearchFilter() {
  const [query, setQuery] = useState('')

  return (
    <div>
      <input value={query} onChange={() => {}} placeholder="Search..." />
      <ul>
        {items.map((item) => (
          <li key={item}>{item}</li>
        ))}
      </ul>
    </div>
  )
}`,
  },
  {
    id: '6',
    slug: 'click-counter',
    title: 'Click Position Tracker',
    difficulty: 'medium',
    tags: ['events', 'hooks'],
    status: 'solved',
    referencePreviewSrc: 'about:blank',
    starterCode: `export function ClickTracker() {
  const handleClick = () => {}

  return (
    <div
      style={{ width: 300, height: 300, background: '#f0f0f0' }}
      onClick={handleClick}
    >
      <p>Click anywhere in this box</p>
    </div>
  )
}`,
  },
  {
    id: '7',
    slug: 'virtualized-table',
    title: 'Virtualized Table',
    difficulty: 'hard',
    tags: ['performance', 'components', 'hooks'],
    status: 'unsolved',
    referencePreviewSrc: 'about:blank',
    starterCode: `import { useState } from 'react'

export function VirtualizedTable() {
  const rows = Array.from({ length: 10000 }, (_, i) => ({
    id: i,
    name: \`Row \${i}\`,
    value: Math.floor(Math.random() * 100),
  }))

  return (
    <div style={{ height: 400, overflow: 'auto' }}>
      <table>
        <thead>
          <tr>
            <th>ID</th>
            <th>Name</th>
            <th>Value</th>
          </tr>
        </thead>
        <tbody>
          {rows.map((row) => (
            <tr key={row.id}>
              <td>{row.id}</td>
              <td>{row.name}</td>
              <td>{row.value}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}`,
  },
  {
    id: '8',
    slug: 'dynamic-form',
    title: 'Dynamic Form Builder',
    difficulty: 'hard',
    tags: ['forms', 'state', 'components', 'hooks'],
    status: 'unsolved',
    referencePreviewSrc: 'about:blank',
    starterCode: `import { useState } from 'react'

interface Field {
  label: string
  type: 'text' | 'number' | 'email'
  required: boolean
}

export function DynamicForm() {
  const [fields, setFields] = useState<Field[]>([
    { label: 'Name', type: 'text', required: true },
  ])

  return (
    <form onSubmit={(e) => e.preventDefault()}>
      {fields.map((field, i) => (
        <div key={i}>
          <label>{field.label}</label>
          <input type={field.type} required={field.required} />
        </div>
      ))}
      <button type="button">Add Field</button>
      <button type="submit">Submit</button>
    </form>
  )
}`,
  },
]
