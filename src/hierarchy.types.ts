export type Leaf = {
  name: string;
  path: string;
};

export type Hierarchy = {
  name: string;
  path: string;
  children: Array<Hierarchy | Leaf>;
};
