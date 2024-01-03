export interface TreeNode {
  name: string;
  children?: TreeNode[];
  base: string;
  selected?: boolean;
}