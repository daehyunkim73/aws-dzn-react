import React from 'react';
import Section_one from './section_one';
import Notice from './notice';
import Update from './update';
import Data_app from './data_app';
import Aside_up from './aside_up';
import Slide from './carousel';

const MineSearch = () => {
	return (
		<React.Fragment>
			<Slide />
			<Section_one />
			<Notice />
			<Update />
			<Data_app />
			<Aside_up />
		</React.Fragment>
	)
}

export default MineSearch;