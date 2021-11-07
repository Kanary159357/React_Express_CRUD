import { Descendant, Node } from 'slate';

export const serialize = (value: Descendant[]): string => {
	return value.map((n) => Node.string(n)).join(' ');
};
