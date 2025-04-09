import { ThumbnailType } from "@/enums/thumbnailType";
import { getPublicAboutUsIntroductionRoutePath } from "@/utils/routeUtils";

declare global {
  type AboutUsIntroductionDetailModel = Implements<IHasThumbnailDetailModel, {
    thumbnailUrl: string;
    thumbnailType: ThumbnailType;
    mainQuoteContent: string;
    aboutUsContent: string;
    whyChooseUsContent: string;
    ourDifferenceContent: string;
    ourCultureContent: string;
    detailRoute: string;
  }>;

  type AboutUsIntroductionUpdateModel = Implements<IHasThumbnailUpsertModel, {
    thumbnailUrl: string | null;
    thumbnailFile: string | null;
    thumbnailChanged: boolean;
    mainQuoteContent: string;
    aboutUsContent: string;
    whyChooseUsContent: string;
    ourDifferenceContent: string;
    ourCultureContent: string;
    toRequestDto(): AboutUsIntroductionUpdateRequestDto;
  }>;
}

type ResponseDto = AboutUsIntroductionResponseDto;

function createDetail(responseDto: ResponseDto): AboutUsIntroductionDetailModel {
  return {
    thumbnailUrl: responseDto.thumbnailUrl ?? "https://placehold.co/900x500",
    thumbnailType: responseDto.thumbnailType,
    mainQuoteContent: responseDto.mainQuoteContent,
    aboutUsContent: responseDto.aboutUsContent,
    whyChooseUsContent: responseDto.whyChooseUsContent,
    ourDifferenceContent: responseDto.ourDifferenceContent,
    ourCultureContent: responseDto.ourCultureContent,
    detailRoute: getPublicAboutUsIntroductionRoutePath()
  };
}

function createUpdate(responseDto: ResponseDto): AboutUsIntroductionUpdateModel {
  return {
    thumbnailUrl: responseDto.thumbnailUrl,
    thumbnailFile: null,
    thumbnailChanged: false,
    mainQuoteContent: responseDto.mainQuoteContent,
    aboutUsContent: responseDto.aboutUsContent,
    whyChooseUsContent: responseDto.whyChooseUsContent,
    ourDifferenceContent: responseDto.ourDifferenceContent,
    ourCultureContent: responseDto.ourCultureContent,
    toRequestDto() {
      return {
        thumbnailFile: this.thumbnailFile,
        thumbnailChanged: this.thumbnailChanged,
        mainQuoteContent: this.mainQuoteContent,
        aboutUsContent: this.aboutUsContent,
        whyChooseUsContent: this.whyChooseUsContent,
        ourDifferenceContent: this.ourDifferenceContent,
        ourCultureContent: this.ourCultureContent
      };
    }
  };
}

export {
  createDetail as createAboutUsIntroductionDetailModel,
  createUpdate as createAboutUsIntroductionUpdateModel
};