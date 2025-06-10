export const styles = {
  title: {
    display: 'flex',
    alignItems: 'center',
    gap: 8,
  },
  titleText: {
    color: '#000',
    fontSize: 16,
    fontWeight: 400,
    lineHeight: '20px',
    letterSpacing: '-0.16px',
    margin: 0,
    fontFamily: 'Suisse Intl',
  },
  cta: {
    display: 'flex',
    flexDirection: 'column',
    gap: 20,
    alignItems: 'center',
  },
  ctaTitle: {
    color: '#000',
    textAlign: 'center',
    fontSize: 24,
    fontWeight: 400,
    lineHeight: '130%',
    letterSpacing: '-0.72px',
    fontFamily: 'Suisse Intl',
    maxWidth: 482,
    margin: 0,
  },
  ctaTitleMarked: {
    color: '#00F',
    fontStyle: 'italic',
  },
} as const;
