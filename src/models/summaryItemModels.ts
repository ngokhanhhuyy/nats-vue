import { getPublicSummaryItemsRoutePath } from "@/utils/routeUtils";
import { getProtectedSummaryItemUpdateRoutePath } from "@/utils/routeUtils";

declare global {
  type SummaryItemDetailModel = Implements<IHasThumbnailDetailModel, {
    id: number;
    name: string;
    summaryContent: string;
    detailContent: string;
    thumbnailUrl: string;
    detailRoute: string;
    updateRoute: string;
  }>;

  type SummaryItemUpsertModel = Implements<IHasThumbnailUpsertModel, {
    id: number;
    name: string;
    summaryContent: string;
    detailContent: string;
    thumbnailUrl: string | null;
    thumbnailFile: string | null;
    thumbnailChanged: boolean;
    toRequestDto(): SummaryItemUpdateRequestDto;
  }>;
}

function createDetail(responseDto: SummaryItemResponseDto): SummaryItemDetailModel {
  return {
    id: responseDto.id,
    name: responseDto.name,
    summaryContent: responseDto.summaryContent,
    detailContent: responseDto.detailContent,
    thumbnailUrl: responseDto.thumbnailUrl ?? "https://placehold.co/256",
    get detailRoute(): string {
      return getPublicSummaryItemsRoutePath(this.id);
    },
    get updateRoute(): string {
      return getProtectedSummaryItemUpdateRoutePath(this.id);
    }
  };
}

function createUpsert(responseDto?: SummaryItemResponseDto): SummaryItemUpsertModel {
  const model: SummaryItemUpsertModel = {
    id: 0,
    name: "",
    summaryContent: "",
    detailContent: "",
    thumbnailUrl: null,
    thumbnailFile: null,
    thumbnailChanged: false,
    toRequestDto() {
      return {
        name: this.name,
        summaryContent: this.summaryContent || null,
        detailContent: this.detailContent,
        thumbnailFile: this.thumbnailFile || null,
        thumbnailChanged: this.thumbnailChanged
      };
    }
  };

  if (responseDto) {
    model.id = responseDto.id;
    model.name = responseDto.name;
    model.summaryContent = responseDto.summaryContent;
    model.detailContent = responseDto.detailContent;
    model.thumbnailUrl = responseDto.thumbnailUrl;
  }

  return model;
}

export {
  createDetail as createSummaryItemDetailModel,
  createUpsert as createSummaryItemUpsertModel
};