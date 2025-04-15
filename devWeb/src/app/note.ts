import { Tag } from "./tag";

export interface Note {
  id?: number;
  title: string;
  content: string;
  color: string;
  tags: string[];
}
