import { cva } from '@styled-system/css';
import { Box } from '@styled-system/jsx';

import SpinLoader from '../SpinLoader';

const loadingScrim = cva({
  base: {
    position: 'absolute',
    inset: '0',
    bg: 'htmlBackground',
    width: 'full',
    height: 'full',
    placeContent: 'center',
    opacity: 0,
    transition: 'all',
    transitionDuration: '[600ms]',
    transitionBehavior: 'allow-discrete',
  },
  variants: {
    isLoading: {
      true: {
        opacity: '1',
        display: 'grid',
      },
      false: {
        display: 'none',
        opacity: '0',
      },
    },
  },
});
function LoadingScrim({ isLoading }: { isLoading: boolean }) {
  return (
    <Box className={loadingScrim({ isLoading })}>
      <SpinLoader size={100}></SpinLoader>
    </Box>
  );
}

export default LoadingScrim;
