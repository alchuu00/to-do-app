import { atom } from "jotai";
import { atomWithStorage } from "jotai/utils";

export const showCategoryFormAtom = atom(false);
export const categoryListAtom = atomWithStorage("categories", []);
export const selectedFilterAtom = atom("All");
export const selectedCategoryAtom = atom("");
