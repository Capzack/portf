const defaultState = 'none'

export default function modalDisplayReducer(state = defaultState, action){
  switch (action.type){
    case 'SHOW_MODAL':
      document.body.classList.add('modal-open');
      return 'block'
    case 'HIDE_MODAL':
      document.body.classList.remove('modal-open');
      return 'none'
    default:
      return state
  }
}
