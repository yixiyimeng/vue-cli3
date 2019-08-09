const tagsView = {
	state: {
		visitedViews: [],
		activeView:''
	},
	mutations: {
		ADD_VISITED_VIEWS: (state, view) => {
			if (state.visitedViews.some(v => v.url === view.url)) return
			state.visitedViews.push(Object.assign({}, view))
		},
		SET_ACTIVEVIEW:(state, view) => {
			state.activeView=view
		},
	},
	actions: {
		addVisitedViews({
			commit
		}, view) {
			return new Promise(resolve => {
				commit('ADD_VISITED_VIEWS', view)
				resolve()
			})
		},
		setActiveView({
			commit
		}, view) {
			return new Promise(resolve => {
				commit('SET_ACTIVEVIEW', view)
				resolve()
			})
		}
	}
}

export default tagsView
