import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

function ScrollToTop() {
  const { pathname } = useLocation();

  useEffect(() => {
    console.log('ScrollToTop component mounted');
    console.log(`Current pathname: ${pathname}`);
    window.scrollTo(0, 0);
  }, [pathname]);

  return null;
}

export default ScrollToTop;