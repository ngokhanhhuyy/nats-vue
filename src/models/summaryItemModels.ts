import { getPublicSummaryItemsRoutePath } from "@/utils/routeUtils";
import { getProtectedSummaryItemUpdateRoutePath } from "@/utils/routeUtils";

declare global {
  type SummaryItemDetailModel = {
    id: number;
    name: string;
    summaryContent: string;
    detailContent: string;
    thumbnailUrl: string;
    detailRoute: string;
    updateRoute: string;
  };
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

export { createDetail as createSummaryItemDetailModel };