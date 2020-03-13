<template>
	<view class="warp">
		<view @click="gotomusic" class="page-body" v-if="detail.songs">
			<view>
				<img :src="detail.songs[0].al.picUrl + '?param=90y90'" alt="">
			</view>
			<view class="name">
				<!-- 歌曲名称 -->
				<p>{{ detail.songs[0].name }}</p>
				<!-- 歌手名称 -->
				<p>{{ detail.songs[0].ar[0].name }}</p>
			</view>
			<view class="next">
				<p @click.stop='prev'>上一首</p>
				<p @click.stop='next'>下一首</p>
			</view>
			<view class="icon" @click.stop="paused ? play() : pause()">
				<cmd-icon :type="paused ? 'play' : 'pause'" size="20" color="#654321" style="padding-right: 10upx;"></cmd-icon>
				<view   @click.stop="download">
					<cmd-icon type="download-cloud" size="20" color="#654321"></cmd-icon>
				</view>
				<view class="model"  @click.stop="changeModel">
					{{ model === 1 && '单曲' || model === 2 && '顺序' || model === 3 && '随机'   }}
				</view>
				
			</view>
			
		</view>
	</view>
</template>

<script>
	import Vuex from 'vuex'
	import cmdIcon from "@/components/cmd-icon/cmd-icon.vue"
	export default {
		components: {cmdIcon},
		computed: {
			...Vuex.mapState(['detail', 'paused','model','audio','history','musicIndex'])
		},
		methods: {
			...Vuex.mapMutations(['play', 'pause','changeModel','setSrc','setLrc','setDetail','setMusicIndex','setPrev']),
			gotomusic() {
				uni.navigateTo({
					url: '/pages/music/music'
				})
			},
			download(){
				uni.downloadFile({
					url:this.audio.src,
					success(res) {
						uni.saveFile({
							tempFilePath:res.tempFilePath
						})
					}
				})
			},
			next(){
				this.setMusicIndex() 
				this.setSrc(this.history[this.musicIndex ].src)  //重新设置歌曲的src
				this.setLrc(this.history[this.musicIndex ].lrc)
				this.setDetail(this.history[this.musicIndex].detail)
				
			},
			prev(){
				this.setPrev()
				this.setSrc(this.history[this.musicIndex ].src)  //重新设置歌曲的src
				this.setLrc(this.history[this.musicIndex ].lrc)
				this.setDetail(this.history[this.musicIndex].detail)
		  }
		}
	}
</script>

<style>
	.page-body {
		position: fixed;
		bottom: 0;
		width: 100%;
		background: rgba(255, 255, 255, .8);
		padding: 13upx 10upx;
	}
	.page-body img {
		width: 90upx;
		height: 90upx;
		border-radius: 50%;
	}
	.page-body view{
		float: left;
	}
	.page-body .name {
		padding-left: 15upx;
		width:200upx;
		overflow: hidden;
		text-overflow: ellipsis;
		white-space: nowrap;
	}
	.page-body .icon {
		float: right;
		padding: 30upx 30upx 0 0;
		margin-top: 10upx;
	}
	.next{
		display: flex;
		padding-top: 25upx;
	}
	.next p{
		margin-left: 20upx;
	}
	
	.model{
		margin-left: 30upx;
		margin-top: -18upx;
		
	}
</style>
