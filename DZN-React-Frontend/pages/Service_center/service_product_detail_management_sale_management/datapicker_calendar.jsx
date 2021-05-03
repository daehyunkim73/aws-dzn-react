import React, {useReducer} from 'react'
import {DateRangeInput} from '@datepicker-react/styled';

const FOCUSCHANGE = 'FOCUSCHANGE';
const DATECHANGE = 'DATECHANGE';

const initialState = {
	startDate: null,
	endDate: null,
	focusedInput: null,
}

function reducer(state, action) {
	switch (action.type) {
		case FOCUSCHANGE:
			return { ...state, focusedInput: action.payload }
		case DATECHANGE:
			return action.payload
		default:
			throw new Error()
	}
}

const Datapicker_calendar = () => {
    const [state, dispatch] = useReducer(reducer, initialState);
    
	return (
		<React.Fragment>
			<DateRangeInput
				onDatesChange={data => dispatch({ type: DATECHANGE, payload: data })}
				onFocusChange={focusedInput => dispatch({ type: FOCUSCHANGE, payload: focusedInput })}
				startDate={state.startDate} // Date or null
				endDate={state.endDate} // Date or null
				focusedInput={state.focusedInput} // START_DATE, END_DATE or null
			/>
		</React.Fragment>
	)
}

export default Datapicker_calendar;