import { StyleSheet, Platform } from 'react-native'
export const styles = StyleSheet.create({
    progressBarProgress: {
      backgroundColor: '#000',
      height: 4,
      borderRadius: 5,
    },
    progressBarBuffer: {
      backgroundColor: '#aaa',
      height: 4,
      borderRadius: 5,
    },
    progressBar: {
      height: 4,
      borderRadius: 5,
      backgroundColor: '#ccc',
      marginBottom: 15,
    },
    footerOffset: {
      height: 80
    },
    trackList: {
      paddingTop: 10
    },
    listSeparator: {
      backgroundColor: "#DDDDDD", 
      height: 1
    },
    trackListItemRow: {
      flexDirection: "row", 
      paddingHorizontal: 16, 
      paddingVertical: 5
    },
    footerContainer: {
      position: "absolute", 
      flexDirection: "column", 
      bottom: 0, 
      right:0,
      left:0,
      paddingTop: 15, 
      flex: 1, 
      paddingHorizontal: 16, 
      backgroundColor: "#DDDDDD", 
      opacity: 1, //0.95, 
      zIndex:1000,
      paddingBottom: Platform.OS === 'ios' ? 40 : 20, 
    },
    footerRow: {
      flex: 1, 
      flexDirection: "row", 
      justifyContent: "space-between",
      opacity: 1,
    },
    trackDetailsContainer: {
      flex: 1, 
      flexDirection: "column", 
      paddingHorizontal: 10, 
      justifyContent: "space-evenly"
    },
    trackTitle: {
      fontWeight: "bold"
    },
    albumImage: {
      width: 50,
      height: 50,
      borderRadius: 3,
      alignSelf: 'center',
      backgroundColor: "#ccc"
    },
    trackPlayerControlsContainer: {
      flexDirection: "column", 
      flex: 1,
    },
    trackPlayerControlsRow: {
      flexDirection: "row",
      justifyContent: "space-evenly",
      alignItems: "center"
    }
  });
  