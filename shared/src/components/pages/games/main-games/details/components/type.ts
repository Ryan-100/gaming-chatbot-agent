

export interface LangCardType {
  lang: string,
  name: string,
  iconUrl: string,
}

export interface InformCardType {
  desc: string,
  info: string | number | boolean,
}

export interface ChildGameType {
  name: string,
  status: "Active" | "Inactive",
  link: string
}