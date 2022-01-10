/* eslint-disable react/display-name */
import React, { Ref, PropsWithChildren } from 'react';
import styled from 'styled-components';

interface BaseProps {
	className: string;
	[key: string]: unknown;
}
type OrNull<T> = T | null;

export const Button = React.forwardRef(
	(
		{
			className,
			active,
			reversed,
			...props
		}: PropsWithChildren<
			{
				active: boolean;
				reversed: boolean;
			} & BaseProps
		>,
		ref: Ref<OrNull<HTMLSpanElement>>
	) => <span {...props} ref={ref as React.RefObject<HTMLDivElement>} />
);

export const Icon = React.forwardRef(
	(
		{ className, ...props }: PropsWithChildren<BaseProps>,
		ref: Ref<OrNull<HTMLSpanElement>>
	) => <span {...props} ref={ref as React.RefObject<HTMLDivElement>} />
);

const StyledToolBar = styled.div`
	& > * {
		display: inline-block;
	}
	& > * + * {
		margin-left: 15px;
	}
	position: relative;
	padding: 1px 18px 17px;
	margin: 0 -20px;
	border-bottom: 2px solid #eee;
	margin-bottom: 20px;
`;
export const Menu = React.forwardRef(
	(
		{ className, ...props }: PropsWithChildren<BaseProps>,
		ref: Ref<OrNull<HTMLDivElement>>
	) => <StyledToolBar {...props} ref={ref as React.RefObject<HTMLDivElement>} />
);

export const Toolbar = React.forwardRef(
	(
		{ className, ...props }: PropsWithChildren<BaseProps>,
		ref: Ref<OrNull<HTMLDivElement>>
	) => <Menu {...props} ref={ref as React.RefObject<HTMLDivElement>} />
);
