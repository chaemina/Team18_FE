import { atom } from "jotai";
import { CHANNEL_TYPES } from "../../constants/chatting/CHAT";

export const channelIdAtom = atom("");
export const userIdAtom = atom("");

export const currentChannelTypeAtom = atom(CHANNEL_TYPES.PUBLIC.tabName);
