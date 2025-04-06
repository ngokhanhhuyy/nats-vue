export const getPublicHomeRoutePath = () => "/";
export const getPublicAboutUsIntroductionRoutePath = () => "/ve-chung-toi";
export const getPublicSummaryItemsRoutePath = (id?: number) => {
	if (id != null) {
		return `/gioi-thieu?id=${id}`;
	}

	return "/gioi-thieu";
};
export const getPublicServiceListRoutePath = () => "/dich-vu";
export const getPublicServiceDetailRoutePath = (id: number) => `/dich-vu/${id}`;
export const getPublicCourseListRoutePath = () => "/khoa-hoc";
export const getPublicCourseDetailRoutePath = (id: number) => `/khoa-hoc/${id}`;
export const getPublicProductListRoutePath = () => "/san-pham";
export const getPublicProductDetailRoutePath = (id: number) => `/san-pham/${id}`;
export const getPublicContactsRoutePath = () => "/lien-he";
export const getPublicEnquiryRoutePath = () => "/cau-hoi";

export const getSignInRoutePath = () => "/dang-nhap";
export const getProtectedDashboardRoutePath = () => "/quan-tri/bang-dieu-khien";