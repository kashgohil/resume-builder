import { TemplateType } from "~/constants";

interface MapOf<T> {
  [key: string]: T;
}

export interface Template {
  type: TemplateType;
  sections: MapOf<any>;
}
