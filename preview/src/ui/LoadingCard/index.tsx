import { Card } from '../Card';
import { loadingCardStyles } from './styles';
import { Loader } from './loader';
import { Button } from '../Button';
import { Features } from './features';

export const LoadingCard = () => {
  return (
    <Card
      styles={{
        gap: 32,
        alignItems: 'center',
        justifyContent: 'center',
        padding: '40px 0',
      }}
    >
      <div style={loadingCardStyles.title}>
        <Loader />
        <p style={loadingCardStyles.titleText}>Translating your document</p>
      </div>

      <div style={loadingCardStyles.cta}>
        <p style={loadingCardStyles.ctaTitle}>
          Take your message further — go global with your videos in one click{' '}
          <span style={loadingCardStyles.ctaTitleMarked}>with Rask AI</span>
        </p>
        <Button size="small" styles={{ width: 'fit-content' }}>
          Translate 3 videos for free
        </Button>
      </div>

      <Features />
    </Card>
  );
};
