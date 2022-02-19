export interface ProductObject {
  thumbnail: Thumbnail;
  title:     string;
  screen:    string;
  processor: string;
  storage:   string;
  system:    string;
  slug:      string;
  price:     number;
  sys:       Sys;
}

export interface Sys {
  id: string;
}

export interface Thumbnail {
  width:  number;
  height: number;
  url:    string;
}



export interface Slugs {
  data: Data;
}

export interface Data {
  productCollection: ProductCollection;
}

export interface ProductCollection {
  items: Item[];
}

export interface Item {
  slug: string;
  sys:  Sys;
}

export interface Sys {
  id: string;
}

export interface Describe {
  data: DescribeData;
}

export interface DescribeData {
  product: Product;
}

export interface Product {
  title:     string;
  screen:    string;
  processor: string;
  storage:   string;
  system:    string;
  price:     number;
  image:     Picture;
  info:      Info;
}

export interface Picture {
  url:    string;
  width:  number;
  height: number;
}

export interface Info {
  json: JSON;
}

export interface JSON {
  nodeType: string;
  data:     ContentData;
  content:  JSONContent[];
}

export interface JSONContent {
  nodeType: string;
  content:  ContentContent[];
  data:     ContentData;
}

export interface ContentContent {
  nodeType: string;
  value:    string;
  marks:    any[];
  data:     ContentData;
}

export interface ContentData {
}

