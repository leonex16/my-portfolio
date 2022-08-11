/* eslint-disable no-undef */
import { writable } from 'svelte/store'

import stories from '../../../data/story-player-stories.json'

export const isMutedAudioStore = writable(true)
export const isVideoPlayingStore = writable(true)
export const isVideoLoadingStore = writable(false)
export const videoPlayingIndexStore = writable(0)
export const videoSourcesStore = writable<StoryPlayer.Source[]>(stories[0].sources)
