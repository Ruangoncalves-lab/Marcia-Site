import { createRoot } from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import './index.css'
import App from './App.tsx'
import { Component } from 'react'
import type { ReactNode } from 'react'

// Polyfill para crypto (necessário para o Puck v0.21+ e seus plugins em contextos não-seguros/Vite)
const cryptoObj = (typeof window !== 'undefined' ? window.crypto : null) as any;

if (cryptoObj) {
  if (!cryptoObj.randomUUID) {
    cryptoObj.randomUUID = function() {
      return ([1e7] as any + -1e3 + -4e3 + -8e3 + -1e11).replace(/[018]/g, (c: any) =>
        (c ^ crypto.getRandomValues(new Uint8Array(1))[0] & 15 >> c / 4).toString(16)
      );
    };
  }
  
  // Polyfill básico para randomFillSync
  if (!cryptoObj.randomFillSync) {
    cryptoObj.randomFillSync = function(buffer: any) {
      const values = crypto.getRandomValues(new Uint8Array(buffer.length));
      for (let i = 0; i < buffer.length; i++) {
        buffer[i] = values[i];
      }
      return buffer;
    };
  }
}

class SimpleErrorBoundary extends Component<{children: ReactNode}, {hasError: boolean, error: Error | null}> {
  constructor(props: any) {
    super(props);
    this.state = { hasError: false, error: null };
  }
  static getDerivedStateFromError(error: any) { return { hasError: true, error }; }
  componentDidCatch(error: any, errorInfo: any) { console.error("CRASH DETECTADO:", error, errorInfo); }
  render() {
    if (this.state.hasError) {
      return (
        <div style={{ padding: '20px', color: 'red', background: '#fff' }}>
          <h1>Algo deu errado na carga do site.</h1>
          <pre>{this.state.error?.message}</pre>
          <button onClick={() => window.location.reload()}>Recarregar</button>
        </div>
      );
    }
    return this.props.children;
  }
}

console.log("Iniciando renderização do React...");
const rootElement = document.getElementById('root');
if (!rootElement) {
  console.error("ERRO: Elemento #root não encontrado!");
} else {
  createRoot(rootElement).render(
    <SimpleErrorBoundary>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </SimpleErrorBoundary>,
  )
  console.log("React renderizado no #root.");
}
