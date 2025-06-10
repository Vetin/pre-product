import { Card } from '../Card';

export const ResponseCard = () => {
  return (
    <Card
      styles={{
        gap: 24,
        alignItems: 'center',
        justifyContent: 'center',
        paddingTop: 32,
      }}
    >
      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
          gap: 4,
          justifyContent: 'center',
        }}
      >
        <p style={{ fontSize: 16, fontWeight: 600 }}>
          Your translation is ready!
        </p>
        <p>Translate another document</p>
      </div>
    </Card>
  );
};
