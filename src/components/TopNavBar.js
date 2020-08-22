import React from 'react';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';

import { StyledAppBar } from '../styles/navigationStyles';

const TopNavBar = () => {
	return (
		<div>
			<StyledAppBar position='relative'>
				<Toolbar>
					<Typography variant='h6' color='inherit'>
						Joycom
					</Typography>
				</Toolbar>
			</StyledAppBar>
		</div>
	);
};

export default TopNavBar;
