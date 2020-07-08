<template>
	<view>
		<view
			class="spinner-inside"
			:style="{
				width: size + 'px',
				height: size + 'px'
			}"
		>
			<view class="spinner-inside-container container1">
				<view :style="{ backgroundColor: color }" class="circle1"></view>
				<view :style="{ backgroundColor: color }" class="circle2"></view>
				<view :style="{ backgroundColor: color }" class="circle3"></view>
				<view :style="{ backgroundColor: color }" class="circle4"></view>
			</view>
			<view class="spinner-inside-container container2">
				<view :style="{ backgroundColor: color }" class="circle1"></view>
				<view :style="{ backgroundColor: color }" class="circle2"></view>
				<view :style="{ backgroundColor: color }" class="circle3"></view>
				<view :style="{ backgroundColor: color }" class="circle4"></view>
			</view>
			<view class="spinner-inside-container container3">
				<view :style="{ backgroundColor: color }" class="circle1"></view>
				<view :style="{ backgroundColor: color }" class="circle2"></view>
				<view :style="{ backgroundColor: color }" class="circle3"></view>
				<view :style="{ backgroundColor: color }" class="circle4"></view>
			</view>
		</view>
	</view>
</template>

<script>
export default {
	name: 'loop',
	props: {
		color: String,
		size: Number
	}
};
</script>

<style scoped>
.spinner-inside {
	margin: 25px auto;
	position: relative;
}

.container1 > view,
.container2 > view,
.container3 > view {
	width: 12px;
	height: 12px;

	border-radius: 100%;
	position: absolute;
	-webkit-animation: bouncedelay 1.2s infinite ease-in-out;
	animation: bouncedelay 1.2s infinite ease-in-out;
	-webkit-animation-fill-mode: both;
	animation-fill-mode: both;
}

.spinner-inside .spinner-inside-container {
	position: absolute;
	width: 100%;
	height: 100%;
}

.container2 {
	-webkit-transform: rotateZ(45deg);
	transform: rotateZ(45deg);
}

.container3 {
	-webkit-transform: rotateZ(90deg);
	transform: rotateZ(90deg);
}

.circle1 {
	top: 0;
	left: 0;
}
.circle2 {
	top: 0;
	right: 0;
}
.circle3 {
	right: 0;
	bottom: 0;
}
.circle4 {
	left: 0;
	bottom: 0;
}

.container2 .circle1 {
	-webkit-animation-delay: -1.1s;
	animation-delay: -1.1s;
}

.container3 .circle1 {
	-webkit-animation-delay: -1s;
	animation-delay: -1s;
}

.container1 .circle2 {
	-webkit-animation-delay: -0.9s;
	animation-delay: -0.9s;
}

.container2 .circle2 {
	-webkit-animation-delay: -0.8s;
	animation-delay: -0.8s;
}

.container3 .circle2 {
	-webkit-animation-delay: -0.7s;
	animation-delay: -0.7s;
}

.container1 .circle3 {
	-webkit-animation-delay: -0.6s;
	animation-delay: -0.6s;
}

.container2 .circle3 {
	-webkit-animation-delay: -0.5s;
	animation-delay: -0.5s;
}

.container3 .circle3 {
	-webkit-animation-delay: -0.4s;
	animation-delay: -0.4s;
}

.container1 .circle4 {
	-webkit-animation-delay: -0.3s;
	animation-delay: -0.3s;
}

.container2 .circle4 {
	-webkit-animation-delay: -0.2s;
	animation-delay: -0.2s;
}

.container3 .circle4 {
	-webkit-animation-delay: -0.1s;
	animation-delay: -0.1s;
}

@-webkit-keyframes bouncedelay {
	0%,
	80%,
	100% {
		-webkit-transform: scale(0);
	}
	40% {
		-webkit-transform: scale(1);
	}
}

@keyframes bouncedelay {
	0%,
	80%,
	100% {
		transform: scale(0);
		-webkit-transform: scale(0);
	}
	40% {
		transform: scale(1);
		-webkit-transform: scale(1);
	}
}
</style>
