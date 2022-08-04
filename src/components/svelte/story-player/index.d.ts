/* eslint-disable no-unused-vars */
/* eslint-disable no-tabs */
/* eslint-disable no-undef */

declare namespace StoryPlayer {
	export interface Source {
		src: string;
		poster: string;
		progressBarRef: HTMLDivElement;
	}

	export interface Story {
		label: string;
		image: string;
		sources: Source[];
	}
}
