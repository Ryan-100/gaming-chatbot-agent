export interface IOptions {
  label: string | JSX.Element;
  value: string;
}
export interface PaginationTypes {
  pageIndex: number;
  rowPerPage: number;
  total: number;
  pageCount: number;
}

export interface ErrorResponse {
  code: string;
  details: string;
  hint: string;
  message: string;
}

export interface MetaResponse {
  success: boolean;
  message: string;
  devMessage?: string;
}

export interface APIResponse<T> {
  meta?: MetaResponse;
  body?: {
    currentPage?: number;
    total?: number;
    pageCount?: number;
    rowPerPage?: number;
    data: T;
  };
}

export interface PaginationReq {
  currentPage?: number;
  pageCount?: number;
  rowPerPage?: number;
}

export interface SuccessResponse {
  code: number;
  message: string;
}

export interface Menu {
  name: string;
  path: string;
  icon: JSX.Element;
  activeIcon?: JSX.Element;
  subMenu?: { name: string; path: string }[];
  haveSubMenu: boolean;
  hide?: boolean;
}
