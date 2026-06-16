import { Text } from 'react-native';
import clsx from 'clsx';

export function Today({ size }: { size?: 'small' | 'large' }) {
  const date = new Date();
  const options = { weekday: 'long' } as const;
  const today = date.toLocaleDateString('pt-BR', options);

  return (
    <Text
      className={clsx('text-textMuted uppercase', {
        'text-base': size === 'large',
        'text-xs': size !== 'large',
      })}
    >
      {today}
    </Text>
  );
}
