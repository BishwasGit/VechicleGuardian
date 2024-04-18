import React from "react";

const dashboard = () => {
	return (
		<Grid
			container
			spacing={2}
		>
			<Grid
				item
				xs={6}
			>
				<Item>xs=8</Item>
			</Grid>
			<Grid
				item
				xs={6}
			>
				<Item>xs=4</Item>
			</Grid>
		</Grid>
	);
};

export default dashboard;
