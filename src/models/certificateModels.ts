import { getProtectedCertificateUpdateRoutePath } from "@/utils/routeUtils";

declare global {
  type CertificateDetailModel = Implements<IHasThumbnailDetailModel, {
    id: number;
    name: string;
    thumbnailUrl: string;
    updateRoute: string;
  }>;

  type CertificateUpsertModel = Implements<IHasThumbnailUpsertModel, {
    id: number;
    name: string;
    thumbnailUrl: string | null;
    thumbnailFile: string | null;
    thumbnailChanged: boolean;
    toRequestDto(): CertificateUpsertRequestDto;
  }>;
}

function createDetail(responseDto: CertificateResponseDto): CertificateDetailModel {
  return {
    id: responseDto.id,
    name: responseDto.name,
    thumbnailUrl: responseDto.thumbnailUrl,
    get updateRoute(): string {
      return getProtectedCertificateUpdateRoutePath(this.id);
    }
  };
}

function createUpsert(responseDto?: CertificateResponseDto): CertificateUpsertModel {
  const model: CertificateUpsertModel = {
    id: 0,
    name: "",
    thumbnailUrl: null,
    thumbnailFile: null,
    thumbnailChanged: false,
    toRequestDto() {
      return {
        id: this.id,
        name: this.name,
        thumbnailFile: this.thumbnailFile,
        thumbnailChanged: this.thumbnailChanged
      };
    }
  };

  if (responseDto) {
    model.id = responseDto.id;
    model.name = responseDto.name;
    model.thumbnailUrl = responseDto.thumbnailUrl;
  }

  return model;
}

export {
  createDetail as createCertificateDetailModel,
  createUpsert as createCertificateUpsertModel
};