export interface ProductObject {
  thumbnail: Thumbnail;
  title:     string;
  screen:    string;
  processor: string;
  storage:   string;
  system:    string;
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


