/* eslint-disable no-undef */
import { writable } from 'svelte/store'

import videos from '../../../data/story-player-videos.json'

export const isMutedAudioStore = writable(true)
export const isLoadingVideoStore = writable(false)
export const videoPlayingIndexStore = writable(0)
export const videoSourcesStore = writable<StoryPlayer.Source[]>(videos)
