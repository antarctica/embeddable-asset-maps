import { cva } from '@styled-system/css';

export const buttonRecipe = cva({
  base: {
    bg: 'grayscale.200',
    color: 'grayscale.700',
    _hover: {
      bg: 'grayscale.300',
      cursor: 'pointer',
    },
    _active: {
      bg: 'grayscale.350',
    },
  },
  variants: {
    size: {
      sm: {
        fontSize: 'sm',
        p: '1',
      },
      md: {
        fontSize: 'md',
        p: '2',
      },
      lg: {
        fontSize: 'lg',
        p: '4',
      },
    },
    isDisabled: {
      true: {
        color: 'grayscale.400',
        _hover: {
          cursor: 'not-allowed',
        },
      },
    },
    isFocusVisible: {
      true: {
        insetFocusRing: true,
      },
      false: {
        insetFocusRing: false,
      },
    },
    IconButton: {
      true: {
        p: '0',
      },
    },
  },

  defaultVariants: {
    size: 'lg',
  },
});
