const defaultState = {page: 'SearchPage'}

export default function modalDisplayReducer(state = defaultState, action){
  switch (action.type){
    case 'ToSearchPage':
      return {page: 'SearchPage'}
    case 'ToChatPage':
      return {page: 'ChatPage'}
    case 'ToCreatePage':
      return {page: 'CreatePage'}
    default:
      return state
  }
}
