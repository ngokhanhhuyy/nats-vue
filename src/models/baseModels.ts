declare global {
  type Implements<T, U extends T> = U;

  interface IClonableModel<TModel extends object> {
    from(data: Partial<TModel>): TModel;
  }

  interface IHasThumbnailBasicModel {
    thumbnailUrl: string;
  }

  interface IHasThumbnailDetailModel {
    thumbnailUrl: string;
  }

  interface IHasThumbnailUpsertModel {
    thumbnailUrl: string | null;
    thumbnailFile: string | null;
    thumbnailChanged: boolean;
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
