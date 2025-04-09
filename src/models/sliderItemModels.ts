import { getProtectedSliderItemUpdateRoutePath } from "@/utils/routeUtils";

declare global {
  type SliderItemDetailModel = Implements<IHasThumbnailBasicModel, {
    id: number;
    title: string | null;
    index: number;
    thumbnailUrl: string;
    updateRoute: string;
  }>;

  type SliderItemUpsertModel = Implements<IHasThumbnailUpsertModel, {
    id: number;
    title: string;
    thumbnailUrl: string | null;
    thumbnailFile: string | null;
    thumbnailChanged: boolean;
    toRequestDto(): SliderItemUpsertRequestDto;
  }>;
}

function createDetail(responseDto: SliderItemResponseDto): SliderItemDetailModel {
  return {
    id: responseDto.id,
    title: responseDto.title,
    index: responseDto.index,
    thumbnailUrl: responseDto.thumbnailUrl ?? "https://placehold.co/1920x700",
    get updateRoute(): string {
      return getProtectedSliderItemUpdateRoutePath(this.id);
    }
  };
}

function createUpsert(responseDto?: SliderItemResponseDto): SliderItemUpsertModel {
  const model: SliderItemUpsertModel = {
    id: 0,
    title: "",
    thumbnailUrl: null,
    thumbnailFile: null,
    thumbnailChanged: false,
    toRequestDto() {
      return {
        title: this.title || null,
        thumbnailFile: this.thumbnailFile,
        thumbnailChanged: this.thumbnailChanged
      };
    }
  };

  if (responseDto) {
    model.id = responseDto.id;
    model.title = responseDto.title ?? "";
    model.thumbnailUrl = responseDto.thumbnailUrl;
  }

  return model;
}

export {
  createDetail as createSliderItemDetailModel,
  createUpsert as createSliderItemUpsertModel
};