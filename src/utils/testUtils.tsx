import { render } from '@testing-library/react';
import { I18nextProvider } from 'react-i18next';
import { App } from 'containers';
import i18n from 'utils/i18n';

export const renderTestApp = ({ route = '/' }) => {
  window.history.replaceState({}, '', route);
  return render(
    <I18nextProvider i18n={i18n}>
      <App />
    </I18nextProvider>
  );
};

export * from '@testing-library/react';
export { renderTestApp as render };
