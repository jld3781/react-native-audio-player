import { StatusBar } from 'expo-status-bar';
import React, { useEffect } from 'react';
import { Image, Text, View, SafeAreaView, FlatList, TouchableHighlight } from 'react-native';
import TrackPlayer from 'react-native-track-player';
import { setupTrackPlayer, startTrack } from './helpers'
import { tracks } from './tracks'
import { styles } from './styles'
import { Footer } from './Footer'

export default function App() {
  useEffect(() => {
    setupTrackPlayer(tracks)
    return () => TrackPlayer.destroy()
  }, [])

  const renderTrack = ({ item }) => {
    if (item === null || item === undefined || item === {}) return null

    return (
      <TouchableHighlight 
        activeOpacity={0.9}
        underlayColor="#DDDDDD" 
        onPress={() => startTrack(item)}
      >
      
        <View 
          key={item.id} 
          style={styles.trackListItemRow}
        >
          
            <Image 
              source={{ uri: item.artwork}} 
              style={styles.albumImage} 
            />

            <View style={styles.trackDetailsContainer}>
              <Text style={styles.trackTitle}>{ item.title }</Text>
              <Text>{ item.artist }</Text>
            </View>
            
        </View>

      </TouchableHighlight>
    )  
  }

  return (
    <SafeAreaView>
        <StatusBar style="auto" />
        <FlatList
          data={tracks}
          renderItem={renderTrack}
          keyExtractor={item => item.id}
          style={styles.trackList}
          ItemSeparatorComponent={() => <View style={styles.listSeparator} />}
          ListFooterComponent={() => <View style={styles.footerOffset} /> }
        />
        <Footer /> 
    </SafeAreaView>
  );
}