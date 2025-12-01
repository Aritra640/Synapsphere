"use client";

import { atom } from "jotai";

export const userAtom = atom<string>("Username");

export const avatarAtom = atom<string>("url");
