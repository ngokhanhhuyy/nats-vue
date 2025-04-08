import { getProtectedCertificateUpdateRoutePath } from "@/utils/routeUtils";

declare global {
  type CertificateDetailModel = {
    id: number;
    name: string;
    thumbnailUrl: string;
    updateRoute: string;
  };
}

function create(responseDto: CertificateResponseDto): CertificateDetailModel {
  return {
    id: responseDto.id,
    name: responseDto.name,
    thumbnailUrl: responseDto.thumbnailUrl,
    get updateRoute(): string {
      return getProtectedCertificateUpdateRoutePath(this.id);
    }
  };
}

export { create as createCertificateDetailModel };