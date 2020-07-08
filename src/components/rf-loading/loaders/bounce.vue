<template>
	<view>
		<view
			class="spinner-inside"
			:style="{
				width: size + 110 + 'px'
			}"
		>
			<view :style="{ backgroundColor: color }" class="bounce1"></view>
			<view :style="{ backgroundColor: color }" class="bounce2"></view>
			<view :style="{ backgroundColor: color }" class="bounce3"></view>
		</view>
	</view>
</template>

<script>
export default {
	name: 'bounce',
	props: {
		color: String,
		size: Number
	}
};
</script>

<style scoped>
.spinner-inside {
	margin: 25px auto;
	text-align: center;
}

.spinner-inside > view {
	width: 24px;
	height: 24px;
	margin-right: 4px;
	border-radius: 100%;
	display: inline-block;
	-webkit-animation: bouncedelay 1.4s infinite ease-in-out;
	animation: bouncedelay 1.4s infinite ease-in-out;
	/* Prevent first frame from flickering when animation starts */
	-webkit-animation-fill-mode: both;
	animation-fill-mode: both;
}

.spinner-inside .bounce1 {
	-webkit-animation-delay: -0.32s;
	animation-delay: -0.32s;
}

.spinner-inside .bounce2 {
	-webkit-animation-delay: -0.16s;
	animation-delay: -0.16s;
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
