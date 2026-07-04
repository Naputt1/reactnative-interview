import { TextInput, StyleSheet, Pressable } from 'react-native';
import { ThemedView } from './themed-view';
import { ThemedText } from './themed-text';
import { useTheme } from '@/hooks/use-theme';
import { Spacing } from '@/constants/theme';

interface SearchBarProps {
  value: string;
  onChangeText: (text: string) => void;
  placeholder?: string;
}

export function SearchBar({ value, onChangeText, placeholder = 'Search products...' }: SearchBarProps) {
  const theme = useTheme();

  return (
    <ThemedView type="backgroundElement" style={styles.container}>
      <ThemedText style={styles.icon}>🔍</ThemedText>
      <TextInput
        value={value}
        onChangeText={onChangeText}
        placeholder={placeholder}
        placeholderTextColor={theme.textSecondary}
        style={[
          styles.input,
          { color: theme.text },
        ]}
        autoCorrect={false}
        autoCapitalize="none"
        clearButtonMode="while-editing"
      />
      {value.length > 0 && (
        <Pressable onPress={() => onChangeText('')} style={styles.clear}>
          <ThemedText style={styles.clearText}>✕</ThemedText>
        </Pressable>
      )}
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    marginHorizontal: Spacing.three,
    marginBottom: Spacing.two,
    paddingHorizontal: Spacing.three,
    borderRadius: Spacing.three,
    height: 44,
  },
  icon: {
    fontSize: 16,
    marginRight: Spacing.two,
  },
  input: {
    flex: 1,
    fontSize: 16,
    height: '100%',
  },
  clear: {
    padding: Spacing.half,
  },
  clearText: {
    fontSize: 16,
  },
});
