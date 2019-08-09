<template>
	<div id="tags-view-container" class="tags-view-container">
		<scroll-pane ref="scrollPane" class="tags-view-wrapper">
			<a href="javascript:;" v-for="tag in viewsList" :key="tag.url" style="display: inline-block; height: 60px;" @click="addTags(tag)" :class="{ active: activeView == tag.url }">
				{{ tag.name }}
			</a>
		</scroll-pane>
	</div>
</template>

<script>
import ScrollPane from './ScrollPane';
import { mapGetters, mapActions } from 'vuex';
export default {
	components: { ScrollPane },
	data() {
		return {
			visible: false,
			top: 0,
			left: 0,
			selectedTag: {},
			affixTags: [],
			
			
		};
	},
	props: {
		viewsList: {
			type: Array,
			default:[] 
		},
	},
	watch: {
		viewsList(newValue, oldValue) {
			this.initTags();
		}
	},
	computed: {
		...mapGetters(['visitedViews','activeView'])
	},
	mounted() {
		this.initTags();
	},
	methods: {
		...mapActions(['addVisitedViews','setActiveView']),
		addTags(tag) {
			this.addVisitedViews(tag);
			this.setActiveView(tag.url)
		},
		initTags() {
			if (this.viewsList && this.viewsList.length > 0) {
				this.addVisitedViews(this.viewsList[0]);
				this.setActiveView(this.viewsList[0].url)
			}
		}
	}
};
</script>

<style lang="scss" scoped>
.tags-view-container {
	height: 34px;
	width: 100%;
	background: #fff;
	border-bottom: 1px solid #d8dce5;
	box-shadow: 0 1px 3px 0 rgba(0, 0, 0, 0.12), 0 0 3px 0 rgba(0, 0, 0, 0.04);
	.tags-view-wrapper {
		.tags-view-item {
			display: inline-block;
			position: relative;
			cursor: pointer;
			height: 26px;
			line-height: 26px;
			border: 1px solid #d8dce5;
			color: #495060;
			background: #fff;
			padding: 0 8px;
			font-size: 12px;
			margin-left: 5px;
			margin-top: 4px;
			&:first-of-type {
				margin-left: 15px;
			}
			&:last-of-type {
				margin-right: 15px;
			}
			&.active {
				background-color: #42b983;
				color: #fff;
				border-color: #42b983;
				&::before {
					content: '';
					background: #fff;
					display: inline-block;
					width: 8px;
					height: 8px;
					border-radius: 50%;
					position: relative;
					margin-right: 2px;
				}
			}
		}
	}
	.contextmenu {
		margin: 0;
		background: #fff;
		z-index: 3000;
		position: absolute;
		list-style-type: none;
		padding: 5px 0;
		border-radius: 4px;
		font-size: 12px;
		font-weight: 400;
		color: #333;
		box-shadow: 2px 2px 3px 0 rgba(0, 0, 0, 0.3);
		li {
			margin: 0;
			padding: 7px 16px;
			cursor: pointer;
			&:hover {
				background: #eee;
			}
		}
	}
}
</style>

<style lang="scss">
//reset element css of el-icon-close
.tags-view-wrapper {
	.tags-view-item {
		.el-icon-close {
			width: 16px;
			height: 16px;
			vertical-align: 2px;
			border-radius: 50%;
			text-align: center;
			transition: all 0.3s cubic-bezier(0.645, 0.045, 0.355, 1);
			transform-origin: 100% 50%;
			&:before {
				transform: scale(0.6);
				display: inline-block;
				vertical-align: -3px;
			}
			&:hover {
				background-color: #b4bccc;
				color: #fff;
			}
		}
	}
}
</style>
