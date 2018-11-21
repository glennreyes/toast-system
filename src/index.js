import React, { createContext, useState } from 'react';
import { createPortal } from 'react-dom';

const { Consumer, Provider } = createContext();

const ToastsProvider = ({ children, domNode = document.body }) => {
  const [toasts, setToasts] = useState([]);

  const toast = (content, duration) =>
    setToasts([...toasts, { content, duration, id: Date.now() }]);

  return (
    <Provider value={toast}>
      {children}
      {createPortal(
        <>
          {toasts.map(({ content, duration, id }) => (
            <ToastItem
              duration={duration}
              id={id}
              key={id}
              setToasts={setToasts}
              toasts={toasts}
            >
              {content}
            </ToastItem>
          ))}
        </>,
        domNode,
      )}
      ;
    </Provider>
  );
};

const ToastItem = ({ children, duration = 3000, id, setToasts, toasts }) => {
  setTimeout(
    () => setToasts(toasts.filter(toast => toast.id !== id)),
    duration,
  );

  return children;
};

export const Toast = Consumer;
export default ToastsProvider;
