import { StyleSheet, Platform } from "react-native";
import { colors } from "./colors";

export const toolbarStyles = StyleSheet.create({
  progressBarProgress: {
    backgroundColor: colors.progressColor,
    height: 4,
    borderRadius: 5,
  },
  progressBarBuffer: {
    backgroundColor: colors.bufferColor,
    height: 4,
    borderRadius: 5,
  },
  progressBar: {
    height: 4,
    borderRadius: 5,
    backgroundColor: colors.progressBarBackgroundColor,
    marginBottom: 15,
  },
  toolbarContainer: {
    position: "absolute",
    flexDirection: "column",
    bottom: 0,
    right: 0,
    left: 0,
    paddingTop: 15,
    flex: 1,
    paddingHorizontal: 16,
    backgroundColor: colors.toolbarBackground,
    opacity: 1,
    zIndex: 1000,
    paddingBottom: Platform.OS === "ios" ? 40 : 20,
  },
  toolbarRow: {
    flex: 1,
    flexDirection: "row",
    justifyContent: "space-between",
    opacity: 1,
  },
  trackPlayerControlsContainer: {
    flexDirection: "column",
    flex: 1,
  },
  trackPlayerControlsRow: {
    flexDirection: "row",
    justifyContent: "space-evenly",
    alignItems: "center",
  },
});

export const trackListStyles = StyleSheet.create({
  footerOffset: {
    height: Platform.OS === "ios" ? 100 : 115,
  },
  trackList: {
    paddingTop: 10,
  },
  listSeparator: {
    backgroundColor: colors.listSeparatorColor,
    height: 1,
  },
  trackListItemRow: {
    flexDirection: "row",
    paddingHorizontal: 16,
    paddingVertical: 5,
  },
});

export const sharedStyles = StyleSheet.create({
  trackDetailsContainer: {
    flex: 1,
    flexDirection: "column",
    paddingHorizontal: 10,
    justifyContent: "space-evenly",
  },
  trackTitle: {
    fontWeight: "bold",
  },
  albumImage: {
    width: 50,
    height: 50,
    borderRadius: 3,
    alignSelf: "center",
    backgroundColor: colors.albumImagePlaceholder,
  },
});
