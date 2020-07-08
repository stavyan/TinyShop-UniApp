<template>
	<view>
		<image v-if="filePath" :src="filePath" :style="{ width: `${size}px`, height: `${size}px` }"></image>
		<canvas
      v-if="!filePath"
			:id="cid"
			:canvas-id="cid"
			:style="{ width: `${size}px`, height: `${size}px` }"
		/>
	</view>
</template>
<script>
import uQRCode from '@/utils/uqrcode.js';
export default {
	props: {
		cid: {
			type: String,
			required: true
		},
		text: {
			type: String,
			required: true
		},
		size: {
			type: Number,
			default: 129
		},
		margin: {
			type: Number,
			default: 0
		},
		backgroundColor: {
			type: String,
			default: '#ffffff'
		},
		foregroundColor: {
			type: String,
			default: '#000000'
		},
		backgroundImage: {
			type: String
		},
		logo: {
			type: String
		},
		makeOnLoad: {
			type: Boolean,
			default: false
		}
	},
	data() {
		return {
			filePath: ''
		};
	},
	mounted() {
		if (this.makeOnLoad) {
			this.make();
		}
	},
	methods: {
		async make() {
			const options = {
				canvasId: this.cid,
				componentInstance: this,
				text: this.text,
				size: this.size,
				margin: this.margin,
				backgroundColor: this.backgroundImage
					? 'rgba(255,255,255,0)'
					: this.backgroundColor,
				foregroundColor: this.foregroundColor
			};
			let filePath = await this.makeSync(options);
			if (this.backgroundImage) {
				filePath = await this.drawBackgroundImageSync(filePath);
			}
			if (this.logo) {
				filePath = await this.drawLogoSync(filePath);
			}
			this.filePath = filePath;
			this.makeComplete(filePath);
		},
		makeComplete(filePath) {
			this.$emit('makeComplete', filePath);
		},
		drawBackgroundImage(options) {
			const ctx = uni.createCanvasContext(this.cid, this);

			ctx.drawImage(this.backgroundImage, 0, 0, this.size, this.size);

			ctx.drawImage(options.filePath, 0, 0, this.size, this.size);

			ctx.draw(false, () => {
				uni.canvasToTempFilePath({
					canvasId: this.cid,
					success: res => {
						options.success && options.success(res.tempFilePath);
					},
					fail: error => {
						options.fail && options.fail(error);
					}
				});
			});
		},
		async drawBackgroundImageSync(filePath) {
			return new Promise((resolve, reject) => {
				this.drawBackgroundImage({
					filePath: filePath,
					success: res => {
						resolve(res);
					},
					fail: error => {
						reject(error);
					}
				});
			});
		},
		fillRoundRect(ctx, r, x, y, w, h) {
			ctx.save();
			ctx.translate(x, y);
			ctx.beginPath();
			ctx.arc(w - r, h - r, r, 0, Math.PI / 2);
			ctx.lineTo(r, h);
			ctx.arc(r, h - r, r, Math.PI / 2, Math.PI);
			ctx.lineTo(0, r);
			ctx.arc(r, r, r, Math.PI, (Math.PI * 3) / 2);
			ctx.lineTo(w - r, 0);
			ctx.arc(w - r, r, r, (Math.PI * 3) / 2, Math.PI * 2);
			ctx.lineTo(w, h - r);
			ctx.closePath();
			ctx.setFillStyle('#ffffff');
			ctx.fill();
			ctx.restore();
		},
		drawLogo(options) {
			const ctx = uni.createCanvasContext(this.cid, this);

			ctx.drawImage(options.filePath, 0, 0, this.size, this.size);

			const logoSize = this.size / 4;
			const logoX = this.size / 2 - logoSize / 2;
			const logoY = logoX;

			const borderSize = logoSize + 10;
			const borderX = this.size / 2 - borderSize / 2;
			const borderY = borderX;
			const borderRadius = 5;

			this.fillRoundRect(
				ctx,
				borderRadius,
				borderX,
				borderY,
				borderSize,
				borderSize
			);

			ctx.drawImage(this.logo, logoX, logoY, logoSize, logoSize);

			ctx.draw(false, () => {
				uni.canvasToTempFilePath({
					canvasId: this.cid,
					success: res => {
						options.success && options.success(res.tempFilePath);
					},
					fail: error => {
						options.fail && options.fail(error);
					}
				});
			});
		},
		async drawLogoSync(filePath) {
			return new Promise((resolve, reject) => {
				this.drawLogo({
					filePath: filePath,
					success: res => {
						resolve(res);
					},
					fail: error => {
						reject(error);
					}
				});
			});
		},
		async makeSync(options) {
			return new Promise((resolve, reject) => {
				uQRCode.make({
					canvasId: options.canvasId,
					componentInstance: options.componentInstance,
					text: options.text,
					size: options.size,
					margin: options.margin,
					backgroundColor: options.backgroundColor,
					foregroundColor: options.foregroundColor,
					success: res => {
						resolve(res);
					},
					fail: error => {
						reject(error);
					}
				});
			});
		}
	}
};
</script>
