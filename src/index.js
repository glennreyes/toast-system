import React, { createContext, Fragment, useEffect, useState } from 'react';
import { createPortal } from 'react-dom';

// Custom hook
const useToasts = ({ duration: defaultDuration = 3000 }) => {
  const [toasts, setToasts] = useState([]);
  const removeToast = id =>
    setToasts(prevToasts => prevToasts.filter(toast => toast.id !== id));
  const toast = (element = null, duration = defaultDuration) => {
    const id = Date.now();
    const timer =
      duration > 0 ? setTimeout(() => removeToast(id), duration) : null;
    setToasts([...toasts, { element, duration, id, timer }]);
  };

  return { removeToast, toast, toasts };
};

// Components
const { Consumer, Provider } = createContext();
export const Toast = Consumer;
export const ToastsProvider = ({
  children,
  container: Container = Fragment,
  domNode = document.body,
  duration,
}) => {
  const { removeToast, toast, toasts } = useToasts({ duration });
  useEffect(() => () => toasts.forEach(toast => clearTimeout(toast.timer)), []);

  const element = (
    <Container>
      {toasts.map(({ element, id }) => (
        <element.type
          {...element.props}
          dismiss={() => removeToast(id)}
          key={id}
        />
      ))}
    </Container>
  );

  return (
    <Provider value={toast}>
      {children}
      {domNode ? createPortal(element, domNode) : element}
    </Provider>
  );
};
