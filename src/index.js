import React, { createContext, Fragment, useState } from 'react';
import { createPortal } from 'react-dom';

// Custom hook
const useToasts = () => {
  const [toasts, setToasts] = useState([]);

  const removeToast = id =>
    setToasts(prevToasts => prevToasts.filter(toast => toast.id !== id));

  const toast = (element, duration = 3000) => {
    const id = Date.now();
    setToasts([...toasts, { element, duration, id }]);
    setTimeout(() => removeToast(id), duration);
  };

  return { removeToast, toast, toasts };
};

// Components
const { Consumer, Provider } = createContext();
const ToastsProvider = ({
  children,
  container: Container = Fragment,
  domNode = document.body,
}) => {
  const { removeToast, toast, toasts } = useToasts();

  return (
    <Provider value={toast}>
      {children}
      {createPortal(
        <Container>
          {toasts.map(({ element, id }) => (
            <element.type
              {...element.props}
              dismiss={() => removeToast(id)}
              key={id}
            />
          ))}
        </Container>,
        domNode,
      )}
    </Provider>
  );
};

export const Toast = Consumer;
export const Toasts = ToastsProvider;
