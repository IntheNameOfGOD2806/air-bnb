export const proccessSlice = (set: any, get: any) => ({
  locationType: "",
  setLocationType: (locationType: any) => set({ locationType }),
  placeType: "",
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
  price:0,
  setPrice: (price: any) => set({ price }),
  title:'',
  setTitle: (title: any) => set({ title }),
  description:'',
  setDescription: (description: any) => set({ description }),
  setPlaceSpace: (placeSpace: any) => set({ placeSpace }),
  placeAmenities: [],
  setPlaceAmenities: (placeAmenities: any) => set({ placeAmenities }),
  photos: [],
  setPhotos: (photos: any) => set({ photos })
  
});

export type ProccessState = ReturnType<typeof proccessSlice>;
