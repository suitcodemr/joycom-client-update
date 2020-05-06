import React from 'react';

import { Container, Row, Col } from 'react-bootstrap';

const Footer = () => {
	return (
		<>
			<footer className='footer'>
				<Container>
					<Row>
						<Col>
							<div className='footerContent'>
								<p>
									<span className='icon-logo'></span>Joycom
								</p>
								<p>by MR</p>
							</div>
						</Col>
					</Row>
				</Container>
			</footer>
		</>
	);
};

export default Footer;
