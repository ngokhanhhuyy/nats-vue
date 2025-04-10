import { CatalogItemType } from "@/enums/catalogItemType";
import {
  getPublicServiceDetailRoutePath,
  getPublicCourseDetailRoutePath,
  getPublicProductDetailRoutePath,
  getProtectedCatalogItemUpdateRoutePath
} from "@/utils/routeUtils";

declare global {
  type CatalogItemBasicModel = Implements<IHasThumbnailBasicModel, {
    id: number;
    name: string;
    type: CatalogItemType;
    summary: string;
    thumbnailUrl: string;
    detailRoute: string;
    updateRoute: string;
  }>;

  type CatalogItemDetailModel = Implements<
    IHasThumbnailDetailModel & IHasPhotosDetailModel<CatalogItemDetailPhotoModel>,
    {
      id: number;
      name: string;
      type: CatalogItemType;
      summary: string;
      detail: string;
      thumbnailUrl: string | null;
      photos: CatalogItemDetailPhotoModel[];
      otherItems: CatalogItemBasicModel[];
      detailRoute: string;
      updateRoute: string;
      typeDisplayName: string;
    }
  >;

  type CatalogItemDetailPhotoModel = Implements<IDetailPhotoModel, {
    id: number;
    url: string;
    description: string | null;
  }>;

  type CatalogItemUpsertModel = Implements<
    IHasThumbnailUpsertModel & IHasPhotosUpsertModel<CatalogItemUpsertPhotoModel>, {
      id: number;
      name: string;
      type: CatalogItemType;
      summary: string;
      detail: string;
      photos: CatalogItemUpsertPhotoModel[];
      thumbnailUrl: string | null;
      thumbnailFile: string | null;
      thumbnailChanged: boolean;
      toRequestDto(): UpsertRequestDto;
    }>;

  type CatalogItemUpsertPhotoModel = Implements<IUpsertPhotoModel, {
    id: number | null;
    description: string;
    url: string | null;
    file: string | null;
    isDeleted: boolean,
    toRequestDto(): UpsertPhotoRequestDto;
  }>;
}

type UpsertRequestDto = CatalogItemUpsertRequestDto;
type UpsertPhotoRequestDto = CatalogItemUpsertPhotoRequestDto;
type BasicResponseDto = CatalogItemBasicResponseDto;
type DetailResponseDto = CatalogItemDetailResponseDto;
type DetailPhotoResponseDto = CatalogItemDetailPhotoResponseDto;
type BasicModel = CatalogItemBasicModel;
type DetailModel = CatalogItemDetailModel;
type DetailPhotoModel = CatalogItemDetailPhotoModel;
type UpsertModel = CatalogItemUpsertModel;
type UpsertPhotoModel = CatalogItemUpsertPhotoModel;

const typeDisplayNames: Record<CatalogItemType, string> = {
  [CatalogItemType.Service]: "Dịch vụ",
  [CatalogItemType.Course]: "Khoá học",
  [CatalogItemType.Product]: "Sản phẩm",
};

function createBasic(responseDto: BasicResponseDto): BasicModel {
  let thumbnailUrl = "https://placehold.co/800x600";
  if (responseDto.type !== CatalogItemType.Course && responseDto.thumbnailUrl) {
    thumbnailUrl = responseDto.thumbnailUrl;
  }

  return {
    id: responseDto.id,
    name: responseDto.name,
    type: responseDto.type,
    summary: responseDto.summary,
    thumbnailUrl: thumbnailUrl,
    get detailRoute(): string {
      switch (this.type) {
        case CatalogItemType.Service:
          return getPublicServiceDetailRoutePath(this.id);
        case CatalogItemType.Course:
          return getPublicCourseDetailRoutePath(this.id);
        case CatalogItemType.Product:
          return getPublicProductDetailRoutePath(this.id);
      }
    },
    get updateRoute(): string {
      return getProtectedCatalogItemUpdateRoutePath(this.id);
    }
  };
}

function createDetail(responseDto: DetailResponseDto): DetailModel {
  let thumbnailUrl: string | null = responseDto.thumbnailUrl;
  let photosAsPlaceholders = false;
  if (responseDto.type === CatalogItemType.Course && responseDto.thumbnailUrl) {
    thumbnailUrl = "https://placehold.co/800x600";
    photosAsPlaceholders = true;
  }

  return {
    id: responseDto.id,
    name: responseDto.name,
    type: responseDto.type,
    summary: responseDto.summary,
    detail: responseDto.detail,
    thumbnailUrl: thumbnailUrl,
    photos: responseDto.photos.map((dto) => createDetailPhoto(dto, photosAsPlaceholders)),
    otherItems: responseDto.otherItems.map((dto) => createBasic(dto)),
    get detailRoute(): string {
      switch (this.type) {
        case CatalogItemType.Service:
          return getPublicServiceDetailRoutePath(this.id);
        case CatalogItemType.Course:
          return getPublicCourseDetailRoutePath(this.id);
        case CatalogItemType.Product:
          return getPublicProductDetailRoutePath(this.id);
      }
    },
    get updateRoute(): string {
      return getProtectedCatalogItemUpdateRoutePath(this.id);
    },
    get typeDisplayName(): string {
      return typeDisplayNames[this.type];
    },
  };
}

function createDetailPhoto(
  responseDto: DetailPhotoResponseDto,
  asPlaceholder: boolean = false,
): DetailPhotoModel {
  return {
    id: responseDto.id,
    description: responseDto.description,
    url: asPlaceholder ? "https://placehold.co/800x600" : responseDto.url,
  };
}

function createUpsert(responseDto?: DetailResponseDto): UpsertModel {
  const model: UpsertModel = {
    id: 0,
    name: "",
    type: CatalogItemType.Service,
    summary: "",
    detail: "",
    photos: [],
    thumbnailUrl: null,
    thumbnailFile: null,
    thumbnailChanged: false,
    toRequestDto() {
      return {
        id: this.id,
        name: this.name,
        type: this.type,
        summary: this.summary,
        detail: this.detail,
        photos: this.photos.map(photo => photo.toRequestDto()),
        thumbnailFile: this.thumbnailFile,
        thumbnailChanged: this.thumbnailChanged
      };
    }
  };

  if (responseDto) {
    model.id = responseDto.id;
    model.name = responseDto.name;
    model.type = responseDto.type;
    model.summary = responseDto.summary;
    model.detail = responseDto.detail;
    model.photos = responseDto.photos.map(photo => createUpsertPhoto(photo));
    model.thumbnailUrl = responseDto.thumbnailUrl;
  }

  return model;
}

function createUpsertPhoto(responseDto?: DetailPhotoResponseDto): UpsertPhotoModel {
  const model: CatalogItemUpsertPhotoModel = {
    id: null,
    description: "",
    url: null,
    file: null,
    isDeleted: false,
    toRequestDto() {
      return {
        id: this.id,
        url: this.url,
        description: this.description || null,
        file: this.file,
        isDeleted: this.isDeleted
      };
    }
  };

  if (responseDto) {
    model.id = responseDto.id;
    model.url = responseDto.url;
    model.isDeleted = false;
  }

  return model;
}

export {
  createBasic as createCatalogItemBasicModel,
  createDetail as createCatalogItemDetailModel,
  createDetailPhoto as createCatalogItemDetailPhotoModel,
  createUpsert as createCatalogItemUpsertModel,
  createUpsertPhoto as createCatalogItemUpsertPhotoModel
};
