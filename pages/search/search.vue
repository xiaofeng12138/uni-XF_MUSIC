<template>
	<view>
		<view class="uni_title">
			热门搜索
		</view>
		<view class="hot" v-for="(item,index) in hotList" :key='index'>
			<uni-tag :text="item.first" circle='true' @click="hots(item.first)" ></uni-tag>
		</view>
		<view class="uni_title">
			搜索历史记录
		</view>
		<view class="">
			<view class="hot" v-for="(item,index) in searchList" :key='index'>
				<uni-tag :text="item" circle='true' ></uni-tag>
			</view>
		</view>
		
		<view class="uni_title">
			搜索列表
		</view>
			<view class="uni-list">
				<view class="uni-list-cell" @click="getSrc(item)" v-for="(item,index) in songList" :key="index">
					<view class="uni-media-list" >
						<view class="uni-media-list-body">
							<view class="uni-media-list-body">
							  {{index+1}}、{{item.name}}
							</view>
							<view class="uni-media-list-body uni-ellipsis">
							 {{item.artists[0].name}}
							</view>
						</view>
					</view>
				</view>
			</view>
	
		
		
	</view>
</template>

<script>
	import uniTag from '../../components/uni-tag/uni-tag.vue'
	import uniList from '../../components/uni-list/uni-list.vue'
	import uniListItem from '../../components/uni-list-item/uni-list-item.vue'
	import Vuex from 'vuex'
	export default{
		components:{
			uniTag,
			uniList,uniListItem
		},
		data(){
			return {
				hotList:[],
				searchList:[],
				songList:[]
			}
		},
		onLoad() {
			const self = this;
			uni.request({
				url:'http://106.15.185.178:6025/search/hot',
				success(res) {
					self.hotList = res.data.result.hots
				}
			})
		},
		methods:{
			...Vuex.mapActions(['getSrc']),//调用vuex里面的getSrc方法
			hots(text){
				
				const t = this;
				t.searchList.push(text)
				uni.request({
					url:'http://106.15.185.178:6025/search?keywords='+text,
					success(res) {
						t.songList = res.data.result.songs //搜索歌曲列表
					}
				})
			}
		},
		onNavigationBarSearchInputConfirmed(e) {  //搜索功能
			console.log(e)
			this.searchList.push(e.text)
			this.hots(e.text)
		},
	}
</script>

<style>
	.uni_title{
		font-weight: bold;
		margin-left: 10upx;
		font-size: 30upx;
		margin-top: 20upx;
	}
	.hot {
		display: inline-block;
		font-size: 30upx;
		margin-left: 20upx;
		margin-top: 20upx;
	}
</style>
