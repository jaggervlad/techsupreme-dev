export const GA_TRACKING_ID = 'G-226MBLFR8V'; //TODO: cambiar por gtag de gf

export const pageview = (url: string) => {
  // @ts-ignore
  window.gtag('config', GA_TRACKING_ID, {
    page_path: url,
  });
};

export const event = ({ action, category, label, value }: any) => {
  // @ts-ignore
  window.gtag('event', action, {
    event_category: category,
    event_label: label,
    value: value,
  });
};
