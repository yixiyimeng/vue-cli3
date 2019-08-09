const tagsView = {
	state: {
		visitedViews: []
	},
	mutations: {
		ADD_VISITED_VIEWS: (state, view) => {
			if (state.visitedViews.some(v => v.url === view.url)) return			
			state.visitedViews.push(Object.assign({}, view))
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
	}
}

export default tagsView
