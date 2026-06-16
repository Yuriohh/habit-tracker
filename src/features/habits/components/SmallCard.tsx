import { Text, View } from 'react-native';
import clsx from 'clsx';

type SmallCardProps = {
  label: string;
  value: number;
  progress?: boolean;
};

export function SmallCard({ label, value, progress }: SmallCardProps) {
  return (
    <View className="flex-1 flex-col justify-between items-start bg-card h-[85px] p-3 rounded-lg">
      <Text className="text-textMuted text-sm">{label}</Text>
      <Text
        className={clsx('text-2xl font-bold', {
          'text-accent': progress,
          'text-white': !progress,
        })}
      >
        {value}
        {progress ? '%' : ''}
      </Text>
    </View>
  );
}
