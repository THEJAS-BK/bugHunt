import Editor from '@monaco-editor/react'
import type { CodeEditorProps } from '../types'

export function CodeEditor({ code, onChange }: CodeEditorProps) {
  return (
    <div className="h-full overflow-hidden">
      <Editor
        height="100%"
        language="javascript"
        theme="vs-dark"
        value={code}
        onChange={(v) => onChange(v ?? '')}
        options={{
          minimap: { enabled: false },
          fontSize: 13,
          lineNumbers: 'on',
          scrollBeyondLastLine: false,
          wordWrap: 'on',
          tabSize: 2,
          padding: { top: 12 },
        }}
      />
    </div>
  )
}
