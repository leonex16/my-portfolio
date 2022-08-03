/* eslint-disable no-unused-vars */

type SvelteEvent<T = Event> = Event & { currentTarget: EventTarget & T };
