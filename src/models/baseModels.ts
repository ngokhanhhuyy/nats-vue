declare global {
  type Implements<T, U extends T> = U;

  interface IClonableModel<TModel extends object> {
    from(data: Partial<TModel>): TModel;
  }

  interface IHasThumbnailBasicModel {
    thumbnailUrl: string | null;
  }

  interface IHasThumbnailDetailModel {
    thumbnailUrl: string | null;
  }

  interface IHasThumbnailUpsertModel {
    thumbnailUrl: string | null;
    thumbnailFile: string | null;
    thumbnailChanged: boolean;
  }

  interface IHasPhotosDetailModel<TPhoto extends IDetailPhotoModel> {
    photos: TPhoto[];
  }

  interface IHasPhotosUpsertModel<TPhoto extends IUpsertPhotoModel> {
    photos: TPhoto[];
  }

  interface IDetailPhotoModel {
    id: number;
    url: string;
    description: string | null;
  }

  interface IUpsertPhotoModel {
    id: number | null;
    description: string;
    url: string | null;
    file: string | null;
    isDeleted: boolean;
  }
}

function create<TModel extends object>(): IClonableModel<TModel> {
  return {
    from(data: Partial<TModel>): TModel {
      return { ...this, ...data } as TModel;
    },
  };
}

export { create as createClonableModel };
