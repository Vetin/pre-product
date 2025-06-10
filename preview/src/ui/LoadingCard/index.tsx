import { Card } from '../Card';
import { styles } from './styles';
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
      <div style={styles.title}>
        <Loader />
        <p style={styles.titleText}>Translating your document</p>
      </div>

      <div style={styles.cta}>
        <p style={styles.ctaTitle}>
          Take your message further — go global with your videos in one click{' '}
          <span style={styles.ctaTitleMarked}>with Rask AI</span>
        </p>
        <Button size="small" styles={{ width: 'fit-content' }}>
          Translate 3 videos for free
        </Button>
      </div>

      <Features />
    </Card>
  );
};
