<template>
	<div>
		<tags-view :views-list="list" ref="tagsView"></tags-view>
		<div class="iframebox">
			<div v-for="(item, index) in visitedViews" :key="item.url" v-show="activeView == item.url" >
				<iframe v-once :src="item.url" class="iframe" frameborder="0" scrolling="none"></iframe>
			</div>
		</div>
	</div>
</template>
<script>
import TagsView from '@/pages/index/components/TagsView';
import { mapGetters, mapActions } from 'vuex';
export default {
	data() {
		return {
		list: [
			{ name: '首页', url: 'http://www.baidu.com' },
			{ name: '首页12', url: 'https://vue.ant.design/docs/vue/introduce/' },
			{
				name: 'page1',
				key: 'page1',
				url: '/page1.html'
			},
			{
				name: 'page2',
				key: 'page2',
				url: '/page2.html'
			}
		]
		};
	},
	components: {
		TagsView
	},
	computed: {
		...mapGetters(['visitedViews','activeView'])
	},
	mounted() {
		this.$refs.tagsView.initTags();
	},
	
	methods: {
	
		
	}
};
</script>

<style scoped>
.iframebox {
	position: absolute;
	top: 34px;
	left: 0;
	right: 0;
	bottom: 0;
	box-sizing: border-box;
}
.iframebox > div {
	height: 100%;
	width: 100%;
	overflow: hidden;
}
.iframebox > div iframe {
	border: none;
	height: 100%;
	width: 100%;
	overflow: auto;
}
</style>
