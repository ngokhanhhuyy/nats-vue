import { getProtectedMemberUpdateRoutePath } from "@/utils/routeUtils";

declare global {
  type MemberDetailModel = Implements<IHasThumbnailDetailModel, {
    id: number;
    fullName: string;
    roleName: string;
    description: string;
    thumbnailUrl: string;
    updateRoute: string;
  }>;

  type MemberUpsertModel = Implements<IHasThumbnailUpsertModel, {
    id: number;
    fullName: string;
    roleName: string;
    description: string;
    thumbnailUrl: string | null;
    thumbnailFile: string | null;
    thumbnailChanged: boolean;
    toRequestDto(): MemberUpsertRequestDto;
  }>;
}

function createDetail(responseDto: MemberResponseDto): MemberDetailModel {
  return {
    id: responseDto.id,
    fullName: responseDto.fullName,
    roleName: responseDto.roleName,
    description: responseDto.description,
    thumbnailUrl: responseDto.thumbnailUrl ?? "https://placehold.co/512x512",
    get updateRoute(): string {
      return getProtectedMemberUpdateRoutePath(this.id);
    }
  };
}

function createUpsert(responseDto?: MemberResponseDto): MemberUpsertModel {
  const model: MemberUpsertModel = {
    id: 0,
    fullName: "",
    roleName: "",
    description: "",
    thumbnailUrl: null,
    thumbnailFile: null,
    thumbnailChanged: false,
    toRequestDto() {
      return {
        id: this.id,
        fullName: this.fullName,
        roleName: this.roleName,
        description: this.description,
        thumbnailFile: this.thumbnailFile,
        thumbnailChanged: this.thumbnailChanged
      };
    }
  };

  if (responseDto) {
    model.id = responseDto.id;
    model.fullName = responseDto.fullName;
    model.roleName = responseDto.roleName;
    model.description = responseDto.description;
    model.thumbnailUrl = responseDto.thumbnailUrl;
  }

  return model;
}

export { createDetail as createMemberDetailModel, createUpsert as createMemberUpsertModel };