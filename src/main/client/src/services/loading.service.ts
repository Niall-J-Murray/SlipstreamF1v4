export const loader = document.querySelector('.loader');
// if you want to show the loader when React loads data again
export const showLoader = () => loader?.classList.remove('loader--hide');

export const hideLoader = () => loader?.classList.add('loader--hide');