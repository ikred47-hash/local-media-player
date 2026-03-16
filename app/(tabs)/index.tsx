import { Video } from 'expo-av';
import * as DocumentPicker from 'expo-document-picker';
import React, { useState } from 'react';
import { Dimensions, StyleSheet, Text, TouchableOpacity, View } from 'react-native';

export default function App() {
  const [videoUri, setVideoUri] = useState<string | null>(null);

  const pickVideo = async () => {
    let result = await DocumentPicker.getDocumentAsync({
      type: 'video/*', // This tells the phone to only show video files
      copyToCacheDirectory: true,
    });

    if (!result.canceled) {
      setVideoUri(result.assets[0].uri);
    }
  };

  if (videoUri) {
    return (
      <View style={styles.container}>
        <Video
          source={{ uri: videoUri }}
          rate={1.0}
          volume={1.0}
          isMuted={false}
          resizeMode={undefined}
          shouldPlay
          useNativeControls
          style={{ width: Dimensions.get('window').width, height: 400 }}
        />
        <TouchableOpacity style={styles.button} onPress={() => setVideoUri(null)}>
          <Text style={styles.buttonText}>PICK ANOTHER VIDEO</Text>
        </TouchableOpacity>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Simple Video Player</Text>
      <Text style={styles.subText}>Select a video from your storage to play it.</Text>
      
      <TouchableOpacity style={styles.button} onPress={pickVideo}>
        <Text style={styles.buttonText}>CHOOSE VIDEO</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#000', justifyContent: 'center', alignItems: 'center' },
  header: { fontSize: 28, fontWeight: 'bold', color: '#fff', marginBottom: 10 },
  subText: { color: '#888', marginBottom: 30, textAlign: 'center', paddingHorizontal: 20 },
  button: { backgroundColor: '#007AFF', paddingHorizontal: 30, paddingVertical: 15, borderRadius: 10 },
  buttonText: { color: '#fff', fontWeight: 'bold', fontSize: 18 }
});