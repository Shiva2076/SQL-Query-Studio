import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react-swc'

export default defineConfig({
  plugins: [react()],
  optimizeDeps: {
    exclude: ['codemirror'], // Exclude codemirror from optimization
    include: [
      'react-codemirror2',
      'codemirror/mode/sql/sql.js',
      'codemirror/addon/hint/show-hint.js',
      'codemirror/addon/hint/sql-hint.js',
      'codemirror/addon/edit/matchbrackets.js',
      'codemirror/addon/selection/active-line.js'
    ]
  }
})