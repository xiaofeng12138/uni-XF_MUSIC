<template>
	<view class="history">
		<li v-if='history.length === 0' >暂无历史记录</li>
		<li v-else @click='play(item)' v-for="(item,index) in history" :key='index' > {{index + 1}}、 {{item.detail.songs[0].name}}</li>
	</view>
</template>

<script>
	import Vuex from 'vuex'
	export default{
		data(){
			return{}
		},
		computed:{
			...Vuex.mapState(['history'])
		},
		methods:{
			...Vuex.mapMutations(['setSrc','setDetail','setLrc']),
			play(item){
				 console.log(item)
				 this.setSrc(item.src)
				 this.setDetail(item.detail)
				 this.setLrc(item.lrc)
			}
		},
		
	}
</script>

<style>
	.history li{
		list-style: none;
		height: 70upx;
		width: 100%;
		line-height: 50upx;
		padding-left: 50upx;
		margin-top: 10upx;
		border-bottom: 1px solid #ccc;
	}
</style>
