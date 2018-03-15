import App from '../pages/app.js'
import { BrowserRouter } from 'react-router-dom';

const Main = () => (
    <BrowserRouter>
        <App path="/" />
    </BrowserRouter>
);

ReactDom.render(<Main />, document.getElementById("app"), async () => {
  if (process.env.NODE_ENV!='development') {
    await import('./pwa.js');
    window.performance.mark('mark_fully_loaded');
  }
});
