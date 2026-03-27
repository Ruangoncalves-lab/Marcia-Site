import { Routes, Route } from 'react-router-dom';
import { Page } from './Page';
import { Editor } from './Editor';

function App() {
  return (
    <div className="min-h-screen bg-surface-page selection:bg-accent-subtle selection:text-accent-primary">
      <Routes>
        <Route path="/" element={<Page />} />
        <Route path="/quem-somos" element={<Page />} />
        <Route path="/editor" element={<Editor />} />
        <Route path="/editor/quem-somos" element={<Editor />} />
      </Routes>
    </div>
  );
}

export default App;
