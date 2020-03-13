<template>
	<view class="history">
		<li v-if='list == []' >暂无下载记录</li>
		<li v-else v-for="(item,index) in list" :key='index' @click='play(item)'> {{item.filePath}}</li>
	</view>
</template>

<script>
	import Vuex from 'vuex'
	export default{
		data(){
			return{
				list:[]
			}
		},
		computed:{
			...Vuex.mapState(['history'])
		},
		mounted() {
			uni.getSavedFileList({
				success:(res)=>{
					console.log(res)
					this.list = res.fileList
				}
			})
		},
		methods:{
			...Vuex.mapMutations(['setSrc','setDetail','setLrc']),
			play(item){
				 console.log(item)
				 this.setSrc(item.filePath)
			}
			
		}
		
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
