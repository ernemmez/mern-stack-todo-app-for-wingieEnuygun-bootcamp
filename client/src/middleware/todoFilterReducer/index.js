

export default function reducer(state, action) {
	switch(action.type){
		case 'UPDATE_COMPLETED' :
			return {
				...state,
				completed: action.value
			}
		case 'ONLY_ME':
			return {
				...state,
				onlyMe: action.payload
			}
		
		default:
         return state;
	}
}


