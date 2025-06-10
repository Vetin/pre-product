import { GreekFlag } from '../svg/flags/GreekFlag';
import { IsralianFlag } from '../svg/flags/IsralianFlag';
import { NorwegianFlag } from '../svg/flags/NorwegianFlat';
import { TurkishFlag } from '../svg/flags/TurkishFlag';

export const OTHERS = [
  {
    label: (
      <div
        style={{
          display: 'flex',
          flexDirection: 'row',
          alignItems: 'center',
          gap: 8,
        }}
      >
        <GreekFlag />
        <p style={{ margin: 0 }}>Greek</p>
      </div>
    ),
    value: 'EL',
  },
  {
    label: (
      <div
        style={{
          display: 'flex',
          flexDirection: 'row',
          alignItems: 'center',
          gap: 8,
        }}
      >
        <NorwegianFlag />
        <p style={{ margin: 0 }}>Norwegian</p>
      </div>
    ),
    value: 'NB',
  },
  {
    label: (
      <div
        style={{
          display: 'flex',
          flexDirection: 'row',
          alignItems: 'center',
          gap: 8,
        }}
      >
        <TurkishFlag />
        <p style={{ margin: 0 }}>Turkish</p>
      </div>
    ),
    value: 'TR',
  },
  {
    label: (
      <div
        style={{
          display: 'flex',
          flexDirection: 'row',
          alignItems: 'center',
          gap: 8,
        }}
      >
        <IsralianFlag />
        <p style={{ margin: 0 }}>Hebrew</p>
      </div>
    ),
    value: 'HE',
  },
];
