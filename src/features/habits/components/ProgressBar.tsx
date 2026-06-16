import { View } from 'react-native';

export function ProgressBar({ progress }: { progress: number }) {
  return (
    <View className="h-2 bg-card rounded-lg overflow-hidden">
      <View className="h-full bg-accent" style={{ width: `${progress}%` }} />
    </View>
  );
}
