import { featuresData } from './data';
import { featuresStyles } from './styles';

export const Features = () => {
  return (
    <div style={featuresStyles.container} className="feature-container">
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
      <div style={featuresStyles.scrollingWrapper}>
        <div style={featuresStyles.scrollingContent}>
          {featuresData.map((feature, index) => (
            <div
              key={`first-${index}`}
              style={{
                ...featuresStyles.featureContainer,
              }}
            >
              {feature.content}
            </div>
          ))}

          {featuresData.map((feature, index) => (
            <div
              key={`second-${index}`}
              style={{
                ...featuresStyles.featureContainer,
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
