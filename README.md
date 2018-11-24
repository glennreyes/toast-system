# toast-system

A minimalistic Toast notification system for React

- Zero dependencies
- Style-agnostic

## Usage

```sh
npm install react-toast
```

```js
import { ToastsProvider, Toast } from 'react-toast';

const App = ReactDOM.render(
  <ToastsProvider>
    <header>
      <h1>My app<h1>
    </header>
    <main>
      <Toast>
        {toast => <button onClick={() => toast(<div>Clicked!</div>, 1500)}>}
      </Toast>
    </main>
  </ToastsProvider>,
  document.getElementById('root')
);
```
