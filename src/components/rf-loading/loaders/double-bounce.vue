<template>
	<view>
		<view
			class="spinner-inside"
			:style="{
				width: size + 20 + 'px',
				height: size + 20 + 'px'
			}"
		>
			<view :style="{ backgroundColor: color }" class="double-bounce1"></view>
			<view :style="{ backgroundColor: color }" class="double-bounce2"></view>
		</view>
	</view>
</template>

<script>
export default {
	name: 'doubleBounce',
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

.double-bounce1,
.double-bounce2 {
	width: 100%;
	height: 100%;
	border-radius: 50%;
	opacity: 0.6;
	position: absolute;
	top: 0;
	left: 0;

	-webkit-animation: bounce 2s infinite ease-in-out;
	animation: bounce 2s infinite ease-in-out;
}

.double-bounce2 {
	-webkit-animation-delay: -1s;
	animation-delay: -1s;
}

@-webkit-keyframes bounce {
	0%,
	100% {
		-webkit-transform: scale(0);
	}
	50% {
		-webkit-transform: scale(1);
	}
}

@keyframes bounce {
	0%,
	100% {
		transform: scale(0);
		-webkit-transform: scale(0);
	}
	50% {
		transform: scale(1);
		-webkit-transform: scale(1);
	}
}
</style>
