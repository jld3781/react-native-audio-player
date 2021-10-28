import { StatusBar } from 'expo-status-bar';
import React, { useEffect } from 'react';
import { Image, Text, View, SafeAreaView, FlatList, TouchableHighlight } from 'react-native';
import TrackPlayer from 'react-native-track-player';
import { setupTrackPlayer, startTrack } from './helpers'
import { tracks } from './tracks'
import { sharedStyles, trackListStyles } from './styles'
import { CurrentTrackToolbar } from './CurrentTrackToolbar'
import { isEmpty } from 'lodash'
import { colors } from './colors'

export default function App() {
  useEffect(() => {
    setupTrackPlayer(tracks)
    return () => TrackPlayer.destroy()
  }, [])

  const renderTrack = ({ item }) => {
    if (isEmpty(item)) return null

    return (
      <TouchableHighlight 
        activeOpacity={0.9}
        underlayColor={colors.rowHighlight} 
        onPress={() => startTrack(item)}
      >
      
        <View 
          key={item.id} 
          style={trackListStyles.trackListItemRow}
        >
          
            <Image 
              source={{ uri: item.artwork }} 
              style={sharedStyles.albumImage} 
            />

            <View style={sharedStyles.trackDetailsContainer}>
              <Text style={sharedStyles.trackTitle}>{ item.title }</Text>
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
          style={trackListStyles.trackList}
          ItemSeparatorComponent={() => <View style={trackListStyles.listSeparator} />}
          ListFooterComponent={() => <View style={trackListStyles.footerOffset} /> }
        />
        <CurrentTrackToolbar /> 
    </SafeAreaView>
  );
}