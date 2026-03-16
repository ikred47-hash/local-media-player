import { Ionicons } from '@expo/vector-icons';
import { ResizeMode, Video } from 'expo-av';
import * as DocumentPicker from 'expo-document-picker';
import * as ScreenOrientation from 'expo-screen-orientation';
import React, { useRef, useState } from 'react';
import { Dimensions, StyleSheet, Text, TouchableOpacity, View } from 'react-native';

const { width, height } = Dimensions.get('window');

export default function App() {
  const [videoUri, setVideoUri] = useState<string | null>(null);
  const [isFullScreen, setIsFullScreen] = useState(false);
  const video = useRef<Video>(null);

  // Function to toggle True Full Screen
  const toggleFullScreen = async () => {
    if (!isFullScreen) {
      await ScreenOrientation.lockAsync(ScreenOrientation.OrientationLock.LANDSCAPE_LEFT);
      setIsFullScreen(true);
    } else {
      await ScreenOrientation.lockAsync(ScreenOrientation.OrientationLock.PORTRAIT_UP);
      setIsFullScreen(false);
    }
  };

  const pickVideo = async () => {
    let result = await DocumentPicker.getDocumentAsync({ type: 'video/*', copyToCacheDirectory: true });
    if (!result.canceled) {
      setVideoUri(result.assets[0].uri);
    }
  };

  if (videoUri) {
    return (
      <View style={isFullScreen ? styles.fullContainer : styles.container}>
        <View style={isFullScreen ? styles.fullVideoWrapper : styles.videoWrapper}>
          <Video
            ref={video}
            style={isFullScreen ? styles.fullVideo : styles.video}
            source={{ uri: videoUri }}
            resizeMode={ResizeMode.CONTAIN}
            shouldPlay
            useNativeControls={true} // Restoring native controls for the seek bar
          />

          {/* Full Screen Toggle Button */}
          <TouchableOpacity style={styles.fullScreenBtn} onPress={toggleFullScreen}>
            <Ionicons name={isFullScreen ? "contract" : "expand"} size={24} color="white" />
          </TouchableOpacity>
        </View>

        {!isFullScreen && (
          <TouchableOpacity style={styles.closeBtn} onPress={() => setVideoUri(null)}>
            <Ionicons name="close-outline" size={30} color="white" />
          </TouchableOpacity>
        )}
      </View>
    );
  }

  return (
    <View style={styles.mainContainer}>
      <Ionicons name="film" size={100} color="#007AFF" />
      <Text style={styles.header}>Onyx Cinema</Text>
      <TouchableOpacity style={styles.button} onPress={pickVideo}>
        <Text style={styles.buttonText}>SELECT MOVIE</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#000', justifyContent: 'center' },
  fullContainer: { position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', backgroundColor: '#000' },
  videoWrapper: { width: width, height: 300 },
  fullVideoWrapper: { width: '100%', height: '100%' },
  video: { width: '100%', height: '100%' },
  fullVideo: { width: '100%', height: '100%' },
  fullScreenBtn: { 
    position: 'absolute', 
    bottom: 20, 
    right: 20, 
    backgroundColor: 'rgba(0,0,0,0.6)', 
    padding: 10, 
    borderRadius: 10,
    zIndex: 10
  },
  mainContainer: { flex: 1, backgroundColor: '#000', justifyContent: 'center', alignItems: 'center' },
  header: { fontSize: 32, fontWeight: 'bold', color: '#fff', marginBottom: 40 },
  button: { backgroundColor: '#007AFF', paddingHorizontal: 40, paddingVertical: 15, borderRadius: 50 },
  buttonText: { color: '#fff', fontWeight: 'bold' },
  closeBtn: { position: 'absolute', top: 50, right: 20, backgroundColor: 'rgba(255,255,255,0.2)', borderRadius: 25, padding: 5 }
});