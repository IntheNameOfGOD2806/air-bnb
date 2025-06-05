export const proccessSlice = (set: any, get: any) => ({
  locationType: undefined,
  setLocationType: (locationType: any) => set({ locationType }),
  placeType: undefined,
  setPlaceType: (placeType: any) => set({ placeType }),
  mapData: undefined,
  setMapData: (mapData: any) => set({ mapData }),
  locationData: undefined,
  setLocationData: (locationData: any) => set({ locationData }),
  placeSpace: {
    bathrooms: 1,
    beds:1,
    guests:4
  },
  setPlaceSpace: (placeSpace: any) => set({ placeSpace }),
  placeAmenities: [],
  setPlaceAmenities: (placeAmenities: any) => set({ placeAmenities })
});

export type ProccessState = ReturnType<typeof proccessSlice>;
