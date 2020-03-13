<template>
	<view class="content">
			<swiper style='text-align: center;' circular="true" :indicator-dots="true" :autoplay="true" :interval="3000" :duration="2000" >
				<swiper-item  v-for="(item,index) in banner" :key='index'>
					<view class="swiper-item" >
						<image :src="item.imageUrl" mode="widthFix" ></image>
					</view>
				</swiper-item>
			</swiper>
			
			<view class="nav">
				<view class="navWrap">
					<image src="../../static/img/mrtj.png" mode=""></image>
					<text>每日推荐</text>
				</view>
				<view class="navWrap">
					<image src="../../static/img/gd.png" mode=""></image>
					<text>歌单</text>
				</view>
				<view class="navWrap">
					<image src="../../static/img/phb.png" mode=""></image>
						<text>排行榜</text>
				</view>
				<view class="navWrap">
					<image src="../../static/img/dt.png" mode=""></image>
						<text>电台</text>
				</view>
				<view class="navWrap">
					<image src="../../static/img/zb.png" mode=""></image>
						<text>直播</text>
				</view>
			</view>
			<view class="rec_title">
				<text class="first_title">推荐歌单</text>
				<br/>
				<text class="sec_title">为你精挑细选</text>
			</view>
			<view class="songList">
				<view class="uni-product-list" >
					<view class="uni-product" v-for="(item,index) in songList" :key="index">
						<view class="image-view">
							<image  class="uni-product-image" :src="item.picUrl"></image>
						</view>
						<view class="uni-product-title">{{item.name}}</view>
					</view>
				</view>
			</view>
			
			<!-- //抽屉组件 -->
			<view class="">
				<uni-drawer @close='closeDrawer' :visible='showDrawer' mode='left'>
					<uni-list>
						<uni-list-item @click='history' title="历史记录" note="" show-arrow = 'false'></uni-list-item>
						<uni-list-item  @click='download' title="下载管理" note="" show-arrow = 'false'></uni-list-item>
					</uni-list>
				</uni-drawer>
			</view>
			<tabBar />
	</view>
	
</template>

<script>
	import uniList from '../../components/uni-list/uni-list.vue'
	import uniListItem from '../../components/uni-list-item/uni-list-item.vue'
	import uniDrawer from '../../components/uni-drawer/uni-drawer.vue'  //抽屉组件
	import tabBar from '../tabbar/tabbar.vue'
	export default {
		components:{uniList,uniListItem,uniDrawer,tabBar},
		data() {
			return {
				banner:[],  //轮播图图片
				songList:[],
				showDrawer:false
			}
		},
		onLoad() {
			const self = this
            uni.request({
            	url:'http://106.15.185.178:6025/banner',
				success(res) {
					self.banner = res.data.banners
				}
            }),
			uni.request({
				url:'http://106.15.185.178:6025/personalized',
				success(res) {
					self.songList = res.data.result
				}
			})
		},
		methods:{
			closeDrawer(){
				this.showDrawer = false
			},
			history(){
				uni.navigateTo({
					url:'../history/history'
				})
			},
			download(){
				uni.navigateTo({
					url:'../download/index'
				})
			}
				
		},
		onNavigationBarButtonTap(e) { //上面按钮点击事件
			console.log(e.index)
			if(e.index ==0){
				console.log('左侧被点击了 ')
				this.showDrawer = true
			}else {
				uni.navigateTo({
					url:'../search/search'
				})
			}
		},
	}
</script>

<style scoped>
	.nav{
		height: 120upx;
		width: 100%;
		display: flex;
		justify-content: space-around;
	}
	.nav .navWrap{
		height: 120upx;
		width: 19%;
	}
	.nav .navWrap image{
		height: 100%;
		width: 90%;
	}
	uni-view {
	    text-align: center;
	}
	.rec_title{
		margin-top: 90upx;
		text-align: left;
		font-size: 35upx;
		margin-left: 25upx;
	}
	.first_title{
		font-size: 28upx;
		color: #C3C3C3;
	}
	.sec_title{
		font-weight: bold;
	}
	.songList{
		/* margin-top: 50upx; */
	}
</style>
