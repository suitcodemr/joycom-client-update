import styled from 'styled-components';
import {
	BottomNavigation,
	BottomNavigationAction,
	AppBar,
} from '@material-ui/core';

export const StyledAppBar = styled(AppBar)`
	background-color: #78c2ad !important;
	position: absolute;
`;

export const StyledBottomNavigation = styled(BottomNavigation)`
	background: #78c2ad !important;
	width: 100%;
	position: fixed;
	bottom: 0;
	z-index: 1000;
	border-radius: 24px;
`;

export const StyledBottomNavigationAction = styled(BottomNavigationAction)`
	padding: 12px 6px !important;

	&.Mui-selected {
		svg {
			font-size: 32px;
		}
	}
	svg {
		transition: all 0.1s;
	}
`;
