const reducer = (state, action) => {
    const actionType = action.type.toLowerCase();
    const errorMsg = document.getElementById('errorMsg');
    errorMsg.classList.add('hide')
    if (actionType === 'increment') {
      state.map((item) => {
        if (item.id === action.payload) {
          item.count = ++item.count;
        }
        return item;
      })
      // const totalPrices = state.list.reduce((total, item)=> total += item.price * item.count, 0)
      return [...state];
    }
    else if (actionType === 'decrement') {
      state.map((item) => {
        if (item.id === action.payload) {
          const countItem = item.count - 1;
          if (countItem >= 0)
            item.count = countItem;
        }
        return item;
      })
      return [...state];
    }
  }


export  default reducer;