import { featuresData } from './data';
import { styles } from './styles';

export const Features = () => {
  return (
    <div style={styles.container} className="feature-container">
      <style>
        {`
          @keyframes scroll {
            0% {
              transform: translateX(0);
            }
            100% {
              transform: translateX(-50%);
            }
          }


        `}
      </style>
      <div style={styles.scrollingWrapper}>
        <div style={styles.scrollingContent}>
          {featuresData.map((feature, index) => (
            <div
              key={`first-${index}`}
              style={{
                ...styles.featureContainer,
              }}
            >
              {feature.content}
            </div>
          ))}

          {featuresData.map((feature, index) => (
            <div
              key={`second-${index}`}
              style={{
                ...styles.featureContainer,
              }}
            >
              {feature.content}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
